// Utilities

// Radians converter
if (typeof(Number.prototype.toRad) === "undefined")
{
    // 360 degrees = 2PI radians
    Number.prototype.toRad = function()
    {
        return this * (Math.PI / 180);
    }
}

// Degrees converter
if (typeof(Number.prototype.toDegrees) === "undefined")
{
    // 360 degrees = 2PI radians 
    Number.prototype.toDegrees = function ()
    {
        return this * (180 / Math.PI);
    }
}

// Shim for frame rate animation
if (typeof (window.requestAnimationFrame) === "undefined")
{
    window.requestAnimationFrame = (function ()
    {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            function (callback)
            {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}