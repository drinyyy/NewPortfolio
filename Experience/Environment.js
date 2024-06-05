import * as THREE from "three";
import Experience from "./experience.js";
import { gsap } from "gsap";
import { GUI } from 'lil-gui';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.setAmbientLightRoom1();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.gui = new GUI();
        // this.setGUI();
        this.initCameraPosition = new THREE.Vector3(50, 12, -3.5); // Desired camera position
        this.currentCameraPosition = new THREE.Vector3();
        this.intensitySet = false; // Flag to indicate if intensity has been set
    }   

    setAmbientLightRoom1() {
        this.ambientLight = new THREE.AmbientLight("#ffffff", 0.02); // Initial intensity
        this.scene.add(this.ambientLight);
    }

    setGUI() {
        // GUI controls for ambient light
        const ambientLightFolder = this.gui.addFolder('Ambient Light');
        ambientLightFolder.addColor(this.ambientLight, 'color').name('Color').onChange((value) => {
            this.ambientLight.color.set(value);
        });
        ambientLightFolder.add(this.ambientLight, 'intensity', 0, 2).name('Intensity');
        ambientLightFolder.open();
    }

    update() {
        // Update the current camera position
        const cameraPosition = this.camera.orthographicCamera.position;

        // Check if the camera position matches the desired position and if the intensity has not been set
        if (cameraPosition.equals(this.initCameraPosition) && !this.intensitySet) {
            // Use GSAP to animate the intensity change
            gsap.to(this.ambientLight, { intensity: 1.2, duration: 2 });
            this.intensitySet = true; // Set the flag to indicate the intensity has been set
        }
    }

}
