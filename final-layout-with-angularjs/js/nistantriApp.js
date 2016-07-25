var nistantriApp = angular.module("nistantriApp", ['ngRoute']);
nistantriApp.config(function($routeProvider){
    $routeProvider.when("/",{templateUrl: "views/banner.html",
                            controller: "homecontroller"});
    
});

function addactive(){
    $(".addactive").on("click",function(){
        
        $(".addactive").toggleClass("active");
    });
    
}

 function swipeme(){
        var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton:".swiper-button-next",
           prevButton:".swiper-button-prev",
           simulateTouch:true,
           autoplay:6000,
           onInit:function(){$(".caption").show(); } 
            
    }); 
     swiper.on('slideChangeStart', function () {
    $(".caption").hide(); 
});   
swiper.on('slideChangeEnd', function () {
    $(".caption").show(); 
});

    }
nistantriApp.controller("homecontroller",function($scope,$http,$timeout){
    $scope.info="Udeyandra";
      $http({method: 'POST', url: 'json/header.json'}).success(function(data) {
$scope.header = data;
    console.log(data);
});   
$http({method: 'POST', url: 'json/banner.json'}).success(function(data) {
$scope.bannerdata = data;
    console.log(data);
});
$timeout(swipeme, 6);
});
