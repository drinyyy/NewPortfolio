import * as THREE from 'three';
import Experience from './experience';
import gsap from 'gsap';

export default class Sign {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera; // Ensure correct camera reference
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.sign = this.resources.items.sign;
        this.actualSign = this.sign.scene;
        this.videos = {
            video1: this.createVideoTexture('/textures/girlbox.mp4'),
            video2: this.createVideoTexture('/textures/library-kosova.mp4'),
            image: this.createImageTexture('/textures/comingsoon.png'), // Change to image texture
        };
        this.projectItems = document.querySelectorAll('.project-item1, .project-item2, .project-item3');
        this.targetPosition = new THREE.Vector3(50, 0.07, -5.5); // Target camera position
        this.currentlyVisibleIndex = null;
        this.setModel();
        this.setInvisibleCubes();
        this.setRaycaster();
    }

    createVideoTexture(src) {
        const video = document.createElement('video');
        video.src = src;
        video.loop = true;
        video.muted = true; // Ensure the video is muted
        video.playsInline = true; // For iOS compatibility
        video.crossOrigin = 'anonymous'; // Ensure cross-origin is allowed
        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat; // Use RGBAFormat for compatibility
        return { video, texture };
    }

    createImageTexture(src) {
        const texture = new THREE.TextureLoader().load(src);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat; // Use RGBAFormat for compatibility
        texture.flipY = false;
        return texture;
    }

    setModel() {
        this.actualSign.traverse((child) => {
            if (child.isMesh) {
                // Custom behavior for each mesh
            }
            if (child.name === 'signn') {
                child.material = new THREE.MeshBasicMaterial({ color: 0xEEDC82 });
                child.position.x = 2;
            }
            if (child.name === 'signn_1') {
                this.signn1 = child;
                child.material = new THREE.MeshBasicMaterial({  });
                child.position.x = 2;
            }
        });
        this.actualSign.scale.set(1, 2, 1);
        this.actualSign.position.set(-0.2, -5.02, -7.7);
        this.scene.add(this.actualSign);
    }

    setInvisibleCubes() {
        this.invisibleCubes = [];
        // Define custom positions and sizes for each invisible cube
        const cubeData = [
            { position: { x: 4, y: 0.2, z: -3.25 }, size: { x: 1, y: 1.4, z: 0.7 } },
            { position: { x: 4, y: 0, z: -4.3 }, size: { x: 1, y: 1, z: 0.9 } },
            { position: { x: 4, y: 0.5, z: -5.22 }, size: { x: 1, y: 1, z: 0.9 } },
        ];
        cubeData.forEach(data => {
            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(data.size.x, data.size.y, data.size.z),
                new THREE.MeshBasicMaterial({ color: 0x5a859d, transparent: true, opacity: 0 }) // Ensure the cubes are invisible
            );
            cube.position.set(data.position.x, data.position.y, data.position.z);
            this.scene.add(cube);
            this.invisibleCubes.push(cube);
        });
    }

    setRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        window.addEventListener('click', (event) => {
            if (this.camera.orthographicCamera.position.equals(this.targetPosition)) {
                this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                this.raycaster.setFromCamera(this.mouse, this.camera.orthographicCamera);
                const intersects = this.raycaster.intersectObjects(this.invisibleCubes);
                console.log('Intersects:', intersects); // Log the intersects
                if (intersects.length > 0) {
                    const clickedCube = intersects[0].object;
                    console.log('Clicked cube:', clickedCube); // Log the clicked cube
                    this.changeTexture(clickedCube);
                } else {
                    console.log('No intersects');
                }
            } else {
                // If camera is not at target position, fade out all project items
                this.hideAllProjectItems();
                
            }
        });
    }

    async changeTexture(cube) {
        const index = this.invisibleCubes.indexOf(cube);
        console.log('Cube index:', index); // Log the index of the cube
    
        // Rotate before changing the texture
        gsap.to(this.signn1.rotation, { y: Math.PI, duration: 0.5, onComplete: async () => {
            if (index === 0) {
                console.log('Changing to video 1'); // Log the video change
                await this.playVideo(this.videos.video1.video);
                this.signn1.material.map = this.videos.video1.texture;
            } else if (index === 1) {
                console.log('Changing to video 2'); // Log the video change
                await this.playVideo(this.videos.video2.video);
                this.signn1.material.map = this.videos.video2.texture;
            } else if (index === 2) {
                console.log('Changing to image texture'); // Log the texture change
                this.signn1.material.map = this.videos.image;
            }
            this.signn1.material.needsUpdate = true;
            
            // Rotate back after changing the texture
            gsap.to(this.signn1.rotation, { y: 0, duration: 0.5 });
            console.log('Texture updated:', this.signn1.material.map); // Log the updated texture
            
            // Show the corresponding project item
            this.showProjectItem(index);
        }});
    }
    
    playVideo(video) {
        return new Promise((resolve, reject) => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Video is playing'); // Log when the video starts playing
                    resolve();
                }).catch((error) => {
                    console.error('Video play error:', error);
                    resolve(); // Continue even if video playback fails
                });
            } else {
                resolve(); // If playPromise is undefined, resolve immediately
            }
        });
    }

    showProjectItem(index) {
        this.projectItems.forEach((item, i) => {
            if (i === index) {
                gsap.to(item, { duration: 0.5, opacity: 1, display: 'block' });
                item.classList.add('show');
                item.classList.remove('hide');
                this.currentlyVisibleIndex = index;
            } else {
                gsap.to(item, { duration: 0.5, opacity: 0, display: 'none', onComplete: () => item.classList.add('hide') });
                item.classList.remove('show');
            }
        });
    }

    hideAllProjectItems() {
        this.projectItems.forEach(item => {
            gsap.to(item, { duration: 0.5, opacity: 0, display: 'none', onComplete: () => item.classList.add('hide') });
            item.classList.remove('show');
        });
        this.currentlyVisibleIndex = null;
    }

    setupMenu() {
        const aboutMenuItem = document.getElementById('about-menu-item');
        const contactMenuItem = document.getElementById('contact-menu-item');

        aboutMenuItem.addEventListener('click', () => {
            this.hideAllProjectItems();
        });

        

        contactMenuItem.addEventListener('click', () => {
            this.hideAllProjectItems();
        });
    }
    setAnimation() {}

    resize() {}

    update() {}
}
