import * as THREE from "three";
import Experience from "./experience";



export default class Building {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.building = this.resources.items.building;
        this.actualBuilding = this.building.scene;
        

        
        this.setModel1();
        this.createCityBackground();
        this.createGround();
        this.createGround2();
        this.setAnimation();
        
    }


    setModel1() {
    const textureLoader = new THREE.TextureLoader()
    
    const buildingTexture = textureLoader.load('/public/textures/image2.png') 
        
        buildingTexture.flipY = false;
        buildingTexture.encoding = THREE.sRGBEncoding;
        
    
    this.actualBuilding.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }

        

        if (child.name === "Colors_6" && child.parent && child.parent.name === "Building") {
            child.material = new THREE.MeshStandardMaterial({ color: 0x98CDE5});
        }

            
            const materialWithTexture = new THREE.MeshBasicMaterial({  map: buildingTexture });
            
            child.material = materialWithTexture;
            child.frustumCulled = false;
        
    });

    
    this.actualBuilding.scale.set(1, 2, 1);
    this.actualBuilding.position.set(0, -5, -7.735);
  
    this.scene.add(this.actualBuilding);
    
    
}
    

    createCityBackground() {
        const geometry = new THREE.PlaneGeometry(50, 100);
        const materialColor = new THREE.Color(0x0A1A27);
        const material = new THREE.MeshBasicMaterial({
           
            color: materialColor,
            transparent: true,
            opacity: 0.3,
        });
        this.cityBackground = new THREE.Mesh(geometry, material);
        
        this.cityBackground.position.set(-5, 15, -3);
        this.cityBackground.rotateY(Math.PI / 2);
        this.scene.add(this.cityBackground);


        
    }

    createGround(){
        const geometryground = new THREE.BoxGeometry( 20, 10, 50 ); 
    const materialground = new THREE.MeshBasicMaterial({ color: 0x1C3445,  });
    this.ground = new THREE.Mesh(geometryground, materialground);
    this.ground.position.set(1,-7.7,-3)
    this.scene.add(this.ground)
    }
    createGround2(){
        const geometryground = new THREE.BoxGeometry( 25, 10, 50 ); 
    const materialground = new THREE.MeshBasicMaterial({ color: 0x132430 ,  });
    this.ground = new THREE.Mesh(geometryground, materialground);
    this.ground.position.set(2,-8.3,-3)
    this.scene.add(this.ground)
    }
   
    setAnimation() {
       
    }
    resize(){}

    update(){
        
    }

    
}