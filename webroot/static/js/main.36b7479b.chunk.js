(this["webpackJsonpauth-client"]=this["webpackJsonpauth-client"]||[]).push([[0],{22:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(8),i=n.n(a),r=(n(22),n(10)),s=n(15),o=n(9),l=(n(23),n(24),n(32)),j=n(33),d=n(34),h=n(4);var b=function(e){var t=e.services,n=e.onDelete,c=t.map((function(e){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:e.name}),Object(h.jsx)("td",{children:e.url}),Object(h.jsx)("td",{children:e.date}),Object(h.jsx)("td",{children:e.status}),Object(h.jsxs)("td",{children:[Object(h.jsx)("span",{className:"actionButton",servicename:e.name,children:"Edit"})," | ",Object(h.jsx)("span",{className:"actionButton",servicename:e.name,onClick:n,children:"Delete"})]})]},e.name)}));return Object(h.jsx)("tbody",{className:"thead-light",children:c})};function u(e){return Object(h.jsxs)(l.a,{show:e.show,onHide:e.onHide,"aria-labelledby":"contained-modal-title-vcenter",centered:!0,animation:!1,children:[Object(h.jsx)(l.a.Header,{closeButton:!0,children:Object(h.jsx)(l.a.Title,{id:"contained-modal-title-vcenter",children:"Add new service"})}),Object(h.jsx)(l.a.Body,{children:Object(h.jsxs)(j.a,{noValidate:!0,validated:e.validated,onSubmit:e.onSave,children:[Object(h.jsxs)(j.a.Group,{children:[Object(h.jsx)(j.a.Label,{children:"Service Name"}),Object(h.jsx)(j.a.Control,{required:!0,type:"text",name:"name",onChange:e.onSetServiceAttribute,value:e.service.name}),Object(h.jsx)(j.a.Control.Feedback,{type:"invalid",children:"Please choose a service name."})]}),Object(h.jsxs)(j.a.Group,{children:[Object(h.jsx)(j.a.Label,{children:"Service URL"}),Object(h.jsx)(j.a.Control,{required:!0,type:"text",name:"url",onChange:e.onSetServiceAttribute,value:e.service.url}),Object(h.jsx)(j.a.Control.Feedback,{type:"invalid",children:"Please choose a service URL."})]}),Object(h.jsx)(d.a,{type:"submit",children:"Save"})]})})]})}var O=function(){var e=Object(c.useState)([]),t=Object(o.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)({}),l=Object(o.a)(i,2),j=l[0],d=l[1],O=Object(c.useState)({}),v=Object(o.a)(O,2),m=v[0],x=v[1],f=Object(c.useState)(!1),p=Object(o.a)(f,2),S=p[0],g=p[1],y=Object(c.useState)(!1),w=Object(o.a)(y,2),N=w[0],C=w[1];Object(c.useEffect)((function(){k()}),[]);var k=function(){fetch("http://localhost:8080/service").then((function(e){return e.json()})).then((function(e){return a(e)}))},D=function(e){fetch("http://localhost:8080/service",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){return a(n.concat([e]))})),g(!1),d({}),x({})};return Object(h.jsxs)("div",{id:"mainDiv",children:[Object(h.jsx)("div",{id:"buttonDiv",className:"btn-group",application:"group","aria-label":"Basic example",children:Object(h.jsx)("button",{type:"button",className:"btn btn-primary btn-sm",onClick:function(){g(!0),C(!1)},children:"Add New"})}),Object(h.jsx)("div",{children:Object(h.jsxs)("table",{id:"servicesTable",className:"table",children:[Object(h.jsx)("thead",{className:"thead-light",children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Name"}),Object(h.jsx)("th",{children:"URL"}),Object(h.jsx)("th",{children:"Create Date"}),Object(h.jsx)("th",{children:"Status"}),Object(h.jsx)("th",{children:"Action"})]})}),Object(h.jsx)(b,{services:n,onDelete:function(e){var t=e.target.getAttribute("servicename");fetch("http://localhost:8080/service/"+t,{method:"DELETE"}).then((function(e){return a(n.filter((function(e){return e.name!==t})))}))}})]})}),Object(h.jsx)("div",{children:Object(h.jsx)(u,{show:S,onHide:function(){g(!1)},onSave:function(e){!1===e.currentTarget.checkValidity()?(e.preventDefault(),e.stopPropagation(),C(!0)):D(j)},validated:N,onSetServiceAttribute:function(e){d(Object(s.a)(Object(s.a)({},j),{},Object(r.a)({},e.target.name,e.target.value)))},service:m})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(h.jsx)(O,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[29,1,2]]]);
//# sourceMappingURL=main.36b7479b.chunk.js.map