
function textChangeListener (evt) {
      var id = evt.target.id;
      var text = evt.target.value;
      
      if (id == "textOnTop") {
        window.topLineText = text;
      } else {
        window.bottomLineText = text;
      }
      
      drawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
    }

    function drawMeme(image, topLine, bottomLine) {

      var canvas = document.querySelector('canvas');
      var ctx = canvas.getContext("2d");
      if (image != null)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.clearRect (0, 0,  canvas.width, canvas.height);
      
      if (image != null)
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      

      ctx.font = '50pt Impact';
      ctx.textAlign = 'center';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
      ctx.fillStyle = 'white';
      
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
	var display = confirm ("Czy chcesz zapisać ten obraz?")
	if (display == true) {
    var data = canvas.toDataURL();
    download.href = data;
    }else{
     event.preventDefault();
    }
}
 
  function loadImage(event) {
  	var canvasWidth = 700;
      var canvasHeight = 600;
  	var ctx = canvas.getContext("2d");
    var reader = new FileReader();
    reader.onload = function(event){
      var image = new Image();
        image.onload = function(){
          window.imageSrc = this;
          drawMeme(window.imageSrc, null, null);
        }
        image.src = event.target.result;

    }
    reader.readAsDataURL(event.target.files[0]);  
  }


    window.textOnTop = "";
    window.textOnBottom = "";
    var imageLoader = document.getElementById("fileInput");
  	imageLoader.addEventListener("change", loadImage, false);
    var download = document.getElementById("savebutton");
  	download.addEventListener("click", saveFile, false);
  	var input1 = document.getElementById("textOnTop");
    var input2 = document.getElementById("textOnBottom");
    input1.oninput = textChangeListener;
    input2.oninput = textChangeListener;
