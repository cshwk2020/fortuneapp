import * as THREE from 'three';
import FortuneConstants from '../model/FortuneConstants';
import FortuneHub from '../model/FortuneHub';
import { TimelineMax, Expo } from 'gsap';
 

export default class FireObj {

    scene;
    debugContext;
    FortuneHub
    textureLoader;
    domEvents;
    
    fireGeometry;
    fireMaterial
    fireMesh;

    posX = 0; 
    posY = 2.5; 
    posZ = -2;
    
     
    //
    particles = new THREE.Group({
        wireframe: true
    });


    //
    cradle = new THREE.Group({
        wireframe: true
    });

    


     //
     texture;

     //
     middleCylinderGeom;
     middleCylinderMat;
     middleCylinderMesh;

     //
     lowerCylinderGeom;
     lowerCylinderMat;
     lowerCylinderMesh;


      

    constructor(scene, textureLoader, fortuneHub, debugContext, domEvents) {

        let me = this;

        this.scene = scene;
        this.debugContext = debugContext;
        this.textureLoader = textureLoader;
        this.fortuneHub = fortuneHub;
        this.domEvents = domEvents;

        this.fireGeometry = new THREE.BoxGeometry(FortuneConstants.fire_w, FortuneConstants.fire_h, FortuneConstants.fire_l);
         
        
        this.fireMaterial = new THREE.MeshBasicMaterial({
            map: this.textureLoader.load(FortuneConstants.getFireTexture()),
             
            opacity: 0.8,
            transparent: true,
          });
           
           
         //
         /*
         me.domEvents.addEventListener(me.particles, 'click', function(event){
            console.log('!!you clicked on particles', me.particles);
            me.debugContext.selectedObj = me.particles;
              
        }, false);
        */


        this.init();
    }


     

    init() {

        this.initFire();
        this.initMiddleCylinder();
        this.initLowerCylinder();
         
        
        this.lowerCylinderMesh.position.set(0, FortuneConstants.cradle_lower_height / 2 ,0);
        this.middleCylinderMesh.position.set(0, FortuneConstants.cradle_lower_height + (FortuneConstants.cradle_middle_height / 2) ,0);
        this.particles.position.set(0, (FortuneConstants.cradle_lower_height + FortuneConstants.cradle_middle_height + 0.8 * FortuneConstants.fire_h / 2), 0);

        this.cradle.position.set(0, 0, 0);
        //this.scene.add(this.cradle);  
        //this.cradle.position.set(0, -1, -20);
    }

    initMiddleCylinder() {

        //
        let cylinder_texture = this.textureLoader.load(FortuneConstants.getCradleTexture());

        //
        this.middleCylinderGeom = new THREE.CylinderGeometry(FortuneConstants.cradle_middle_radius, FortuneConstants.cradle_middle_radius, FortuneConstants.cradle_middle_height, 50, 1, true, 0, 2* Math.PI);
        this.middleCylinderMat = new THREE.MeshBasicMaterial({
                map: cylinder_texture,
                side: THREE.DoubleSide
              }) ;
        this.middleCylinderMesh = new THREE.Mesh( this.middleCylinderGeom, this.middleCylinderMat);
         
        //this.cradle.add(this.middleCylinderMesh);
   
     }


     initLowerCylinder() {

        //
        let cylinder_texture = this.textureLoader.load(FortuneConstants.getCradleStickTexture());

        //
        this.lowerCylinderGeom = new THREE.CylinderGeometry(FortuneConstants.cradle_lower_radius, FortuneConstants.cradle_lower_radius, FortuneConstants.cradle_lower_height, 50, 1, true, 0, 2* Math.PI);
        this.lowerCylinderMat = new THREE.MeshBasicMaterial({
                map: cylinder_texture,
                side: THREE.DoubleSide
              }) ;
        this.lowerCylinderMesh = new THREE.Mesh( this.lowerCylinderGeom, this.lowerCylinderMat);
         
        //this.cradle.add(this.lowerCylinderMesh);
   
     }



