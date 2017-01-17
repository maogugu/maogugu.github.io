define("config",["angular"],function(e){"use strict";return e.module("app.config",[]).constant("VERSION","0.1").constant("BASE_PATH","http://60.191.5.132/gfin").constant("WT_BASE_PATH","http://60.191.5.132/gmkt").constant("WZ_BASE_PATH","https://www.jkjrj.com/").constant("VIDEO_PATH","http://60.191.5.132/openOnline").constant("GCS_BASE_PATH","gcs").constant("HELP_CHANNEL_ID","228").constant("CACHE_MAX_AGE",6e4).constant("PULLING_TEXT","下拉刷新").constant("REFRESHING_TEXT","松开并刷新")}),define("filters/InterpolateFilter",["angular"],function(e){"use strict";var t=function(e){return function(t){return String(t).replace(/\%VERSION\%/gm,e)}};return t.$inject=["VERSION"],t}),define("filters/DefNumberFilter",["angular"],function(e){"use strict";var t=function(){return function(t,n,r){if(null==t||"undefined"==typeof t||""==t)return"--";if(isNaN(t))return t;var i=t;return null!=n&&(i=parseFloat(t).toFixed(n)),e.isDefined(r)?i+r:i}};return t.$inject=[],t}),define("filters/ProdMinSubscribeFilter",["angular"],function(e){"use strict";var t=function(e){return function(e,t){if(null==e||"undefined"==typeof e||""==e)return"--";if(2==t){var n=parseFloat(e);return 0==n?"0.01元":n<1?n.toFixed(2)+"元":n<1e4?n.toFixed(0)+"元":n.toFixed(0)/1e4+"万元"}var n=parseFloat(e);if(0==n)return"0.01<sub>元</sub>";if(n<1)return n.toFixed(2)+"<sub>元</sub>";if(n<1e4)return n.toFixed(0)+"<sub>元</sub>";var r="<sub>万元</sub>";return 3==t&&(r="<sub>万元起</sub>"),n.toFixed(0)/1e4+r}};return t.$inject=["$sce"],t}),define("filters/DefStringFilter",["angular"],function(e){"use strict";var t=function(){return function(t,n,r){return null==t||"undefined"==typeof t||""==t?"--":e.isDefined(n)?t+n:t}};return t.$inject=[],t}),define("filters/DefDateStringFilter",["angular"],function(e){"use strict";var t=function(){return function(e,t,n){if(null==e||""==e||"undefined"==typeof e)return"--";var r;return r=1==t||e&&8==e.length?e.substr(0,4)+"-"+e.substr(4,2)+"-"+e.substr(6,2):e.substr(0,4)+"-"+e.substr(4,2)+"-"+e.substr(6,2)+" "+e.substr(8,2)+":"+e.substr(10,2)+":"+e.substr(12,2)}};return t.$inject=[],t}),define("filters/BankAccountFilter",["angular"],function(e){"use strict";var t=function(){return function(e,t,n){return null==e||""==e||"undefined"==typeof e?"--":e.substring(e.length-3)}};return t.$inject=[],t}),define("services/DictionaryService",["angular"],function(e){"use strict";var t=function(){var e=[{text:"文教科卫专业人员",val:"01"},{text:"党政 ( 在职，离退休 ) 机关干部",val:"02"},{text:"企事业单位干部",val:"03"},{text:"行政企事业单位工人",val:"04"},{text:"农民",val:"05"},{text:"个体",val:"06"},{text:"无业",val:"07"},{text:"军人",val:"08"},{text:"学生",val:"09"},{text:"证券从业人员",val:"10"},{text:"其他",val:"99"}],t=[{text:"博士",val:"1"},{text:"硕士",val:"2"},{text:"学士",val:"3"},{text:"大专",val:"4"},{text:"中专",val:"5"},{text:"高中",val:"6"},{text:"初中及其以下",val:"7"},{text:"其他",val:"8"}],n={1:"星期一",2:"星期二",3:"星期三",4:"星期四",5:"星期五",6:"星期六",0:"星期日"},r="1000,2,3,8,15,16,17,19,20,21,22,25,26,27,28,31,32,33,35,36,37,38,39,58,59,61,63,66,67,68,81,82,",i="data:image/jpg;base64,",o="30001231";return{getProfessionAds:function(){return e},getDegreeAds:function(){return t},getWeeks:function(){return n},getBranchs:function(){return r},getBase64StrHead:function(){return i},getEndtime:function(e){return e&&"长期"!=e?e:this.getDefEndtime()},getDefEndtime:function(){return o}}};return t.$inject=[],t}),define("services/LocalCacheService",["angular","store"],function(e,t){"use strict";var n=function(e,n,r){return r("UserCache",{deleteOnExpire:"aggressive",maxAge:36e5,storageMode:"sessionStorage",storagePrefix:"tfzq."}),{setAppContextName:function(e){e&&t.set("appContextName",e)},getAppContextName:function(){var e=t.get("appContextName");return e&&""!=e&&"undefined"!=e?e:""},setRecommendInfos:function(e){e&&(e.length>5&&(e=e.substr(0,5)),t.set("recommendInfos",e))},getRecommendInfos:function(){var e=t.get("recommendInfos");return e&&""!=e&&"undefined"!=e?e:""},setUser:function(e){var t=r.get("UserCache"),n=t.get("user");null!=n&&(e.token=n.token),t.put("user",e)},getUser:function(){var e=r.get("UserCache");return e.get("user")},removeUser:function(){var e=r.get("UserCache");e.remove("user")},setOpenUser:function(e){t.set("openUser",e)},getOpenUser:function(){return t.get("openUser")},removeOpenUser:function(){t.remove("openUser")},setAccount:function(e){t.set("account",e)},getAccount:function(){return t.get("account")},removeAccount:function(){t.remove("account")},getAccountList:function(){var e=t.get("accountList");return e&&""!=e&&"undefined"!=e?e:""},setAccountList:function(e){t.set("accountList",e)},getRememberAccount:function(){return t.get("rememberAccount")},setRememberAccount:function(e){return t.set("rememberAccount",e)},set:function(e,n){t.set(e,n)},get:function(e){return t.get(e)},remove:function(e){t.remove(e)}}};return n.$inject=["$location","$http","CacheFactory"],n}),define("services/CommonService",["angular"],function(e){"use strict";var t=function(t,n,r,i,o,c,a,s,u,l,f){function d(t){var o=(t.basePath||i.basePath)+t.url,s={method:t.type||"post",url:o,timeout:35e3};if("post"==s.method)s.data=t.data||{};else{var u=r(t.data||{});if(s.url+=u?"?"+u:"",s.offline=!0,t.cache){s.cache=l.get("xcmCache");var f=s.cache.get(s.url);f&&(f[1]&&"0"!=e.fromJson(f[1]).error_no?s.cache.remove(s.url):e.isFunction(f.then)&&f.then(function(t){t&&t.data&&"0"!=e.fromJson(t.data).error_no&&s.cache.remove(s.url)}))}}var d=c.defer();return n(s).success(function(e,n,r,i){e&&"0"==e.error_no?d.resolve(e.data):(t.isReject||g(null,e,t.styleType),d.reject(e),a.hide())}).error(function(e,n,r,i){4==XMLHttpRequest.readyState&&("200"==XMLHttpRequest.status||"OK"==textStatus?t.isReject||v(null,XMLHttpRequest.responseText):b({message:"调用数据失败,请稍后再试."})),d.reject(XMLHttpRequest.responseText),a.hide()}),d.promise}function g(e,t,n){e?e(t):n&&1==n?m({message:h(t)}):b({message:h(t)})}function v(e,t){e?e(t):b({message:t})}function p(e){var t=e.message,n=e.fixed||!0,r=t.width(),i=t.height();if(n){var o=e.width||300,c=e.height||150;r=r<o?o:r,i=i<c?c:i}var a=$(window).width(),s=(a-r)/2,u=$(window).height(),l=(u-i)/2;l=l<30?30:l;var f=Math.floor(l/u*100);return f=f<20?20:f,{left:s+"px",width:r+"px",height:i+"px",top:f+"%"}}function m(e){TF.Bubble.show(e.message),e.onUnblock&&e.onUnblock()}function b(e){return s.show({cssClass:"kDialog",template:e.message,title:e.title?e.title:"提示",buttons:[{text:e.okText?e.okText:"确定"}]})}function h(e){return e.error_info?e.error_info:"string"==typeof data?data:"object"==typeof data?data.errorMessage:"未知错误"}return l("xcmCache",{deleteOnExpire:"none",maxAge:f,storageMode:"localStorage",storagePrefix:"tfzq."}),{productPageUrl:function(e,t){var n=null;return"0,3".indexOf(e)>-1?n="tab/product-item":"1"==e?n="tab/product-item-QDII":"2"==e&&(n="tab/product-item","1"==t&&(n="tab/product-item-otc")),n},getOtcSellStatus:function(e,t){var n;return n="0,3,4".indexOf(e)>-1?"1"==t?1:"2,3".indexOf(t)>-1?3:2:"2"==e?4:"2,3".indexOf(t)>-1?3:5},ajax:function(e){return d(e)},getUrlParams:function(){return t.search()},position:function(){ionic.Platform.isIOS()&&($("header").css("position","absolute"),$(".service-tel").css("position","absolute"))},jsGetAge:function(e){var t,n=e.substr(0,4),r=e.substr(4,2),i=e.substr(6,8),o=new Date,c=o.getFullYear(),a=o.getMonth()+1,s=o.getDate();if(c==n)t=0;else{var u=c-n;if(u>0)if(a==r){var l=s-i;t=l<0?u-1:u}else{var f=a-r;t=f<0?u-1:u}else t=-1}return t},checkIdCard:function(e){var t;if(e=e.toUpperCase(),!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(e))return!1;var n,r;if(n=e.length,15==n){r=new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);var i,o=e.match(r),c=new Date("19"+o[2]+"/"+o[3]+"/"+o[4]);if(i=c.getYear()==Number(o[2])&&c.getMonth()+1==Number(o[3])&&c.getDate()==Number(o[4])){t="19"+o[2]+o[3]+o[4];var a,s=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2),u=new Array("1","0","X","9","8","7","6","5","4","3","2"),l=0;for(e=e.substr(0,6)+"19"+e.substr(6,e.length-6),a=0;a<17;a++)l+=e.substr(a,1)*s[a];return e+=u[l%11],t}return!1}if(18==n){r=new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);var i,o=e.match(r),c=new Date(o[2]+"/"+o[3]+"/"+o[4]);if(i=c.getFullYear()==Number(o[2])&&c.getMonth()+1==Number(o[3])&&c.getDate()==Number(o[4])){t=o[2]+o[3]+o[4];var f,a,s=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2),u=new Array("1","0","X","9","8","7","6","5","4","3","2"),l=0;for(a=0;a<17;a++)l+=e.substr(a,1)*s[a];return f=u[l%11],f==e.substr(17,1)&&t}return!1}return!1},isStrEmpty:function(e){return null==e||"undefined"==typeof e||""==$.trim(e)},controlNum:function(e,t){return null==e||"undefined"==typeof e||""==e||isNaN(e)?"--":parseFloat(parseFloat(e).toFixed(t))},getSource:function(){var e;return e=ionic.Platform.isAndroid()?"ANDROID":ionic.Platform.isIOS()?"IOS":this.isWeixin()?"WEIXIN":"OTHER"},showAlert:function(e){var t=e.message,n=$.extend({},e,{message:t});if("object"===$.type(t)){var r=p(e);$.extend(n,{css:r})}m(n)},showNotice:function(e,t){var n=e.split("&&");t&&localStorage[t]&&1==localStorage[t]||s.show({cssClass:"kDialog",template:n[1],title:n[0],buttons:[{text:"关闭"}]}).then(function(){t&&(localStorage[t]=1)})},showConfig:function(e){return b(e)},isBuyExperience:function(){var e=u.get("lcty_state");return!(!e||!e.stateName)},isWeixin:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)},getErrorInfo:function(e){return h(e)},stringToDate:function(e){var t=new Date;return t.setFullYear(parseInt(e.substr(0,4)),parseInt(e.substr(4,2))-1,parseInt(e.substr(6,2))),t},formatDate:function(e){return null==e||""==e||"undefined"==typeof e?"--":e=e.substr(0,4)+"-"+e.substr(4,2)+"-"+e.substr(6,2)},formatDate2:function(e){if(null==e||""==e||"undefined"==typeof e)return"--";var t=e.substr(4,2)<"10"?e.substr(5,1):e.substr(4,2),n=e.substr(6,2)<"10"?e.substr(7,1):e.substr(6,2);return t+"月"+n+"日"},formatTime:function(e){if(null==e||""==e||"undefined"==typeof e)return"--";var t=e.substr(0,4)+"-"+e.substr(4,2)+"-"+e.substr(6,2),n=e.substr(8,2)+":"+e.substr(10,2)+":"+e.substr(12,2);return t+" "+n},checkRegex:function(e,t){var n=new RegExp(e);return!!n.test($.trim(t))},trim:function(t){var n=new RegExp(" ","g");return t?e.isString(t)?t.replace(n,""):t.toString().replace(n,""):null},getPrevDate:function(){var e=new Date;return e.setDate(e.getDate()-1),e.getMonth()+1+"月"+e.getDate()+"日"}}};return t.$inject=["$location","$http","$httpParamSerializerJQLike","$rootScope","$state","$q","$ionicLoading","$ionicPopup","LocalCacheService","CacheFactory","CACHE_MAX_AGE"],t}),define("services/InfoService",["angular","require","base"],function(e,t,n){"use strict";var r=function(e,t,n,r,i){function o(e,t){var n={};return n.url=e,n.type="get",n.cache=!0,t&&(n.data=t),r.ajax(n)}return{getChannelInfos:function(e){return o("/funds/"+e+"/channels")}}};return r.$inject=["$rootScope","$http","$ionicLoading","CommonService","LocalCacheService"],r}),define("services/ConcernService",["angular"],function(e){"use strict";var t=function(e,t){return{isConcern:function(t){var n=e.get("userCare");if(n)for(var r=0;r<n.length;r++)if(n[r]==t)return!0;return!1},concern:function(t){var n=e.get("userCare");if(!n||n.length<=0)return n=new Array,n.push(t),e.set("userCare",n),!0;var r=n.indexOf(t);return r>-1?(n.splice(r,1),e.set("userCare",n),!1):(n.push(t),e.set("userCare",n),!0)},getConcernList:function(){var t="",n=e.get("userCare");return n&&n.length>0&&(t=n.join(",")),t}}};return t.$inject=["LocalCacheService","CommonService"],t}),define("services/WebService",["angular","store"],function(e,t){"use strict";var n=function(e,t,n,r,i,o,c,a){return{getCaptcha:function(){var e={};return e.url="/boss/get_captcha",e.type="get",c.ajax(e)},login:function(e){var t={};return e.op_station=a.get("op_station"),t.url="/trade/user/login",t.styleType=1,t.data=e,t.isLogin=!0,c.ajax(t)},loginWithoutCaptcha:function(e){var t={};return e.op_station=a.get("op_station"),t.url="/trade/user/login",t.styleType=1,t.data=e,t.isLogin=!0,c.ajax(t)},getUserInfo:function(){var e={};return e.url="/trade/user/get_user",e.isReject=!0,e.type="get",c.ajax(e)},syncUserCare:function(e){var t={};return t.data=e,t.url="/trade/user/sync_user_care",c.ajax(t)}}};return n.$inject=["$location","$http","$q","$sce","WT_BASE_PATH","WZ_BASE_PATH","CommonService","LocalCacheService"],n}),define("services/services",["require","exports","module","angular","config","base","jqueryCookie","services/DictionaryService","services/LocalCacheService","services/CommonService","services/InfoService","services/ConcernService","services/WebService"],function(e){"use strict";var t=e("angular"),n=(e("config"),e("base"),e("jqueryCookie"),t.module("app.services",["app.config"]));return n.factory("DictionaryService",e("services/DictionaryService")),n.factory("LocalCacheService",e("services/LocalCacheService")),n.factory("CommonService",e("services/CommonService")),n.factory("InfoService",e("services/InfoService")),n.factory("ConcernService",e("services/ConcernService")),n.factory("WebService",e("services/WebService")),n}),define("filters/filters",["angular","filters/InterpolateFilter","filters/DefNumberFilter","filters/ProdMinSubscribeFilter","filters/DefStringFilter","filters/DefDateStringFilter","filters/BankAccountFilter","services/services"],function(e,t,n,r,i,o,c){"use strict";var a=e.module("app.filters",["app.services"]);return a.filter("interpolate",t),a.filter("defNumber",n),a.filter("defString",i),a.filter("defDateString",o),a.filter("prodMinSubscribe",r),a.filter("bankAccount",c),a}),define("animations/QDIITermAnimation",["angular"],function(e){"use strict";var t=function(e,t,n){return{addClass:function(r,i){n(function(){var n=t.position(r);e.scrollTo(n.left,n.top,!0)},240)},removeClass:function(t,n){e.scrollTop(!0)}}};return t.$inject=["$ionicScrollDelegate","$ionicPosition","$timeout"],t}),define("animations/animations",["require","exports","module","angular","animations/QDIITermAnimation"],function(e){"use strict";var t=e("angular"),n=t.module("app.animations",["ngAnimate"]);return n.animation(".QDII-Top",e("animations/QDIITermAnimation")),n}),define("directives/BackButtonDirective",["angular"],function(e){"use strict";var t=function(e,t,n){return{restrict:"E",replace:!0,template:'<button class="button back-button buttons button-icon icon ion-ios7-arrow-back header-item btnBack" ng-click="onBackKeyDown()"></button>',link:function(r){r.onBackKeyDown||(r.onBackKeyDown=function(){if(null==t.backView()&&"tab.index"!=t.currentView().stateName&&n.go("tab.index"),t.backView()&&t.backView().stateId==t.currentView().stateId)for(var e=-1;t.backView().stateId==t.currentView().stateId;)e--,t.goBack(e);else t.goBack()}),ionic.Platform.isAndroid()&&e.registerBackButtonAction(function(e){return r.onBackKeyDown(),e.preventDefault(),!1},101)}}};return t.$inject=["$ionicPlatform","$ionicHistory","$state"],t}),define("directives/ExitButtonDirective",["angular"],function(e){"use strict";var t=function(e,t,n,r){return{restrict:"E",replace:!0,template:'<a class="header-item btnExit" ng-click="onExitKeyDown()">退出</a>',link:function(i){i.onExitKeyDown||(i.onExitKeyDown=function(){t.confirm({cssClass:"kDialog",title:"提示",template:"您确定要退出开户吗？",okText:"确定",cancelText:"取消"}).then(function(e){e&&(r.go("tab.index"),n.removeOpenUser())})}),ionic.Platform.isAndroid()&&e.registerBackButtonAction(function(e){return i.onExitKeyDown(),e.preventDefault(),!1},101)}}};return t.$inject=["$ionicPlatform","$ionicPopup","LocalCacheService","$state"],t}),define("directives/VersionDirective",["angular"],function(e){"use strict";var t=function(e){return function(t,n,r){n.text(e)}};return t.$inject=["VERSION"],t}),define("directives/BuyButtonDirective",["angular"],function(e){"use strict";var t=function(t,n,r,i,o){function c(c,a,s){var u="pay_trade";0==a||1==a?u="pay_trade":2==a&&(u="deposit_trade"),i.getNotice(u).then(function(i){0==i.error_no&&(i.title&&i.content?r.showNotice(i.title+"&&"+i.content):(o.remove("BuyCtrl_buy"),o.set("buy_state",{stateName:"trade-buy",stateParams:{prodCode:c,prodSource:a,add:s}}),o.getUser()?t.go("trade-buy",{prodCode:c,prodSource:a,add:s}):t.go("login",{from:n.currentView().stateName,fromParams:e.toJson(n.currentView().stateParams),w:"notLogin",to:"trade-buy",toParams:e.toJson({prodCode:c,prodSource:a,add:s})})))})}return{restrict:"A",link:function(e,t,n){t.bind("click",function(){"undefined"!=typeof Messenger&&Messenger.sendMsg("ym_event",{eventID:"buy",attributes:{prodCode:n.prodCode,prodSource:n.prodSource,add:n.add}},null,null),c(n.prodCode,n.prodSource,n.add)})}}};return t.$inject=["$state","$ionicHistory","CommonService","WebService","LocalCacheService"],t}),define("directives/SellButtonDirective",["angular"],function(e){"use strict";var t=function(e,t,n){function r(r,i,o){var c="pay_redeem";0==o||1==o?c="pay_redeem":2==o&&(c="deposit_redeem"),n.getNotice(c).then(function(n){0==n.error_no&&(n.title&&n.content?t.showNotice(n.title+"&&"+n.content):e.go("trade-sell",{allotNo:r,prodCode:i,prodSource:o}))})}return{restrict:"A",link:function(e,t,n){t.bind("click",function(){r(n.allotNo,n.prodCode,n.prodSource)})}}};return t.$inject=["$state","CommonService","WebService"],t}),define("directives/ConcernDirective",["angular"],function(e){"use strict";var t=function(e,t){return{restrict:"E",template:'<a id="jConcern" ng-click="operUserCare()" ng-class="{icon_concern:isCare,icon_concern_:!isCare}">关注</a>',replace:!0,link:function(e,n,r){e.$watch("fund.prodCode",function(n,r){n&&(e.isCare=t.isConcern(n))}),e.operUserCare=function(){e.isCare=t.concern(e.fund.prodCode)}}}};return t.$inject=["CommonService","ConcernService"],t}),define("directives/ChannelImgDirective",["angular"],function(e){"use strict";var t=function(e){function t(t,n){e.getChannelInfos(t).then(function(e){if(e){var t=e[0];n.channel.imgSrc=t.content_img,n.channel.imgAlt=t.channel_name,n.channel.channel_name=t.channel_name,n.channel.description=t.description}})}return{restrict:"E",replace:!0,template:'<div class="promo"><img ng-src="{{channel.imgSrc}}" alt="{{channel.imgAlt}}"/></div>',link:function(e,n,r){var i;i=r.channelId?r.channelId:e.channel.channelId,i?t(i,e):e.$watch("channel.channelId",function(n,r){n&&t(n,e)})}}};return t.$inject=["InfoService"],t}),define("directives/DigitalKeyboardDirective",["angular"],function(e){"use strict";var t=function(e,t){return{restrict:"A",scope:{password:"=digitalKeyboard"},link:function(e,t,n){"false"==n.digitalKeyboard?t.bind("click",function(){"undefined"!=typeof DigitalKeyboard&&DigitalKeyboard.close(function(t){e.$parent.selectDigitalKeyboardElement&&e.$parent.selectDigitalKeyboardElement.removeClass("keypad")})}):"undefined"!=typeof cordova&&"undefined"!=typeof DigitalKeyboard&&(t.attr("readonly","readonly"),t.bind("click",function(){e.$parent.selectDigitalKeyboardElement&&e.$parent.selectDigitalKeyboardElement.removeClass("keypad"),t.parent().parent().addClass("keypad"),e.$parent.selectDigitalKeyboardElement=t.parent().parent(),cordova.plugins.Keyboard.close(),DigitalKeyboard.active({length:6,text:e.password},function(n){e.$apply(function(){e.password=n.text}),ionic.Platform.isIOS()&&t.triggerHandler("click")})}))}}};return t.$inject=["$parse","$log"],t}),define("directives/AccessRecordDirective",["angular"],function(e){"use strict";var t=function(){return{restrict:"A",link:function(e,t,n){t.bind("click",function(){n.key&&"undefined"!=typeof Messenger&&Messenger.sendMsg("ym_event",{eventID:n.key},null,null)})}}};return t.$inject=[],t}),define("directives/directives",["require","exports","module","angular","services/services","directives/BackButtonDirective","directives/ExitButtonDirective","directives/VersionDirective","directives/BuyButtonDirective","directives/SellButtonDirective","directives/ConcernDirective","directives/ChannelImgDirective","directives/DigitalKeyboardDirective","directives/AccessRecordDirective"],function(e){"use strict";var t=e("angular"),n=(e("services/services"),t.module("app.directives",["app.services"]));return n.directive("backButton",e("directives/BackButtonDirective")),n.directive("exitButton",e("directives/ExitButtonDirective")),n.directive("appVersion",e("directives/VersionDirective")),n.directive("buyButton",e("directives/BuyButtonDirective")),n.directive("sellButton",e("directives/SellButtonDirective")),n.directive("concern",e("directives/ConcernDirective")),n.directive("channelImg",e("directives/ChannelImgDirective")),n.directive("digitalKeyboard",e("directives/DigitalKeyboardDirective")),n.directive("accessRecord",e("directives/AccessRecordDirective")),n}),define("controllers/IndexCtrl",[],function(){"use strict";function e(e){var t=e.param=new Array;t.content="just index page"}return e.$inject=["$scope"],e}),define("controllers/LoginCtrl",[],function(){"use strict";function e(e,t,n,r,i,o,c,a,s,u){function l(){e.login.password=null,e.login.captcha=null,e.login.rememberAccount=!0,e.login.historyOpen=!1,e.login.contentFocus=!1,e.login.pwdFocus=!1,e.login.captchaFocus=!1,a.getAccountList()?e.login.accountList=a.getAccountList().split(","):e.login.accountList=new Array;var i=a.getAccount(),o=a.getRememberAccount();0!=o?e.login.account_content=i:(e.login.rememberAccount=!1,e.login.account_content=null),e.branchs=r.getBranchs();var c=a.getUser();if(c){var s=n.from;s&&"login"!=s?t.go(s,angular.fromJson(n.fromParams)):t.go("tab.account-index")}}function f(){var r=d();i.show(),u.login(r).then(function(s){a.setRememberAccount(e.login.rememberAccount?1:0),e.login.rememberAccount?(a.setAccount(r.account_content),e.login.accountList.indexOf(r.account_content)==-1&&(e.login.accountList.push(r.account_content),e.login.accountList.length>5&&e.login.accountList.shift(),a.setAccountList(e.login.accountList.join(",")))):a.removeAccount(),"undefined"!=typeof Messenger&&Messenger.sendMsg("ym_profileSignIn",{PUID:e.login.account_content},null,null);var l={};l.token=s.token,a.setUser(l),u.getUserInfo().then(function(e){a.setUser(e),i.hide();var r=n.to;if(r&&r.indexOf("open-")==-1)t.go(r,angular.fromJson(n.toParams));else if(sessionStorage.login_next_page){var c=sessionStorage.login_next_page;t.go(c)}else o.backView()&&o.backView().stateName.indexOf("open-")==-1?o.goBack():t.go("tab.account-assets-index")},function(e){a.removeUser(),c.showConfig({message:"获取用户信息失败"})})},function(t){t&&"XCM-100008"==t.error_no&&(c.showAlert({message:"data"}),e.showCaptcha())}),u.syncUserCare(r)}function d(){var t={},n=$.trim(e.login.account_content)?$.trim(e.login.account_content):"66000068";$.extend(t,{account_content:n,password:$.trim(e.login.password)?$.trim(e.login.password):"111111",captcha_str:e.login.captcha_str,captcha:e.login.captcha,time_stamp:e.login.time_stamp});var r="1";return v.test(n)&&(r="b"),$.extend(t,{input_content:r}),$.extend(t,{cares_str:s.getConcernList()}),t}var g=e.param=new Array;g.content="login page",e.$on("$ionicView.beforeEnter",function(){l()}),e.closeHistory=function(t){e.login.historyOpen&&t.toElement.className.indexOf("unClose")==-1&&(e.login.historyOpen=!1)},e.openHistory=function(t){e.login.historyOpen||(e.login.historyOpen=!0)},e.selectAccount=function(t){e.login.account_content=t,e.login.historyOpen=!1},e.delAccount=function(t){e.login.accountList.splice(t,1),a.setAccountList(e.login.accountList.join(","))},e.login=function(){var t=$.trim(e.login.account_content);$.trim(e.login.password);if(v.test(t))f();else if(""==e.branchs)c.showAlert({message:"营业部信息获取失败，请重试"});else{for(var n=!1,r=e.branchs.split(","),i=0;i<r.length;i++){var o=r[i];if(!isNaN(t)&&0==t.indexOf(o)){f(),n=!0;break}}n||c.showAlert({message:"手机号或客户号输入有误！"})}},e.clickPassword=function(){$("#password").triggerHandler("click")},e.myKeyup=function(t){var n=window.event?t.keyCode:t.which;13==n&&e.login()};var v=/^1[0-9][0-9]\d{8}$/;e.onBackKeyDown=function(){if($.cookie("back_url_2")||$.cookie("_r_u_l")&&$.cookie("_r_u_l").indexOf("from=2")!=-1)Messenger.send("close");else if(c.isBuyExperience()){var e=a.get("lcty_state");t.go(e.stateName,e.stateParams)}else o.backView()&&"sessionOut"!=n.w?o.goBack():t.go("tab.index")}}return e.$inject=["$scope","$state","$stateParams","DictionaryService","$ionicLoading","$ionicHistory","CommonService","LocalCacheService","ConcernService","WebService"],e}),define("controllers/product/IndexCtrl",[],function(){"use strict";function e(e,t,n,r){function i(){o.content="product index page"}var o=e.param=new Array;e.$on("$ionicView.beforeEnter",function(){i()})}return e.$inject=["$scope","$state","$ionicLoading","InfoService"],e}),define("controllers/account/IndexCtrl",[],function(){"use strict";function e(e,t,n,r){var i=e.param=new Array;i.content="account page",i.remark="(登录后可见)",e.onBackKeyDown=function(){t.go("tab.index")},e.logout=function(){r.removeUser(),t.go("tab.index")}}return e.$inject=["$scope","$state","WebService","LocalCacheService"],e}),define("controllers/controllers",["require","exports","module","angular","services/services","config","controllers/IndexCtrl","controllers/LoginCtrl","controllers/product/IndexCtrl","controllers/account/IndexCtrl"],function(e,t,n){"use strict";var r=e("angular"),i=(e("services/services"),e("config"),r.module("app.controllers",["app.services","app.config"]));return i.controller("IndexCtrl",e("controllers/IndexCtrl")),i.controller("LoginCtrl",e("controllers/LoginCtrl")),i.controller("product_IndexCtrl",e("controllers/product/IndexCtrl")),i.controller("account_IndexCtrl",e("controllers/account/IndexCtrl")),i.run(["$rootScope","$state","$ionicHistory","LocalCacheService","BASE_PATH","$http","offline","CacheFactory","$cordovaNetwork","PULLING_TEXT","REFRESHING_TEXT",function(e,t,n,i,o,c,a,s,u,l,f){c.defaults.cache=s.createCache("offlineCache",{deleteOnExpire:"none",maxAge:0,storageMode:"localStorage",storagePrefix:"tfzq."}),a.start(c),e.basePath=o,e.PULLING_TEXT=l,e.REFRESHING_TEXT=f,e.isOffline=!1,e.$on("$cordovaNetwork:online",function(t,n){e.isOffline=!1}),e.$on("$cordovaNetwork:offline",function(t,n){console.log("got offline"),e.isOffline=!0}),e.closeDigitalKeyboard=function(){"undefined"!=typeof DigitalKeyboard&&DigitalKeyboard.close(function(e){})},e.goIndex=function(){"undefined"!=typeof Messenger&&Messenger.sendMsg("ym_event",{eventID:"s27"},null,null),t.go("tab.index")},e.goProductIndex=function(){"undefined"!=typeof Messenger&&Messenger.sendMsg("ym_event",{eventID:"s28"},null,null),t.go("tab.product-index")},e.goAccountIndex=function(){"undefined"!=typeof Messenger&&Messenger.sendMsg("ym_event",{eventID:"s29"},null,null);var e=i.getUser();if(e)event.preventDefault(),t.go("tab.account-index");else{event.preventDefault();var o=n.currentView();t.go("login",{from:o.stateName,fromParams:r.toJson(o.stateParams),w:"notLogin",to:"tab.account-index",toParams:""})}},e.$on("$ionicView.beforeEnter",function(){var n=t.current.name;e.hideTabs=!1,"tab.index"===n||"tab.product-index"===n||"tab.account-index"===n?e.hideTabs=!1:e.hideTabs=!0}),e.$on("$stateChangeStart",function(e,n,o,c,a){"undefined"!=typeof Messenger&&(c&&""!=c.name&&Messenger.sendMsg("ym_endLogPageView",{pageID:c.url},null,null),Messenger.sendMsg("ym_beginLogPageView",{pageID:n.url},null,null)),"undefined"!=typeof DigitalKeyboard&&DigitalKeyboard.close(function(e){}),(n.loginStatus||n.openStatus)&&(n.loginStatus&&!i.getUser()&&(e.preventDefault(),t.go("login",{from:c.name,fromParams:r.toJson(a),w:"notLogin",to:n.name,toParams:r.toJson(o)})),n.openStatus&&!i.getOpenUser()&&(e.preventDefault(),t.go("open-msgVerify")))}),e.$on("userIntercepted",function(e,n){"login"!=t.current.name&&t.go("login",{from:t.current.name,w:n})}),e.$on("openUserIntercepted",function(e,n){t.go("open-msgVerify")});var d=function(e){var n;if(n="Android"==device.platform?window.plugins.PushPlugin.receiveMessage.message:e.message,"undefined"!=typeof n){var r=JSON.parse(n),i=r.value.view;if("undefined"!=typeof i){var o=r.value.params;t.go(i,o)}}},g=function(e){try{var n;if(n="Android"==device.platform?window.plugins.PushPlugin.openNotification.alert:e.aps.alert,console.log("open Notificaiton:"+n),"undefined"!=typeof n){var r=JSON.parse(n.body),i=r.value.view;if("undefined"!=typeof i){var o=r.value.params;t.go(i,o)}}}catch(c){console.log("PushPlugin:onOpenNotification"+c)}},v=function(e){try{var n;if(n="Android"==device.platform?window.plugins.PushPlugin.receiveNotification.alert:e.aps.alert,console.log("Receive Notificaiton:"+n),"undefined"!=typeof n){var r=JSON.parse(n.body),i=r.value.view;if("undefined"!=typeof i){var o=r.value.params;t.go(i,o)}}}catch(c){console.log(exception)}};document.addEventListener("push.receiveMessage",d,!1),document.addEventListener("push.openNotification",g,!1),document.addEventListener("push.receiveNotification",v,!1)}]),i}),define("app",["store","angular","angular-cache","uiRouter","config","filters/filters","services/services","animations/animations","directives/directives","controllers/controllers","ionicAngular"],function(e,t){"use strict";var n=t.module("app",["angular-cache","ngCordova","ionic","app.controllers","app.filters","app.services","app.animations","app.directives","app.config","ui.router","door3.css","ngmodel.format","platanus.keepValues","highcharts-ng","ngCookies","offline"]);return n.constant("$ionicLoadingConfig",{template:'<img src="../img/ripple.svg" style="padding:0;width:40px;height:40px;">',showBackdrop:!0}),n.factory("$exceptionHandler",function(){return function(e,t){throw e.message+=' (caused by "'+t+'")',"undefined"!=typeof Messenger&&Messenger.sendMsg("ym_reportError",{error:e.message.toString()},null,null),e}}),n.factory("UserInterceptor",["$q","$rootScope","CacheFactory",function(t,n,r){return{request:function(t){var n=e.get("UUID");n&&(t.headers.UUID=n);var i=r.get("UserCache"),o=i.get("user");return o&&(t.headers.TOKEN=o.token),t},response:function(e){var i=e.data;if(i){if("AH-10001"==i.error_no){var o=r.get("UserCache");return o.remove("user"),n.$emit("userIntercepted","sessionOut",e),t.reject(e)}if("AH-10002"==i.error_no){var o=r.get("UserCache");return o.remove("user"),n.$emit("openUserIntercepted","sessionOut",e),t.reject(e)}}return e},responseError:function(r){if("0"==r.status&&TF.Bubble.show("请求超时，请稍后再试"),"200"!=r.status){var i=r.config.method,o=r.config.url,c=r.status,a=i+":"+o+":"+c;"undefined"!=typeof Messenger&&Messenger.sendMsg("ym_reportError",{error:a},null,null)}"404"==r.status;var s=r.data;return s&&("AH-10001"==s.error_no&&(e.remove("user"),n.$emit("userIntercepted","sessionOut",r)),"AH-10002"==s.error_no)?(e.remove("openUser"),n.$emit("openUserIntercepted","sessionOut",r),t.reject(r)):t.reject(r)}}}]),n.config(function($httpProvider,$ionicConfigProvider){var n=$httpProvider,r=$ionicConfigProvider;function i(e){if(e&&t.isObject(e))for(var n in e)o(e[n])&&(e[n]=c(e[n]));return e}function o(e){if(e&&t.isString(e)){var n=e.lastIndexOf("\\"),r=e.substr(n+1),i=/\.jpg$|\.jpeg$|\.gif$|\.png$/i;return i.test(r)}return!1}function c(t){var n=e.get(t);return n&&a(n)?n:(e.remove(t),"undefined"!=typeof FileLoad&&FileLoad.fileLoadPath(t,function(r){r&&(n=r,e.set(t,n))}),t)}function a(e){var t=new Image;return t.src=e,t.fileSize>0||t.width>0&&t.height>0}r.platform.ios.tabs.position("bottom"),r.platform.android.tabs.position("bottom"),r.scrolling.jsScrolling(!0),r.views.transition("none"),r.views.swipeBackEnabled(!1),n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n.interceptors.push("UserInterceptor"),n.defaults.transformRequest=[function(e){var n=function(e){var t,r,i,o,c,a,s,u="";for(t in e)if(r=e[t],r instanceof Array)for(s=0;s<r.length;++s)c=r[s],i=t+"["+s+"]",a={},a[i]=c,u+=n(a)+"&";else if(r instanceof Object)for(o in r)c=r[o],i=t+"["+o+"]",a={},a[i]=c,u+=n(a)+"&";else void 0!==r&&null!==r&&(u+=encodeURIComponent(t)+"="+encodeURIComponent(r)+"&");return u.length?u.substr(0,u.length-1):u};return t.isObject(e)&&"[object File]"!==String(e)?n(e):e}],n.defaults.transformResponse.push(function(e){if(e&&t.isObject(e)&&0==e.error_no&&e.data){var n=e.data;if(n)if(t.isArray(n))for(var r=n.length,o=0;o<r;o++)i(n[o]);else i(n)}return e})}),n}),define("routes",["app"],function(e){"use strict";e.config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("login",{
url:"/login?from&fromParams&to&toParams&w",templateUrl:"../view/login.html",controller:"LoginCtrl"}).state("tab",{url:"/tab","abstract":!0,templateUrl:"../view/tabs.html"}).state("tab.index",{url:"/index?recommendInfos&tf_op_station",views:{"tab-index":{templateUrl:"../view/tab-index.html",controller:"IndexCtrl"}}}).state("tab.product-index",{url:"/product-index",views:{"tab-product-index":{templateUrl:"../view/product/index.html",controller:"product_IndexCtrl"}}}).state("tab.account-index",{url:"/account-index",views:{"tab-account-index":{templateUrl:"../view/account/index.html",controller:"account_IndexCtrl"}},loginStatus:!0}),t.otherwise("/tab/index")}])}),define("bootstrap",["app","routes"],function(e){"use strict";var t=function(){cordova.plugins.Keyboard.disableScroll(!0),angular.bootstrap(document,[e.name])},n=!1;if("undefined"==typeof cordova&&location.href.indexOf("abs_path=")!=-1){var r=location.href.toString().split("abs_path=")[1].split("&")[0];if(r&&""!=r){n=!0;var i=document.createElement("script");i.charset="utf-8",i.src=decodeURIComponent(r),i.async="async",document.head.appendChild(i)}}document.addEventListener("deviceready",t,!1),"undefined"!=typeof cordova||n||angular.element().ready(function(){try{angular.bootstrap(document,[e.name])}catch(t){var n=t.stack||t.message||t;"undefined"!=typeof Messenger&&Messenger.sendMsg("ym_reportError",{error:n.toString()},null,null),console.error(n)}})});