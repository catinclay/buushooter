// Simple class example
var colorArr = ["#FF0000","#00FF00","#0000FF"]
var boarderColorArr = ["#440000","#004400","#000044"]

function SimpleSquareParticle(index, theCanvas) {
	this.radius = theCanvas.width/6;
	this.x = theCanvas.width/6 + index * theCanvas.width/3;
	this.y = theCanvas.height-this.radius;
	this.velX = 0;
	this.velY = 0;
	this.accelX = 0;
	this.accelY = 0;
	this.color = colorArr[index];
	this.boarderColor = boarderColorArr[index];
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
SimpleSquareParticle.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.x - this.radius)&&(hitX < this.x + this.radius)&&(hitY > this.y - this.radius)&&(hitY < this.y + this.radius));
}

//A function for drawing the particle.
SimpleSquareParticle.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = this.boarderColor;
	theContext.fillRect(this.x - this.radius, this.y - this.radius, 2*this.radius, 2*this.radius);

	theContext.fillStyle = this.color;
	theContext.fillRect(this.x - 0.85*this.radius, this.y - 0.85*this.radius, 1.7*this.radius, 1.7*this.radius);
}