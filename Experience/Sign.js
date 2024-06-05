import * as THREE from 'three';
import Experience from './experience';
import gsap from 'gsap';
export default class Sign {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.sign = this.resources.items.sign;
        this.actualSign = this.sign.scene;

        this.sign = this.resources.items.sign;
        this.actualSign = this.sign.scene;

        this.setModel();
       
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
        });

        this.actualSign.scale.set(1, 2, 1);
        this.actualSign.position.set(-0.2, -5.02, -7.7);
        this.scene.add(this.actualSign);
        
    }

   
    
    
    setAnimation() {
        
    }
    
    

    resize() {}

    update() {}
}
