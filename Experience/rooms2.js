import * as THREE from "three";
import Experience from "./experience";
import gsap from 'gsap';
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
        
        if (child.name === "Cube005_1" && child.parent && child.parent.name === "room2") {
            const material = new THREE.MeshStandardMaterial({ color:  0x5a859d, emissive: 0xdedede, emissiveIntensity: 1});
            child.material = material;
            this.setClickableAnimation(material);
        }
        
            
    });
    
        this.actualRoom2.scale.set(1, 1.24, 0.6);
        this.actualRoom2.position.set(0.85, 3.29, -1.375);
        this.scene.add(this.actualRoom2);
    
        
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
    
    
    setAnimation() {
        
    }
    resize(){}

    update(){
        
    }

    
}
