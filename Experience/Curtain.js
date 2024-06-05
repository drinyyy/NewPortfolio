import * as THREE from 'three';
import Experience from './experience';

export default class Curtain {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.curtain = this.resources.items.curtain;
        this.actualCurtain = this.curtain.scene;

        this.setModel();
        this.setupAnimationTrigger();
    }

    setModel() {
        // Apply the texture to each mesh (if any specific textures are needed)
        this.actualCurtain.traverse((child) => {
            if (child.isMesh) {
                
            }
    
            if (child.name === "Cylinder_1") {
                child.material = new THREE.MeshBasicMaterial({ color: 0x626466 });
            }
            if (child.name === "Cylinder_2") {
                child.material = new THREE.MeshBasicMaterial({
                    color: 0xe0d3c8,
                    opacity: 0.95,
                    transparent: true
                });
            }
        });

        // Adjust the curtain's scale and position, then add it to the scene
        this.actualCurtain.scale.set(1, 2, 1);
        this.actualCurtain.position.set(0.009, -5, -8);
        this.scene.add(this.actualCurtain);
console.log(this.actualCurtain)
        
    }

    setupAnimationTrigger() {
        const worksMenuItem = document.getElementById('works-menu-item');
        worksMenuItem.addEventListener('click', () => {
            this.setAnimation();
        });
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualCurtain);
        this.firstAnimation = this.mixer.clipAction(this.curtain.animations[0]);
    
        // Configure the animation to play only once
        this.firstAnimation.setLoop(THREE.LoopOnce);
        this.firstAnimation.clampWhenFinished = true; // Optionally clamp when finished to avoid jumping to start
    
        this.firstAnimation.play();
    }
    

    resize() {
        // Handle resize logic here
    }

    update() {
        if (this.mixer) {
            this.mixer.update(this.time.delta * 0.0018);
        }
    }
}

