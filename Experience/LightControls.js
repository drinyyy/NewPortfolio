import * as THREE from 'three';
import Experience from "./experience";
export default class LightControls {
  constructor(scene) {
    this.experience = new Experience();
    this.scene = scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.isAnimating = false; 
    this.starPositions = [
      new THREE.Vector3(1, 15, 3),
      new THREE.Vector3(2, 5, 5),
      new THREE.Vector3(1, 18, 7),
      new THREE.Vector3(1, 15, 11),
      new THREE.Vector3(1, 21, -17),
      new THREE.Vector3(1, 23, -3),
      new THREE.Vector3(1, 11, -15),
      new THREE.Vector3(1, 11, 4),
      new THREE.Vector3(1, 13, -7),
      new THREE.Vector3(1, 5, 9),
      new THREE.Vector3(1, 20, -12),
      new THREE.Vector3(1, 7, 2),
      new THREE.Vector3(1, 9, -14),
      new THREE.Vector3(1, 10, 7),
      new THREE.Vector3(-5, 8, -9),
      new THREE.Vector3(1, 23, 4),
      new THREE.Vector3(1, 19, -9),
      new THREE.Vector3(1, 22, 10),
      new THREE.Vector3(1, 21, -2),
      new THREE.Vector3(1, 13, 8),
    ];


    
    this.animatedStars = []; 
    this.tValues = {};
    this.curve = null;



   
    this.secondAnimatedStars = [];
    this.secondTValues = {};
    this.secondCurve = null;


    this.thirdAnimatedStars = [];
    this.thirdTValues = {};
    this.thirdCurve = null;

    this.fourthAnimatedStars = [];
    this.fourthTValues = {};
    this.fourthCurve = null;

    this.createStars();
    
   
    let startingStarIndex = 3; 
    let startingStar = this.starPositions[startingStarIndex];
    this.curve = this.createCurve(startingStar); 
    this.selectStarsForAnimation(1, startingStarIndex, this.animatedStars, this.tValues);

    let secondStartingStarIndex = 10; 
    let secondStartingStar = this.starPositions[secondStartingStarIndex];
    this.secondCurve = this.createCurve1(secondStartingStar);
    this.selectStarsForAnimation(1, secondStartingStarIndex, this.secondAnimatedStars, this.secondTValues);


    let thirdStartingStarIndex = 13; 
    let thirdStartingStar = this.starPositions[thirdStartingStarIndex];
    this.thirdCurve = this.createCurve2(thirdStartingStar); 
    this.selectStarsForAnimation(1, thirdStartingStarIndex, this.thirdAnimatedStars, this.thirdTValues);


    let fourthStartingStarIndex = 14; 
    let fourthStartingStar = this.starPositions[fourthStartingStarIndex];
    this.fourthCurve = this.createCurve3(fourthStartingStar); 
    this.selectStarsForAnimation(1, fourthStartingStarIndex, this.fourthAnimatedStars, this.fourthTValues);
    



    this.pointLights = [];
    this.addPointLight(startingStarIndex);
    this.addPointLight(secondStartingStarIndex);
    this.addPointLight(thirdStartingStarIndex);
    this.addPointLight(fourthStartingStarIndex);
    
    
  }

  addPointLight(startingStarIndex) {
    const startingStar = this.starPositions[startingStarIndex];
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 10);
   
