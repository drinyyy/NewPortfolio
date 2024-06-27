

import * as THREE from 'three';
import Experience from "./experience";
import { gsap } from 'gsap';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createOrthographicCamera();
        this.setupRaycaster();
        this.createInvisibleCubes();
        this.attachMenuEventListeners();
    }

    createOrthographicCamera() {
        const frustumSizeMobile = 17;
        const frustumSizeDefault = 15;
    
        if (window.innerWidth <= 480) {
            this.frustumSize = frustumSizeMobile;
        } else {
            this.frustumSize = frustumSizeDefault;
        }
    
        this.aspect = window.innerWidth / window.innerHeight;
    
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.frustumSize * this.aspect) / 2,
            (this.frustumSize * this.aspect) / 2,
            this.frustumSize / 1,
            -this.frustumSize / 1,
            0.1,
            100
        );
    
        this.orthographicCamera.position.set(20, 10, -3.6);     
        this.orthographicCamera.rotation.set(Math.PI, Math.PI / 2, -Math.PI);
        this.scene.add(this.orthographicCamera);
        console.log(this.orthographicCamera)
    }

    createInvisibleCubes() {
        const isMobile = window.innerWidth <= 480;

        this.targetCubes = [];
        const cubeGeometry = new THREE.BoxGeometry(1, 3, 1.5);
        const invisibleMaterial = new THREE.MeshBasicMaterial({ visible: false });
    
        const cubeSettings = [
            { position: new THREE.Vector3(4, 16, -2.5), cameraPosition: new THREE.Vector3(10, 15.63, -1), zoom: isMobile ? 2 : 6 },
            { position: new THREE.Vector3(4, 16, -5.1), cameraPosition: new THREE.Vector3(10, 15.63, -6.5), zoom: isMobile ? 2.5 : 6 },
            { position: new THREE.Vector3(4, 11, -2.2), cameraPosition: new THREE.Vector3(10, 10.85, -1), zoom: isMobile ? 2.5 : 6 },
            { position: new THREE.Vector3(4, 6.2, -5), cameraPosition: new THREE.Vector3(10, 6.07, -6.5), zoom: isMobile ? 2 : 6 }
        ];
    
        cubeSettings.forEach(setting => {
            const cube = new THREE.Mesh(cubeGeometry, invisibleMaterial);
            cube.position.copy(setting.position);
            cube.userData = {
                cameraPosition: setting.cameraPosition,
                zoom: setting.zoom
            };
            this.scene.add(cube);
            this.targetCubes.push(cube);
        });
    }

    setupRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.canvas.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.camera = this.orthographicCamera;

            if (this.isCameraAtAboutMenuItem()) {
                this.raycaster.setFromCamera(this.mouse, this.camera);
                const intersects = this.raycaster.intersectObjects(this.targetCubes);

                if (intersects.length > 0) {
                    this.canvas.style.cursor = "url('/textures/click.png'), pointer";
                } else {
                    this.canvas.style.cursor = "url('/textures/pointer2.png'), pointer";
                }
            } else {
                this.canvas.style.cursor = "url('/textures/pointer2.png'), pointer";
            }
        });

        this.canvas.addEventListener('click', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.camera = this.orthographicCamera;

            if (this.isCameraAtAboutMenuItem()) {
                this.raycaster.setFromCamera(this.mouse, this.camera);
                const intersects = this.raycaster.intersectObjects(this.targetCubes);

                if (intersects.length > 0) {
                    const targetCube = intersects[0].object;
                    const cameraPosition = targetCube.userData.cameraPosition;
                    const zoom = targetCube.userData.zoom;

                    gsap.to(this.orthographicCamera.position, {
                        x: cameraPosition.x,
                        y: cameraPosition.y,
                        z: cameraPosition.z,
                        duration: 2,
                        ease: "power2.inOut"
                    });

                    gsap.to(this.camera, {
                        zoom: zoom,
                        duration: 2,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            this.camera.updateProjectionMatrix();
                        }
                    });
                }
            }
        });
    }

    isCameraAtAboutMenuItem() {
        const aboutMenuPosition = new THREE.Vector3(50, 12, -3.5); // "about-menu-item" camera position
        return this.camera.position.equals(aboutMenuPosition); 
    }

    attachMenuEventListeners() {
        const menuSettings = {
            "about-menu-item": new THREE.Vector3(50, 12, -3.5),
            "works-menu-item": new THREE.Vector3(50, 0.07, -5.5),
            "contact-menu-item": new THREE.Vector3(50, 22.5, -3.5)
        };

        Object.keys(menuSettings).forEach(menuItemId => {
            const menuItem = document.getElementById(menuItemId);
            if (menuItem) {
                menuItem.addEventListener('click', () => {
                    const cameraPosition = menuSettings[menuItemId];
                    const zoom = this.getZoomForMenuItem(cameraPosition);

                    gsap.to(this.orthographicCamera.position, {
                        x: cameraPosition.x,
                        y: cameraPosition.y,
                        z: cameraPosition.z,
                        duration: 3,
                        ease: "power2.inOut"
                    });

                    gsap.to(this.orthographicCamera, {
                        zoom: zoom,
                        duration: 3,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            this.orthographicCamera.updateProjectionMatrix();
                            console.log(this.orthographicCamera.zoom);
                        }
                    });
                });
            }
        });
    }

    getZoomForMenuItem(cameraPosition) {
        const isMobile = window.innerWidth <= 480;

        if (cameraPosition.equals(new THREE.Vector3(50, 12, -3.5))) { // About menu
            return isMobile ? 1.5 : 2;
        } else if (cameraPosition.equals(new THREE.Vector3(50, 0.07, -5.5))) { // Works menu
            return isMobile ? 1.5 : 5;
        } else if (cameraPosition.equals(new THREE.Vector3(50, 22.5, -3.5))) { // Contact menu
            return isMobile ? 1.5 : 3;
        } else if (cameraPosition.equals(new THREE.Vector3(10, 15.63, -1))) { // First cube
            return isMobile ? 2 : 6;
        } else if (cameraPosition.equals(new THREE.Vector3(10, 15.63, -6.5))) { // Second cube
            return isMobile ? 2.5 : 6;
        } else if (cameraPosition.equals(new THREE.Vector3(10, 10.85, -1))) { // Third cube
            return isMobile ? 2.5 : 6;
        } else if (cameraPosition.equals(new THREE.Vector3(10, 6.07, -6.5))) { // Fourth cube
            return isMobile ? 2 : 6;
        }
        return this.orthographicCamera.zoom; // Default to current zoom if no match
    }

    resize() {
        this.aspect = window.innerWidth / window.innerHeight;
    
        // Update the frustum size based on the new screen size
        const frustumSizeMobile = 17;
        const frustumSizeDefault = 15;
    
        if (window.innerWidth <= 480) {
            this.frustumSize = frustumSizeMobile;
        }  else {
            this.frustumSize = frustumSizeDefault;
        }
    
        // Update the camera frustum based on the new aspect ratio and frustum size
        this.orthographicCamera.left = (-this.frustumSize * this.aspect) / 2;
        this.orthographicCamera.right = (this.frustumSize * this.aspect) / 2;
        this.orthographicCamera.top = this.frustumSize / 1;
        this.orthographicCamera.bottom = -this.frustumSize / 1;
    
        // Update the zoom value based on the current camera position and screen size
        const zoom = this.getZoomForMenuItem(this.orthographicCamera.position);

        gsap.to(this.orthographicCamera, {
            zoom: zoom,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => {
                this.orthographicCamera.updateProjectionMatrix();
            },
            onComplete: () => {
                console.log('Zoom value:', this.orthographicCamera.zoom);
            }
        });
    
        // Update the projection matrix
        this.orthographicCamera.updateProjectionMatrix();
        console.log(this.orthographicCamera)
    }
    
    // Helper method to check if the camera is at a specific menu item
    isCameraAtMenuItem(position) {
        return this.orthographicCamera.position.equals(position);
    }
    
    update() {
        // Any additional updates if necessary
    }
}
