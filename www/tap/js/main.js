requirejs.config({paths:{angular:"../../common/ionic/js/angular/angular.min",ngCookies:"../../common/ionic/js/angular/angular-cookies.min",angularAnimate:"../../common/ionic/js/angular/angular-animate.min",angularSanitize:"../../common/ionic/js/angular/angular-sanitize.min",uiRouter:"../../common/ionic/js/angular-ui/angular-ui-router.min",ngCordova:"../../common/ionic/js/angular/ng-cordova.min",angularCss:"../../common/ionic/js/angular/angular-css.min",ngmodelFormat:"../../common/ionic/js/angular/ngmodel.format.min",angularKeepValues:"../../common/ionic/js/angular/angular-keep-values.min","angular-cache":"../../common/ionic/js/angular/angular-cache.min",angularOffline:"../../common/ionic/js/angular/angular-offline.min",ionic:"../../common/ionic/js/ionic.min",ionicAngular:"../../common/ionic/js/ionic-angular.min",text:"../../common/ionic/js/text.min",jquery:"../../common/jquery/jquery",jqueryCookie:"../../common/jquery/jquery.cookie",highstock:"../../common/highstock/highstock",highchartsNg:"../../common/ionic/js/angular/highcharts-ng.min",store:"../../common/jquery/store.min",base:"../../common/js/jkf/base"},shim:{jquery:{exports:"jquery"},jqueryCookie:{deps:["jquery"],exports:"jqueryCookie"},highstock:{deps:["jquery"],exports:"highstock"},base:{deps:["jquery"],exports:"base"},store:{deps:["jquery"],exports:"store"},angular:{exports:"angular"},angularAnimate:{deps:["angular"]},angularSanitize:{deps:["angular"]},ngCookies:{deps:["angular"]},uiRouter:{deps:["angular"]},ngCordova:{deps:["angular"]},ngmodelFormat:{deps:["angular"]},angularKeepValues:{deps:["angular"]},angularOffline:{deps:["angular"]},angularCss:{deps:["angular","uiRouter"]},highchartsNg:{deps:["angular","highstock"],exports:"highchartsNg"},ionic:{deps:["angular"],exports:"ionic"},ionicAngular:{deps:["angular","ngCordova","ionic","uiRouter","angularAnimate","angularSanitize","angularCss","ngmodelFormat","angularKeepValues","highchartsNg","ngCookies","angularOffline"]}},deps:["bootstrap"]});