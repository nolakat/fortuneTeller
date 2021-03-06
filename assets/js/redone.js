
console.log('redone');


class navItems{

    constructor(){
        this.clientX = -100;
        this.clientY = -100;
        this.innerCursor = document.querySelector(".cursor--small");


        this.lastX = 0;
        this.lastY = 0;
        this.isStuck = false;
        this.showCusor = false;
        this.navItems();
        let group, stuckX, stuckY, fillOuterCursor;
 
    }

    init() {
        this.defaultCursor();
        this.hoverCursor();
        this.mainCanvas();
    }

    defaultCursor() {
    
        document.addEventListener("mousemove", e =>{
            clientX = e.clientX;
            clientY = e.clientY;
        });
    
        const render = () => {
    
            TweenMax.set(innerCursor, {
                x: clientX,
                y: clientY
            });
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }


    mainCanvas() {
        console.log('run redone cursor');

        const canvas = document.querySelector(".cursor--canvas");
        const shapeBounds = {
            width: 75,
            height: 75
        };
    
       paper.setup(canvas);
       const strokeColor = "white";
       const strokeWidth = 1;
       const segments = 25;
       const radius = 15;
    
       // we'll need these later for the noisy circle
       const noiseScale = 150;  // speed
       const noiseRange = 4;  // range of distortion
       let isNoisy = false;  // state
    
      // the base shape for the noisy circle 
       const polygon = new paper.Path.RegularPolygon(
           new paper.Point(0, 0),
           segments,
           radius
       );
    
       polygon.strokeColor = strokeColor;
       polygon.strokeWidth = strokeWidth;
       polygon.smooth();
       group = new paper.Group([polygon]);
       group.applyMatrix = false;
    
       const noiseObjects = polygon.segments.map( () => new SimplexNoise());
       let bigCoordinates = [];
    
    
       // function for linear interpolation of values
       const lerp = (a, b, n) => {
           return (1 - n) * a +n * b;
       };
    
       // function to map a vlue from one range to another range
       const map = (value, in_min, in_max, out_min, out_max) => {
           return(
               ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
           );
       };
    
       // the draw loop of Paper.js
       // 60fps with requestAnimationFrame under the hood
    
       paper.view.onFrame = event =>{
           // using linear interpolation, the circle will move 0.2 (20%)
           // of the distance between its current position and the mouse
           // coordinates per frame
    
           if(!isStuck){
                lastX = lerp(lastX, clientX, 0.2);
                lastY = lerp(lastY, clientY, 0.2);
                group.position = new paper.Point(lastX, lastY);
    
           } else if(isStuck){
                // fixed position on a nav item
                lastX = lerp(lastX, stuckX, 0.2);
                lastY = lerp(lastY, stuckY, 0.2);
                group.position = new paper.Point(lastX, lastY);
           }
    
           if(isStuck && polygon.bounds.width < shapeBounds.width){
               //scape up the shape
               polygon.scale(1.08);
           } else if (!isStuck && polygon.bounds.width > 30){
               //remove noise
               if (isNoisy) {
                   polygon.segments.forEach((segment, i) => {
                       segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
                   });
                   isNoisy = false;
                   bigCoordinates = [];
               }
               // scale down the shape
               const scaleDown = 0.92;
               polygon.scale(scaleDown);
           }
    
           //while stuck and big, apply simplex noise
           if(isStuck && polygon.bounds.width >= shapeBounds.width){
               isNoisy = true;
               //first get coordinates of large circle
               if(bigCoordinates.length === 0){
                   polygon.segments.forEach((segment, i) => {
                       bigCoordinates[i] = [segment.point.x, segment.point.y];
                   });
               }
    
                   // loop over all points of the polygon
        polygon.segments.forEach((segment, i) => {
          
            // get new noise value
            // we divide event.count by noiseScale to get a very smooth value
            const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
            const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);
            
            // map the noise value to our defined range
            const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
            const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);
            
            // apply distortion to coordinates
            const newX = bigCoordinates[i][0] + distortionX;
            const newY = bigCoordinates[i][1] + distortionY;
            
            // set new (noisy) coodrindate of point
            segment.point.set(newX, newY);
          });
    
    
           }
           polygon.smooth();
    
       }

    }


    hoverCursor() {

        // find the center of the link element and set stuckX and stuckY
        // these are needed to set the position of the noisy circle
    
        const handleMouseEnter = e => {
           
    
            // set the item hovered as this 
            const navItem = e.currentTarget;
            // find the size of item and its position relative to the viewport
            const navItemBox = navItem.getBoundingClientRect();
            
            stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
            stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
            
            isStuck = true;
        };
    
        // reset isStuck on mouseLeave
        const handleMouseLeave = () =>{
         
    
            isStuck = false;
        };
    
        // add event listeners to all items
        const linkItems = document.querySelectorAll('.link');
        linkItems.forEach(item => {
            item.addEventListener('mouseenter', handleMouseEnter);
            item.addEventListener('mouseleave', handleMouseLeave);
        });

    }

    

};


var test = new navItems();
test.init();
