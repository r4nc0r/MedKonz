(function() {
    angular.module('myapp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', "ngTouch", "pictureViewer"])
        .controller('myappController', function($timeout, $q){
         var vm = this;
            vm.ShowDiv=showdiv;
            vm.$onInit=init();
            vm.contentDivs =[false,false,false,false,false];
            vm.DivPosition=[,"div2","div3","div4","div5"];
            vm.contentDivsClass=["fa-circle-o","fa-circle-o","fa-circle-o","fa-circle-o","fa-circle-o"];
            vm.contentDivsConnector = [];
            vm.Comments = [false,false,false,false,false,false,false,false];

            function init() {
                startQuotes(3000);
            }

            function startQuotes(timer) {
                $timeout(function () {
                    var rnd=Math.floor(Math.random()*vm.Comments.length);
                    vm.Comments[rnd] = true;
                    $timeout(function () {
                        vm.Comments[rnd] = false;
                        startQuotes(0);
                    },5000);
                },timer);
            }
            function showdiv(number)
            {
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
                var lastDiv= getTimelineStatus();
                if (newStatus === lastDiv && lastDiv != 0){
                    return;
                }
                else if(newStatus>=lastDiv){
                    for(var i = 0; i<=newStatus;i++)
                    {
                        vm.contentDivsClass[i] ="fa-circle timeline-reached";
                        vm.contentDivsConnector[i-1]="timeline-reached-connector";
                    }
                }
                else if(newStatus< lastDiv){
                    for(var diff = lastDiv-newStatus; diff>0;diff--){
                        vm.contentDivsClass[lastDiv]="fa-circle-o";
                        vm.contentDivsConnector[lastDiv-1] = "timeline-not-reached-connector";
                        lastDiv--;
                    }
                }
            }
            function getTimelineStatus() {
                var lastTrueDiv;
                for(var i =0; i<vm.contentDivs.length;i++){
                    if(vm.contentDivs[i] === true){
                        lastTrueDiv = i;
                    }
                }
                if(!lastTrueDiv){
                    lastTrueDiv=0;
                }
                return lastTrueDiv;
            }
            function setAllcontentDivsFalse() {
                for(var i =0; i<vm.contentDivs.length;i++){
                    vm.contentDivs[i] = false;
                }
            }
            function setAllcontentDivsClassFalse() {
                for(var i =0; i<vm.contentDivsClass.length;i++){
                    vm.contentDivsClass[i] = "fa-circle-o";
                }
            }
            function setAllcontentDivsConnectorBlack() {
                for(var i =0; i<vm.contentDivsConnector.length;i++){
                    vm.contentDivsConnector[i] = "timeline-not-reached-connector";
                }
            }
    });
})();