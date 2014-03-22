CircleJS
===================

A collection of javascript classes that can be used to demonstrate simple trigonometry and circle maths.

Files
-----

Utilities.js - functions
========================
* toRad() and toDegrees() conversions
* requestAnimationFrame shim for browser support

ImageLoader.js - class
======================
* A small wrapper for the creation of multiple image elements and firing a single callback after all have loaded


        new ImageLoader(["path1.jpg", "path2.jpg"])
            .load(function(loadedImages)
            {
                
            });

Animator.js - class
===================
* A small wrapper for creating animations that respond to regular interval callbacks


        var myCanvas = document.getElementById('myCanvas');
        var myContext = myCanvas.getContext('2d');
        var desiredFramesPerSecond = 60;
        new Animator.Animation(desiredFramesPerSecond, 
            function()
            {
                myContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
                
                // Drawing code here
            };)

Circle.js - classes
-------------------
* Point


        var pointA = new CircleJS.Point(x, y, z);
        var pointB = new CircleJS.Point(x, y, z);

        // Z is only simply implemented and not used as part of distance or angle
        // which are x/y only
		var distance = pointA.distance(pointB);
		var angle = pointA.angle(pointB);

* Triangle


        var triangleA = new CircleJS.Triangle(pointA, pointB, pointC)

* Circle

        var centreX = 100;
		var centreY = 100;
		var radius = 50;
		var rotationAboutX = 0;
        var circleA = new CircleJS.Circle(centreX, centreY, radius, rotationAboutX);

* Demo
  *  The demo class provides a series of functions to draw trigonometry based circle demos to a passed canvas

                var myCanvas = document.getElementById('myCanvas');
                var myContext = myCanvas.getContext('2d');
                var demo = new CircleJS.Demo(myContext, myCanvas.width, myCanvas.height);

                demo.setFill('#0f0');
				demo.setStroke('#f00');

                // Available Demos
                demo.drawTrig(); // Draws a sohcahtoa diagram
				demo.drawRightAngledTriangle(triangle); // draws a right angled triangle
                demo.drawCircleInfo(circle, displayAngle);  // draws a circle with a right angle triangle at the specified angle
                demo.drawTiltDemo(circle, rotation); // draws a demonstration of tilting a circle 'into' the screen
                demo.drawCarousel(circle, images, rotation, yAdjustmentFunc); // draws a rotated image carousel
                demo.drawWheel(circle, numberOfPoints, rotation, yAdjustmentFunc);  // draws a wheel (points from the centre out) with the specified spoke count
                demo.drawPolygon(circle, numberOfPoints, rotation); // draws a polygon of the specified size and number of points

    * All of these demos can be wrapped in calls to new Animator.Animation(60, callback) to animate them progressively over time
                