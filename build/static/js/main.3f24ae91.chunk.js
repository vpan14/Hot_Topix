(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{141:function(e,t,n){},268:function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),a=n(34),c=n.n(a),r=(n(141),n(139)),l=n(269),s=n(270),u=n(271),p=n(283),m=n(272),f=n(75),h=n(284),v=n(16);n(525),n(526);function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var b=n(268),y=window.location.href,E=y.split("/");y=E[0]+"/"+E[1]+"/"+E[2]+"/getToken",console.log(y);var k=function(e){var t=e.value,n=e.onClick;return o.a.createElement("li",{class:"item",align:"center",onClick:n},t)},w=function(e){var t=e.items,n=e.onItemClick;return o.a.createElement("ul",{align:"center"},t.map((function(e,t){return o.a.createElement(k,{key:t,value:e,onClick:n(e)})})))},S=function(e){var t=e.value;return o.a.createElement("li",{class:"final_item"},t)},O=function(e){var t=e.items;return o.a.createElement("ul",null,t.map((function(e,t){return o.a.createElement(S,{key:t,value:e})})))},j=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(p.a)(this,Object(m.a)(t).call(this,e))).triggerShowTopicSelector=function(){n.setState(g({},n.state,{showSelector:!0,showFinalTopicsList:!1}))},n.triggerHideTopicSelector=function(){n.setState(g({},n.state,{showSelector:!1}))},n.setFinalTopicList=function(){n.state.topics.length>0?n.setState(g({},n.state,{showFinalTopicsList:!0,showSelector:!1})):n.setState(g({},n.state,{showSelector:!1}))},n.onClick=function(){var e=n.state,t=e.inputValue,i=e.topics;if(t){var o=[].concat(Object(r.a)(i),[t]);n.setState({topics:o,inputValue:""})}},n.onItemClick=function(e){return function(){n.removeTopic(e)}},n.onChange=function(e){return n.setState({inputValue:e.target.value})},n.state={inputValue:"",topics:[],showSelector:!1,postTopics:[],showFinalTopicsList:!1,apiResponse:"",loaded:!1},n.removeTopic=n.removeTopic.bind(Object(f.a)(n)),n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"getToken",value:function(){var e=this;console.log("called getToken"),fetch(y).then((function(e){return e.text()})).then((function(t){e.setState({apiResponse:t,loaded:!0})})).catch((function(e){console.log(e)}))}},{key:"componentWillMount",value:function(){this.getToken()}},{key:"signout",value:function(){b.router.get("/logout",(function(e,t){e.logout(),t.redirect("/")}))}},{key:"removeTopic",value:function(e){var t=Object(r.a)(this.state.topics),n=t.indexOf(e);-1!==n&&(t.splice(n,1),this.setState({topics:t,inputValue:""}))}},{key:"render",value:function(){if(!this.state.loaded)return null;var e=this.state,t=e.topics,n=e.inputValue;return o.a.createElement("div",null,o.a.createElement("br",null),o.a.createElement(v.i,{apiKey:"sjc92jugd7js",appId:"62811",token:this.state.apiResponse},o.a.createElement(v.j,{avatar:"test_profile_pic.png",AfterUsername:o.a.createElement("div",null,o.a.createElement("form",{action:"/logout"},o.a.createElement(v.b,{type:"submit",buttonStyle:"info"},"Sign Out"))),username:"Dan the Fireman",subtitle:"extinguising fires since 1999",timestamp:"2018-09-19T07:44:11+00:00",onClickUser:function(){return console.log("clicked the user")}}),o.a.createElement(v.h,{feedGroup:"Timeline",FooterItem:o.a.createElement("div",{align:"right"},!this.state.showSelector&&o.a.createElement(v.b,{buttonStyle:"primary",onClick:this.triggerShowTopicSelector},"Add Topics"),this.state.showSelector&&o.a.createElement("div",{class:"comp_div"},o.a.createElement("div",{class:"inner_div"},o.a.createElement("input",{class:"inner_div",type:"text",value:n,onChange:this.onChange}),o.a.createElement(v.b,{buttonStyle:"primary",onClick:this.onClick},"Add"),o.a.createElement(v.b,{buttonStyle:"info",onClick:this.triggerHideTopicSelector},"Cancel"),o.a.createElement(v.b,{buttonStyle:"primary",onClick:this.setFinalTopicList},"Done")),o.a.createElement("div",{class:"list_div"},o.a.createElement(w,{items:t,onItemClick:this.onItemClick}))),this.state.showFinalTopicsList&&o.a.createElement("div",{class:"final_comp_div",align:"center"},o.a.createElement("div",{class:"list_div",align:"center"},o.a.createElement(O,{items:t}))))}),o.a.createElement(v.e,{feedGroup:"Timeline",options:{reactions:{recent:!0}},notify:!0,Activity:function(e){return o.a.createElement(v.a,Object.assign({},e,{Footer:function(){return o.a.createElement("div",{style:{padding:"8px 16px"}},o.a.createElement(v.f,e),o.a.createElement(v.g,e),o.a.createElement(v.c,{activity:e.activity,onAddReaction:e.onAddReaction}),o.a.createElement(v.d,{activityId:e.activity.id}))}}))}})))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},285:function(e,t,n){e.exports=n(268)},299:function(e,t){},301:function(e,t){},304:function(e,t){},305:function(e,t){},351:function(e,t){},352:function(e,t){},526:function(e,t,n){}},[[285,1,2]]]);
//# sourceMappingURL=main.3f24ae91.chunk.js.map