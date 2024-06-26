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

        this.extras3 = this.resources.items.extras3;
        this.actualExtras3 = this.extras3.scene;
        
        this.extras4 = this.resources.items.extras4;
        this.actualExtras4 = this.extras4.scene;

        this.setModel5();
        this.setModel6();
        this.setModel7();
        this.setModel8();
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

    setModel7() {
        const textureLoader = new THREE.TextureLoader()
        
        const Extras3 = textureLoader.load('/textures/contact2.png') 
            
        Extras3.flipY = false;
        Extras3.encoding = THREE.sRGBEncoding;
            
        
        this.actualExtras3.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
    
            
    
            if (child.name === "contact" ) {
                child.material = new THREE.MeshStandardMaterial({ color: 0x000000});
            }
    
                
                const materialWithTexture = new THREE.MeshBasicMaterial({  map: Extras3 });
                
                child.material = materialWithTexture;
                child.frustumCulled = false;
            
        });
    
        
        this.actualExtras3.scale.set(0.8, 1.6, 0.8);
        this.actualExtras3.position.set(-2, 18.3, -4.535);
      
        this.scene.add(this.actualExtras3);
        
       
    }
    
    setModel8() {
        this.actualExtras4.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true; 
                child.material.opacity = 0; 
            }
        });
    
        this.actualExtras4.scale.set(1, 2, 1);
        this.actualExtras4.position.set(0, -5, -7.75);
        this.scene.add(this.actualExtras4);
    
      
        this.updateModelOpacity2();
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

    updateModelOpacity2() {
        
        const targetPosition = new THREE.Vector3(50, 0.07, -5.5);
    
        
        const checkCameraPosition = () => {
            const currentPosition = this.camera.orthographicCamera.position;
    
            
            if (currentPosition.equals(targetPosition)) {
                this.actualExtras4.traverse((child) => {
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
