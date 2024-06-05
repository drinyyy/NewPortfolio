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

        this.cameraPosition = new THREE.Vector3(); // To store the camera position
    }

    trackCameraPosition() {
        // Store the current position of the orthographic camera
        this.cameraPosition.copy(this.camera.orthographicCamera.position);
    }

    getCameraPosition() {
        // Return the current stored camera position
        return this.cameraPosition.clone(); // Return a copy to prevent external modifications
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
    
        // Function to animate elements
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
    
        // Reset styles when camera position changes
        if (!this.cameraPosition.equals(targetPosition)) {
            resetElementStyles();
        }
    
        // Iterate over elements and animate them
        elements.forEach(element => {
            animateElement(element, element.delay, element.display);
        });
    }
    


    intro2() {
        // Desired position
        const targetPosition = new THREE.Vector3(10, 15.63, -6.5);

        // Elements and their corresponding delays
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
    
        // Function to animate elements
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
    
        // Reset styles when camera position changes
        if (!this.cameraPosition.equals(targetPosition)) {
            resetElementStyles();
        }
    
        // Iterate over elements and animate them
        elements.forEach(element => {
            animateElement(element, element.delay, element.display);
        });
    }


    intro3() {
        // Desired position
        const targetPosition = new THREE.Vector3(10, 10.85, -1);
    
        // Elements and their corresponding delays
        const elements = [
            { id: 'intro3', delay: 0.3, display: true },
            { id: 'intro3-1', delay: 0.6, display: false },
            { id: 'intro3-2', delay: 2, display: false },
            { id: 'intro3-3', delay: 4, display: false },
            { id: 'intro3-4', delay: 7, display: false },
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
    
        // Function to animate elements
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
    
        // Reset styles when camera position changes
        if (!this.cameraPosition.equals(targetPosition)) {
            resetElementStyles();
        }
    
        // Iterate over elements and animate them
        elements.forEach(element => {
            animateElement(element, element.delay, element.display);
        });
    }
    


    intro4() {
        // Desired position
        const targetPosition = new THREE.Vector3(10, 6.07, -6.5);
    
        // Elements and their corresponding delays
        const elements = [
            { id: 'intro4', delay: 0.3, display: true },
            { id: 'intro4-1', delay: 0.6, display: false },
            { id: 'intro4-2', delay: 2, display: false },
            { id: 'intro4-3', delay: 4, display: false },
            { id: 'intro4-4', delay: 7, display: false },
            { id: 'intro4-5', delay: 9, display: false },
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
    
        // Function to animate elements
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
    
        // Reset styles when camera position changes
        if (!this.cameraPosition.equals(targetPosition)) {
            resetElementStyles();
        }
    
        // Iterate over elements and animate them
        elements.forEach(element => {
            animateElement(element, element.delay, element.display);
        });
    }

    resize() {
        // Any resize logic if needed
    }
    
    update() {
        // Call the method to track camera position in each update
        this.trackCameraPosition();
        this.intro1();
        this.intro2();
        this.intro3();
        this.intro4();
    }
    
    
    
}