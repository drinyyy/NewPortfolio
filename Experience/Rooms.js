import * as THREE from "three";
import Experience from "./experience";
import gsap from 'gsap';
export default class Rooms {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.rooms = this.resources.items.rooms;
        this.actualRoom = this.rooms.scene;
        

        
        this.setModel1();
        
        this.setAnimation();
        
        
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
    
    setModel1() {
        let colorCube3 = this.getRandomColor();
        this.actualRoom.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
    
            if (child.name === "Cube_3" && child.parent && child.parent.name === "Cube") {
                child.material = new THREE.MeshStandardMaterial({ color: colorCube3 });
            }
        

        if (child.name === "Cube_1" && child.parent && child.parent.name === "Cube") {
            const darkerColor = this.darkenColor(colorCube3, 0.8); // Darken by 40%
            child.material = new THREE.MeshStandardMaterial({ color: darkerColor });
        }
       
        if (child.name === "Cube_4" && child.parent && child.parent.name === "Cube") {
            const darkerColor = this.darkenColor(colorCube3, 0.7); // Darken by 40%
            child.material = new THREE.MeshStandardMaterial({ color: darkerColor });
        }

        if (child.name === "Cube_2" && child.parent && child.parent.name === "Cube") {
            const material = new THREE.MeshStandardMaterial({ color:  0x5a859d, emissive: 0xdedede, emissiveIntensity: 1});
            child.material = material;
            this.setClickableAnimation(material);
        }
    });
    
        this.actualRoom.scale.set(1, 1.24, 0.6);
        this.actualRoom.position.set(2.9, 13.70, -3.77);
        this.scene.add(this.actualRoom);
      
        
    }
    
    setClickableAnimation(material) {
        const targetPosition = new THREE.Vector3(50, 12, -3.5); // Set the target position
        let targetColor = { emissive: 0xdedede, intensity: 1 };
        let normalColor = { emissive: 0x000000, intensity: 0 };
    
        const update = () => {
            const cameraPosition = this.camera.orthographicCamera.position;
    
            
            if (cameraPosition.equals(targetPosition)) {
                // Animate to pulsing effect
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
    
    
    
    
    
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.firstanimation = this.mixer.clipAction(this.rooms.animations[2]);
        this.firstanimationmouse = this.mixer.clipAction(this.rooms.animations[3]);
    
        this.firstanimation.play();
        this.firstanimationmouse.play();
        
    }
    resize(){}

    update(){
        this.mixer.update(this.time.delta * 0.001)
    }

    
}

