import * as THREE from 'three';
import Experience from './experience';
import gsap from 'gsap';
export default class Extras {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.extras = this.resources.items.extras;
        this.actualExtras = this.extras.scene;

        this.extras2 = this.resources.items.extras2;
        this.actualExtras2 = this.extras2.scene;

        this.setModel5();
        this.setModel6();
        
        this.setAnimation();
    }

    setModel5() {
        this.actualExtras.traverse((child) => {
            if (child.isMesh) {
                
            }
            if (child.name === 'Handrail002') {
                child.material = new THREE.MeshBasicMaterial({ color: 0xEEDC82 });
                child.position.x = 2;
            }
        });

        this.actualExtras.scale.set(1, 2, 1);
        this.actualExtras.position.set(0, -5.02, -7.9);
        this.scene.add(this.actualExtras);
    }

    setModel6() {
        this.actualExtras2.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true; 
                child.material.opacity = 0; 
            }
        });
    
        this.actualExtras2.scale.set(1, 2, 1);
        this.actualExtras2.position.set(0, -4.9, -7.75);
        this.scene.add(this.actualExtras2);
    
      
        this.updateModelOpacity();
    }
    
    updateModelOpacity() {
        
        const targetPosition = new THREE.Vector3(50, 12, -3.5);
    
        
        const checkCameraPosition = () => {
            const currentPosition = this.camera.orthographicCamera.position;
    
            
            if (currentPosition.equals(targetPosition)) {
                this.actualExtras2.traverse((child) => {
                    if (child.isMesh) {
                        
                        gsap.to(child.material, {
                            opacity: 1,
                            duration: 3, // Duration in seconds
                            ease: "power2.inOut"
                        });
                    }
                });
            } else {
                
                requestAnimationFrame(checkCameraPosition);
            }
        };
    
       
        checkCameraPosition();
    }
    
    setAnimation() {
       
    }
    
    

    resize() {}

    update() {}
}
