(this.webpackJsonpthephonebook=this.webpackJsonpthephonebook||[]).push([[0],{22:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var a=t(1),c=t.n(a),r=t(16),o=t.n(r),i=(t(22),t(17)),u=t(3),s=t(5),d=t.n(s),h="http://localhost:3001/api/persons",l={getAll:function(){return d.a.get(h).then((function(e){return e.data}))},createPerson:function(e){return d.a.post(h,e).then((function(e){return e.data}))},updatePerson:function(e,n){return d.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},deletePerson:function(e){d.a.delete("".concat(h,"/").concat(e))}},j=t(0),b=function(e){var n=e.persons,t=e.handleDelete;return n.map((function(e){return Object(j.jsxs)("p",{children:[e.name,": ",e.number," ",Object(j.jsx)("button",{onClick:function(){return t(e)},children:"delete"})]},e.name)}))},f=function(e){var n=e.addPhoneBook,t=e.newName,a=e.handleChangeName,c=e.newPhone,r=e.handleChangePhone;return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("form",{onSubmit:n,children:[Object(j.jsxs)("div",{children:["name: ",Object(j.jsx)("input",{value:t,onChange:a,required:!0})]}),Object(j.jsxs)("div",{children:["phone:"," ",Object(j.jsx)("input",{value:c,onChange:r,required:!0})]}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{type:"submit",children:"add"})})]})})},m=function(e){var n=e.keyword,t=e.handleChangeKeyword;return Object(j.jsxs)("div",{children:["filter show with: ",Object(j.jsx)("input",{value:n,onChange:t})]})},O=function(e){var n=e.message;return""===n.str?null:Object(j.jsx)("div",{className:"notification ".concat(n.variant),children:"".concat(n.str)})},v=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),o=Object(u.a)(r,2),s=o[0],d=o[1],h=Object(a.useState)(""),v=Object(u.a)(h,2),p=v[0],x=v[1],g=Object(a.useState)(""),w=Object(u.a)(g,2),P=w[0],k=w[1],C=Object(a.useState)({str:"",variant:""}),y=Object(u.a)(C,2),S=y[0],N=y[1];Object(a.useEffect)((function(){l.getAll().then((function(e){c(e)}))}),[]);var D=t.filter((function(e){return e.name.toLowerCase().includes(P)}));return Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"Phonebook"}),Object(j.jsx)(O,{message:S}),Object(j.jsx)(m,{keyword:P,handleChangeKeyword:function(e){k(e.target.value)}}),Object(j.jsx)("h3",{children:"add a new"}),Object(j.jsx)(f,{addPhoneBook:function(e){e.preventDefault();var n=t.find((function(e){return e.name===s})),a={name:s,number:p};n?window.confirm("".concat(n.name," already added to phonebook, replace the old number with the new one?"))&&l.updatePerson(n.id,a).then((function(e){c(t.map((function(n){return n.id===e.id?e:n})))})).catch((function(e){c(t.filter((function(e){return e.id!==n.id}))),N({str:" ".concat(n.name," was already deleted from server"),variant:"danger"}),setTimeout((function(){N({str:"",variant:"success"})}),5e3)})):l.createPerson(a).then((function(e){c([].concat(Object(i.a)(t),[e])),N({str:" Added ".concat(e.name),variant:"success"}),setTimeout((function(){N({str:"",variant:""})}),5e3)}));d(""),x("")},newName:s,handleChangeName:function(e){d(e.target.value)},newPhone:p,handleChangePhone:function(e){x(e.target.value)}}),Object(j.jsx)("h2",{children:"Numbers"}),Object(j.jsx)(b,{persons:D,handleDelete:function(e){var n=e.name,a=e.id;if(window.confirm("Delete ".concat(n))){l.deletePerson(a);var r=t.filter((function(e){return e.id!==a}));N({str:" Deleted ".concat(n),variant:"danger"}),setTimeout((function(){N({str:"",variant:""})}),5e3),c(r)}}})]})};o.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(v,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.08af550b.chunk.js.map