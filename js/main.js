const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const window_height = 300;
const window_width = 500;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.backgroundColor = "#333345";

class Circle {
  constructor(x, y, radius, color, text, backcolor, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.backcolor = backcolor;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);
    context.closePath();
  }

  update(context) {
    this.draw(context);
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

const nCircles = 10;
let circles = [];
for (let i = 0; i < nCircles; i++) {
  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomBackcolor = "rgba("
    + Math.floor(Math.random() * 255) + ","
    + Math.floor(Math.random() * 255) + ","
    + Math.floor(Math.random() * 255) + ","
    + Math.random()
    + ")";
  let randomStrokecolor = "rgb("
    + Math.floor(Math.random() * 255) + ","
    + Math.floor(Math.random() * 255) + ","
    + Math.floor(Math.random() * 255) + ")";
  let randomSpeed = Math.random() * 3 + 1;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;
  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, randomSpeed);
  circles.push(miCirculo);
}

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  circles.forEach((circle, index) => {
    circle.update(ctx);
  });

  // Actualizar las coordenadas en el elemento HTML
  let tableContent = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Circle</th>
          <th scope="col">X</th>
          <th scope="col">Y</th>
        </tr>
      </thead>
      <tbody>
  `;
  circles.forEach((circle, index) => {
    tableContent += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${circle.posX.toFixed(2)}</td>
        <td>${circle.posY.toFixed(2)}</td>
      </tr>
    `;
  });
  tableContent += `
      </tbody>
    </table>
  `;
  document.getElementById('coordinates').innerHTML = tableContent;
};

updateCircle();
