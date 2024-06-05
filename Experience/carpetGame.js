import * as THREE from "three";
import Experience from "./experience";
import gsap from 'gsap';
export default class carpetGame {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.carpet = this.resources.items.carpetgame;
        this.actualCarpet = this.carpet.scene;
        
        this.setModel();
        
        this.setAnimation();
    }
    
    setModel() {
        const textureLoader = new THREE.TextureLoader()
    
    const carpetTexture = textureLoader.load('/public/textures/carpet.png') 
        
    carpetTexture.flipY = false;
    carpetTexture.encoding = THREE.sRGBEncoding;

        this.actualCarpet.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
            }
            if (child.name === "carpett" ) {
                child.material = new THREE.MeshBasicMaterial({ color: 0xffffff});
            }
            
            const materialWithTexture = new THREE.MeshBasicMaterial({  map: carpetTexture });
            
            child.material = materialWithTexture;
            child.frustumCulled = false;
        
        
            
    });
    
    
        this.actualCarpet.scale.set(1,2,0.9);
        this.actualCarpet.position.set(1,-5,-7.5);
        this.scene.add(this.actualCarpet)
        // Add the actualLibrary to the pivot
    
        
    }
    
    
    
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualCarpet);

        // Assuming your carpet model contains animations and the first animation is the one you want to play
        const clip = this.carpet.animations[0];

        this.action = this.mixer.clipAction(clip);
        this.action.play();
    }
    
    resize() {}

    update() {
        const delta = this.time.delta * 0.001; // assuming time.delta is in milliseconds
        if (this.mixer) this.mixer.update(delta);
    }
}

