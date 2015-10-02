var App = angular.module('factorys', []);


/*
///Quick links menu
App.factory('Links', function() {
var items = {};
items.query = function() {
	return [
		{ref: '#/knowledgebase', text: 'Knowledge Base'},
		{ref: '#/connecttemplates', text: 'Connect Templates'},
		{ref: '#/querybuilder', text: 'Query Builder'},
		{ref: '#/queryselector', text: 'Query Selector'},
		{ref: 'https://connect.selligent.com', text: 'Connect'},
		{ref: 'https://clprtgl01.selligent.com/public/login.htm', text: 'PRTG'},
		{ref: 'https://watchdog.emsecure.net:39803/', text: 'Watchdog'},
		{ref: 'https://grid.emsecure.net/gridcontrol/default.aspx', text: 'Gridcontrol'},
		{ref: 'https://grid.emsecure.net/gridcontrol/monitoring.aspx', text: 'Grid Monitoring'}

	];
};
return items;
});