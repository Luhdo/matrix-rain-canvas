import "./styles/style.css";

type fallingCharProps = {
  x: number;
  y: number;
  value: string;
  speed: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
};

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;
let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let maxCharCount = 1000;
let fallingCharArray: fallingCharProps[] = [];
let fontSize = 12;
let maxColumns = sizes.width / fontSize;
let frames = 0;
let charArray = ["L", "U", "D", "H", "O", "/"];

canvas.width = sizes.width;
canvas.height = sizes.height;

window.addEventListener("resize", (_e) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class FallingChar {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  x = 0;
  y = 0;
  value = "";
  speed = 0;

  draw(context: typeof ctx) {
    this.value =
      charArray[
        Math.floor(Math.random() * (charArray.length - 1))
      ].toUpperCase();
    this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

    context.fillStyle = "rgba(0, 255, 0)";
    context.font = `${fontSize}px san-serif`;
    context.fillText(this.value, this.x, this.y);
    this.y += this.speed;

    if (this.y > sizes.height) {
      this.x = (Math.random() * sizes.height) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    }
  }
}

function update() {
  if (fallingCharArray.length < maxCharCount) {
    let fallingChar = new FallingChar(
      Math.floor(Math.random() * maxColumns) * fontSize,
      (Math.random() * sizes.height) / 2 - 50
    );

    fallingCharArray.push(fallingChar);
  } else {
    fallingCharArray = [];
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, sizes.width, sizes.height);

  for (let i = 0; i < fallingCharArray.length && frames % 2 == 0; i++) {
    fallingCharArray[i].draw(ctx);
  }

  requestAnimationFrame(update);
  frames++;
}
update();
