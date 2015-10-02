var App = angular.module('App', ['ngRoute','controllers', 'door3.css','ui.bootstrap']);


App.config(function($routeProvider){
	$routeProvider
		.when('/',
			{
				controller: 'homeCtrl',
				templateUrl: 'partials/home.html',
				css: 'css/style.css'
			})
		.when('/dictionary',
			{
				controller: 'dictionaryCtrl',
				templateUrl: 'partials/dictionary.html',
				css: 'css/style.css'
			})
		.when('/dictionary/:letter',
			{
				controller: 'dictionaryCtrl',
				templateUrl: 'partials/dictionary.html',
				css: 'css/style.css'
			})
		.when('/mgrdictionary',
			{
				controller: 'mgrdictionaryCtrl',
				templateUrl: 'partials/mgr_dictionary.html',
				css: 'css/style.css'
			})
		.when('/mgrdictionary/:letter',
			{
				controller: 'mgrdictionaryCtrl',
				templateUrl: 'partials/mgr_dictionary.html',
				css: 'css/style.css'
			})
		.when('/playground',
			{
				controller: 'playgroundCtrl',
				templateUrl: 'partials/playground.html',
				css: 'css/style.css'
			})
		.when('/grammar',
			{
				controller: 'grammarCtrl',
				templateUrl: 'partials/grammar.html',
				css: 'css/style.css'
			})
		.otherwise({ redirectTo: '/' });
})
