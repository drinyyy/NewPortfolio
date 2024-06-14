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
        // this.gui = new GUI();
        // this.setGUI();
        this.initCameraPosition = new THREE.Vector3(50, 12, -3.5); // Desired camera position
        this.currentCameraPosition = new THREE.Vector3();
        this.intensitySet = false;
    }   

    setAmbientLightRoom1() {
        this.ambientLight = new THREE.AmbientLight("#ffffff", 0.02); 
        this.scene.add(this.ambientLight);
    }

    // setGUI() {
    //     // GUI controls for ambient light
    //     const ambientLightFolder = this.gui.addFolder('Ambient Light');
    //     ambientLightFolder.addColor(this.ambientLight, 'color').name('Color').onChange((value) => {
    //         this.ambientLight.color.set(value);
    //     });
    //     ambientLightFolder.add(this.ambientLight, 'intensity', 0, 2).name('Intensity');
    //     ambientLightFolder.open();
    // }

    update() {
        
        const cameraPosition = this.camera.orthographicCamera.position;

        
        if (cameraPosition.equals(this.initCameraPosition) && !this.intensitySet) {
            
            gsap.to(this.ambientLight, { intensity: 1.2, duration: 1 });
            this.intensitySet = true; 
        }
    }

}
