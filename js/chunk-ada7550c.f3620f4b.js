(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ada7550c"],{"369c":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"container-body-tablet-desktop"},[s("navTopArrowTweetsCount",{attrs:{"user-name":t.getUserByIdVuex.name,"tweet-counts":t.getUserByIdVuex.totalTweets}}),s("section",{staticClass:"container-body"},[s("userTab"),t.fetchAllFollowersDone?t.getFollowersByUserIdVuex.length?t._l(t.getFollowersByUserIdVuex,(function(t){return s("user",{key:t.followerId,attrs:{"initial-user":t}})})):s("div",{staticClass:"text-center mt-20"},[t._v(" 該使用者目前沒有跟隨者內容 ")]):s("spinner")],2)],1)},n=[],a=s("5530"),i=s("61cb"),o=s("fdb7"),l=s("885a"),c=s("9348"),u=s("2f62"),d=s("2708"),v={name:"UserFollowers",mixins:[d["e"]],components:{navTopArrowTweetsCount:i["a"],userTab:o["a"],user:l["a"],spinner:c["a"]},data:function(){return{fetchAllFollowersDone:!1}},computed:Object(a["a"])(Object(a["a"])({},Object(u["d"])(["windowWidth"])),Object(u["c"])(["getUserByIdVuex","getFollowersByUserIdVuex"])),created:function(){this.getUserById(this.$route.params.userAccount),this.getAllFollowersByUserId(this.$route.params.userAccount)},beforeRouteUpdate:function(t,e,s){this.getUserById(t.params.userAccount),this.getAllFollowersByUserId(t.params.userAccount),s()}},m=v,w=s("2877"),f=Object(w["a"])(m,r,n,!1,null,null,null);e["default"]=f.exports},"61cb":function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"nav-top"},[r("button",{staticClass:"btn btn-arrow",on:{click:t.backToHome}},[r("img",{attrs:{src:s("a994"),alt:"back to previous page button"}})]),r("div",{staticClass:"title"},[r("div",{staticClass:"user-name"},[t._v(t._s(t.userName))]),r("div",{staticClass:"tweet-counts"},[t._v(t._s(t.tweetCounts)+" 推文")])])])},n=[],a=s("2708"),i={name:"navTopArrowTweetsCount",mixins:[a["g"]],props:["userName","tweetCounts"]},o=i,l=s("2877"),c=Object(l["a"])(o,r,n,!1,null,null,null);e["a"]=c.exports},"885a":function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"user"},[s("router-link",{staticClass:"user-avatar mt-15 ml-15 mr-15",attrs:{to:{name:"UserAllTweets",params:{userAccount:t.user.id}}}},[s("img",{staticClass:"avatar-img",attrs:{src:t.user.avatar,alt:"avatar"}})]),s("div",{staticClass:"user-content"},[s("div",{staticClass:"header mt-4 mr-10"},[s("div",{staticClass:"titles-container"},[s("router-link",{staticClass:"user-name",attrs:{to:{name:"UserAllTweets",params:{userAccount:t.user.id}}}},[t._v(t._s(t.user.name))]),s("div",{staticClass:"user-account"},[t._v(t._s(t._f("userAccount")(t.user.account)))])],1),s("div",{directives:[{name:"show",rawName:"v-show",value:t.user.id!==t.getUser.id,expression:"user.id !== getUser.id"}],staticClass:"buttons-container"},[t.isFollowing?s("button",{staticClass:"btn btn-primary btn-follow-25",on:{click:function(e){return t.follow({user:t.user,action:-1})}}},[t._v(" 正在跟隨 ")]):s("button",{staticClass:"btn btn-primary-outline btn-follow-25",on:{click:function(e){return t.follow({user:t.user,action:1})}}},[t._v(" 跟隨 ")])])]),s("div",{staticClass:"description mr-15"},[t._v(t._s(t.user.introduction))])])],1)},n=[],a=s("5530"),i=(s("4de4"),s("2708")),o=s("2f62"),l={name:"user",mixins:[i["a"],i["f"],i["d"]],props:["initialUser"],data:function(){return{user:Object(a["a"])(Object(a["a"])({},this.initialUser),{},{id:this.initialUser.followingId||this.initialUser.followerId})}},computed:Object(a["a"])(Object(a["a"])({},Object(o["c"])(["getUser","getFollowing"])),{},{isFollowing:function(){var t=this,e=this.getFollowing.filter((function(e){return e.followingId===t.user.id}));return!!e.length&&e[0].isFollowings}}),created:function(){this.fetchAllFollowing()}},c=l,u=s("2877"),d=Object(u["a"])(c,r,n,!1,null,null,null);e["a"]=d.exports},9348:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"text-center mt-20"},[s("div",{staticClass:"spinner"},[s("div"),s("div"),s("div"),s("div")])])}],a={name:"spinner"},i=a,o=s("2877"),l=Object(o["a"])(i,r,n,!1,null,null,null);e["a"]=l.exports},a994:function(t,e,s){t.exports=s.p+"img/navTopArrow-back.37429225.svg"},fdb7:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"user-tab"},[s("li",[s("router-link",{attrs:{to:{name:"UserFollowers"}}},[t._v("跟隨者")])],1),s("li",[s("router-link",{attrs:{to:{name:"UserFollowing"}}},[t._v("正在跟隨")])],1)])},n=[],a={name:"userTab"},i=a,o=s("2877"),l=Object(o["a"])(i,r,n,!1,null,null,null);e["a"]=l.exports}}]);
//# sourceMappingURL=chunk-ada7550c.f3620f4b.js.map