angular.module('topscroller', ['ionic'])

.controller('scrollToTopCtrl', ['$window','$scope', '$element', '$ionicScrollDelegate', '$rootScope',
    function($window, $scope, $element, $ionicScrollDelegate, $rootScope) {
        var self = this;

        self.init = function(offset) {
            // if offset not specified from template
            if (!offset) {
                var phoneHeight = $window.innerHeight;
                var topBarHeight, defaultOffset;

                // if there is a top bar
                try {
                    topBarHeight = document.querySelector('.bar').offsetHeight;
                } catch (err) {
                    topBarHeight = 0;
                }
                // if there is a nav bar
                try {
                    navTabHeight = document.querySelector('.tab-nav').offsetHeight;
                } catch (err) {
                    navTabHeight = 0;
                }

                // set default to ten times the current view width, excluding bars
                var defaultOffset = (phoneHeight - (topBarHeight + navTabHeight)) * 10;
            }
            // make sure user inputs a number type as offset
            if (offset && ((typeof(parseInt(offset)) !== "number") || isNaN(parseInt(offset)) )) {
                console.error("expected a number, but got " + "'" + offset + "'\n");
            }
            self.verticalOffset = offset ||  defaultOffset;

        }

        self.observeScroll = function() {
            function onCapturedFrame() {
                var scrollToTopButton = document.querySelector('ion-view[nav-view="active"] scroll-to-top-button');
                if(scrollToTopButton){
                    if($ionicScrollDelegate.$getByHandle('scroller').getScrollPosition()){
                        var currentOffset = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
                        if (currentOffset >= self.verticalOffset) {
                            if (scrollToTopButton) {
                                scrollToTopButton.style.display = 'block';
                            }
                        } else {
                            if (scrollToTopButton) {
                                scrollToTopButton.style.display = 'none';
                            }
                        }
                        window.requestAnimationFrame(onCapturedFrame);
                    }else{
                        console.log("closed");
                    }
                }else{
                    if(document.querySelector('ion-view scroll-to-top-button')){//nav-view="active" 加载慢于指令的情况
                        window.requestAnimationFrame(onCapturedFrame);
                    }else{//当前页面无指令
                        console.log("closed2");
                    }
                }
            }
            onCapturedFrame()
        }

        self.scrollToTop = function(shouldAnimate) {
            $scope.$broadcast('hideButton');
            $ionicScrollDelegate.scrollTop(shouldAnimate);
        }
}])

.directive('scrollToTop', ['$ionicGesture', '$ionicScrollDelegate', function($ionicGesture, $ionicScrollDelegate) {
        return {
            restrict: 'EA',
            controller: 'scrollToTopCtrl',
            link: function(scope, element, attrs, ctrl) {
                // get the vertical offset supplied from the template
                var verticalOffset = attrs.scrollToTop;
                ctrl.init(verticalOffset);
                ctrl.observeScroll();
            }
        }
}])

.directive('scrollToTopButton', ['$rootScope', '$ionicGesture', function($rootScope, $ionicGesture) {
    return {
        restrict: 'E',
        controller: 'scrollToTopCtrl',
        link: function(scope, element, attrs, ctrl) {

            // if user does not define his own template
            if (!element.html().trim()) {
                var template = '<div class="float-button scroll-top"><span><a class="content"><i class="ion-chevron-up"></i></a></span></div>';
                element.html(template);
            }

            // set animation option
            shouldAnimate = attrs.animate === "false" ? false : true;

            // // hide the button initially
            element.css({'display': 'none'});


            $ionicGesture.on('tap', function(e) {
                ctrl.scrollToTop(shouldAnimate);
            }, element) // scrolltop when button clicked

        }
    }
}])