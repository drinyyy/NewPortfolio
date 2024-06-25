import * as THREE from "three";
import Experience from "./experience";
import gsap from 'gsap';
import GUI from 'lil-gui';

export default class Rooms2 {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.rooms2 = this.resources.items.rooms2;
        this.actualRoom2 = this.rooms2.scene;

        this.setModel2();
        this.tvModel();
        this.setAnimation();
        // this.setupGUI();
        this.setupMouseMove();
    }

    getRandomColor() {
        return Math.floor(Math.random() * 16777215); // Generate a random color
    }

    darkenColor(color, factor) {
        const r = Math.floor((color >> 16) * factor);
        const g = Math.floor(((color >> 8) & 0x00FF) * factor);
        const b = Math.floor((color & 0x0000FF) * factor);
        return (r << 16) + (g << 8) + b;
    }

    setModel2() {
        let colorCube005_2 = this.getRandomColor();
        this.actualRoom2.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
            if (child.name === "Cube005_2" && child.parent && child.parent.name === "room2") {
                child.material = new THREE.MeshStandardMaterial({ color: colorCube005_2 });
            }

            if (child.name === "Cube005_3" && child.parent && child.parent.name === "room2") {
                const darkerColor = this.darkenColor(colorCube005_2, 0.7); // Darken by 40%
                child.material = new THREE.MeshStandardMaterial({ color: darkerColor });
            }

            if (child.name === "Cube005" && child.parent && child.parent.name === "room2") {
                const darkerColor = this.darkenColor(colorCube005_2, 0.8); // Darken by 40%
                child.material = new THREE.MeshStandardMaterial({ color: darkerColor });
            }
            if (child.uuid === '11bdad33-7f85-496c-a845-ea8bd826898b') {
                const newMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                child.material = newMaterial;
                
            }
            if (child.uuid === '0f7dd301-3a12-468e-b3e2-d4f5b8de8227') {
                const newMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                child.material = newMaterial;
            }
            if (child.name === "Cube005_1" && child.parent && child.parent.name === "room2") {
                const material = new THREE.MeshStandardMaterial({ color: 0x5a859d, emissive: 0xdedede, emissiveIntensity: 1 });
                child.material = material;
                this.setClickableAnimation(material);
            }
        });

        this.actualRoom2.scale.set(1, 1.24, 0.6);
        this.actualRoom2.position.set(0.85, 3.29, -1.375);
        this.scene.add(this.actualRoom2);
       
        const geometry = new THREE.PlaneGeometry(10, 3); // Plane geometry
        const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
        this.plane1 = new THREE.Mesh(geometry, material); // Make plane1 a class property

        this.plane1.position.set(1.9, 15.3, -5.15); // Set position if necessary
        this.plane1.rotation.y = Math.PI;

        this.scene.add(this.plane1);

        // Set up GUI controls
        // const gui = new GUI();
        // const lightFolder = gui.addFolder('Plane1 Position');

        // lightFolder.add(this.plane1.position, 'x', -10, 10).name('X Position');
        // lightFolder.add(this.plane1.position, 'y', -10, 10).name('Y Position');
        // lightFolder.add(this.plane1.position, 'z', -10, 10).name('Z Position');
        // lightFolder.open();
    }

    setClickableAnimation(material) {
        const targetPosition = new THREE.Vector3(50, 12, -3.5); // Set the target position
        let targetColor = { emissive: 0xdedede, intensity: 1 };
        let normalColor = { emissive: 0x000000, intensity: 0 };

        const update = () => {
            const cameraPosition = this.camera.orthographicCamera.position;

            if (cameraPosition.equals(targetPosition)) {
                gsap.to(targetColor, {
                    emissive: 0xdedede,
                    intensity: 0.5 + Math.sin(performance.now() / 500) * 0.5,
                    duration: 1,
                    onUpdate: () => {
                        material.emissive.setHex(targetColor.emissive);
                        material.emissiveIntensity = targetColor.intensity;
                    }
                });
            } else {
                gsap.to(targetColor, {
                    emissive: 0xdedede,
                    intensity: 1,
                    duration: 2,
                    onUpdate: () => {
                        material.emissive.setHex(targetColor.emissive);
                        material.emissiveIntensity = targetColor.intensity;
                    }
                });
            }

            requestAnimationFrame(update);
        };
        update();
    }

    tvModel() {
        const geometry = new THREE.PlaneGeometry(0.2, 0.4); // Plane geometry
        this.texture = new THREE.TextureLoader().load('/textures/toystory.jpg'); // Load texture
        this.texture1 = new THREE.TextureLoader().load('/textures/goodfellas.jpg'); // Load texture
        this.material = new THREE.MeshStandardMaterial({ map: this.texture, side: THREE.DoubleSide, emissive: 1, });
        const plane = new THREE.Mesh(geometry, this.material);

        plane.position.set(1.9, 15.53, -5.05); // Set position if necessary
        plane.rotation.y = Math.PI / 2; // Rotate plane 90 degrees around Y-axis

        // Create a point light and add it to the plane
        const pointLight = new THREE.PointLight(0xffffff, 0, 100);
        const pointLight1 = new THREE.PointLight(0xffffff, 0, 100);
        const pointLight2 = new THREE.PointLight(0xffffff, 0, 100);
        const pointLight3 = new THREE.PointLight(0xffffff, 0, 100);

        pointLight.position.set(3.76, 15.08, -4.6); // Set light position relative to the plane
        pointLight1.position.set(2.5, 16, -4.67);
        pointLight2.position.set(2.9, 16, -5.6);
        pointLight3.position.set(4.76, 15.08, -5.56); 

        pointLight.castShadow = true;
        pointLight1.castShadow = true;
        pointLight2.castShadow = true;
        pointLight3.castShadow = true;
        pointLight2.shadow.bias = -0.0005;
        pointLight1.shadow.bias = -0.0005;


        this.scene.add(pointLight);
        this.scene.add(pointLight1);
        this.scene.add(pointLight2);
        this.scene.add(pointLight3);
        this.scene.add(plane);

        this.plane = plane;
        this.pointLight = pointLight;
        this.pointLight1 = pointLight1;
        this.pointLight2 = pointLight2;
        this.pointLight3 = pointLight3;
    }

    // setupGUI() {
    //     const gui = new GUI();
    //     const lightFolder = gui.addFolder('Point Light Position');

    //     lightFolder.add(this.pointLight3.position, 'x', -20, 20).name('X Position');
    //     lightFolder.add(this.pointLight3.position, 'y', -20, 20).name('Y Position');
    //     lightFolder.add(this.pointLight3.position, 'z', -20, 20).name('Z Position');

    //     lightFolder.open();
    // }

    setupMouseMove() {
        window.addEventListener('mousemove', (event) => {
            const normalizedX = event.clientX / window.innerWidth; // Normalize between 0 and 1
            const zPosition = -5.05 + (normalizedX * (-5.26 + 5.05));
    
            // Check if the camera is at one of the specific positions
            const targetCameraPosition1 = new THREE.Vector3(10, 15.63, -6.5);
            const targetCameraPosition2 = new THREE.Vector3(50, 12, -3.5);
            const currentCameraPosition = this.camera.orthographicCamera.position;

            if (currentCameraPosition.equals(targetCameraPosition1) || currentCameraPosition.equals(targetCameraPosition1)) {
                if (this.plane) {
                    this.plane.position.z = THREE.MathUtils.clamp(zPosition, -5.26, -5.05); // Update plane's Z position
                    this.updateLightIntensities();
                }
            }
        });
    }

    updateLightIntensities() {
        const zPosition = this.plane.position.z;
        const targetCameraPosition1 = new THREE.Vector3(10, 15.63, -6.5);
        const targetCameraPosition2 = new THREE.Vector3(50, 12, -3.5);
        const currentCameraPosition = this.camera.orthographicCamera.position;
    
        if (currentCameraPosition.equals(targetCameraPosition1) || currentCameraPosition.equals(targetCameraPosition2)) {
            if (zPosition >= -5.15 && zPosition <= -5.05) {
                gsap.to(this.pointLight, { intensity: 2, duration: 1 });
                gsap.to(this.pointLight1, { intensity: 2, duration: 1 });
                gsap.to(this.pointLight2, { intensity: 0, duration: 1 });
                gsap.to(this.pointLight3, { intensity: 0, duration: 1 });
                this.plane.material.map = this.texture;
                this.plane.material.needsUpdate = true;
            } else if (zPosition >= -5.26 && zPosition < -5.15) {
                gsap.to(this.pointLight, { intensity: 0, duration: 1 });
                gsap.to(this.pointLight1, { intensity: 0, duration: 1 });
                gsap.to(this.pointLight2, { intensity: 2, duration: 1 });
                gsap.to(this.pointLight3, { intensity: 2, duration: 1 });
                this.plane.material.map = this.texture1;
                this.plane.material.needsUpdate = true;
            }
        }
    }

    setAnimation() {}

    resize() {}

    update() {
        // Check the camera position and update light intensities
        this.updateLightIntensities();
    }
}
