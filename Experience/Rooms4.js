import * as THREE from "three";
import Experience from "./experience";
import gsap from 'gsap';
export default class Rooms4 {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.rooms4 = this.resources.items.rooms4;
        this.actualRoom4 = this.rooms4.scene;
        
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
        let colorCube008_2 = this.getRandomColor();
        this.actualRoom4.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
            if (child.name === "Cube008_2" && child.parent && child.parent.name === "room2002") {
                child.material = new THREE.MeshStandardMaterial({ color: colorCube008_2 });
            }
        

        if (child.name === "Cube008_3" && child.parent && child.parent.name === "room2002") {
            const darkerColor = this.darkenColor(colorCube008_2, 0.7); // Darken by 40%
                child.material = new THREE.MeshStandardMaterial({ color: darkerColor });
        }

        if (child.name === "Cube008" && child.parent && child.parent.name === "room2002") {
            const darkerColor = this.darkenColor(colorCube008_2, 0.8); // Darken by 20%
                child.material = new THREE.MeshStandardMaterial({ color: darkerColor });
        }
        
        if (child.name === "Cube008_1" && child.parent && child.parent.name === "room2002") {
            const material = new THREE.MeshStandardMaterial({ color:  0x5a859d, emissive: 0xdedede, emissiveIntensity: 1});
            child.material = material;
            this.setClickableAnimation(material);
        }
        if (child.name === "avaturn_shoes_0004"){
            child.material = new THREE.MeshStandardMaterial({ color:  0xffffff});
            this.rotateShoess(child);
        }

        if (child.name === "avaturn_shoes_0001"){
            child.material = new THREE.MeshStandardMaterial({ color:  0x000000 });
            this.rotateShoes(child);
            child.position.set(1.84, 1.26, -5.43); // Set the position for avaturn_shoes_0004
            
        }
        
            
    });
    
        this.actualRoom4.scale.set(1, 1.22, 0.6);
        this.actualRoom4.position.set(0.959, 3.6, -1.7);
        this.scene.add(this.actualRoom4);
       
        
    }
    rotateShoes(shoe) {
        const targetPosition = new THREE.Vector3(10, 6.07, -6.5);
        const update = () => {
            if (this.camera.orthographicCamera.position.equals(targetPosition)) {
                gsap.to(shoe.rotation, { y: "+=4.28", duration: 10, repeat: -1, ease: "linear" }); // Rotate continuously
            }
            requestAnimationFrame(update);
        };
        update();
    }

    rotateShoess(shoe) {
        const targetPosition = new THREE.Vector3(10, 6.07, -6.5);
        const update = () => {
            if (this.camera.orthographicCamera.position.equals(targetPosition)) {
                gsap.to(shoe.rotation, { y: "-=4.28", duration: 10, repeat: -1, ease: "linear" }); // Rotate continuously
            }
            requestAnimationFrame(update);
        };
        update();
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
