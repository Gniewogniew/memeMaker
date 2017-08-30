function textChangeListener(evt) {
    var id = evt.target.id;
    var text = evt.target.value;

    if (id == "textOnTop") {
        canvas.topLineText = text;
    } else {
        canvas.bottomLineText = text;
    }
    drawMeme(canvas.imageSrc, canvas.topLineText, canvas.bottomLineText);
}

function drawMeme(image, topLine, bottomLine) {
    if (image != null) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    if (topLine != null) {
        ctx.fillText(topLine, canvas.width / 2, 80);
        ctx.strokeText(topLine, canvas.width / 2, 80);
    }
    if (bottomLine != null) {
        ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
    }
}

function saveFile(event) {
    var display = confirm("Czy chcesz zapisać ten obraz?")
    if (display == true) {
        var data = canvas.toDataURL();
        download.href = data;
    } else {
        event.preventDefault();
    }
}

function loadImage(event) {
    reader.onload = function(event) {
        var image = new Image();
        image.onload = function() {
            canvas.imageSrc = this;
            drawMeme(canvas.imageSrc, null, null);
        }
        image.src = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

var canvas = document.getElementById("MemeCanvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 700;
var canvasHeight = 600;
var reader = new FileReader();
ctx.font = "50pt Impact";
ctx.textAlign = "center";
ctx.strokeStyle = "black";
ctx.lineWidth = 4;
ctx.fillStyle = "white";

document.getElementById("fileInput").addEventListener("change", loadImage, false);
document.getElementById("savebutton").addEventListener("click", saveFile, false);
document.getElementById("textOnTop").addEventListener("keyup", textChangeListener, false);
document.getElementById("textOnBottom").addEventListener("keyup", textChangeListener, false);
