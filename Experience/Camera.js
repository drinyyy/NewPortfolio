import * as THREE from 'three';
import Experience from "./experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from 'gsap';
import GUI from 'lil-gui';
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
        
        this.sizes.on('resize', () => {
            this.resize();
        });
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 0.7,
            (this.sizes.aspect * this.sizes.frustrum) / 0.7,
            this.sizes.frustrum / 0.4,
            -this.sizes.frustrum / 0.32,
            -50,
            50
        );
        this.orthographicCamera.position.set(20, 12, -3);
        this.orthographicCamera.rotation.set(Math.PI, Math.PI / 2, -Math.PI);
        this.scene.add(this.orthographicCamera);

        console.log('Initial Camera Properties:', this.orthographicCamera);
        console.log('Initial Sizes:', this.sizes);
    }

    

    createInvisibleCubes() {
        this.targetCubes = [];
        const cubeGeometry = new THREE.BoxGeometry(1, 3, 1.5);
        const invisibleMaterial = new THREE.MeshBasicMaterial({ visible: false });

        const aspect = this.sizes.width / this.sizes.height;
        const viewSize = this.sizes.frustrum;
    
    const cubeSettings = [
        {
            position: new THREE.Vector3(4, 16, -2.5),
            cameraPosition: new THREE.Vector3(10, 15.63, -1),
            frustum: { left: (-aspect * viewSize) / 4, right: (aspect * viewSize) / 4, top: viewSize / 2, bottom: -viewSize / 2, near: 0.1, far: 100 }
        },
        {
            position: new THREE.Vector3(4, 16, -5.1),
            cameraPosition: new THREE.Vector3(10, 15.63, -6.5),
            frustum: { left: (-aspect * viewSize) / 4, right: (aspect * viewSize) / 4, top: viewSize / 2, bottom: -viewSize / 2, near: 0.1, far: 100 }
        },
        {
            position: new THREE.Vector3(4, 16, -2.5),
            cameraPosition: new THREE.Vector3(10, 15.5, -1),
            frustum: { left: (-aspect * viewSize) / 4, right: (aspect * viewSize) / 4, top: viewSize / 2, bottom: -viewSize / 2, near: 0.1, far: 100 }
        },
        {
            position: new THREE.Vector3(4, 11, -2.2),
            cameraPosition: new THREE.Vector3(10, 10.85, -1),
            frustum: { left: (-aspect * viewSize) / 4, right: (aspect * viewSize) / 4, top: viewSize / 2, bottom: -viewSize / 2, near: 0.1, far: 100 }
        },
        {
            position: new THREE.Vector3(4, 6.2, -5),
            cameraPosition: new THREE.Vector3(10, 6.07, -6.5),
            frustum: { left: (-aspect * viewSize) / 4, right: (aspect * viewSize) / 4, top: viewSize / 2, bottom: -viewSize / 2, near: 0.1, far: 100 }
        },
    ];

        cubeSettings.forEach(setting => {
            const cube = new THREE.Mesh(cubeGeometry, invisibleMaterial);
            cube.position.copy(setting.position);
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
                    this.canvas.style.cursor = `url('public/textures/click.png'), pointer`;
                } else {
                    this.canvas.style.cursor = `url('public/textures/pointer2.png'), pointer`;
                }
            } else {
                this.canvas.style.cursor = `url('public/textures/pointer2.png'), pointer`;
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
                        near: frustum.near || this.camera.near,
                        far: frustum.far || this.camera.far,
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
        const aboutMenuPosition = new THREE.Vector3(50, 12, -3.5);
        return this.camera.position.equals(aboutMenuPosition);
    }

    attachMenuEventListeners() {
        const menuSettings = {
            "about-menu-item": {
                cameraPosition: new THREE.Vector3(50, 12, -3.5),
                frustum: { left: -8, right: 8, top: 8, bottom: -8, near: 0.1, far: 100 }
            },
            "works-menu-item": {
                cameraPosition: new THREE.Vector3(50, 0.07, -5.5),
                frustum: { left: -3, right: 3, top: 3, bottom: -3, near: 0.1, far: 1000 }
            },
            "contact-menu-item": {
                cameraPosition: new THREE.Vector3(50, 24.5, -3.5),
                frustum: { left: -7, right: 7, top: 7, bottom: -7, near: 0.1, far: 100 }
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
                        }
                    });
                });
            }
        });
    }

    resize() {
        const aspect = this.sizes.width / this.sizes.height;
        const viewSize = this.sizes.frustrum;

        console.log('Aspect Ratio:', aspect);
        console.log('View Size:', viewSize);

        this.orthographicCamera.left = (-aspect * viewSize) / 0.7;
        this.orthographicCamera.right = (aspect * viewSize) / 0.7;
        this.orthographicCamera.top = viewSize / 0.4;
        this.orthographicCamera.bottom = -viewSize / 0.32;

        this.orthographicCamera.updateProjectionMatrix();

        console.log('Resized Camera Properties:', {
            left: this.orthographicCamera.left,
            right: this.orthographicCamera.right,
            top: this.orthographicCamera.top,
            bottom: this.orthographicCamera.bottom,
            near: this.orthographicCamera.near,
            far: this.orthographicCamera.far,
            position: this.orthographicCamera.position,
        });
        console.log('New Width:', this.sizes.width);
        console.log('New Height:', this.sizes.height);
    
}

    update() {
        // Any necessary updates for the camera
    }
}
