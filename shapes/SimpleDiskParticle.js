// Simple class example

function SimpleDiskParticle(indexX, indexY, theCanvas) {
	this.radius = theCanvas.width/6;
	this.x = theCanvas.width/6 + indexX * theCanvas.width/3;
	this.y = -(this.radius*(indexY*1.2+3));
	this.moveToY = theCanvas.height-(this.radius*(indexY*1.2+3));
	this.isMoving = true;
	this.indexX = indexX;
	this.indexY = indexY;
	this.velX = 0;
	this.velY = 0;
	this.accelX = 0;
	this.accelY = 0;
	this.boarderColer = "#660000";
	this.color = "#FF0000";
}

SimpleDiskParticle.prototype.moveToIndexY = function(indexY, theCanvas){
	this.moveToY = theCanvas.height-(this.radius*(indexY*1.2+3));
	this.isMoving = true;
}

SimpleDiskParticle.prototype.moveToTop = function(indexX, indexY, theCanvas){
	this.x = theCanvas.width/6 + indexX * theCanvas.width/3;
	this.y = -(this.radius*(indexY*1.2+3));
	this.moveToY = theCanvas.height-(this.radius*(indexY*1.2+3));
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
// SimpleDiskParticle.prototype.hitTest = function(hitX,hitY) {
// 	var dx = this.x - hitX;
// 	var dy = this.y - hitY;
	
// 	return(dx*dx + dy*dy < this.radius*this.radius);
// }



//A function for drawing the particle.
SimpleDiskParticle.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = this.boarderColer;
	theContext.beginPath();
	theContext.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
	theContext.closePath();
	theContext.fill();


	theContext.fillStyle = this.color;
	theContext.beginPath();
	theContext.arc(this.x, this.y, this.radius*0.9, 0, 2*Math.PI, false);
	theContext.closePath();
	theContext.fill();
}