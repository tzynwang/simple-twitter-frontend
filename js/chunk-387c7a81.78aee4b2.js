(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-387c7a81"],{"4d9f":function(e,t,a){e.exports=a.p+"img/tweet-like.fb81adc3.svg"},"4fe4":function(e,t,a){e.exports=a.p+"img/tweet-reply.3df6b89d.svg"},9348:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-center mt-20"},[a("div",{staticClass:"spinner"},[a("div"),a("div"),a("div"),a("div")])])}],n={name:"spinner"},i=n,o=a("2877"),c=Object(o["a"])(i,s,r,!1,null,null,null);t["a"]=c.exports},"943f":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.titleFromParent?s("div",{class:["nav-top",{"flex-justify-between":e.titleFromParent}]},[e._v(" "+e._s(e.titleFromParent)+" "),"/direct-message"===e.fullPath?s("img",{staticClass:"mr-15 cursor-pointer",attrs:{src:a("d0d8"),alt:""}}):e._e()]):e.userFromParent?s("div",{staticClass:"nav-top"},[s("div",{directives:[{name:"show",rawName:"v-show",value:-1!==e.userFromParent.id,expression:"userFromParent.id !== -1"}],staticClass:"title ml-15"},[s("div",{staticClass:"user-name"},[e._v(e._s(e.userFromParent.name))]),s("div",{staticClass:"tweet-counts"},[e._v(e._s(e._f("userAccount")(e.userFromParent.account)))])])]):s("div",{staticClass:"nav-top"},[e._v(e._s(e._f("title")(e.fullPath)))])},r=[],n=a("2708"),i={name:"navTop",props:["titleFromParent","userFromParent"],mixins:[n["a"]],created:function(){var e=this.$route.fullPath;this.fullPath=e},data:function(){return{fullPath:""}},filters:{title:function(e){switch(e){case"/home":return"首頁";case"/settings":return"帳戶設定";case"/admin/tweets":return"推文清單";case"/admin/users":return"使用者列表";case"/chat":return"聊天室";case"/notification":return"通知"}}}},o=i,c=a("2877"),l=Object(c["a"])(o,s,r,!1,null,null,null);t["a"]=l.exports},bb51:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("main",{staticClass:"container"},[e.windowWidth<768?[a("navTop"),a("section",{ref:"tweetContainer",staticClass:"container-body"},[e.fetchAllTweetsDone?e._l(e.tweets,(function(e){return a("tweet",{key:e.id,attrs:{tweet:e}})})):a("spinner")],2),a("navBottom"),a("addNewTweetModal",{directives:[{name:"show",rawName:"v-show",value:e.openAddNewTweetModal,expression:"openAddNewTweetModal"}],on:{"after-add-tweet":e.afterAddTweet}}),a("replyTweetModal",{directives:[{name:"show",rawName:"v-show",value:e.openReplyModal,expression:"openReplyModal"}]})]:e.windowWidth>=768&&e.windowWidth<1200?[a("navLeft"),a("section",{staticClass:"container-body-tablet-desktop"},[a("navTop"),a("section",{ref:"tweetContainer",staticClass:"container-body"},[a("addNewTweet",{on:{"after-add-tweet":e.afterAddTweet}}),e.fetchAllTweetsDone?e._l(e.tweets,(function(e){return a("tweet",{key:e.id,attrs:{tweet:e}})})):a("spinner")],2)],1),a("addNewTweetModal",{directives:[{name:"show",rawName:"v-show",value:e.openAddNewTweetModal,expression:"openAddNewTweetModal"}],on:{"after-add-tweet":e.afterAddTweet}}),a("replyTweetModal",{directives:[{name:"show",rawName:"v-show",value:e.openReplyModal,expression:"openReplyModal"}]})]:[a("navLeftDesktop"),a("section",{staticClass:"container-body-tablet-desktop"},[a("navTop"),a("section",{ref:"tweetContainer",staticClass:"container-body"},[a("addNewTweet",{on:{"after-add-tweet":e.afterAddTweet}}),e.fetchAllTweetsDone?e._l(e.tweets,(function(e){return a("tweet",{key:e.id,attrs:{tweet:e}})})):a("spinner")],2)],1),a("popularList"),a("addNewTweetModal",{directives:[{name:"show",rawName:"v-show",value:e.openAddNewTweetModal,expression:"openAddNewTweetModal"}],on:{"after-add-tweet":e.afterAddTweet}}),a("replyTweetModal",{directives:[{name:"show",rawName:"v-show",value:e.openReplyModal,expression:"openReplyModal"}]})]],2)},r=[],n=a("5530"),i=(a("159b"),a("943f")),o=a("223e"),c=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"tweet-component"},[s("div",{staticClass:"tweet-component-avatar"},[s("router-link",{attrs:{to:{name:"UserAllTweets",params:{userAccount:e.tweet.User.id}}}},[s("img",{staticClass:"avatar-img mt-13 ml-15 mr-10",attrs:{src:e.tweet.User.avatar,alt:"user avatar"}})])],1),s("router-link",{staticClass:"tweet-component-content pr-15",attrs:{to:{name:"Tweet",params:{userAccount:e.tweet.User.id,tweetId:e.tweet.id}}}},[s("div",{staticClass:"header mt-10"},[s("router-link",{staticClass:"user-name mr-5",attrs:{to:{name:"UserAllTweets",params:{userAccount:e.tweet.User.id}}}},[e._v(e._s(e.tweet.User.name))]),s("span",{staticClass:"user-account"},[e._v(e._s(e._f("userAccount")(e.tweet.User.account)))]),s("span",{staticClass:"time-stamp"},[e._v(e._s(e._f("fromNow")(e.tweet.createdAt)))])],1),s("div",{staticClass:"body mt-6"},[e._v(" "+e._s(e.tweet.description)+" ")]),s("div",{staticClass:"footer mt-13 mb-10"},[s("span",{staticClass:"icon-text-wrapper reply mr-50",on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.replyTweet(e.tweet.id)}}},[s("img",{staticClass:"mr-10",attrs:{src:a("4fe4"),alt:"tweet reply icon"}}),s("span",[e._v(e._s(e.tweet.totalReply))])]),e.tweet.isLiked?s("span",{staticClass:"icon-text-wrapper liked",on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.likeTweet({action:-1,tweetId:e.tweet.id})}}},[s("img",{staticClass:"mr-10",attrs:{src:a("fbcf"),alt:"tweet liked icon"}}),s("span",[e._v(e._s(e.tweet.totalLike))])]):s("span",{staticClass:"icon-text-wrapper like",on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.likeTweet({action:1,tweetId:e.tweet.id})}}},[s("img",{staticClass:"mr-10",attrs:{src:a("4d9f"),alt:"tweet like icon"}}),s("span",[e._v(e._s(e.tweet.totalLike))])])])])],1)},l=[],d=a("1da1"),w=(a("96cf"),a("2f62")),u=a("2708"),p=a("17db"),f=a("1602"),m={name:"tweet",mixins:[u["a"],u["h"]],props:{tweet:{type:Object}},data:function(){return{isProcessing:!1}},methods:Object(n["a"])(Object(n["a"])({},Object(w["b"])(["addLikeToTweet","removeLikeFromTweet"])),{},{replyTweet:function(e){this.$store.commit("toggleReplyModal"),this.$store.commit("setReplyToTweetId",e)},likeTweet:function(e){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function a(){var s,r,n,i,o,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(s=e.action,r=e.tweetId,!t.isProcessing){a.next=3;break}return a.abrupt("return");case 3:a.t0=s,a.next=1===a.t0?6:-1===a.t0?25:43;break;case 6:return a.prev=6,t.isProcessing=!0,a.next=10,f["a"].addLikeToTweet(r);case 10:if(n=a.sent,i=n.data,"200"===i.status){a.next=14;break}throw new Error(i.message);case 14:t.addLikeToTweet(r),t.$emit("after-like-tweet",r),t.isProcessing=!1,a.next=24;break;case 19:a.prev=19,a.t1=a["catch"](6),console.error(a.t1),p["a"].fire({title:"無法對該推文按讚"}),t.isProcessing=!1;case 24:return a.abrupt("break",43);case 25:return a.prev=25,t.isProcessing=!0,a.next=29,f["a"].removeLikeFromTweet(r);case 29:if(o=a.sent,c=o.data,"200"===c.status){a.next=33;break}throw new Error(c.message);case 33:t.removeLikeFromTweet(r),t.$emit("after-dislike-tweet",r),t.isProcessing=!1,a.next=43;break;case 38:a.prev=38,a.t2=a["catch"](25),console.error(a.t2),p["a"].fire({title:"無法對該推文收回讚"}),t.isProcessing=!1;case 43:case"end":return a.stop()}}),a,null,[[6,19],[25,38]])})))()}}),watch:{tweet:function(e){this.tweet=e}}},v=m,h=a("2877"),T=Object(h["a"])(v,c,l,!1,null,null,null),b=T.exports,g=a("34f4"),k=a("8d4c"),_=a("9348"),C=a("74ef"),y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"add-new-tweet"},[a("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.newTweet,expression:"newTweet",modifiers:{trim:!0}}],ref:"replySection",attrs:{placeholder:"有什麼新鮮事？"},domProps:{value:e.newTweet},on:{blur:[e.cancel,function(t){return e.$forceUpdate()}],input:function(t){t.target.composing||(e.newTweet=t.target.value.trim())}}}),a("img",{staticClass:"avatar-img",attrs:{src:e.getUser.avatar,alt:"avatar"}}),a("span",{directives:[{name:"show",rawName:"v-show",value:e.displayErrorMessage,expression:"displayErrorMessage"}],staticClass:"error-message"},[e._v(e._s(e.errorMessage))]),a("button",{staticClass:"btn btn-primary btn-new-tweet",attrs:{disabled:e.isLengthError||e.isProcessing},on:{click:e.addNewTweet,blur:e.cancel}},[e._v(" "+e._s(e.isProcessing?"請稍候":"推文")+" ")])])},x=[],P={name:"addNewTweet",mixins:[u["b"]],data:function(){return{newTweet:"",isLengthError:!0,errorMessage:"",displayErrorMessage:!1,isProcessing:!1}}},A=P,M=Object(h["a"])(A,y,x,!1,null,null,null),N=M.exports,L=a("a461"),E=a("b2f5"),j={name:"Home",mixins:[u["d"]],components:{navTop:i["a"],navBottom:o["a"],tweet:b,addNewTweetModal:g["a"],replyTweetModal:k["a"],navLeft:C["a"],addNewTweet:N,navLeftDesktop:L["a"],popularList:E["a"],spinner:_["a"]},data:function(){return{fetchAllTweetsDone:!1,tweets:[],start:0,end:10,tweetPerPage:10}},computed:Object(n["a"])(Object(n["a"])({},Object(w["d"])(["windowWidth","openAddNewTweetModal","openReplyModal"])),Object(w["c"])(["getUser","getTweets"])),created:function(){this.fetchAllTweets(),this.fetchAllFollowing(),this.fetchPopularUsers()},mounted:function(){this.$refs.tweetContainer.addEventListener("scroll",this.scrollBottomShowTweet)},beforeDestroy:function(){this.$refs.tweetContainer.removeEventListener("scroll",this.scrollBottomShowTweet)},methods:{afterAddTweet:function(e){this.tweets.unshift(e)},afterLikeTweet:function(e){this.tweets.forEach((function(t){t.id===e&&(t.isLiked=!0,t.totalLike+=1)}))},afterDislikeTweet:function(e){this.tweets.forEach((function(t){t.id===e&&(t.isLiked=!1,t.totalLike-=1)}))},afterReplyTweet:function(e){this.tweets.forEach((function(t){t.id===e&&(t.totalReply+=1)}))}},watch:{fetchAllTweetsDone:function(e){e&&this.sliceTweet(this.getTweets)}}},F=j,O=Object(h["a"])(F,s,r,!1,null,null,null);t["default"]=O.exports},d0d8:function(e,t,a){e.exports=a.p+"img/chat-dm-selector.47677e03.svg"},fbcf:function(e,t,a){e.exports=a.p+"img/tweet-liked-fill.cb226af3.svg"}}]);
//# sourceMappingURL=chunk-387c7a81.78aee4b2.js.map