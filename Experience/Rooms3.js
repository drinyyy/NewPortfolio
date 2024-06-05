import * as THREE from "three";
import Experience from "./experience";
import gsap from 'gsap';
import GUI from 'lil-gui';
export default class Rooms3 {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.rooms3 = this.resources.items.rooms3;
        this.actualRoom3 = this.rooms3.scene;
        
        this.setModel3();
        
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
    setModel3() {
        let colorCube007_2 = this.getRandomColor();
        this.actualRoom3.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
            if (child.name === "Cube007_2" && child.parent && child.parent.name === "room2001") {
                child.material = new THREE.MeshStandardMaterial({ color: colorCube007_2 });
            }
        

        if (child.name === "Cube007_3" && child.parent && child.parent.name === "room2001") {
            const darkerColor = this.darkenColor(colorCube007_2, 0.7); // Darken by 40%
                child.material = new THREE.MeshStandardMaterial({ color: darkerColor });
        }

        if (child.name === "Cube007" && child.parent && child.parent.name === "room2001") {
            const darkerColor = this.darkenColor(colorCube007_2, 0.8); // Darken by 20%
                child.material = new THREE.MeshStandardMaterial({ color: darkerColor });
        }
        
        if (child.name === "Cube007_1" && child.parent && child.parent.name === "room2001") {
            const material = new THREE.MeshStandardMaterial({ color:  0x5a859d, emissive: 0xdedede, emissiveIntensity: 1});
            child.material = material;
            this.setClickableAnimation(material);
        }

        if (child.name === "avaturn_hair_0001" ) {
            child.material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                roughness: 0.3, // Increase roughness to blur reflections
                transmission: 1.0,
                opacity: 0.25,
                transparent: true,
                metalness: 0.2,
                reflectivity: 0.9,
                clearcoat: 1.0,
                clearcoatRoughness: 0.3, // Increase clearcoat roughness to blur reflections
                ior: 1.5
            });
            child.position.x = 2;
        }
       
    });
    
        this.actualRoom3.scale.set(1, 1.24, 0.6);
        this.actualRoom3.position.set(0.85, 2.04, -1.27);
        this.scene.add(this.actualRoom3);
       
        
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
