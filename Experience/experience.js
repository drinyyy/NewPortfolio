import * as THREE from 'three';
import Sizes from './Sizes.js'
import Camera from './Camera';
import Time from './Time';
import Renderer from './Renderer';

import Resources from "./Resources.js";
import assets from "./assets.js";
import World from './World';
import LightControls from './LightControls.js';
import Controls from './Controls.js';

export default class Experience{
    static instance;
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this
        this.canvas=canvas;
        this.scene = new THREE.Scene();
        this.sizes= new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();
        this.lightControls = new LightControls(this.scene);
        this.controls = new Controls();
        
        
        this.sizes.on("resize", ()=>{
            this.resize();
            
        });
        this.time.on("update", ()=>{
            this.update();
        });

        
        
        
    }

  

    resize(){
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
        
    }

    update(){
        this.camera.update();
        this.world.update();
        this.renderer.update();
        this.lightControls.update();
        this.controls.update();
    
    }
}