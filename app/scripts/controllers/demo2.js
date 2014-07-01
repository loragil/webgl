'use strict';

/**
 * @ngdoc function
 * @name 3djsTestApp.controller:Demo2Ctrl
 * @description
 * # Demo2Ctrl
 * Controller of the 3djsTestApp
 */
 angular.module('3djsTestApp')
 .controller('Demo2Ctrl', function ($scope) { 	
 	'use strict';

 	//main 'entities'
 	$scope.renderer = null;
 	$scope.scene = null;
 	$scope.camera = null;
 	$scope.cube = null;

	//dat.GUI control
	$scope.gui = null;
	$scope.model3d = {
		length:0
	};

 	//config options
 	$scope.config = {
		//set DOM continers selectors
		canvasContainer:'.canvasContainer',
		guiContainer:'aside',

		// set the scene dimensions
		width: 400,
		height: 300	       
	};
	$scope.config.aspect = $scope.config.width / $scope.config.height;	


	/***** functions *****/

	var Cube = function () {
		// set up the cube vars
		//var length = 50;
		this.segments = 16;
		this.length = 16;

		// create the cube's material
		this.sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});		
	};
	Cube.prototype.get = function () {
		// create a new mesh with cube geometry -
		return new THREE.Mesh(
			new THREE.BoxGeometry($scope.model3d.length, 
									$scope.model3d.length, 
									$scope.model3d.length, 
									this.segments, 
									this.segments, 
									this.segments),
			this.sphereMaterial);	
	};	

	function createCamera() {
		// set some camera attributes
		var VIEW_ANGLE = 45;
		var NEAR = 0.1;
		var FAR = 10000;

		// create a WebGL camera
		$scope.camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
			$scope.config.aspect,
			NEAR,
			FAR);

		// the camera starts at 0,0,0 so pull it back
		$scope.camera.position.z = 250;

		// and the camera
		$scope.scene.add($scope.camera);
	};

	function createLight() {
		// create a point light
		var pointLight = new THREE.PointLight(0xFFFFFF);

		// set its position
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		// add to the scene
		$scope.scene.add(pointLight);
	}

	function createGeometry() {
		/*// set up the cube vars
		//var length = 50;
		var segments = 16;

		// create the cube's material
		var sphereMaterial = new THREE.MeshLambertMaterial(
		{
			color: 0xCC0000
		});

		// create a new mesh with cube geometry -
		$scope.cube = new THREE.Mesh(
			new THREE.BoxGeometry($scope.model3d.length, $scope.model3d.length, $scope.model3d.length, segments, segments, segments),
			sphereMaterial);
		*/
		$scope.cube = new Cube().get();
		$scope.cube.rotation.x += 0.2;
		$scope.cube.rotation.y += 0.3;
		$scope.cube.rotation.z += 0.1;

		// add the cube to the scene
		$scope.scene.add($scope.cube);
	}

	function setup() {
		// start the renderer
		$scope.renderer.setSize($scope.config.width, $scope.config.height);

		// get the DOM element to attach to
		// - assume we've got jQuery to hand
		var $container = angular.element($scope.config.canvasContainer);

		// attach the render-supplied DOM element
		$container.append($scope.renderer.domElement);
	}

	function paint() {
		// draw!
		$scope.renderer.render($scope.scene, $scope.camera);
	}

	function setGUI() {
		$scope.gui = new dat.GUI({
			autoPlace: false,
			height : 5 * 32 - 1
		});

		$scope.model3d = {
			length: 50//$scope.cube.scale.x
		};

		//gui.add(params, 'width').min(128).max(256).step(16);
		var controller = $scope.gui.add($scope.model3d, 'length').min(0).max(100).step(1)/*.listen()*/;

		controller.onChange(function(value) {
		  // Fires on every change, drag, keypress, etc.
		  
		  //change model
		  $scope.cube.scale.x = value/100;
		  $scope.cube.scale.y = value/100;
		  $scope.cube.scale.z = value/100;
		  paint();

		  //update angular scope
		  $scope.model3d.length = value;
		  $scope.$apply();
		});

		/*controller.onFinishChange(function(value) {
		  // Fires on every change, drag, keypress, etc.
		  //makeMesh(value);
		  console.log("dat.GUI value: " ,value);
		  //paint();
		});*/

		angular.element($scope.config.guiContainer).append($scope.gui.domElement);
	};

	function init () {
		// create a WebGL renderer		
		$scope.renderer = new THREE.WebGLRenderer();

		// create a scene
		$scope.scene = new THREE.Scene();

		setGUI();

		createCamera();
		createLight();
		createGeometry();
		setup();
		paint();
	};


	/*function setCubeRotation(axis, val) {
        switch (axis) {
            case 'x':
                cube.rotation.x = val;
                break;
            case 'y':
                cube.rotation.y = val;
                break;
            case 'z':
                cube.rotation.z = val;
                break;
        }
    }*/

    init();

});
