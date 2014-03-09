// Animation helper
var Animator = (function ()
{
    var Animator = {};

    Animator.Animation = function(framesPerSecond, callback)
    {
        this.lastTime = new Date().getTime();
        this.framesPerSecond = framesPerSecond;
        this.callback = callback;
        this.paused = true;
    };

    Animator.Animation.prototype.IsRunning = function()
    {
        return !this.paused;
    }

    Animator.Animation.prototype.start = function()
    {
        this.paused = false;
        this.draw();
    };

    Animator.Animation.prototype.stop = function ()
    {
        this.paused = true;
    };

    Animator.Animation.prototype.draw = function()
    {
        var time = new Date().getTime();

        // Ensure we only run as fast (or slower) than the caller asked
        var diff = time - this.lastTime;
        if (diff >= 1000 / this.framesPerSecond)
        {
            this.callback();
            this.lastTime = time;
        }

        // Only request the next frame if we're still running
        if (!this.paused)
        {
            // Bind to ensure correct 'this' in the callback
            window.requestAnimationFrame(this.draw.bind(this));
        }
    };

    return Animator;
})();