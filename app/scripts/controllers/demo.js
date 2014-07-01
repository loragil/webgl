'use strict';

/**
 * @ngdoc function
 * @name 3djsTestApp.controller:DemoCtrl
 * @description
 * # DemoCtrl
 * Controller of the 3djsTestApp
 */
 angular.module('3djsTestApp')
 .controller('DemoCtrl', function ($scope) {
 	$scope.width = 50;
 	$scope.sphere1 = 50;

 	var SphereMesh = function() {
		  /*this.message = 'dat.gui';
		  this.speed = 0.8;
		  this.displayOutline = false;
		  this.explode = function() { ... };
		  // Define render logic ...*/

		  		

	    	
		};

 	/***** local variables *****/
 	var init = function () {
 		setScene();
 		makeMesh();
		setGUI();
 	};

	var setGUI = function () {
		var gui = new dat.GUI({
			autoPlace: false,
		    height : 5 * 32 - 1
		});
		var params = {
		    interation: 5000,
		    width: 50
		};

		gui.add(params, 'interation');
		//gui.add(params, 'width').min(128).max(256).step(16);
		var controller = gui.add(params, 'width').min(0).max(100).step(16);

		controller.onChange(function(value) {
		  // Fires on every change, drag, keypress, etc.
		  $scope.width = value;		  
		  console.log("$scope.width value: " ,$scope.width);
		});

		controller.onFinishChange(function(value) {
		  // Fires on every change, drag, keypress, etc.
		  //makeMesh(value);
		  console.log("dat.GUI value: " ,value);
		  paint();
		});

		angular.element('aside').append(gui.domElement);
	};

 	var setScene = function () {
	    // set the scene size
	    var WIDTH = 400,
	    HEIGHT = 300;

		// set some camera attributes
		var VIEW_ANGLE = 45,
			ASPECT = WIDTH / HEIGHT,
			NEAR = 0.1,
			FAR = 10000;

		// get the DOM element to attach to
		// - assume we've got jQuery to hand
		var CONTAINER = angular.element('.canvasContainer');

		// create a WebGL renderer, camera
		// and a scene
		$scope.renderer = new THREE.WebGLRenderer();
		$scope.camera =	new THREE.PerspectiveCamera(
			VIEW_ANGLE,
			ASPECT,
			NEAR,
			FAR);

		$scope.scene = new THREE.Scene();

		// add the camera to the scene
		$scope.scene.add($scope.camera);

		// the camera starts at 0,0,0
		// so pull it back
		$scope.camera.position.z = 300;

		// start the renderer
		$scope.renderer.setSize(WIDTH, HEIGHT);

		// attach the render-supplied DOM element
		CONTAINER.append($scope.renderer.domElement);

		// create a point light
		var pointLight = new THREE.PointLight(0xFFFFFF);

		// set its position
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		// add to the scene
		$scope.scene.add(pointLight);

		paint();
	};

	// draw!
	var paint = function () {
		$scope.renderer.render($scope.scene, $scope.camera);
	};

	var makeMesh = function (value) {
		// set up the sphere vars
		//var radius = value || 50,
		var radius = $scope.width,
	     	segments = 16,
	     	rings = 16;

		// create the sphere's material
		 var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});	

		// create a new mesh with
		// sphere geometry - we will cover
		// the sphereMaterial next!
		$scope.sphere1 = new THREE.Mesh(

		  new THREE.SphereGeometry(
		    radius,
		    segments,
		    rings),

		  sphereMaterial);

		/*// set the geometry to dynamic
		// so that it allow updates
		sphere.geometry.dynamic = true;

		// changes to the vertices
		sphere.geometry.verticesNeedUpdate = true;

		// changes to the normals
		sphere.geometry.normalsNeedUpdate = true;*/

		// add the sphere to the scene
		$scope.scene.add($scope.sphere1);

		paint();
	};


	/***** scope variables *****/
	$scope.scene = null;
	$scope.camera = null;

	/***** functions *****/

	init();
});
