var theCanvas = document.getElementById("mainCanvas");
var gameOverLabel = document.getElementById("gameOverLabel");
var restartButton = document.getElementById("restartButton");
var context = theCanvas.getContext("2d");
var linesNumber = 3;
var rawsNumber = 7;
var taps = [];
var targets = [];
var easeAmount = 0.25;

function init(){
	addListeners();
	makeTaps();
	drawTaps();
	makeTargets();
	drawTargets();
	timer = setInterval(onTimerTick, 1000/30);
}

function moveTargets(){
	var i;
	for(i = 0; i < targets.length; ++i){
		if(!targets[i].isMoving){ continue; }
		targets[i].y = targets[i].y + easeAmount*(targets[i].moveToY - targets[i].y);
		if(Math.abs(targets[i].y - targets[i].moveToY) < 1){
			targets[i].y = targets[i].moveToY;
			targets[i].isMoving = false;
		}
	}
}



function addListeners(){
	theCanvas.addEventListener('mousedown', mouseDownListener, false);
	theCanvas.addEventListener('touchstart', touchDownListener, false);
}

function makeTargets(){
	var i;
	for (i = 0; i<rawsNumber; ++i){
		targets.push(new SimpleDiskParticle(Math.floor(Math.random()*linesNumber),i,theCanvas));
	}
}

function drawTargets(){
	var i;
	for (i = 0; i<targets.length; ++i){
		targets[i].drawToContext(context);
	}	
}

function makeTaps(){
	var i;
	for (i = 0; i<linesNumber; ++i){
		taps.push(new SimpleSquareParticle(i,theCanvas));
	}
}

function drawTaps(){
	var i;
	for (i = 0; i<taps.length; ++i){
		taps[i].drawToContext(context);
	}	
}


function drawScreen() {
	context.fillStyle = "#FFFFFF";
	context.fillRect(0,0,theCanvas.width,theCanvas.height);
	drawTargets();
	drawTaps();
}

function mouseDownListener(evt){
	var bRect = theCanvas.getBoundingClientRect();
	touchX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
	touchY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);
	inputDownLinstener(touchX, touchY);
}

function touchDownListener(evt){
	evt.preventDefault();	evt.stopPropagation();
	var bRect = theCanvas.getBoundingClientRect();
	var touches = evt.changedTouches;
	touchX = (touches[0].pageX - bRect.left)*(theCanvas.width/bRect.width);
	touchY = (touches[0].pageY - bRect.top)*(theCanvas.height/bRect.height);
	inputDownLinstener(touchX, touchY);
}

function inputDownLinstener(touchX, touchY){
	var i;
	var shoot = false;
	for(i = 0; i < taps.length; ++i){
		if(taps[i].hitTest(touchX,touchY)){
			if(targets[0].indexX == i){
				shoot = true;
			}
		}
	}
	if(shoot){
		var temp = targets[0];
		temp.moveToTop(Math.floor(Math.random()*linesNumber), rawsNumber-1,theCanvas);
		targets.splice(0,1);
		for(i = 0; i < targets.length; ++i){
			targets[i].moveToIndexY(i, theCanvas);
		}
		targets[i] = temp;
	}
}

function onTimerTick(){
	moveTargets();
	drawScreen();
}





init();