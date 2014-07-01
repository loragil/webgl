'use strict';

/**
 * @ngdoc function
 * @name 3djsTestApp.controller:Demo2Ctrl
 * @description
 * # Demo2Ctrl
 * Controller of the 3djsTestApp
 */
 angular.module('3djsTestApp')
 .controller('Demo3Ctrl',  function ($scope) { 	
 	'use strict';

 	//main 'entities'
 	$scope.renderer = null;
 	$scope.scene = null;
 	$scope.camera = null;
 	$scope.pathToModel = './model/knight.js';
 	$scope.skinnedMesh = null;

 	$scope.config = {
 		canvasWidth: 400,
 		canvasHeight: 400,
 		dofillcontainer: true,
 		scale: 15,
 		materialType: 'lambert'
 	};

 	function init () {
 		/*var loader = new THREE.JSONLoader;
 		var animation;

 		loader.load($scope.pathToModel, function (geometry, materials) {
 			$scope.skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
 			//$scope.skinnedMesh.position.y = 50;
 			//$scope.skinnedMesh.scale.set(15, 15, 15);
 			
 			//scene.add($scope.skinnedMesh);
 			//animate($scope.skinnedMesh);
			$scope.$apply();

 			console.log($scope.skinnedMesh);
 		});*/
 	};

 	init();
 });
