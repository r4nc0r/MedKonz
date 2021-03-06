(function () {
    angular.module('myapp', ['ui.bootstrap', 'ngAnimate', "ngTouch", "smoothScroll"])
        .controller('myappController', function ($timeout, $document, $window, smoothScroll) {
            var vm = this;
            vm.ShowDiv = showdiv;
            vm.$onInit = init();
            vm.contentDivs = [false, false, false, false, false];
            vm.DivPosition = [, "div2", "div3", "div4", "div5"];
            vm.contentDivsClass = ["fa-circle-o", "fa-circle-o", "fa-circle-o", "fa-circle-o", "fa-circle-o"];
            vm.contentDivsConnector = [];
            vm.Comments = [false, false, false, false, false, false, false, false];
            vm.Images_personal = [
                { image: "assets/images/1_Persönlich/Elon-Musk.jpg", id: 0 },
                { image: "assets/images/1_Persönlich/Elon-Musk1.jpeg", id: 1 }
            ];
            vm.Images_paypal = [
                { image: "assets/images/3_PayPal/smartphone1.jpg", id: 0 },
                { image: "assets/images/3_PayPal/smartphone2.png", id: 1 },
                { image: "assets/images/3_PayPal/whatispaypal.png", id: 2 },
                { image: "assets/images/3_PayPal/paypal-working-functioning.png", id: 3 },
                { image: "assets/images/3_PayPal/flowChart1.png", id: 4 },
                { image: "assets/images/3_PayPal/flowChart2.png", id: 5 }
            ];
            vm.Images_tesla = [
                { image: "assets/images/4_Tesla/Models/chassis-motor-p90d.jpg", id: 0 },
                { image: "assets/images/4_Tesla/Model X/section-exterior-primary.jpg", id: 1 },
                { image: "assets/images/4_Tesla/Model X/section-hero-background.jpg", id: 2 }
            ];
            vm.Images_spacex = [
                { image: "assets/images/5_SpaceX/falcon9-render.png", id: 0 },
                { image: "assets/images/5_SpaceX/falcon-heavy-render.png", id: 1 },
                { image: "assets/images/5_SpaceX/landing.jpg", id: 2 },
                { image: "assets/images/5_SpaceX/launch.jpg", id: 3 },
                { image: "assets/images/5_SpaceX/ses10_launch3.jpg", id: 4 }
            ];
            vm.Images_hyperloop = [
                { image: "assets/images/6_Hyperloop/hyperloop-transportation.jpg", id: 0 },
                { image: "assets/images/6_Hyperloop/Hyperloop_all_cutaway.png", id: 1 },
                { image: "assets/images/6_Hyperloop/hyperloopconcept.jpg", id: 2 },
                { image: "assets/images/6_Hyperloop/image_desert.jpg", id: 3 },
                { image: "assets/images/6_Hyperloop/the_hyperloop.png", id: 4 }
            ];
            vm.Images_theboringcompany = [
                { image: "assets/images/7_The Boring Company/tunnel-boring-company-borer.jpg", id: 0 }
            ];
            vm.myInterval = 5000;
            vm.noWrapSlides = false;
            vm.active = 0;
            vm.Move = move;
            vm.EndMove = endmove;
            vm.StickPos = [0, 0];//x,y
            vm.Viewport = [$("body").innerWidth(), $("body").innerHeight()];
            vm.InitHeigth = vm.Viewport[1];
            vm.ScrollTo = [$document[0].getElementById("landing"), $document[0].getElementById("timeline"), $document[0].getElementById("ending")];
            vm.ScrollIndex = 1;
            vm.ScrollUp = 0;
            vm.IsMoving = null;
            vm.TimelineYPosition = (vm.Viewport[1]*20/100);
            vm.TimelinePointPositions=null;
            vm.Stick= null;

            function endmove(event) {
                if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    vm.IsMoving = false;
                }
            }

            function move(event) {

                if (event.key === "ArrowDown") {
                    vm.StickPos[1] += 5;
                    TweenLite.to(vm.stick, 1.5, { y: vm.StickPos[1], onComplete:colliosonDetection() });
                    vm.IsMoving = true;
                }
                else if (event.key === "ArrowUp") {
                    vm.StickPos[1] -= 5;
                    TweenLite.to(vm.stick, 1.5, { y: vm.StickPos[1], onComplete:colliosonDetection() });
                    vm.IsMoving = true;
                }
                else if (event.key === "ArrowRight") {
                    vm.StickPos[0] += 5;
                    TweenLite.to(vm.stick, 1.5, { x: vm.StickPos[0], onComplete:colliosonDetection() });
                    vm.IsMoving = true;
                }
                else if (event.key === "ArrowLeft") {
                    vm.StickPos[0] -= 5;
                    TweenLite.to(vm.stick, 1.5, { x: vm.StickPos[0], onComplete:colliosonDetection() });
                    vm.IsMoving = true;
                }

                console.log($(vm.stick).offset().top, vm.Viewport[1]);


            }

            function colliosonDetection() {
                if ($(vm.stick).offset().top > (vm.Viewport[1])) {
                    smoothScroll(vm.ScrollTo[vm.ScrollIndex]);
                    vm.ScrollIndex += 1 % 2;
                    vm.Viewport[1] += vm.InitHeigth;
                }
                else {
                    switch (vm.ScrollIndex) {
                        case 1:
                            break;
                        case 2:
                            if ($(vm.stick).offset().top < vm.InitHeigth) {
                                smoothScroll(vm.ScrollTo[vm.ScrollIndex - 2]);
                                vm.ScrollIndex -= 1 % 2;
                                vm.Viewport[1] -= vm.InitHeigth;
                            }
                            break;
                        case 3:
                            if ($(vm.stick).offset().top < (vm.InitHeigth * 2)) {
                                smoothScroll(vm.ScrollTo[vm.ScrollIndex - 2]);
                                vm.ScrollIndex -= 1 % 2;
                                vm.Viewport[1] -= vm.InitHeigth;
                            }

                    }
                }
                if($(vm.stick).offset().top < vm.TimelinePointPositions[0].y +150 && $(vm.stick).offset().top > vm.TimelinePointPositions[0].y - 150 ){
                    for (var i = 0; i < vm.TimelinePointPositions.length; i++) {
                        if ($(vm.stick).offset().left < vm.TimelinePointPositions[i].x +50 && $(vm.stick).offset().left > vm.TimelinePointPositions[i].x -50){
                            showdiv(i);
                        }
                    }
                }
            }

            $window.addEventListener("keydown", function (e) {
                // space and arrow keys
                if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                    e.preventDefault();
                }
            }, false);

            function init() {
                startQuotes(3000);
                vm.stick = $document[0].getElementById("stickman");
                TweenLite.from(vm.stick, 4, { left: -500 });
                $timeout(function () {
                    vm.TimelinePointPositions=[
                        {x: $($document[0].getElementById("timelinePoint0")).offset().left , y:$($document[0].getElementById("timelinePoint0")).offset().top},
                        {x: $($document[0].getElementById("timelinePoint1")).offset().left , y:$($document[0].getElementById("timelinePoint1")).offset().top},
                        {x: $($document[0].getElementById("timelinePoint2")).offset().left , y:$($document[0].getElementById("timelinePoint2")).offset().top},
                        {x: $($document[0].getElementById("timelinePoint3")).offset().left , y:$($document[0].getElementById("timelinePoint3")).offset().top},
                        {x: $($document[0].getElementById("timelinePoint4")).offset().left , y:$($document[0].getElementById("timelinePoint4")).offset().top},
                    ];
                    showdiv(1);
                }, 1);
            }

            function startQuotes(timer) {
                $timeout(function () {
                    var rnd = Math.floor(Math.random() * vm.Comments.length);
                    vm.Comments[rnd] = true;
                    $timeout(function () {
                        vm.Comments[rnd] = false;
                        startQuotes(0);
                    }, 5000);
                }, timer);
            }
            function showdiv(number) {
                setTimeline(number);
                setAllcontentDivsFalse();
                vm.contentDivs[number] = true;
            }
            function resetTimeline() {
                setAllcontentDivsFalse();
                setAllcontentDivsClassFalse();
                setAllcontentDivsConnectorBlack();
            }
            function setTimeline(newStatus) {
                var lastDiv = getTimelineStatus();
                if (newStatus === lastDiv && lastDiv != 0) {
                    return;
                }
                else if (newStatus >= lastDiv) {
                    for (var i = 0; i <= newStatus; i++) {
                        vm.contentDivsClass[i] = "fa-circle timeline-reached";
                        vm.contentDivsConnector[i - 1] = "timeline-reached-connector";
                    }
                }
                else if (newStatus < lastDiv) {
                    for (var diff = lastDiv - newStatus; diff > 0; diff--) {
                        vm.contentDivsClass[lastDiv] = "fa-circle-o";
                        vm.contentDivsConnector[lastDiv - 1] = "timeline-not-reached-connector";
                        lastDiv--;
                    }
                }
            }
            function getTimelineStatus() {
                var lastTrueDiv;
                for (var i = 0; i < vm.contentDivs.length; i++) {
                    if (vm.contentDivs[i] === true) {
                        lastTrueDiv = i;
                    }
                }
                if (!lastTrueDiv) {
                    lastTrueDiv = 0;
                }
                return lastTrueDiv;
            }
            function setAllcontentDivsFalse() {
                for (var i = 0; i < vm.contentDivs.length; i++) {
                    vm.contentDivs[i] = false;
                }
            }
            function setAllcontentDivsClassFalse() {
                for (var i = 0; i < vm.contentDivsClass.length; i++) {
                    vm.contentDivsClass[i] = "fa-circle-o";
                }
            }
            function setAllcontentDivsConnectorBlack() {
                for (var i = 0; i < vm.contentDivsConnector.length; i++) {
                    vm.contentDivsConnector[i] = "timeline-not-reached-connector";
                }
            }
        });
})();