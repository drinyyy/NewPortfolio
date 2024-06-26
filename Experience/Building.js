import * as THREE from "three";
import Experience from "./experience";
import GUI from 'lil-gui'

const params = {
    color1: '#14003E',
    color2: '#7e51d2',
    opacity1: 0.0, // New parameter for color1 opacity
    opacity2: 0.7, // Parameter for color2 opacity
    rotationY: Math.PI / 2,
    blendPosition: 0.25, // New parameter for blending position
};

export default class Building {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.building = this.resources.items.building;
        this.actualBuilding = this.building.scene;
        
        this.material = null;
        this.cityBackground = null;
        
        this.setModel1();
        this.createCityBackground();
        this.createCityBackground1();
        this.createGround();
        this.createGround3();
        this.createGround2();
        this.setAnimation();
        // this.createOutline();
       
       
        
    }


    setModel1() {
    const textureLoader = new THREE.TextureLoader()
    
    const buildingTexture = textureLoader.load('/textures/image2.png') 
        
        buildingTexture.flipY = false;
        buildingTexture.encoding = THREE.sRGBEncoding;
        
    
    this.actualBuilding.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }

        

        if (child.name === "Colors_6" && child.parent && child.parent.name === "Building") {
            child.material = new THREE.MeshBasicMaterial({ color: 0x98CDE5});
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
    const geometry = new THREE.PlaneGeometry(50, 30);

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity1;
        uniform float opacity2;
        uniform float blendPosition;
        varying vec2 vUv;

        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        void main() {
            vec2 uv = vUv;
            float noise = random(uv * 50.0);
            float blendFactor = smoothstep(0.0, 1.0, (uv.y - blendPosition) * 2.0);
            vec3 gradientColor = mix(color1, color2, blendFactor);
            float gradientOpacity = mix(opacity1, opacity2, blendFactor);
            vec3 grainyColor = gradientColor + noise * 0.05;
            gl_FragColor = vec4(grainyColor, gradientOpacity);
        }
    `;

    this.material = new THREE.ShaderMaterial({
        uniforms: {
            color1: { value: new THREE.Color(params.color1) },
            color2: { value: new THREE.Color(params.color2) },
            opacity1: { value: params.opacity1 },
            opacity2: { value: params.opacity2 },
            blendPosition: { value: params.blendPosition },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
    });

    this.cityBackground = new THREE.Mesh(geometry, this.material);
    this.cityBackground.position.set(-5, 2.5, -3);
    this.cityBackground.rotateY(params.rotationY);
    this.cityBackground.rotateZ(Math.PI);
    this.scene.add(this.cityBackground);
}
createCityBackground1() {
    const geometry = new THREE.PlaneGeometry(50, 100);

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform vec3 color;
        uniform float opacity;
        varying vec2 vUv;

        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        void main() {
            vec2 uv = vUv;
            float noise = random(uv * 50.0); // Adjust the scale for noise density
            vec3 grainyColor = color + noise * 0.05; // Adjust noise intensity
            gl_FragColor = vec4(grainyColor, opacity);
        }
    `;

    const material = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(0x14003e) },
            opacity: { value: 0.7 },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
    });

    this.cityBackground = new THREE.Mesh(geometry, material);
    this.cityBackground.position.set(-6, 15, -3);
    this.cityBackground.rotateY(Math.PI / 2);
    this.scene.add(this.cityBackground);
}

updateMaterial() {
        this.material.uniforms.color1.value.set(params.color1);
        this.material.uniforms.color2.value.set(params.color2);
        this.material.uniforms.opacity1.value = params.opacity1;
        this.material.uniforms.opacity2.value = params.opacity2;
        this.material.uniforms.blendPosition.value = params.blendPosition;
    }


updateRotation() {
    this.cityBackground.rotation.y = params.rotationY;
}

    createGround(){
        const geometryground = new THREE.BoxGeometry( 20, 10, 50 ); 
    const materialground = new THREE.MeshBasicMaterial({ color: 0x1C3445,  });
    this.ground = new THREE.Mesh(geometryground, materialground);
    this.ground.position.set(1,-7.7,-3)
    this.scene.add(this.ground)
    }
    createGround3(){
        const geometryground = new THREE.BoxGeometry(20, 10, 50);
        this.materialground3 = new THREE.MeshBasicMaterial({ color: 0x1C3445 });
        this.ground3 = new THREE.Mesh(geometryground, this.materialground3);
        this.ground3.position.set(-10, -7.3, -3);
        this.scene.add(this.ground3);
    }
    createGround2(){
        const geometryground = new THREE.BoxGeometry( 25, 50, 50 ); 
    const materialground = new THREE.MeshBasicMaterial({ color: 0x132430 ,  });
    this.ground = new THREE.Mesh(geometryground, materialground);
    this.ground.position.set(2,-28.5,-3)
    this.scene.add(this.ground)
    }
   
    setAnimation() {
       
    }

   
    resize(){}

    update(){
        
    }

    
}