        pointLight.shadow.camera.far = 20;
     pointLight.shadow.mapSize.set(2048, 2048);
    pointLight.shadow.normalBias = 0.1;
    pointLight.position.copy(startingStar); 
    this.scene.add(pointLight);
    this.pointLights.push({ index: startingStarIndex, light: pointLight });
  }
  createStars() {
    this.starPositions.forEach((position, index) => {
      const geometry = new THREE.SphereGeometry(0.04, 2, 2);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
  
      star.position.set(position.x, position.y, position.z);
      star.userData = {
        index: index,
        blinkTimer: Math.random() * 5 // Random initial timer between 0 and 5 seconds
      };
  
      this.scene.add(star);
    });
  }
  

  createCurve(startingPoint) {
    const points = [
      startingPoint,
      new THREE.Vector3(-5, 19.2, -4),
      new THREE.Vector3(3, 17, -8),
      new THREE.Vector3(6, 14, -2.5),
      new THREE.Vector3(6, 16, -2.5),
      new THREE.Vector3(3.5,16,-2.6),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
  
    // Create a geometry from the curve points
    const curvePoints = curve.getPoints(50); // 50 points along the curve
    // const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
  
    // // Create a material for the line
    // const curveMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
  
    // // Create the line and add it to the scene
    // const curveLine = new THREE.Line(curveGeometry, curveMaterial);
    // this.scene.add(curveLine);
  
    return curve;
  }
  
  createCurve1(startingPoint) {
    const points = [
      startingPoint,
      new THREE.Vector3(0, 19, -4),
      new THREE.Vector3(-10, 13, 1),
      new THREE.Vector3(1, 13, 1),
      new THREE.Vector3(6, 14, -4.5),
      new THREE.Vector3(2.5, 16, -5),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
  
    // Create a geometry from the curve points
    const curvePoints = curve.getPoints(50); // 50 points along the curve
    // const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
  
    // // Create a material for the line
    // const curveMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
  
    // // Create the line and add it to the scene
    // const curveLine = new THREE.Line(curveGeometry, curveMaterial);
    // this.scene.add(curveLine);
  
    return curve;
  }


  createCurve2(startingPoint) {
    const points = [
      startingPoint,
      new THREE.Vector3(5, 17, -8),
      new THREE.Vector3(-9, 15, 2),
      new THREE.Vector3(1, 14, 1),
      new THREE.Vector3(10, 8, -3),
      new THREE.Vector3(2.8,10.6,-2.4),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
  
    // Create a geometry from the curve points
    const curvePoints = curve.getPoints(50); // 50 points along the curve
    // const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
  
    // // // Create a material for the line
    // const curveMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
  
    // // // Create the line and add it to the scene
    // const curveLine = new THREE.Line(curveGeometry, curveMaterial);
    // this.scene.add(curveLine);
  
    return curve;
  }

  createCurve3(startingPoint) {
    const points = [
      startingPoint,
      new THREE.Vector3(-5, -1, -1),
      new THREE.Vector3(-5, -2, 1),
      new THREE.Vector3(1, 2, 1),
      new THREE.Vector3(5, 7.5, -3),
      new THREE.Vector3(5, 7.5, -5),
      new THREE.Vector3(2.8,7.2,-5.15),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
  
    // Create a geometry from the curve points
    const curvePoints = curve.getPoints(50); // 50 points along the curve
    // const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
  
    // // Create a material for the line
    // const curveMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
  
    // // Create the line and add it to the scene
    // const curveLine = new THREE.Line(curveGeometry, curveMaterial);
    // this.scene.add(curveLine);
  
    return curve;
  }

  selectStarsForAnimation(count, excludeIndex, animatedStarsArray, tValuesObject) {
    let availableIndices = this.starPositions.map((_, index) => index).filter(index => index !== excludeIndex);
    animatedStarsArray.push(this.scene.children.find(child => child.userData.index === excludeIndex));
    tValuesObject[excludeIndex] = 0;
  
    for (let i = 1; i < count; i++) {
      let randomIndex = Math.floor(Math.random() * availableIndices.length);
      let starIndex = availableIndices.splice(randomIndex, 1)[0];
      animatedStarsArray.push(this.scene.children.find(child => child.userData.index === starIndex));
      tValuesObject[starIndex] = 0;
    }
  }

 
  
  

  animateStars(deltaTime, animatedStarsArray, tValuesObject, curve) {
    animatedStarsArray.forEach(star => {
      let index = star.userData.index;
      let t = tValuesObject[index] + deltaTime;
      if (t > 1) t = 1;
      
      
      gsap.to(tValuesObject, {
        [index]: t,
        duration: deltaTime,
        ease: "power1.inOut", 
        onUpdate: () => {
          let point = curve.getPointAt(tValuesObject[index]);
          star.position.set(point.x, point.y, point.z);
          
          
          const lightObject = this.pointLights.find(lightObj => lightObj.index === index);
          if (lightObject) {
            lightObject.light.position.set(point.x, point.y, point.z);
          }
        }
      });
    });
  }


  changeStarColor(star) {
    const currentColor = star.material.color.getHex();
    const targetColor = (currentColor === 0xffffff) ? 0x2b2a30 : 0xffffff;
    const targetColorObject = new THREE.Color(targetColor);
  
    gsap.to(star.material.color, {
      r: targetColorObject.r,
      g: targetColorObject.g,
      b: targetColorObject.b,
      duration: 0.25, 
      ease: "power1.inOut"
    });
  }
  
  update() {
    if (!this.isAnimating) {
      return; 
    }
    const deltaTime = this.time.delta * 0.00035; 
  
    
    this.animateStars(deltaTime, this.animatedStars, this.tValues, this.curve);
    this.animateStars(deltaTime, this.secondAnimatedStars, this.secondTValues, this.secondCurve);
    this.animateStars(deltaTime, this.thirdAnimatedStars, this.thirdTValues, this.thirdCurve);
    this.animateStars(deltaTime, this.fourthAnimatedStars, this.fourthTValues, this.fourthCurve);
  
    this.scene.children.forEach(child => {
      if (child.userData.blinkTimer !== undefined && !this.isStarAnimated(child)) {
        child.userData.blinkTimer -= deltaTime;
        if (child.userData.blinkTimer <= 0) {
          this.changeStarColor(child);
          child.userData.blinkTimer = Math.random() * 0.5; // Reset timer to a random value between 0 and 5 seconds
        }
      }
    });
  }
  
 
  isStarAnimated(star) {
    const allAnimatedStars = [
      ...this.animatedStars,
      ...this.secondAnimatedStars,
      ...this.thirdAnimatedStars,
      ...this.fourthAnimatedStars
    ];
    return allAnimatedStars.includes(star);
  }
  
  

startAnimation() {
  this.isAnimating = true;
}


}