// Circle math Demos
var CircleJS = (function()
{
    var CircleJS = {};

    // Point class
    CircleJS.Point = function(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    };

    // Distance helper
    CircleJS.Point.prototype.distance = function(pointB)
    {
        var xDistance = this.x - pointB.x;
        var yDistance = this.y - pointB.y;

        return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    };

    // Angle helper
    CircleJS.Point.prototype.angle = function(pointB)
    {
        var xDistance = this.x - pointB.x;
        var yDistance = this.y - pointB.y;

        // atan, arc-tanget, inverse tan or tan to the -1 resolves an angle from sides
        return Math.atan(yDistance / xDistance).toDegrees();
    };
    // End point class

    // Triangle class
    CircleJS.Triangle = function(point1, point2, point3)
    {
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
    };
    // End triangle class

    // Circle class
    CircleJS.Circle = function(centreX, centreY, radius, rotationAboutX)
    {
        this.centreX = centreX;
        this.centreY = centreY;
        this.radius = radius;

        // Rotation about the x axis will mean into the z range
        this.rotationAboutX = rotationAboutX;
    };

    CircleJS.Circle.prototype.getDiameter = function()
    {
        return this.radius * 2;
    };
    // End circle class

    // Demo class
    CircleJS.Demo = function(context, width, height)
    {
        this.context = context;
        this.width = width;
        this.height = height;
    };

    // Wrapper for context methods
    CircleJS.Demo.prototype.setFill = function(fill)
    {
        this.context.fillStyle = fill;
    };

    // Wrapper for context methods
    CircleJS.Demo.prototype.setStroke = function(stroke)
    {
        this.context.strokeStyle = stroke;
    };

    // Wrapper for context methods
    CircleJS.Demo.prototype.clear = function()
    {
        this.context.clearRect(0, 0, this.width, this.height);
    };

    // Trigonometry demo outputs the classic SOH CAH TOA diagrams
    CircleJS.Demo.prototype.drawTrig = function()
    {
        var x = 0;
        var bottom = 100;
        var baseWidth = 100;
        var top = 0;

        this.context.beginPath();
        this.context.fillText("SOH", x, top + 15);
        this.context.fillText("sin", x + 30, bottom - 15);
        this.context.fillText("O", x + baseWidth + 5, top + ((bottom - top) / 2));
        this.context.fillText("H", x + (baseWidth / 2) - 10, top + ((bottom - top) / 2));
        this.context.fillText("θ", x + 15, bottom - 5);
        this.context.fill();

        this.drawRightAngledTriangle(new CircleJS.Triangle(
            new CircleJS.Point(x, bottom),
            new CircleJS.Point(x + baseWidth, bottom),
            new CircleJS.Point(x + baseWidth, top)));

        x += baseWidth * 2;
        this.context.beginPath();
        this.context.fillText("CAH", x, top + 15);
        this.context.fillText("cos", x + 30, bottom - 15);
        this.context.fillText("A", x + (baseWidth / 2), bottom + 15);
        this.context.fillText("H", x + (baseWidth / 2) - 10, top + ((bottom - top) / 2));
        this.context.fillText("θ", x + 15, bottom - 5);
        this.context.fill();

        this.drawRightAngledTriangle(new CircleJS.Triangle(
             new CircleJS.Point(x, bottom),
             new CircleJS.Point(x + baseWidth, bottom),
             new CircleJS.Point(x + baseWidth, top)));

        x += baseWidth * 2;
        this.context.beginPath();
        this.context.fillText("TOA", x, top + 15);
        this.context.fillText("tan", x + 30, bottom - 15);
        this.context.fillText("O", x + baseWidth + 5, top + ((bottom - top) / 2));
        this.context.fillText("A", x + (baseWidth / 2), bottom + 15);
        this.context.fillText("θ", x + 15, bottom - 5);
        this.context.fill();

        this.drawRightAngledTriangle(new CircleJS.Triangle(
            new CircleJS.Point(x, bottom),
            new CircleJS.Point(x + baseWidth, bottom),
            new CircleJS.Point(x + baseWidth, top)));
    };

    // Draws a triangle to the canvas
    CircleJS.Demo.prototype.drawRightAngledTriangle = function(triangle)
    {
        this.context.beginPath();
        this.context.moveTo(triangle.point1.x, triangle.point1.y);
        this.context.lineTo(triangle.point2.x, triangle.point2.y);
        this.context.lineTo(triangle.point3.x, triangle.point3.y);
        this.context.lineTo(triangle.point1.x, triangle.point1.y);
        this.context.strokeRect(triangle.point2.x - 10, triangle.point2.y - 10, 10, 10);
        this.context.stroke();

        this.context.beginPath();
        this.drawArc(new CircleJS.Circle(triangle.point1.x, triangle.point1.y, 30), 225, 270);
    }

    // Draw a circle with a particular triangle angle within it
    CircleJS.Demo.prototype.drawCircleInfo = function(circle, displayAngle)
    {
        // Adjust the angle in case we want a different 'default' rotation
        adjustedAngle = this.adjustDegrees(displayAngle);

        this.context.beginPath();

        this.drawArc(circle, 0, 360);
        this.context.fill();

        this.context.beginPath();

        this.context.fillRect(circle.centreX, circle.centreY, 1, 1);
        this.context.fill();

        var zeroPoint = this.getPositionedCirclePoint(circle, 0);
        var point = this.getPositionedCirclePoint(circle, adjustedAngle);

        this.setStroke('#00f');

        this.context.beginPath();

        this.context.moveTo(circle.centreX, circle.centreY);
        this.context.lineTo(circle.centreX, point.y);
        this.context.lineTo(point.x, point.y);
        this.context.lineTo(circle.centreX, circle.centreY);

        var displayAngleRadius = circle.radius / 6;
        this.context.moveTo(circle.centreX, circle.centreY);

        this.context.stroke();

        this.context.beginPath();

        var displayAngleCircle = new CircleJS.Circle(circle.centreX, circle.centreY, circle.radius / 6, circle.rotationAboutX);
        if (displayAngle <= 90)
        {
            this.drawArc(displayAngleCircle,
                0,
                displayAngle);
        }
        else if (displayAngle <= 180)
        {
            this.drawArc(displayAngleCircle,
                displayAngle,
                180);
        }
        else if (displayAngle <= 270)
        {
            this.drawArc(displayAngleCircle,
                180,
                displayAngle);
        }
        else if (displayAngle <= 360)
        {
            this.drawArc(displayAngleCircle,
                displayAngle,
                360);
        }

        this.setStroke('#f00');

        this.context.beginPath();

        this.context.fillText(displayAngle + '°', circle.centreX + displayAngleRadius, circle.centreY);
        this.context.fillText("A: " + Math.abs(point.x - circle.centreX, 2).toFixed(2).toString(), point.x, point.y + 15);
        this.context.fillText("O: " + Math.abs(point.y - circle.centreY, 2).toFixed(2).toString(), circle.centreX + displayAngleRadius, point.y - ((point.y - circle.centreY) / 2));
    };

    // Draw the 'tilt into the screen' explanation
    CircleJS.Demo.prototype.drawTiltDemo = function(circle, rotation)
    {
        this.drawDashedLine(
                  new CircleJS.Point(circle.centreX - circle.radius, circle.centreY),
                  new CircleJS.Point(circle.centreX + circle.radius, circle.centreY),
                  5);

        var adj = Math.cos(rotation.toRad()) * circle.radius;
        var opp = Math.sin(rotation.toRad()) * circle.radius;

        this.context.beginPath();
        var existingStroke = this.context.strokeStyle;
        this.context.strokeStyle = "#0f0";
        this.context.moveTo(circle.centreX - adj, circle.centreY - opp);
        this.context.lineTo(circle.centreX + adj, circle.centreY + opp);
        this.context.stroke();

        this.context.beginPath();
        this.context.strokeStyle = existingStroke;
        this.context.moveTo(circle.centreX - adj, circle.centreY - opp);
        this.context.lineTo(circle.centreX - adj, circle.centreY);
        this.context.stroke();

        this.drawPoint(circle, new CircleJS.Point(circle.centreX, circle.centreY));

        this.drawArc(circle, 90, 90 + rotation);

        this.context.fillText(rotation + '°', circle.centreX - circle.radius + 5, circle.centreY - 5);
        this.context.fillText("Adj: " + adj.toFixed(2), circle.centreX - adj, circle.centreY + 15);
        this.context.fillText("Hypotenuse = Circle Point Y value", circle.centreX - (adj / 2) + 5, circle.centreY - (opp / 2));
        this.context.fillText("Screen Top", circle.centreX + circle.radius + 5, circle.centreY);
        this.context.fillText("Screen Bottom", circle.centreX - circle.radius - 75, circle.centreY);
        this.context.fillText("Adj = cos(angle) * circle point y value", circle.centreX - circle.radius, circle.centreY + 30);
    };

    // Draw a dashed line
    CircleJS.Demo.prototype.drawDashedLine = function(startPoint, endPoint, dashSize)
    {
        var distance = startPoint.distance(endPoint);
        var angle = startPoint.angle(endPoint);
        var dashCount = distance / dashSize;

        this.context.beginPath();
        this.context.moveTo(startPoint.x, startPoint.y);

        var prevPoint = new CircleJS.Point(startPoint.x, startPoint.y);
        for (var i = 0; i < dashCount; i++)
        {
            var nextX = Math.cos(angle.toRad()) * dashSize;
            var nextY = Math.sin(angle.toRad()) * dashSize;

            var nextPoint = new CircleJS.Point(prevPoint.x + nextX, prevPoint.y + nextY);
            if (i % 2 == 0)
            {
                this.context.lineTo(nextPoint.x, nextPoint.y);
            }
            else
            {
                this.context.moveTo(nextPoint.x, nextPoint.y);
            }

            prevPoint = nextPoint;
        }

        this.context.stroke();
    };

    // Draw an arc - In an unnecessarily complicated way so I can tilt it if I need to
    CircleJS.Demo.prototype.drawArc = function(circle, startAngle, endAngle)
    {
        var points = this.getCirclePoints(circle, 360, 0);

        endAngle = endAngle == 360 ? 360 : endAngle % 360;
        for (var i = startAngle % 360; i < endAngle; i++)
        {
            this.context.fillRect(points[i].x, points[i].y, 1, 1);
        }

        this.context.fill();
    };

    // Draw a carousel of images
    CircleJS.Demo.prototype.carousel = function(circle, images, rotation, yAdjustmentFunc)
    {
        var points = this.getCirclePoints(circle, images.length, rotation, yAdjustmentFunc);
        for (var i = 0; i < points.length; i++)
        {
            points[i].image = images[i];
        }

        // Sort the items to get the correct overlap
        var sortedPoints = points.sort(function(a, b) { return a.z - b.z });

        for (var i = 0; i < sortedPoints.length; i++)
        {
            if (sortedPoints[i].image)
            {
                this.drawImage(circle, sortedPoints[i], sortedPoints[i].image);
            }
        }
    };

    // Draw a, potentially tilted, circle
    CircleJS.Demo.prototype.drawCircle = function(circle, numberOfPoints, rotation, yAdjustmentFunc)
    {
        var points = this.getCirclePoints(circle, numberOfPoints, rotation, yAdjustmentFunc);

        var sortedPoints = points.sort(function(a, b) { return a.z - b.z });

        for (var i = 0; i < sortedPoints.length; i++)
        {
            this.drawPoint(circle, sortedPoints[i]);
        }

        this.context.fillRect(circle.centreX, circle.centreY, 2, 2);
        this.context.fill();
    };

    // Draw the spokes of a wheel for the specified number of points in a circle
    CircleJS.Demo.prototype.drawWheel = function(circle, numberOfPoints, rotation, yAdjustmentFunc)
    {
        this.context.beginPath();

        var points = this.getCirclePoints(circle, numberOfPoints, rotation, yAdjustmentFunc);

        for (var i = 0; i < points.length; i++)
        {
            this.context.moveTo(circle.centreX, circle.centreY);
            this.context.lineTo(points[i].x, points[i].y);
        }

        this.context.stroke();

        this.context.fillRect(circle.centreX, circle.centreY, 2, 2);

        this.context.fill();
    };

    // Draw a polygon for the specified number of points
    CircleJS.Demo.prototype.drawPolygon = function(circle, numberOfPoints, rotation)
    {
        this.context.beginPath();

        var points = this.getCirclePoints(circle, numberOfPoints, rotation, 0);

        for (var i = 0; i < points.length; i++)
        {
            var nextIndex = i == points.length - 1 ? 0 : i + 1;
            this.context.moveTo(points[i].x, points[i].y);
            this.context.lineTo(points[nextIndex].x, points[nextIndex].y);
        }

        this.context.stroke();

        this.context.fillRect(circle.centreX, circle.centreY, 2, 2);

        this.context.fill();
    };

    // Draw a 'point' for the purposes of these demos
    CircleJS.Demo.prototype.drawPoint = function(circle, point)
    {
        var scale = (point.z > 0 ? Math.abs(point.z) / circle.getDiameter() : 0) + 0.6;
        var width = 2 * scale;
        var offset = width / 2;

        this.context.strokeRect(point.x - offset, point.y - offset, width, width);
        this.context.fillRect(point.x - offset, point.y - offset, width, width);
    };

    // Draw an image taking into consideration its position on a, potentially tilted, circle
    CircleJS.Demo.prototype.drawImage = function(circle, point, image)
    {
        var scale = (point.z > 0 ? Math.abs(point.z) / circle.getDiameter() : 0) + 0.6;
        var width = 100 * scale;
        var offset = width / 2;

        this.context.drawImage(image, point.x - offset, point.y - offset, width, width);
    };

    // Get the points that make up the specified circle including a rotation offset
    CircleJS.Demo.prototype.getCirclePoints = function(circle, numberOfPoints, rotationAboutZ, yAdjustmentFunc)
    {
        var points = [];

        var radius = circle.radius;
        var diameter = circle.getDiameter();
        var increment = 360 / numberOfPoints;
        for (var degrees = rotationAboutZ; degrees < rotationAboutZ + 360; degrees += increment)
        {
            // SOH CAH TOA - Radius is hypotenuse
            var point = this.getCirclePoint(radius, this.adjustDegrees(degrees), circle.rotationAboutX);

            // Apply an adjustment function if it was passed
            var adjust = 0;
            if (yAdjustmentFunc)
            {
                adjust = yAdjustmentFunc(degrees);
            }
            points.push(new CircleJS.Point(circle.centreX + point.x, circle.centreY + point.y + adjust, point.z));
        }

        return points;
    };

    // Get a point on the circumference of a circle
    CircleJS.Demo.prototype.getPositionedCirclePoint = function(circle, degrees)
    {
        var point = this.getCirclePoint(circle.radius, degrees, circle.rotationAboutX);

        return new CircleJS.Point(circle.centreX + point.x, circle.centreY + point.y, point.y + circle.radius);
    };

    // Get a point on the circumference of a circle (where the centre point is 0,0)
    CircleJS.Demo.prototype.getCirclePoint = function(radius, degrees, rotationAboutX)
    {
        var y = Math.sin(degrees.toRad()) * radius;
        var x = Math.cos(degrees.toRad()) * radius;
        var yAdjustment = rotationAboutX == undefined ? y : Math.cos((rotationAboutX).toRad()) * y;

        return new CircleJS.Point(x, yAdjustment, rotationAboutX == undefined || rotationAboutX == 0 ? 0 : y + radius);
    };

    // Adjust the requested degrees (allowing us to specify a single default rotation here)
    CircleJS.Demo.prototype.adjustDegrees = function(degrees)
    {
        return degrees + 90;
    };

    return CircleJS;

}());