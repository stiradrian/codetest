package se.kry.codetest;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpClient;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.StaticHandler;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class MainVerticle extends AbstractVerticle {

  private HashMap<String, Service> services = new HashMap<>();
  //TODO use this
  private DBConnector connector;
  private BackgroundPoller poller = new BackgroundPoller();

  @Override
  public void start(Future<Void> startFuture) {
    connector = new DBConnector(vertx);
    Router router = Router.router(vertx);
    router.route().handler(BodyHandler.create());
    services.put("kry", new Service("kry", "https://www.kry.se", new Date().toString() ,"UNKNOWN"));
    connector.getAll()
            .setHandler(rs -> rs.result().getRows()
                    .forEach(r -> services.put(r.getString("name"),
                            new Service(r.getString("name"), r.getString("url"), new Date().toString() ,"UNKNOWN"))));
    WebClient webClient = WebClient.create(vertx);
    vertx.setPeriodic(1000 * 6, timerId -> poller.pollServices(services, webClient, connector));
    setRoutes(router);
    vertx
        .createHttpServer()
        .requestHandler(router)
        .listen(8080, result -> {
          if (result.succeeded()) {
            System.out.println("KRY code test service started");
            startFuture.complete();
          } else {
            startFuture.fail(result.cause());
          }
        });
  }

  private void setRoutes(Router router){
    router.route("/*").handler(CorsHandler.create("*")
            .allowedMethod(io.vertx.core.http.HttpMethod.DELETE)
            .allowedHeader("Content-Type"));
    router.route("/*").handler(StaticHandler.create());
    router.get("/service").handler(req -> {
      List<JsonObject> jsonServices = services
          .values()
          .stream()
          .map(service -> new JsonObject(Json.encode(service)))
          .collect(Collectors.toList());
      req.response()
          .putHeader("content-type", "application/json")
          .end(new JsonArray(jsonServices).encode());
    });
    router.post("/service").handler(req -> {
      JsonObject jsonBody = req.getBodyAsJson();
      Service service = new Service(
              jsonBody.getString("name"),
              jsonBody.getString("url"),
              new Date().toString(),
              "UNKNOWN");
      connector.create(jsonBody).setHandler(rs -> services.put(service.getName(), service));
      req.response()
          .putHeader("content-type", "text/plain")
          .end(JsonObject.mapFrom(service).encode());
    });
    router.put("/service").handler(req -> {
      JsonObject jsonBody = req.getBodyAsJson();
      Service service =  services.get(jsonBody.getString("name"));
      service.setUrl(jsonBody.getString("url"));
      connector.update(jsonBody).setHandler(rs -> services.put(service.getName(), service));
      req.response()
              .putHeader("content-type", "text/plain")
              .end(JsonObject.mapFrom(service).encode());
    });
    router.delete("/service/:name").handler(req -> {
      connector.delete(req.pathParam("name"))
              .setHandler(rs -> services.remove(req.pathParam("name")));
      req.response()
              .putHeader("content-type", "text/plain")
              .end("OK");
    });
  }

  static class Service {
    private String url;
    private String name;
    private String date;
    private String status;

    public Service(String name, String url, String date, String status) {
      this.name = name;
      this.url = url;
      this.date = date;
      this.status = status;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public String getUrl() {
      return url;
    }

    public void setUrl(String url) {
      this.url = url;
    }

    public String getDate() {
      return date;
    }

    public void setDate(String date) {
      this.date = date;
    }

    public String getStatus() {
      return status;
    }

    public void setStatus(String status) {
      this.status = status;
    }

    @Override
    public String toString() {
      return "Service{" +
              "url='" + url + '\'' +
              ", name='" + name + '\'' +
              ", date='" + date + '\'' +
              ", status='" + status + '\'' +
              '}';
    }
  }
}



