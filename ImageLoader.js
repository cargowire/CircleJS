// Image preloading
var ImageLoader = (function()
{
    var ImageLoader = function(imagePaths)
    {
        this.imagePaths = imagePaths;
    };

    ImageLoader.prototype.load = function(callback)
    {
        this.loadedImages = 0;
        this.callback = callback;
        this.images = [];
        for (var path in this.imagePaths)
        {
            var img = new Image();

            // Bind to ensure correct 'this' in the callback
            img.onload = this.onImageLoaded.bind(this);
            img.src = this.imagePaths[path];
            this.images.push(img);
        }
    };

    // Only callback when all images are loaded
    ImageLoader.prototype.onImageLoaded = function ()
    {
        this.loadedImages++;
        if (this.loadedImages == this.images.length)
        {
            this.callback(this.images);
        }
    };

    return ImageLoader;
})();