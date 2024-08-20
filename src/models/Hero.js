class Hero {
  constructor(x, y, radius, color, speed, direction) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.direction = direction;
  }

  move(canvas) {
    this.y += this.speed * this.direction;

    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.direction *= -1; // Меняем направление при касании границы
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Hero;
