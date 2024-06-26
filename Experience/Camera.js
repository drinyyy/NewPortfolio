import * as THREE from 'three';
import Experience from "./experience";
import { gsap } from 'gsap';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.currentFrustum = { left: -7.5, right: 7.5, top: 16, bottom: -16, near: 0.1, far: 100 };
        this.createOrthographicCamera();
        this.setupRaycaster();
        this.createInvisibleCubes();
        this.attachMenuEventListeners();

       
    }

    // 
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
        
        // Initial Camera Position and Fustrum
        this.orthographicCamera.position.set(20, 10, -3.6);     
        this.orthographicCamera.rotation.set(Math.PI, Math.PI / 2, -Math.PI);
        this.scene.add(this.orthographicCamera);
        // final y axis should be 10
       
        
    
        // console.log("Portrait initial orthographic camera frustum:", {
        //     left: this.orthographicCamera.left,
        //     right: this.orthographicCamera.right,
        //     top: this.orthographicCamera.top,
        //     bottom: this.orthographicCamera.bottom,
        //     aspect: this.aspect
        // });
    }
    
    
    

    createInvisibleCubes() {
        const isMobile = window.innerWidth <= 400;
        this.targetCubes = [];
        const cubeGeometry = new THREE.BoxGeometry(1, 3, 1.5);
        const invisibleMaterial = new THREE.MeshBasicMaterial({ visible: false });
    
        const cubeSettings = [
            {
                position: new THREE.Vector3(4, 16, -2.5),
                cameraPosition: isMobile 
                    ? new THREE.Vector3(10, 15.63, -1)
                    : new THREE.Vector3(10, 15.63, -1),
                frustum: isMobile 
                    ? { left: -1.8, right: 2.24, top: 6.7, bottom: -2.78, near: 0.1, far: 100 }
                    : { left: -2.5, right: 2.5, top: 2.5, bottom: -2.5, near: 0.1, far: 100 }
            },
            {
                position: new THREE.Vector3(4, 16, -5.1),
                cameraPosition: isMobile 
                    ? new THREE.Vector3(10, 15.63, -6.5)
                    : new THREE.Vector3(10, 15.63, -6.5),
                frustum: isMobile 
                    ? { left: -2.04, right: 1.88, top: 5.12, bottom: -2.78, near: 0.1, far: 100 }
                    : { left: -2.5, right: 2.5, top: 2.5, bottom: -2.5, near: 0.1, far: 100 }
            },
            {
                position: new THREE.Vector3(4, 16, -2.5),
                cameraPosition: isMobile 
                    ? new THREE.Vector3(10, 15.5, -1)
                    : new THREE.Vector3(10, 15.5, -1),
                frustum: isMobile 
                    ? { left: -0.82, right: 1.64, top: 2.9, bottom: -2.54, near: 0.1, far: 100 }
                    : { left: -2.5, right: 2.5, top: 2.5, bottom: -2.5, near: 0.1, far: 100 }
            },
            {
                position: new THREE.Vector3(4, 11, -2.2),
                cameraPosition: isMobile 
                    ? new THREE.Vector3(10, 10.85, -1)
                    : new THREE.Vector3(10, 10.85, -1),
                frustum: isMobile 
                    ? { left: -0.82, right: 1.64, top: 2.9, bottom: -2.54, near: 0.1, far: 100 }
                    : { left: -2.5, right: 2.5, top: 2.5, bottom: -2.5, near: 0.1, far: 100 }
            },
            {
                position: new THREE.Vector3(4, 6.2, -5),
                cameraPosition: isMobile 
                    ? new THREE.Vector3(10, 6.07, -6.5)
                    : new THREE.Vector3(10, 6.07, -6.5),
                frustum: isMobile 
                    ? { left: -2.04, right: 1.16, top: 2.9, bottom: -2.5, near: 0.1, far: 100 }
                    : { left: -2.5, right: 2.5, top: 2.5, bottom: -2.5, near: 0.1, far: 100 }
            }
        ];
    
        cubeSettings.forEach(setting => {
            const cube = new THREE.Mesh(cubeGeometry, invisibleMaterial);
            cube.position.copy(setting.position);
            if (setting.scale) {
                cube.scale.copy(setting.scale);
            }
            cube.userData = {
                cameraPosition: setting.cameraPosition,
                frustum: setting.frustum
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
                    const frustum = targetCube.userData.frustum;
    
                    gsap.to(this.camera.position, {
                        x: cameraPosition.x,
                        y: cameraPosition.y,
                        z: cameraPosition.z,
                        duration: 2,
                        ease: "power2.inOut"
                    });
    
                    gsap.to(this.camera, {
                        left: frustum.left,
                        right: frustum.right,
                        top: frustum.top,
                        bottom: frustum.bottom,
                        near: frustum.near || this.nearPlane,
                        far: frustum.far || this.farPlane,
                        duration: 2,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            this.camera.updateProjectionMatrix();
                        }
                    });
    
                    this.currentFrustum = frustum;
                }
            }
        });
    }

    isCameraAtAboutMenuItem() {
        const aboutMenuPosition = new THREE.Vector3(50, 12, -3.5); // "about-menu-item" camera position
        return this.camera.position.equals(aboutMenuPosition); 
    }

    
    attachMenuEventListeners() {
        const isMobile = window.innerWidth <= 480;
    
        const menuSettings = {
            "about-menu-item": {
                cameraPosition: new THREE.Vector3(50, 12, -3.5),
                frustum: isMobile 
                    ? { left: -2.5, right: 2.8, top: 10, bottom: -10, near: 0.1, far: 100 } 
                    : { left: -9, right: 9, top: 9, bottom: -9, near: 0.1, far: 100 }
                    
            },
            "works-menu-item": {
                cameraPosition: new THREE.Vector3(50, 0.07, -5.5),
                frustum: isMobile 
                    ? { left: -4, right: 3, top: 8, bottom: -4, near: 0.1, far: 1000 }
                    : { left: -3, right: 3, top: 3, bottom: -3, near: 0.1, far: 1000 }
            },
            "contact-menu-item": {
                cameraPosition: new THREE.Vector3(50, 22.5, -3.5),
                frustum: isMobile 
                    ? { left: -3.12, right: 3.12, top: 7, bottom: -7, near: 0.1, far: 100 }
                    : { left: -4, right: 4, top: 4, bottom: -4, near: 0.1, far: 100 }
            }
        };
    
        Object.keys(menuSettings).forEach(menuItemId => {
            const menuItem = document.getElementById(menuItemId);
            if (menuItem) {
                menuItem.addEventListener('click', () => {
                    const settings = menuSettings[menuItemId];
                    const { cameraPosition, frustum } = settings;
    
                    gsap.to(this.orthographicCamera.position, {
                        x: cameraPosition.x,
                        y: cameraPosition.y,
                        z: cameraPosition.z,
                        duration: 3,
                        ease: "power2.inOut"
                    });
    
                    gsap.to(this.orthographicCamera, {
                        left: frustum.left,
                        right: frustum.right,
                        top: frustum.top,
                        bottom: frustum.bottom,
                        near: frustum.near,
                        far: frustum.far,
                        duration: 3,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            this.orthographicCamera.updateProjectionMatrix();
                            // console.log("Updating orthographic camera frustum:", {
                            //     left: this.orthographicCamera.left,
                            //     right: this.orthographicCamera.right,
                            //     top: this.orthographicCamera.top,
                            //     bottom: this.orthographicCamera.bottom,
                            //     near: this.orthographicCamera.near,
                            //     far: this.orthographicCamera.far
                            // });
                        }
                    });
    
                    this.currentFrustum = frustum;
                });
            }
        });
    }


    resize() {
        this.aspect = window.innerWidth / window.innerHeight;
        
        
        // Update the camera frustum based on the new aspect ratio and initial frustum size
        this.orthographicCamera.left = (-this.frustumSize * this.aspect) / 2;
        this.orthographicCamera.right = (this.frustumSize * this.aspect) / 2;
        this.orthographicCamera.top = this.frustumSize /1;
        this.orthographicCamera.bottom = -this.frustumSize /1;
    
        // Update the projection matrix
        this.orthographicCamera.updateProjectionMatrix();
    
        // console.log("Portrait - orthographic camera frustum values after resize", {
        //     left: this.orthographicCamera.left,
        //     right: this.orthographicCamera.right,
        //     top: this.orthographicCamera.top,
        //     bottom: this.orthographicCamera.bottom,
        //     aspect: this.aspect
        // });
        // console.log(window.innerHeight)
        // console.log(window.innerWidth)
    }
    

    update() {
        
    }
}
