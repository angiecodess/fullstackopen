(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{38:function(t,n,e){},39:function(t,n,e){"use strict";e.r(n);var c=e(0),r=e(2),o=e(15),i=e.n(o),a=e(6),u=e(3),s=function(t){var n=t.note,e=t.toggleImportance,r=n.important?"make not important":"make important";return Object(c.jsxs)("li",{children:[n.content,Object(c.jsx)("button",{onClick:e,children:r})]})},j=function(t){var n=t.msg;return null===n?null:Object(c.jsx)("div",{className:"error",children:n})},l=e(4),f=e.n(l),b="/api/notes",d=function(){return f.a.get(b).then((function(t){return t.data}))},O=function(t){return f.a.post(b,t).then((function(t){return t.data}))},m=function(t,n){return f.a.put("".concat(b,"/").concat(t),n).then((function(t){return t.data}))},p=function(){return Object(c.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(c.jsx)("br",{}),Object(c.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2020"})]})},h=function(){var t=Object(r.useState)([]),n=Object(u.a)(t,2),e=n[0],o=n[1],i=Object(r.useState)("a new note .."),l=Object(u.a)(i,2),f=l[0],b=l[1],h=Object(r.useState)(!0),v=Object(u.a)(h,2),x=v[0],g=v[1],S=Object(r.useState)(null),k=Object(u.a)(S,2),w=k[0],y=k[1];Object(r.useEffect)((function(){d().then((function(t){o(t)}))}),[]);var C=x?e:e.filter((function(t){return t.important}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Notes"}),Object(c.jsx)(j,{msg:w}),Object(c.jsx)("div",{children:Object(c.jsxs)("button",{onClick:function(){return g(!x)},children:["show ",x?"important":"all"]})}),Object(c.jsx)("ul",{children:C.map((function(t){return Object(c.jsx)(s,{note:t,toggleImportance:function(){return function(t){var n=e.find((function(n){return n.id===t})),c=Object(a.a)(Object(a.a)({},n),{},{important:!n.important});m(t,c).then((function(n){o(e.map((function(e){return e.id!==t?e:n})))})).catch((function(c){y("Note '".concat(n.content,"' was already removed from server.")),setTimeout((function(){y(null)}),5e3),o(e.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(c.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={id:e.length+1,content:f,date:(new Date).toISOString(),important:Math.random()<.5};O(n).then((function(t){o(e.concat(t)),b("")}))},children:[Object(c.jsx)("input",{value:f,onChange:function(t){b(t.target.value)}}),Object(c.jsx)("button",{type:"submit",children:"save"})]}),Object(c.jsx)(p,{})]})};e(38);i.a.render(Object(c.jsx)(h,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.abb0dd84.chunk.js.map