    getRandomNum() {
        return  FortuneConstants.getRandomNumFromRange(-0.003, 0.003);
    }
 
 
     

    initFire() {

        let me = this;

        for (let row=-1; row<0; row++) {
            for (let col=-1; col<0; col++) {

                //for (let i=0; i<5; i++) {

                    console.log("debug...0...", this.scene);
                    let fireMesh = new THREE.Mesh( this.fireGeometry, this.fireMaterial );
                    console.log("debug...10...");
                    fireMesh.position.set(this.getRandomNum(), this.getRandomNum(), this.getRandomNum());
                    //fireMesh.position.set(0, 0, 0);
                    console.log("debug...20...");

                    //fireMesh.scale.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
                    console.log("debug...30...");
                    //fireMesh.rotation.set(Math.random() * 360,Math.random() * 360,Math.random() * 360);
                    console.log("debug..40...");
                    this.particles.add(fireMesh);
                    console.log("debug...50...");
                     
                    console.log("debug...60...");
                //}

            }
        }

       // this.cradle.add(this.particles);
        

        //this.animateFire();
    }

    translateGroupXby(dx) {

        this.particles.position.set(
            this.particles.position.x + dx,
            this.particles.position.y,
            this.particles.position.z
        );
        this.middleCylinderMesh.position.set(
            this.middleCylinderMesh.position.x + dx,
            this.middleCylinderMesh.position.y,
            this.middleCylinderMesh.position.z
        );
        this.lowerCylinderMesh.position.set(
            this.lowerCylinderMesh.position.x + dx,
            this.lowerCylinderMesh.position.y,
            this.lowerCylinderMesh.position.z
        );
    }













    ___initFire() {

        let me = this;
        const vertices = [];

        for ( let i = 0; i < 10000; i ++ ) {

            const x = THREE.MathUtils.randFloatSpread( 2000 );
            const y = THREE.MathUtils.randFloatSpread( 2000 );
            const z = THREE.MathUtils.randFloatSpread( 2000 );
        
            vertices.push( x, y, z );
        
        }


        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        //const material = new THREE.PointsMaterial( { color: 0x888888 } );

        me.particles = new THREE.Points( geometry, me.fireMaterial );

        //me.scene.add( me.particles );



 
        //this.animateFire();
    }

    animateFire() {
 
        let me = this;

        setInterval(()=>{
 
            var timelineMax_pos = new TimelineMax();
            var timelineMax_scale = new TimelineMax();

            me.particles.children.forEach((fireMesh)=>{

                /*
                timelineMax
                .to(fireMesh.position, FortuneConstants.getRandomNumFromRange(0.5, 1), {
                    x: me.posX + me.getRandomNum(),
                    y: me.posY + me.getRandomNum(),
                    z: me.posZ + me.getRandomNum(),
                    ease: Expo.easeInOut
                });
                */
 
                let r = FortuneConstants.getRandomNumFromRange(0.99, 1.1);
                let new_x = FortuneConstants.getRandomNumFromRange(0.99, 1.1);
                let new_y = FortuneConstants.getRandomNumFromRange(0.99, 1.2);
                timelineMax_scale
                .to(fireMesh.scale, FortuneConstants.getRandomNumFromRange(0.1, 0.2), {
                    x: new_x,
                    y: new_y,
                    z: FortuneConstants.getRandomNumFromRange(0.9, 1.1),
                    ease: Expo.easeInOut
                });

/*
                fireMesh.position.set (0,
                    (new_y - FortuneConstants.fire_h) / 2,
                    0);
                    */
                /*
                timelineMax_pos
                .to(fireMesh.position, 200/1000, {
                    x: 0,
                    y: (new_y - FortuneConstants.fire_h) / 2,
                    z: 0,
                    ease: Expo.easeInOut
                });
                */
                

            });
             

        }, 200);
        
        

    }
 
    

}

