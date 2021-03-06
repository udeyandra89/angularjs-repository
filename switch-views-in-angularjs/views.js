
// module creation
	var nistantriApp = angular.module('nistantriApp', ['ngRoute']);

	// routes
	nistantriApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'partials/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'partials/about.html',
				controller  : 'aboutController'
			})

			// route for the service page
			.when('/service', {
				templateUrl : 'partials/services.html',
				controller  : 'serviceController'
			})
            .when('/textarea', {
				templateUrl : 'partials/textarea.html',
				controller  : 'myappcon'
			});
	
	});

	// create the controller and inject Angular's $scope
	nistantriApp.controller('mainController', function($scope,$timeout) {
		// create a message to display in our view
		$scope.info = 'Welcome to Nistantri';
       // $timeout(highchartser,1000);
        $scope.chartgr = $('#container').highcharts({
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
        
        //datepicker
      $( "#datepicker" ).datepicker();
        //names
          $scope.names = [
        {name:'Jani',country:'Norway'},
        {name:'Carl',country:'Sweden'},
        {name:'Margareth',country:'England'},
        {name:'Hege',country:'Norway'},
        {name:'Joe',country:'Denmark'},
        {name:'Gustav',country:'Sweden'},
        {name:'Birgit',country:'Denmark'},
        {name:'Mary',country:'England'},
        {name:'Kai',country:'Norway'}
        ];           
  
	});

	nistantriApp.controller('aboutController', function($scope) {
		$scope.info = 'About Nistantri';
              $scope.videos = [
        {videolink:'partials/videos/myvideo.mp4'}
        ];  
	});

	nistantriApp.controller('serviceController', function($scope) {
		$scope.info = 'Building E-learning Authoring tool';
	});


