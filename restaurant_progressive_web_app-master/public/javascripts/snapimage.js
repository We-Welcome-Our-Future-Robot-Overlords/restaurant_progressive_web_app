function snapshotImage(sourceId) {
    var hasGetUserMedia = !!(navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    var errorCallback = function(e) {
        console.log('Rejected!', e);
    };

    if (hasGetUserMedia) {
        var video = document.querySelector('video');
        var canvas = document.getElementById("canvas")
        var ctx = canvas.getContext('2d');
        var localMediaStream = null;
        video.addEventListener('click', snapshot, false);
        navigator.getUserMedia({video: {width: 250, height: 250, sourceId: sourceId}}, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            localMediaStream = stream;
        }, errorCallback);

        function snapshot() {
            if (localMediaStream) {
                ctx.drawImage(video, 0, 0);
                document.getElementById('photo_img').src = canvas.toDataURL('image/jpg');
                document.getElementById('photo_text').value = document.getElementById('photo_img').src;
            }
        }
    } else {
        alert('getUserMedia() is not supported in your browser');
    }
}

function loadImage() {
    var input, file, fr, img;

    input = document.getElementById('photo');
    if (!input) {
        alert("Um, couldn't find the imgfile element.");
    } else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = createImage;
        fr.readAsDataURL(file);
    }

    function createImage() {
        img = new Image();
        img.onload = imageLoaded;
        img.src = fr.result;
    }

    function imageLoaded() {
        var canvas = document.getElementById("canvas")
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,0, 0, canvas.width, canvas.height);
        document.getElementById('photo_img').src = canvas.toDataURL('image/jpg');
        document.getElementById('photo_text').value = document.getElementById('photo_img').src;
    }

}