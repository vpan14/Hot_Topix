(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{280:function(e,t,n){e.exports=n(522)},285:function(e,t,n){},295:function(e,t){},297:function(e,t){},300:function(e,t){},301:function(e,t){},347:function(e,t){},348:function(e,t){},522:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),c=n(34),i=n.n(c),l=(n(285),n(265)),s=n(266),r=n(278),u=n(267),d=n(279),f=n(25),p=(n(521),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(r.a)(this,Object(u.a)(t).call(this,e))).state={apiResponse:"asdf",loaded:!1},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"getToken",value:function(){var e=this;console.log("called getToken"),fetch("http://localhost:3001/getToken").then((function(e){return e.text()})).then((function(t){e.setState({apiResponse:t,loaded:!0})})).catch((function(e){console.log(e)}))}},{key:"componentWillMount",value:function(){this.getToken(),console.log("calling getToken")}},{key:"render",value:function(){return this.state.loaded?a.a.createElement(f.h,{apiKey:"sjc92jugd7js",appId:"62811",token:this.state.apiResponse},a.a.createElement(f.f,{notify:!0}),a.a.createElement(f.g,{feedGroup:"Timeline"}),a.a.createElement(f.d,{feedGroup:"Timeline",options:{reactions:{recent:!0}},notify:!0,Activity:function(e){return a.a.createElement(f.a,Object.assign({},e,{Footer:function(){return a.a.createElement("div",{style:{padding:"8px 16px"}},a.a.createElement(f.e,e),a.a.createElement(f.b,{activity:e.activity,onAddReaction:e.onAddReaction}),a.a.createElement(f.c,{activityId:e.activity.id}))}}))}})):null}}]),t}(a.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(p,null),document.getElementById("root"))}},[[280,1,2]]]);
//# sourceMappingURL=main.069714fb.chunk.js.map