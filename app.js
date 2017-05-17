(function() {
    angular.module('myapp', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])
        .controller('myappController', function($timeout, $q){
         var vm = this;
            vm.ShowDiv=showdiv;
            vm.$onInit=init(10000);
            vm.Divs =[false, false,false,false,false];
            vm.DivPosition=[,"div2","div3","div4","div5"];
            vm.DivsClass=["fa-circle-o","fa-circle-o","fa-circle-o","fa-circle-o","fa-circle-o"];
            vm.DivsConnector = [];
            vm.Comments = [false,false];

            function init(oldComment) {
                    $timeout(function () {
                        do
                            var rnd=Math.floor(Math.random()*vm.Comments.length);
                        while(rnd ===oldComment);
                            vm.Comments[rnd] = true;
                            $timeout(function () {
                                vm.Comments[rnd] = false;
                                init(rnd);
                            },5000);
                        },3000);
            }

            function showdiv(number)
            {
                setTimeline(number);
                setAllDivsFalse();
                vm.Divs[number] = true;
            }
            function resetTimeline() {
                setAllDivsFalse();
                setAllDivsClassFalse();
                setAllDivsConnectorBlack();
            }
            function setTimeline(newStatus) {
                var lastDiv= getTimelineStatus();
                if (newStatus === lastDiv && lastDiv != 0){
                    return;
                }
                else if(newStatus>=lastDiv){
                    for(var i = 0; i<=newStatus;i++)
                    {
                        vm.DivsClass[i] ="fa-circle timeline-reached";
                        vm.DivsConnector[i-1]="timeline-reached-connector";
                    }
                }
                else if(newStatus< lastDiv){
                    for(var diff = lastDiv-newStatus; diff>0;diff--){
                        vm.DivsClass[lastDiv]="fa-circle-o";
                        vm.DivsConnector[lastDiv-1] = "timeline-not-reached-connector";
                        lastDiv--;
                    }
                }
            }
            function getTimelineStatus() {
                var lastTrueDiv;
                for(var i =0; i<vm.Divs.length;i++){
                    if(vm.Divs[i] === true){
                        lastTrueDiv = i;
                    }
                }
                if(!lastTrueDiv){
                    lastTrueDiv=0;
                }
                return lastTrueDiv;
            }
            function setAllDivsFalse() {
                for(var i =0; i<vm.Divs.length;i++){
                    vm.Divs[i] = false;
                }
            }
            function setAllDivsClassFalse() {
                for(var i =0; i<vm.DivsClass.length;i++){
                    vm.DivsClass[i] = "fa-circle-o";
                }
            }
            function setAllDivsConnectorBlack() {
                for(var i =0; i<vm.DivsConnector.length;i++){
                    vm.DivsConnector[i] = "timeline-not-reached-connector";
                }
            }
    });
})();