(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48fbe2a8"],{"0fd7":function(t,e,a){t.exports=a.p+"img/nav-tweet.29c24664.svg"},"1d39":function(t,e,a){t.exports=a.p+"img/nav-chat.055e5ea5.svg"},"223e":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{staticClass:"nav-bottom"},[s("ul",[s("li",[s("router-link",{attrs:{to:{name:"Home"}}},[s("img",{attrs:{src:a("caf5"),alt:"home icon"}})])],1),s("li",[s("router-link",{attrs:{to:{name:"Notification"}}},[s("img",{attrs:{src:a("ba15"),alt:"notification"}})])],1),s("li",[s("router-link",{attrs:{to:{name:"Chat"}}},[s("img",{attrs:{src:a("5def"),alt:"chat"}})])],1),s("li",[s("router-link",{attrs:{to:{name:"DirectMessage"}}},[s("img",{attrs:{src:a("1d39"),alt:"direct message"}})])],1),s("li",[s("router-link",{attrs:{to:{name:"UserAllTweets",params:{userAccount:t.getUser.id}}}},[s("img",{attrs:{src:a("3a00"),alt:"user page icon"}})])],1),s("li",[s("router-link",{attrs:{to:{name:"Settings"}}},[s("img",{attrs:{src:a("3791"),alt:"settings icon"}})])],1),s("li",[s("button",{staticClass:"btn",on:{click:t.logout}},[s("img",{attrs:{src:a("339c"),alt:"logout icon"}})])])]),t.inChat?t._e():s("button",{staticClass:"btn btn-primary btn-round",on:{click:t.openAddNewTweetModal}},[s("img",{attrs:{src:a("0fd7"),alt:"new tweet icon"}})])])},r=[],i=a("5530"),n=a("2f62"),o=a("2708"),c={name:"navBottom",mixins:[o["g"]],props:["inChat"],computed:Object(i["a"])({},Object(n["c"])(["getUser"]))},l=c,u=a("2877"),d=Object(u["a"])(l,s,r,!1,null,null,null);e["a"]=d.exports},"339c":function(t,e,a){t.exports=a.p+"img/nav-logout.48858e52.svg"},"34f4":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade"}},[s("div",{staticClass:"modal-background"},[s("div",{staticClass:"modal"},[s("div",{staticClass:"modal-header"},[s("img",{staticClass:"ml-15",attrs:{src:a("64c2"),alt:"close modal"},on:{click:t.closeModal}})]),s("div",{staticClass:"modal-input-section"},[s("section",{staticClass:"add-new-tweet"},[s("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.newTweet,expression:"newTweet",modifiers:{trim:!0}}],ref:"replySection",attrs:{placeholder:"有什麼新鮮事？"},domProps:{value:t.newTweet},on:{blur:[t.cancel,function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.newTweet=e.target.value.trim())}}}),s("img",{staticClass:"avatar-img",attrs:{src:t.getUser.avatar,alt:"avatar"}}),s("span",{directives:[{name:"show",rawName:"v-show",value:t.displayErrorMessage,expression:"displayErrorMessage"}],staticClass:"error-message"},[t._v(t._s(t.errorMessage))]),s("button",{staticClass:"btn btn-primary btn-new-tweet",attrs:{disabled:t.isLengthError||t.isProcessing},on:{click:function(e){return t.addNewTweet("modal")},blur:t.cancel}},[t._v(" "+t._s(t.isProcessing?"請稍候":"推文")+" ")])])])])])])},r=[],i=a("5530"),n=a("2f62"),o=a("2708"),c={name:"addNewTweetModal",mixins:[o["b"]],data:function(){return{newTweet:"",isLengthError:!0,errorMessage:"",displayErrorMessage:!1,isProcessing:!1}},computed:Object(i["a"])({},Object(n["d"])(["openAddNewTweetModal"])),watch:{openAddNewTweetModal:function(){this.$refs.replySection.focus()}}},l=c,u=a("2877"),d=Object(u["a"])(l,s,r,!1,null,null,null);e["a"]=d.exports},3791:function(t,e,a){t.exports=a.p+"img/nav-setting.99ff325c.svg"},"3a00":function(t,e,a){t.exports=a.p+"img/nav-user.2d60ef28.svg"},"5def":function(t,e,a){t.exports=a.p+"img/nav-group-chat.41a12822.svg"},"64c2":function(t,e,a){t.exports=a.p+"img/modal-close.0ae8d82d.svg"},"74ef":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{staticClass:"nav-left"},[s("ul",[s("li",[s("img",{attrs:{src:a("e347"),alt:"logo"},on:{click:t.toHome}})]),s("li",[s("router-link",{attrs:{to:{name:"Home"}}},[s("img",{attrs:{src:a("caf5"),alt:"home"}})])],1),s("li",[s("router-link",{attrs:{to:{name:"Notification"}}},[s("img",{attrs:{src:a("ba15"),alt:"notification"}})])],1),s("li",[s("router-link",{attrs:{to:{name:"Chat"}}},[s("img",{attrs:{src:a("5def"),alt:"chat"}})])],1),s("li",[s("router-link",{attrs:{to:{name:"DirectMessage"}}},[s("img",{attrs:{src:a("1d39"),alt:"direct message"}})])],1),s("li",[s("router-link",{attrs:{to:{name:"UserAllTweets",params:{userAccount:t.getUser.id}}}},[s("img",{attrs:{src:a("3a00"),alt:"user"}})])],1),s("li",[s("router-link",{attrs:{to:{name:"Settings"}}},[s("img",{attrs:{src:a("3791"),alt:"settings"}})])],1),s("li",[s("button",{staticClass:"btn btn-primary btn-round",on:{click:t.openAddNewTweetModal}},[s("img",{attrs:{src:a("0fd7"),alt:"new tweet icon"}})])])]),s("button",{staticClass:"btn btn-left-nav-logout",on:{click:t.logout}},[s("img",{attrs:{src:a("339c"),alt:"logout"}})])])},r=[],i=a("5530"),n=a("2f62"),o=a("2708"),c={name:"navLeft",mixins:[o["g"]],computed:Object(i["a"])({},Object(n["c"])(["getUser"]))},l=c,u=a("2877"),d=Object(u["a"])(l,s,r,!1,null,null,null);e["a"]=d.exports},"8d4c":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade"}},[s("div",{staticClass:"modal-background"},[s("div",{staticClass:"modal"},[s("div",{staticClass:"modal-header"},[s("img",{staticClass:"ml-15",attrs:{src:a("64c2"),alt:"close modal"},on:{click:t.closeModal}})]),s("div",{staticClass:"modal-body tweet-component"},[s("div",{staticClass:"tweet-component-avatar modal-reply-avatar-tail"},[s("img",{staticClass:"avatar-img mt-15 ml-15 mr-10",attrs:{src:t.repliedTweet.User.avatar,alt:"user avatar"}})]),s("div",{staticClass:"tweet-component-content"},[s("div",{staticClass:"header mt-15"},[s("span",{staticClass:"user-name mr-5"},[t._v(t._s(t.repliedTweet.User.name))]),s("span",{staticClass:"user-account"},[t._v(t._s(t._f("userAccount")(t.repliedTweet.User.account)))]),s("span",{staticClass:"time-stamp"},[t._v(t._s(t._f("fromNow")(t.repliedTweet.createdAt)))])]),s("div",{staticClass:"body mt-6 mb-16"},[t._v(" "+t._s(t.repliedTweet.description)+" ")]),s("div",{staticClass:"modal-reply-footer mb-20"},[t._v(" 回覆給 "),s("span",{staticClass:"text-primary cursor-pointer",on:{click:t.closeModalandPush}},[t._v(t._s(t._f("userAccount")(t.repliedTweet.User.account)))])])])]),s("div",{staticClass:"modal-input-section"},[s("section",{staticClass:"add-new-tweet"},[s("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.newTweet,expression:"newTweet",modifiers:{trim:!0}}],ref:"replySection",attrs:{placeholder:"推你的回覆"},domProps:{value:t.newTweet},on:{blur:[t.cancel,function(e){return t.$forceUpdate()}],input:function(e){e.target.composing||(t.newTweet=e.target.value.trim())}}}),s("img",{staticClass:"avatar-img",attrs:{src:t.getUser.avatar,alt:"avatar"}}),s("span",{directives:[{name:"show",rawName:"v-show",value:t.isLengthError,expression:"isLengthError"}],staticClass:"error-message"},[t._v(t._s(t.errorMessage))]),s("button",{staticClass:"btn btn-primary btn-new-tweet",attrs:{disabled:t.isLengthError||t.isProcessing},on:{click:function(e){return t.addNewTweet(t.repliedTweet.id)},blur:t.cancel}},[t._v(" "+t._s(t.isProcessing?"請稍候":"回覆")+" ")])])])])])])},r=[],i=a("1da1"),n=a("5530"),o=(a("96cf"),a("b0c0"),a("4de4"),a("a4d3"),a("e01a"),a("0dd9")),c=a.n(o),l=a("2f62"),u=a("2708"),d=a("17db"),m=a("7482"),g={name:"replyTweetModal",mixins:[u["a"],u["h"]],data:function(){return{repliedTweet:{id:-1,description:"",createdAt:"",User:{id:-1,name:"",account:"",avatar:""}},newTweet:"",errorMessage:"",isLengthError:!0,isProcessing:!1}},methods:Object(n["a"])(Object(n["a"])({},Object(l["b"])(["addReplyToTweet","addReplyToTweetByUserId","addReplyToRepliesInPage","addTotalReplyCount"])),{},{closeModal:function(){this.$store.commit("toggleReplyModal"),this.newTweet="",this.repliedTweet={id:-1,description:"",createdAt:"",User:{id:-1,name:"",account:"",avatar:""}}},closeModalandPush:function(){var t=this.repliedTweet.User.id;this.closeModal(),this.$router.push({name:"UserAllTweets",params:{userAccount:t}}).catch((function(){}))},addNewTweet:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!e.isProcessing){a.next=2;break}return a.abrupt("return");case 2:if(c()(e.newTweet,{min:1,max:140})){a.next=5;break}return e.isLengthError=!0,a.abrupt("return");case 5:return e.isProcessing=!0,a.prev=6,a.next=9,m["a"].addReplyToTweet(t,{comment:e.newTweet});case 9:if(s=a.sent,r=s.data,"200"===r.status){a.next=13;break}throw new Error(r.message);case 13:e.addReplyToTweet(t),e.addReplyToTweetByUserId(t),e.$emit("after-reply-tweet",t),e.addReplyToRepliesInPage({User:{account:e.getUserByIdVuex.account,avatar:e.getUserByIdVuex.avatar,id:e.getUserByIdVuex.id,name:e.getUserByIdVuex.name},comment:e.newTweet,updatedAt:new Date}),e.addTotalReplyCount(),e.$refs.replySection.blur(),e.closeModal(),e.isProcessing=!1,d["b"].fire({title:"回覆成功"}),a.next=28;break;case 24:a.prev=24,a.t0=a["catch"](6),d["a"].fire({title:"無法回覆推文"}),e.isProcessing=!1;case 28:case"end":return a.stop()}}),a,null,[[6,24]])})))()},cancel:function(){this.isLengthError=!1}}),computed:Object(n["a"])(Object(n["a"])({},Object(l["d"])(["openReplyModal","replyToTweetId"])),Object(l["c"])(["getTweets","getUser","getUserByIdVuex","getTweetsByUserIdVuex","getLikesByUserIdVuex","getTweetInPage"])),watch:{openReplyModal:function(){var t=this;this.$refs.replySection.focus();var e=this.getTweets.filter((function(e){return e.id===t.replyToTweetId})),a=this.getTweetsByUserIdVuex.filter((function(e){return e.id===t.replyToTweetId})),s=this.getLikesByUserIdVuex.filter((function(e){return e.TweetId===t.replyToTweetId}));e.length?this.repliedTweet=e[0]:a.length?this.repliedTweet={id:a[0].id,description:a[0].description,createdAt:a[0].createdAt,User:{id:this.getUserByIdVuex.id,name:this.getUserByIdVuex.name,account:this.getUserByIdVuex.account,avatar:this.getUserByIdVuex.avatar}}:s.length?this.repliedTweet={id:s[0].TweetId,description:s[0].description,createdAt:s[0].createdAt,User:Object(n["a"])({},s[0].User)}:this.repliedTweet={id:this.getTweetInPage.id,description:this.getTweetInPage.description,createdAt:this.getTweetInPage.updatedAt,User:{id:this.getUserByIdVuex.id,name:this.getUserByIdVuex.name,account:this.getUserByIdVuex.account,avatar:this.getUserByIdVuex.avatar}}},newTweet:function(t){0===t.length?(this.errorMessage="字數不可為 0",this.isLengthError=!0):t.length>140?(this.errorMessage="字數不可超過 140 字",this.isLengthError=!0):this.isLengthError=!1}}},p=g,w=a("2877"),f=Object(w["a"])(p,s,r,!1,null,null,null);e["a"]=f.exports},a461:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{staticClass:"nav-left"},[s("ul",[s("li",[s("img",{attrs:{src:a("e347"),alt:"logo"},on:{click:t.toHome}})]),s("li",[s("router-link",{attrs:{to:{name:"Home"}}},[s("img",{attrs:{src:a("caf5"),alt:"home"}}),s("span",[t._v("首頁")])])],1),s("li",[s("router-link",{attrs:{to:{name:"Notification"}}},[s("img",{attrs:{src:a("ba15"),alt:"notification"}}),s("span",[t._v("通知")])])],1),s("li",[s("router-link",{attrs:{to:{name:"Chat"}}},[s("img",{attrs:{src:a("5def"),alt:"chat"}}),s("span",[t._v("公開聊天室")])])],1),s("li",[s("router-link",{attrs:{to:{name:"DirectMessage"}}},[s("img",{attrs:{src:a("1d39"),alt:"direct message"}}),s("span",[t._v("私人訊息")])])],1),s("li",[s("router-link",{attrs:{to:{name:"UserAllTweets",params:{userAccount:t.getUser.id}}}},[s("img",{attrs:{src:a("3a00"),alt:"user"}}),s("span",[t._v("個人資料")])])],1),s("li",[s("router-link",{attrs:{to:{name:"Settings"}}},[s("img",{attrs:{src:a("3791"),alt:"settings"}}),s("span",[t._v("設定")])])],1),s("li",[s("button",{staticClass:"btn btn-primary btn-left-nav-new-tweet",on:{click:t.openAddNewTweetModal}},[t._v("推文")])])]),s("button",{staticClass:"btn btn-left-nav-logout",on:{click:t.logout}},[s("img",{attrs:{src:a("339c"),alt:"logout"}}),s("span",[t._v("登出")])])])},r=[],i=a("5530"),n=a("2f62"),o=a("2708"),c={name:"navLeftDesktop",mixins:[o["g"]],computed:Object(i["a"])({},Object(n["c"])(["getUser"]))},l=c,u=a("2877"),d=Object(u["a"])(l,s,r,!1,null,null,null);e["a"]=d.exports},b2f5:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"popular-list"},[a("li",{staticClass:"popular-list-title"},[t._v("Popular")]),t._l(t.getPopularUsers,(function(e){return a("li",{key:e.id,staticClass:"popular-list-user"},[a("router-link",{attrs:{to:{name:"UserAllTweets",params:{userAccount:e.id}}}},[a("img",{staticClass:"avatar-img mr-10 ml-15",attrs:{src:e.avatar,alt:"user avatar"}})]),a("div",{staticClass:"popular-list-user-info"},[a("router-link",{staticClass:"user-name",attrs:{to:{name:"UserAllTweets",params:{userAccount:e.id}}}},[t._v(t._s(e.name))]),a("div",{staticClass:"user-account"},[t._v(t._s(t._f("userAccount")(e.account)))])],1),e.id!==t.getUser.id&&e.isFollowings?a("button",{staticClass:"btn btn-primary btn-follow popular-list-user-follow",on:{click:function(a){return t.follow({user:e,action:-1})}}},[t._v(" 正在跟隨 ")]):t._e(),e.id===t.getUser.id||e.isFollowings?t._e():a("button",{staticClass:"btn btn-primary-outline btn-follow popular-list-user-follow",on:{click:function(a){return t.follow({user:e,action:1})}}},[t._v(" 跟隨 ")])],1)}))],2)},r=[],i=a("5530"),n=a("2f62"),o=a("2708"),c={name:"popularList",mixins:[o["a"],o["d"],o["f"]],created:function(){this.fetchPopularUsers()},computed:Object(i["a"])({},Object(n["c"])(["getPopularUsers","getUser"]))},l=c,u=a("2877"),d=Object(u["a"])(l,s,r,!1,null,null,null);e["a"]=d.exports},ba15:function(t,e,a){t.exports=a.p+"img/nav-notification.56bd22bd.svg"},caf5:function(t,e,a){t.exports=a.p+"img/nav-home.41da8929.svg"},e347:function(t,e,a){t.exports=a.p+"img/logo.f98e1fbd.svg"}}]);
//# sourceMappingURL=chunk-48fbe2a8.ea752998.js.map