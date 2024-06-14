import * as THREE from "three";
import Experience from "./experience";
import gsap from 'gsap';
export default class Library {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.library = this.resources.items.library;
        this.actualLibrary = this.library.scene;
        
        this.setModel();
        
        this.setAnimation();
    }
    
    setModel() {

        const textureLoader = new THREE.TextureLoader()
    
    const libraryTexture = textureLoader.load('/textures/library2.png') 
        
    libraryTexture.flipY = false;
    libraryTexture.encoding = THREE.sRGBEncoding;

        this.pivot = new THREE.Object3D();
        this.scene.add(this.pivot);
        this.actualLibrary.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
            }
            if (child.name === "Icosphere001" && child.parent && child.parent.name === "dome001") {
                child.material = new THREE.MeshBasicMaterial({ color: 0xffffff});
            }
            
            

        
        const materialWithTexture = new THREE.MeshBasicMaterial({  map: libraryTexture });
            
            child.material = materialWithTexture;
            child.frustumCulled = false;
            
    });
    
    const boundingBox = new THREE.Box3().setFromObject(this.actualLibrary);
        const center = boundingBox.getCenter(new THREE.Vector3());
        this.actualLibrary.position.set(-center.x, -center.y, -center.z);

    
        this.pivot.add(this.actualLibrary);

        
        this.pivot.position.set(5, -0.18, -4.3);
        this.pivot.scale.set(1, 2.24, 1.2);
        
        
    }
    
    
    
    
    setAnimation() {
        
    }
    resize(){}

    update(){
        const targetPosition = new THREE.Vector3(50, 0.07, -5.5);
        if (this.camera.orthographicCamera.position.equals(targetPosition)) {
            
            this.pivot.rotation.y += 0.0015; 
        }
    }
}
