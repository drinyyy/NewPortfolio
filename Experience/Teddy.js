import * as THREE from "three";
import Experience from "./experience";

export default class Teddy {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.teddy = this.resources.items.teddy;
        this.actualTeddy = this.teddy.scene;

        this.setModel5();
        this.setAnimation();
    }

    setModel5() {
        const textureLoader = new THREE.TextureLoader();
        const teddyTexture = textureLoader.load('/public/textures/teddy2.png');
        
        teddyTexture.flipY = false;
        teddyTexture.encoding = THREE.sRGBEncoding;
        
        this.actualTeddy.traverse((child) => {
            if (child.name === "Teddybear001" && child.parent && child.parent.name === "Armature") {
                child.material = new THREE.MeshBasicMaterial({ map: teddyTexture });
            }
            if (child.name === "Cube002_1" && child.parent && child.parent.name === "Cube002") {
                child.material = new THREE.MeshStandardMaterial({ color:  0xE7E0B0});
            }
            if (child.name === "Cube002_2" && child.parent && child.parent.name === "Cube002") {
                const material = new THREE.MeshStandardMaterial({ color:  0x5a859d, emissive: 0x648FA5, emissiveIntensity: 1});
                child.material = material;
                this.setClickableAnimation(material);
            }
            if (child.name === "Text") {
                child.material = new THREE.MeshBasicMaterial({ color:  0xffffff});
            }
        });

        this.actualTeddy.scale.set(1, 2, 1);
        this.actualTeddy.position.set(0, -5, -7.73);
        this.scene.add(this.actualTeddy);
        
    }

    setClickableAnimation(material) {
        const clock = new THREE.Clock();
        const targetPosition = new THREE.Vector3(50, 0.07, -5.5); 
    
        const update = () => {
            if (this.camera.orthographicCamera.position.equals(targetPosition)) {
                const time = clock.getElapsedTime();
                const pulse = 0.5 + Math.sin(time * 2) * 0.5;
                material.emissiveIntensity = pulse;
            }
            requestAnimationFrame(update);
        };
        update();
    }
    setAnimation() {
        const targetPosition = new THREE.Vector3(50, 0.07, -5.5);
        this.mixer = new THREE.AnimationMixer(this.actualTeddy);
        const animation = this.mixer.clipAction(this.teddy.animations[0]);
    
        const clock = new THREE.Clock();
        let isPlaying = false;
    
        const update = () => {
            const cameraPosition = this.camera.orthographicCamera.position;
            if (cameraPosition.equals(targetPosition)) {
                if (!isPlaying) {
                    animation.play();
                    isPlaying = true;
                }
            } else {
                if (isPlaying) {
                    animation.stop();
                    isPlaying = false;
                }
            }
    
            const delta = clock.getDelta();
            this.mixer.update(delta);
            requestAnimationFrame(update);
        };
        update();
    }

    resize() {}
    update() {
        this.mixer.update(this.time.delta * 0.0001);
    }
}
