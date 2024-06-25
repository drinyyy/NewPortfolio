import * as THREE from "three";
import Experience from "./experience";
import gsap from 'gsap';

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.cameraPosition = new THREE.Vector3(); 
    }

    trackCameraPosition() {
        
        this.cameraPosition.copy(this.camera.orthographicCamera.position);
    }

    getCameraPosition() {
        
        return this.cameraPosition.clone(); 
    }

    intro1() {
        const targetPosition = new THREE.Vector3(10, 15.63, -1);
    
        const elements = [
            { id: 'intro1', delay: 0.3, display: true },
            { id: 'intro1-1', delay: 0.6, display: false },
            { id: 'intro1-2', delay: 2, display: false },
            { id: 'intro1-3', delay: 4, display: false },
            { id: 'intro1-4', delay: 7, display: false },
        ];
    
        
        
        const resetElementStyles = () => {
            elements.forEach(element => {
                const el = document.getElementById(element.id);
                if (el) {
                    gsap.killTweensOf(el); 
                    el.style.opacity = 0;
                    el.style.visibility = 'hidden';
                    el.style.pointerEvents = 'none';
                    el.style.display = 'block'; 
                }
            });
        };
    
       
        const animateElement = (element, delay, display) => {
            const el = document.getElementById(element.id);
            if (el) {
                if (this.cameraPosition.equals(targetPosition)) {
                    
                    gsap.to(el, {
                        duration: 1,
                        delay: delay,
                        opacity: 1,
                        onStart: () => {
                            el.style.visibility = 'visible';
                            el.style.display = 'block';
                        },
                        onComplete: () => {
                            el.style.pointerEvents = 'auto';
                        }
                    });
                } else {
                    
                    gsap.to(el, {
                        duration: 2,
                        opacity: 0,
                        onStart: () => {
                            el.style.pointerEvents = 'none';
                        },
                        onComplete: () => {
                            el.style.visibility = 'hidden';
                            el.style.display = 'none';
                        }
                    });
                }
            }
        };
    
        
        if (!this.cameraPosition.equals(targetPosition)) {
            resetElementStyles();
        }
    
        
        elements.forEach(element => {
            animateElement(element, element.delay, element.display);
        });
    }
    


    intro2() {
       
        const targetPosition = new THREE.Vector3(10, 15.63, -6.5);

        
        const elements = [
            { id: 'intro2', delay: 0.3, display: true },
            { id: 'intro2-1', delay: 0.6, display: false },
            { id: 'intro2-2', delay: 2, display: false },
            { id: 'intro2-3', delay: 4, display: false },
            { id: 'intro2-4', delay: 7, display: false },
        ];

        // Function to reset element styles
        const resetElementStyles = () => {
            elements.forEach(element => {
                const el = document.getElementById(element.id);
                if (el) {
                    gsap.killTweensOf(el); // Kill any ongoing animations
                    el.style.opacity = 0;
                    el.style.visibility = 'hidden';
                    el.style.pointerEvents = 'none';
                    el.style.display = 'block'; // Ensure display is block for fading out
                }
            });
        };
    
        const animateElement = (element, delay, display) => {
            const el = document.getElementById(element.id);
            if (el) {
                if (this.cameraPosition.equals(targetPosition)) {
                    
                    gsap.to(el, {
                        duration: 1,
                        delay: delay,
                        opacity: 1,
                        onStart: () => {
                            el.style.visibility = 'visible';
                            el.style.display = 'block';
                        },
                        onComplete: () => {
                            el.style.pointerEvents = 'auto';
                        }
                    });
                } else {
                    
                    gsap.to(el, {
                        duration: 2,
                        opacity: 0,
                        onStart: () => {
                            el.style.pointerEvents = 'none';
                        },
                        onComplete: () => {
                            el.style.visibility = 'hidden';
                            el.style.display = 'none';
                        }
                    });
                }
            }
        };
    
        if (!this.cameraPosition.equals(targetPosition)) {
            resetElementStyles();
        }
    
        elements.forEach(element => {
            animateElement(element, element.delay, element.display);
        });
    }


    intro3() {
        const targetPosition = new THREE.Vector3(10, 10.85, 0);
    
        const elements = [
            { id: 'intro3', delay: 0.3, display: true },
            { id: 'intro3-1', delay: 0.6, display: false },
            { id: 'intro3-2', delay: 2, display: false },
            { id: 'intro3-3', delay: 4, display: false },
            { id: 'intro3-4', delay: 7, display: false },
        ];
    
        const resetElementStyles = () => {
            elements.forEach(element => {
                const el = document.getElementById(element.id);
                if (el) {
                    gsap.killTweensOf(el); 
                    el.style.opacity = 0;
                    el.style.visibility = 'hidden';
                    el.style.pointerEvents = 'none';
                    el.style.display = 'block'; 
                }
            });
        };
    

        const animateElement = (element, delay, display) => {
            const el = document.getElementById(element.id);
            if (el) {
                if (this.cameraPosition.equals(targetPosition)) {
                    
                    gsap.to(el, {
                        duration: 1,
                        delay: delay,
                        opacity: 1,
                        onStart: () => {
                            el.style.visibility = 'visible';
                            el.style.display = 'block';
                        },
                        onComplete: () => {
                            el.style.pointerEvents = 'auto';
                        }
                    });
                } else {
                    
                    gsap.to(el, {
                        duration: 2,
                        opacity: 0,
                        onStart: () => {
                            el.style.pointerEvents = 'none';
                        },
                        onComplete: () => {
                            el.style.visibility = 'hidden';
                            el.style.display = 'none';
                        }
                    });
                }
            }
        };
    
 
        if (!this.cameraPosition.equals(targetPosition)) {
            resetElementStyles();
        }
    
 
        elements.forEach(element => {
            animateElement(element, element.delay, element.display);
        });
    }
    


    intro4() {

        const targetPosition = new THREE.Vector3(10, 6.07, -6.5);
    

        const elements = [
            { id: 'intro4', delay: 0.3, display: true },
            { id: 'intro4-1', delay: 0.6, display: false },
            { id: 'intro4-2', delay: 2, display: false },
            { id: 'intro4-3', delay: 4, display: false },
            { id: 'intro4-4', delay: 7, display: false },
            { id: 'intro4-5', delay: 9, display: false },
        ];
    

        const resetElementStyles = () => {
            elements.forEach(element => {
                const el = document.getElementById(element.id);
                if (el) {
                    gsap.killTweensOf(el); 
                    el.style.opacity = 0;
                    el.style.visibility = 'hidden';
                    el.style.pointerEvents = 'none';
                    el.style.display = 'block'; 
                }
            });
        };
    
   
        const animateElement = (element, delay, display) => {
            const el = document.getElementById(element.id);
            if (el) {
                if (this.cameraPosition.equals(targetPosition)) {
                    
                    gsap.to(el, {
                        duration: 1,
                        delay: delay,
                        opacity: 1,
                        onStart: () => {
                            el.style.visibility = 'visible';
                            el.style.display = 'block';
                        },
                        onComplete: () => {
                            el.style.pointerEvents = 'auto';
                        }
                    });
                } else {
                    
                    gsap.to(el, {
                        duration: 2,
                        opacity: 0,
                        onStart: () => {
                            el.style.pointerEvents = 'none';
                        },
                        onComplete: () => {
                            el.style.visibility = 'hidden';
                            el.style.display = 'none';
                        }
                    });
                }
            }
        };
    
        
        if (!this.cameraPosition.equals(targetPosition)) {
            resetElementStyles();
        }
    
        
        elements.forEach(element => {
            animateElement(element, element.delay, element.display);
        });
    }


    contact() {
        const targetPosition = new THREE.Vector3(50, 22.5, -3.5);
        const elements = [
            { id: 'text', delay: 0 },
            { id: 'animated-title', delay: 0 },
        ];
    
        const resetElementStyles = () => {
            elements.forEach(element => {
                const el = document.getElementById(element.id);
                if (el) {
                    gsap.killTweensOf(el);
                    el.style.opacity = 0;
                    el.style.visibility = 'hidden';
                    el.style.pointerEvents = 'none';
                    el.style.display = 'block';
                    el.querySelectorAll('.animated').forEach(animEl => {
                        animEl.classList.remove('animated');
                    });
                }
            });
        };
    
        const animateElement = (element, delay) => {
            const el = document.getElementById(element.id);
            if (el) {
                if (this.cameraPosition.equals(targetPosition)) {
                    gsap.to(el, {
                        opacity: 1,
                        duration: 2,
                        delay: delay,
                        onStart: () => {
                            el.style.visibility = 'visible';
                            el.style.display = 'block';
                        },
                        onComplete: () => {
                            el.style.pointerEvents = 'auto';
                            el.querySelectorAll('div').forEach(animEl => {
                                animEl.classList.add('animated');
                            });
                        }
                    });
                } 
            }
        };
    
        if (!this.cameraPosition.equals(targetPosition)) {
            resetElementStyles();
        }
    
        elements.forEach(element => {
            animateElement(element, element.delay);
        });
    }
    
    resize() {
        
    }
    
    update() {
       
        this.trackCameraPosition();
        this.intro1();
        this.intro2();
        this.intro3();
        this.intro4();
        this.contact();
    }
    
    
    
}