(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t,n){},113:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(20),d=n.n(c),i=n(3),o=n(10),s=n(48),u=n.n(s),l=n(9),f=n(49),b=n(6),m=n(4),v=n(2),g=n(21),p=n.n(g),I="LANE_ADD",O="CARD_ADD",j="CARD_MOVE",E={entities:{1:{id:1,name:"To do",cardIds:["1","2","3"]},2:{id:2,name:"In progress",cardIds:[]},3:{id:3,name:"Done",cardIds:[]}},ids:[1,2,3]},w={entities:{1:{id:1,task:"Quis quis do ullamco excepteur ipsum ut ad non."},2:{id:2,task:"Sint aliqua anim adipisicing aute. Dolore duis pariatur sint excepteur commodo nostrud aliqua culpa. Minim laborum voluptate commodo id nostrud ex eu."},3:{id:3,task:"Enim enim amet fugiat."}},ids:[1,2,3]};var _=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case I:return function(e,t){var n=p()(),a={id:n,name:t.name.trim(),cardIds:[]},r=Object(v.a)({},e.entities,Object(m.a)({},n,a)),c=[].concat(Object(b.a)(e.ids),[n]);return Object(v.a)({},e,{entities:r,ids:c})}(e,t);case O:return function(e,t){var n=t.card,a=n.laneId,r=n.cardId,c=e.entities[a],d=Object(v.a)({},c,{cardIds:[].concat(Object(b.a)(c.cardIds),[r])}),i=Object(v.a)({},e.entities,Object(m.a)({},a,d));return Object(v.a)({},e,{entities:i})}(e,t);case j:return function(e,t){for(var n,a=t.sourceCardId,r=t.targetId,c=null,d=null,i=e.ids.length,o=0;o<i;o+=1){var s=e.entities[e.ids[o]].cardIds,u=s.includes(a),l=s.includes(r)||e.ids[o]===r;if(u&&(c=e.ids[o],d))break;if(l&&(d=e.ids[o],c))break}var f=e.entities[c],g=e.entities[d]||e.entities[r],p=f.cardIds.findIndex(function(e){return e===a}),I=g.cardIds.findIndex(function(e){return e===r});if(c===d){var O=Object(b.a)(f.cardIds);O.splice(p,1),O.splice(I,0,a);var j=Object(v.a)({},f,{cardIds:O}),E=Object(v.a)({},e.entities,Object(m.a)({},c,j));return Object(v.a)({},e,{entities:E})}var w=Object(b.a)(f.cardIds);w.splice(p,1);var _=Object(v.a)({},f,{cardIds:w}),h=Object(b.a)(g.cardIds);h.splice(I,0,a);var k=Object(v.a)({},g,{cardIds:h}),D=Object(v.a)({},e.entities,(n={},Object(m.a)(n,c,_),Object(m.a)(n,d,k),n));return Object(v.a)({},e,{entities:D})}(e,t);default:return e}};var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O:return function(e,t){var n=t.card,a=n.cardId,r={id:a,task:n.task.trim()},c=Object(v.a)({},e.entities,Object(m.a)({},a,r)),d=[].concat(Object(b.a)(e.ids),[a]);return Object(v.a)({},e,{entities:c,ids:d})}(e,t);default:return e}},k=Object(l.combineReducers)({laneState:_,cardState:h}),D=Object(f.createLogger)(),x=Object(l.createStore)(k,void 0,Object(l.applyMiddleware)(D));function y(e,t){return{type:j,sourceCardId:e,targetId:t}}var N="card",C=Object(a.forwardRef)(function(e,t){var n=e.task,c=e.connectDragSource,d=e.isDragging,i=e.connectDropTarget,o=Object(a.useRef)();Object(a.useImperativeHandle)(t,function(){return{getNode:function(){return o.current}}}),c(o),i(o);var s="box card";return d&&(s+=" card_dragging"),r.a.createElement("div",{className:s,ref:o},n)});var S=Object(o.DragSource)(N,{beginDrag:function(e){return{cardId:e.cardId,cardIndex:e.cardIndex}}},function(e,t){return{connectDragSource:e.dragSource(),isDragging:t.isDragging()}})(C),T=Object(o.DropTarget)(N,{hover:function(e,t,n){if(!n)return null;var a=n.getNode();if(!a)return null;var r=e.cardId,c=e.cardIndex,d=e.onCardMove,i=t.getItem().cardIndex,o=c,s=t.getItem().cardId,u=r;if(s!==u){var l=a.getBoundingClientRect(),f=(l.bottom-l.top)/2,b=t.getClientOffset().y-l.top;i<o&&b<f||i>o&&b>f||(d(s,u),t.getItem().cardIndex=o)}}},function(e,t){return{connectDropTarget:e.dropTarget()}})(S);var A=Object(i.b)(function(e,t){return{task:e.cardState.entities[t.cardId].task}},function(e){return{onCardMove:function(t,n){return e(y(t,n))}}})(T),M=n(5);var R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e){return/\S+/.test(e)},r=Object(a.useState)(e),c=Object(M.a)(r,2),d=c[0],i=c[1],o=Object(a.useState)(t),s=Object(M.a)(o,2),u=s[0],l=s[1];return Object(a.useEffect)(function(){var e=n(d);l(e)},[d]),[d,i,u,l]};var L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["click"],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=Object(a.useState)(n),c=Object(M.a)(r,2),d=c[0],i=c[1],o=Object(a.useRef)(null);function s(e){o.current&&!o.current.contains(e.target)&&(i(!1),t())}return Object(a.useEffect)(function(){return e.forEach(function(e){document.addEventListener(e,s)}),function(){e.forEach(function(e){document.removeEventListener(e,s)})}},[]),[o,d,i]},q=n(50),B=n.n(q),J=n(51),K=n.n(J);var F=Object(i.b)(null,function(e,t){return{onAdd:function(n,a){return e("lane"===t.type?{type:I,name:n}:(r={laneId:a,cardId:p()(),task:n},{type:O,card:r}));var r}}})(function(e){var t=e.type,n=e.laneId,a=e.onAdd,c=R(),d=Object(M.a)(c,3),i=d[0],o=d[1],s=d[2],u=L(["click","drag"],function(){return o("")}),l=Object(M.a)(u,3),f=l[0],b=l[1],m=l[2];function v(){m(!1),o("")}function g(){s&&(a(i,n),v())}var p="lane"===t?"\u043a\u043e\u043b\u043e\u043d\u043a\u0443":"\u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443",I={placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 ".concat("lane"===t?"\u043a\u043e\u043b\u043e\u043d\u043a\u0438":"\u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438"),value:i,onChange:function(e){o(e.target.value)},onKeyDown:function(e){var t=e.key;switch(!0){case e.shiftKey&&"Enter"===t:break;case"Enter"===t:g();break;case"Escape"===t||"Esc"===t:v()}},autoFocus:!0};return b?r.a.createElement("div",{className:"column add-new add-new_".concat(t," add-new__form"),ref:f},"lane"===t?r.a.createElement("input",Object.assign({className:"box input add-new__input",type:"text"},I)):r.a.createElement("textarea",Object.assign({className:"box textarea add-new__textarea",rows:"2"},I)),r.a.createElement("div",{className:"row add-new__buttons"},r.a.createElement("button",{className:"button add-new__button",type:"button",disabled:!s,onClick:g},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c ".concat(p)),r.a.createElement("img",{className:"add-new__icon-cross",src:K.a,alt:"Close",onClick:v}))):r.a.createElement("div",{className:"row add-new add-new_".concat(t," add-new__placeholder-").concat(t),onClick:function(){m(!0)}},r.a.createElement("img",{className:"add-new__icon-add",src:B.a,alt:"New ".concat(t)}),r.a.createElement("div",{className:"add-new__text"},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0435 \u043e\u0434\u043d\u0443 ".concat(p)))});var H=Object(o.DropTarget)(N,{hover:function(e,t){var n=e.lane,a=e.onCardMove,r=t.getItem().cardId;n.cardIds.length||a(r,n.id)}},function(e){return{connectDropTarget:e.dropTarget()}})(function(e){var t=e.lane;return(0,e.connectDropTarget)(r.a.createElement("div",{className:"column lane"},r.a.createElement("div",{className:"lane__header"},t.name),r.a.createElement("div",{className:"lane__body"},t.cardIds.map(function(e,t){return r.a.createElement(A,{key:e,cardId:e,cardIndex:t})})),r.a.createElement("div",{className:"lane__footer"},r.a.createElement(F,{type:"card",laneId:t.id}))))});var P=Object(i.b)(function(e,t){return{lane:e.laneState.entities[t.laneId]}},function(e){return{onCardMove:function(t,n){return e(y(t,n))}}})(H);var Q=Object(i.b)(function(e){return{laneIds:e.laneState.ids}})(function(e){var t=e.laneIds;return r.a.createElement("div",{className:"row app"},Boolean(t.length)&&t.map(function(e){return r.a.createElement(P,{key:e,laneId:e})}),r.a.createElement(F,{type:"lane"}))});n(112);d.a.render(r.a.createElement(i.a,{store:x},r.a.createElement(o.DragDropContextProvider,{backend:u.a},r.a.createElement(Q,null))),document.getElementById("root"))},50:function(e,t,n){e.exports=n.p+"static/media/plusIcon.61af6571.svg"},51:function(e,t,n){e.exports=n.p+"static/media/crossIcon.220fb32e.svg"},52:function(e,t,n){e.exports=n(113)}},[[52,1,2]]]);
//# sourceMappingURL=main.1dee3c71.chunk.js.map