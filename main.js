import './style.css'
import Experience from './Experience/experience'
const experience = new Experience (document.querySelector(".experience-canvas"))

document.getElementById('about-menu-item').addEventListener('click', () => {
    experience.lightControls.startAnimation(); // Start the animation
  });


  