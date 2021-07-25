package se.kry.codetest;

import io.vertx.core.Future;
import io.vertx.ext.web.client.WebClient;

import java.util.List;
import java.util.Map;

public class BackgroundPoller {

    private final String STATUS_FAIL = "FAIL";
    private final String STATUS_OK = "OK";

    public Future<List<String>> pollServices(Map<String, MainVerticle.Service> services, WebClient webClient,
                                             DBConnector connector) {

        services.values().forEach(service -> {
                    try {
                        webClient.getAbs(service.getUrl()).timeout(10000).send(result -> {
                            if (result == null || result.result() == null) {
                                service.setStatus(STATUS_FAIL);
                                return;
                            }

                            if (result.succeeded()) {
                                service.setStatus(STATUS_OK);
                            } else {
                                service.setStatus(STATUS_FAIL);
                            }

                            //System.out.println(service);
                        });
                    } catch (Exception e) {
                        service.setStatus(STATUS_FAIL);
                    }
                }
        );

        return Future.succeededFuture();
    }
}
