import * as THREE from "three";
import Experience from "./experience.js";

import Environment from "./Environment.js";
import Rooms from "./Rooms.js";
import Rooms2 from "./rooms2.js";
import Rooms3 from "./Rooms3.js";
import Rooms4 from "./Rooms4.js";
import Building from "./Building.js"
import Extras from "./Extras.js";
import Sign from "./Sign.js"
import Teddy from "./Teddy.js";
import Library from "./Library.js";
import carpetGame from "./carpetGame.js";
export default class World {
    constructor() {
        
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        

        this.resources.on("ready", () => {
            this.environment = new Environment();
            
            this.extras = new Extras();
            this.sign = new Sign()
            // this.curtain = new Curtain();
            this.teddy = new Teddy();
            this.carpet = new carpetGame();
            this.library = new Library();
            this.rooms = new Rooms();
            this.rooms2 = new Rooms2();
            this.rooms3 = new Rooms3();
            this.rooms4 = new Rooms4();
            this.building = new Building();
            
            
        });

        this.experience.sizes.on('resize', () => {
            this.resize();
        });

    }

resize() {}

    update() {
        if(this.rooms){
            this.rooms.update();
        }
        if(this.rooms2){
            this.rooms2.update();
        }

        if(this.rooms3){
            this.rooms3.update();
        }

        if(this.rooms4){
            this.rooms4.update();
        }
        if(this.building){
            this.building.update();
        }

        if(this.extras){
            this.extras.update();
        }

        if(this.environment){
            this.environment.update();
        }

        if(this.teddy){
            this.teddy.update();
        }
        if(this.library){
            this.library.update();
        }
        
    }
}