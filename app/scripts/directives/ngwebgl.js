/**
 * @ngdoc directive
 * @name 3djsTestApp.directive:ngWebgl
 * @description
 * # ngWebgl
 */
 angular.module('3djsTestApp')
 .directive('ngWebgl', function () {
 	'use strict';

 	return {
 		restrict: 'A',

 		scope: {
 			'pathToModel': '=',
 			'ngModel': '=',
 			'width': '=',
 			'height': '=',
 			'fillcontainer': '=',
 			'scale': '=',
 			'materialType': '='
 		},

 		link: function postLink(scope, element, attrs) {
 			var camera, scene, renderer, shadowMesh, light,
 			mouseX = 0,
 			mouseY = 0,
 			contW = (scope.fillcontainer) ? element[0].clientWidth : scope.width,
 			contH = scope.height,
 			windowHalfX = contW / 2,
 			windowHalfY = contH / 2,
 			materials = {},
 			loader = new THREE.JSONLoader,
 			animation,
 			prevTime = Date.now();
 			

 			//if model is invalid - do nothing
 			if(!scope.pathToModel){return;}

 			scope.init = function () { 				
                    // Camera
                    camera = new THREE.PerspectiveCamera(20, contW / contH, 1, 10000);
                    camera.position.z = 1800;

                    // Scene
                    scene = new THREE.Scene();

                    // Ligthing
                    light = new THREE.DirectionalLight(0xffffff);
                    light.position.set(0, 0, 1);
                    scene.add(light);

                    // Shadow
                    var canvas = document.createElement('canvas');
                    canvas.width = 128;
                    canvas.height = 128;

                    // Render a 2d gradient to use as shadow
                    var context = canvas.getContext('2d');
                    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

                    gradient.addColorStop(0.1, 'rgba(200,200,200,1)');
                    gradient.addColorStop(1, 'rgba(255,255,255,1)');

                    context.fillStyle = gradient;
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    var shadowTexture = new THREE.Texture(canvas);
                    shadowTexture.needsUpdate = true;

                    var shadowMaterial = new THREE.MeshBasicMaterial({
                    	map: shadowTexture
                    });
                    //var shadowGeo = new THREE.PlaneGeometry(300, 300, 1, 1);
                    var shadowGeo = new THREE.PlaneGeometry(15, 15, 10, 10);

                    // Apply the shadow texture to a plane
                    shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
                    //shadowMesh.position.y = -250;
                    shadowMesh.position.y = -100;
                    //shadowMesh.position.y = THREE.GeometryUtils.center(scope.skinnedMesh.geometry).y-250;
                    shadowMesh.rotation.x = -Math.PI / 2;
                    scene.add(shadowMesh);

                    materials.lambert = new THREE.MeshLambertMaterial({
                    	color: 0xffffff,
                    	shading: THREE.FlatShading,
                    	vertexColors: THREE.VertexColors
                    });

                    materials.phong = new THREE.MeshPhongMaterial({
                    	ambient: 0x030303,
                    	color: 0xdddddd,
                    	specular: 0x009900,
                    	shininess: 30,
                    	shading: THREE.FlatShading,
                    	vertexColors: THREE.VertexColors
                    });

                    materials.wireframe = new THREE.MeshBasicMaterial({
                    	color: 0x000000,
                    	shading: THREE.FlatShading,
                    	wireframe: true,
                    	transparent: true
                    });

                    // set initial state of skinnedMesh
                    /*var meshCenter = THREE.GeometryUtils.center(scope.skinnedMesh.geometry);
                    scope.skinnedMesh.position.x = meshCenter.x;
                    scope.skinnedMesh.position.y = meshCenter.y;
                    scope.skinnedMesh.position.z = meshCenter.z;*/
                    scope.skinnedMesh.position.y = 0;
                    scope.skinnedMesh.rotation.x = 0;
                    scope.skinnedMesh.scale.set(15, 15, 15);                    

                    // add the skinnedMesh to the scene
					scene.add(scope.skinnedMesh);

                    //scope.animate2();

					//detect webGL support
					var webgl = ( function () { 
						try { 
							return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); 
						} catch( e ) {
							return false; 
						} 
					})();

					renderer = webgl ? new THREE.WebGLRenderer({antialias:true}) : new THREE.CanvasRenderer();
					
					renderer.setClearColor(0xffffff);
					renderer.setSize(contW, contH);

                    // element is provided by the angular directive
                    element[0].appendChild(renderer.domElement);

                    document.addEventListener('mousemove', scope.onDocumentMouseMove, false);
                    window.addEventListener('resize', scope.onWindowResize, false);
                };


                // -----------------------------------
                // Event listeners
                // -----------------------------------

                scope.onWindowResize = function () {
                	scope.resizeCanvas();
                };

                scope.onDocumentMouseMove = function (event) {
                	mouseX = (event.clientX - windowHalfX);
                	mouseY = (event.clientY - windowHalfY);
                };


                // -----------------------------------
                // Updates
                // -----------------------------------

                scope.resizeCanvas = function () {
                	contW = (scope.fillcontainer) ?
                	element[0].clientWidth : scope.width;
                	contH = scope.height;

                	windowHalfX = contW / 2;
                	windowHalfY = contH / 2;

                	camera.aspect = contW / contH;
                	camera.updateProjectionMatrix();

                	renderer.setSize(contW, contH);
                };

                scope.resizeObject = function () {
                	scope.skinnedMesh.scale.set(scope.scale, scope.scale, scope.scale);
                	shadowMesh.scale.set(scope.scale, scope.scale, scope.scale);
                };

                scope.changeMaterial = function () {
                	scope.skinnedMesh.material = materials[scope.materialType];
                };


                // -----------------------------------
                // Draw and Animate
                // -----------------------------------
                scope.animate2 = function() {
                	var materials = scope.skinnedMesh.material.materials;

                	for (var k in materials) {
                		materials[k].skinning = true;
                	}

                	THREE.AnimationHandler.add(scope.skinnedMesh.geometry.animation);
                	animation = new THREE.Animation(scope.skinnedMesh, "Action", THREE.AnimationHandler.CATMULLROM);
                	animation.play();
                };

                scope.animate = function () {
                	requestAnimationFrame(scope.animate);
                	scope.render();
                };

                scope.render = function () {
                	camera.position.x += (mouseX - camera.position.x) * 0.05;
                    // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
                    camera.lookAt(scene.position);					
                    renderer.render(scene, camera);
                };


                // -----------------------------------
                // Watches
                // -----------------------------------

                scope.$watch('fillcontainer + width + height', function () {
                	if(!scope.skinnedMesh){return;}
                	scope.resizeCanvas();
                });

                scope.$watch('scale', function () {
                	if(!scope.skinnedMesh){return;}
                	scope.resizeObject();
                });

                scope.$watch('materialType', function () {
                	if(!scope.skinnedMesh){return;}
                	scope.changeMaterial();
                });

                scope.load3DModel = function () {
					//load 3D model from external src and initialize it 			
					loader.load(scope.pathToModel, function (geometry, materials) {
						scope.skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));						
						
						console.log(scope.skinnedMesh);
						
						// Begin
						scope.init();
						scope.animate();
					});
				};



                /*// Begin
                scope.init();
                scope.animate();*/
                scope.load3DModel();
            }
        };

    });