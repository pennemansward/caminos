var App = angular.module('controllers', ['ui.bootstrap']);

App.controller('homeCtrl', function($scope, $http){
	$scope.header = "Home";
	$http.get('/menuList').success(function(response){
        $scope.menuList = response;
	});
	$http.get('/chapterList').success(function(response){
        $scope.chapterList = sliceItems(response, 2);
	});
});

App.controller('dictionaryCtrl', function($scope, $http, $routeParams){
	$scope.header = "Dictionary";
	$scope.alphabet= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AZ'];
	$scope.letter = $routeParams.letter;

	$http.get('/menuList').success(function(response){
        $scope.menuList = response;
	});
	$http.get('/dictionary').success(function(response){
		if ($scope.letter != 'AZ') {
			var index;
			var array = [];
			for (index = 0; index < response.length; index++) {
				if (response[index].espagnol.substring(0,1).toUpperCase() == $scope.letter) {
					array.push(response[index]);
				}; 			
			}
	        $scope.dictionary = sliceItems(array, 3);
	    }else{
	    	$scope.dictionary = sliceItems(response, 3);
	    }
	});
});

App.controller('mgrdictionaryCtrl', function($scope, $http, $routeParams){
	$scope.header = "Dictionary Manager";
	$scope.alphabet= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AZ'];
	$scope.letter = $routeParams.letter;
	$scope.editing=0;
	$scope.allowadd=1;

	var refresh = function(){
		$http.get('/menuList').success(function(response){
	        $scope.menuList = response;
		});
		$http.get('/dictionary').success(function(response){
			if ($scope.letter != 'AZ') {
				var index;
				var array = [];
				for (index = 0; index < response.length; index++) {
					if (response[index].espagnol.substring(0,1).toUpperCase() == $scope.letter) {
						array.push(response[index]);
					}; 			
				}
		        $scope.dictionary = array;
		    }else{
		    	$scope.dictionary = response;
		    }
		});
	};

	refresh();

	$scope.add=function(){
    	$http.post('/dictionary',$scope.word).success(function(response){
      		refresh();
    	});
  	};

  	$scope.remove=function(id){
    	$http.delete('/dictionary/' + id).success(function(response){
      		refresh();
    	});
  	};

	$scope.edit=function(id){
	    $http.get('/dictionary/' + id).success(function(response){
	        $scope.word = response;
	        $scope.editing=1;
	        $scope.allowadd=0;
	    });
	};

	$scope.update=function(){
	    $http.put('/dictionary/' + $scope.word._id, $scope.word).success(function(response){
	        refresh();
	        $scope.word=[];
	        $scope.editing=0;
	        $scope.allowadd=1;
	    });
	};

	$scope.clear=function(){
			$scope.word=[];
	        $scope.editing=0;
	        $scope.allowadd=1;
	};
});

App.controller('playgroundCtrl', function($scope, $http, $routeParams){
	$scope.header = "Dictionary";
	$scope.espagnol=true;
	$scope.dutch=false;
	$scope.language="espagnol";
	var a, b;

	$http.get('/menuList').success(function(response){
        $scope.menuList = response;
	});
	$http.get('/dictionary').success(function(response){
	    $scope.dictionary = shuffleArray(response);
	});

	$scope.check = function(question, answer, index){
		if (question.toLowerCase() == answer.toLowerCase()) {
			var a = document.getElementById('tabelleke');
			var b = a.getElementsByTagName('tr');
			b[index+1].setAttribute("class", "has-success has-feedback");
			$scope.nocheck=true;
		}else{
			var a = document.getElementById('tabelleke');
			var b = a.getElementsByTagName('tr');
			b[index+1].setAttribute("class", "has-error");
		}
	};

	$scope.changelanguage = function(newlang){
		$scope.language = newlang;
	};
});

App.controller('grammarCtrl', function($scope, $http){
	$scope.header = "Grammar";
	$http.get('/menuList').success(function(response){
        $scope.menuList = response;
	});
});

function sliceItems (itemQuery, count){
	var itemTemp = [];
	var itemArray = [];
		for(var i=0; i<itemQuery.length; i+=count){
			itemTemp = itemQuery.slice (i, i+count);
			itemArray.push(itemTemp);
		};
		return itemArray;
};

function shuffleArray (array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};