export default class AnimateHeartCanvas {
  private isPlaying = true;
  private mouseX = 0;
  private mouseY = 0;
  private container: HTMLElement;
  private resizeObserver?: ResizeObserver;

  private configFrame = {
    width: 1200,
    height: 300,
    bgColor: "",
  };

  private configHeart = {
    timeLine: 0,
    timeInit: new Date().getTime(),
    movement: 1,
    x: 50,
    y: 50,
    width: 200,
    height: 200,
    countHeart: 150,
    sizeMin: 50,
    sizeMax: 350,
    colorSaturate: 100,
    colorLight: 60,
    hMin: 330,
    hMax: 350,
    minOpacity: 20,
    maxOpacity: 100,
    opacityGrowth: 5,
    heartRangeMin: 0,
    heartRangeMax: 0.3,
    gravityMin: 1,
    gravityMax: 9.8,
    flowDirection: 1,
  };

  private heartBuffer: any[] = [];

  constructor(
    hMin?: number,
    hMax?: number,
    countHeart = 150,
    sizeMin = 50,
    sizeMax = 350,
    bgColor?: string,
    containerId = "main-bg-layer"
  ) {
    this.configHeart.hMin = isNaN(hMin ?? NaN) ? 330 : hMin!;
    this.configHeart.hMax = isNaN(hMax ?? NaN) ? 350 : hMax!;
    this.configHeart.countHeart = countHeart;
    this.configHeart.sizeMin = isNaN(sizeMin) ? 50 : sizeMin;
    this.configHeart.sizeMax = isNaN(sizeMax) ? 350 : sizeMax;
    this.configFrame.bgColor = bgColor || "";

    const container = document.getElementById(containerId) || document.body;
    this.container = container;

    this.init();

    const supportsRO =
      typeof window !== "undefined" &&
      typeof (window as any).ResizeObserver !== "undefined";
    if (supportsRO) {
      const RO = (window as any).ResizeObserver;
      this.resizeObserver = new RO(() => this.handleResize());
      this.resizeObserver?.observe(this.container);
    } else {
      window.addEventListener("resize", this.handleResize);
    }
  }

  private handleResize = () => {
    const heartLayer = document.getElementById(
      "heartLayer"
    ) as HTMLCanvasElement;
    if (heartLayer) this.updateFrameAttribute(heartLayer);
  };

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.draw();
    }
  }

  stop() {
    this.isPlaying = false;
  }

  destroy() {
    this.isPlaying = false;
    const heartLayer = document.getElementById("heartLayer");
    heartLayer?.remove();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    } else {
      window.removeEventListener("resize", this.handleResize);
    }
  }

  private updateFrameAttribute(heartLayer: HTMLCanvasElement) {
    const rect = this.container.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    this.configFrame.width = Math.floor(rect.width * dpr);
    this.configFrame.height = Math.floor(rect.height * dpr);

    heartLayer.id = "heartLayer";
    heartLayer.width = this.configFrame.width;
    heartLayer.height = this.configFrame.height;
    heartLayer.style.width = `${rect.width}px`;
    heartLayer.style.height = `${rect.height}px`;
    heartLayer.style.zIndex = "0";
    heartLayer.style.userSelect = "none";
    heartLayer.style.pointerEvents = "none";
    heartLayer.style.position = "absolute";
    heartLayer.style.top = "0";
    heartLayer.style.left = "0";
  }

  private init() {
    const heartLayer = document.createElement("canvas");
    this.updateFrameAttribute(heartLayer);
    this.container.appendChild(heartLayer);

    for (let i = 0; i < this.configHeart.countHeart; i++) {
      const randomSize = randomInt(
        this.configHeart.sizeMin,
        this.configHeart.sizeMax
      );
      const x = randomInt(0, this.configFrame.width);
      const y = randomInt(
        this.configFrame.height * (1 - this.configHeart.heartRangeMax),
        this.configFrame.height * (1 - this.configHeart.heartRangeMin)
      );
      this.heartBuffer.push({
        id: i,
        gravity: randomFloat(
          this.configHeart.gravityMin,
          this.configHeart.gravityMax
        ),
        opacity: 0,
        opacityFinal: randomInt(
          this.configHeart.minOpacity,
          this.configHeart.maxOpacity
        ),
        timeInit: randomInt(1, 500),
        x,
        y,
        originalX: x,
        originalY: y,
        width: randomSize,
        height: randomSize,
        colorH: randomInt(this.configHeart.hMin, this.configHeart.hMax),
      });
    }

    this.draw();

    document.addEventListener("mousemove", (event) => {
      this.mouseX = event.x;
      this.mouseY = event.y;
    });
  }

  private draw() {
    this.configHeart.timeLine += 1;
    const canvas = document.getElementById("heartLayer") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, this.configFrame.width, this.configFrame.height);

    if (this.configFrame.bgColor) {
      ctx.fillStyle = this.configFrame.bgColor;
      ctx.fillRect(0, 0, this.configFrame.width, this.configFrame.height);
    }

    this.heartBuffer.forEach((heart) => {
      if (heart.y < -heart.height) {
        heart.y = heart.originalY;
        heart.timeInit = this.configHeart.timeLine;
        heart.opacity = 0;
      }

      const timeGap = this.configHeart.timeLine - heart.timeInit;
      if (timeGap > 0) {
        heart.opacity = heart.opacity * (timeGap / 100);
      } else {
        heart.opacity = 0;
      }

      if (heart.opacity >= heart.opacityFinal) {
        heart.opacity = heart.opacityFinal;
      }

      const movement =
        ((0.5 * heart.gravity * (this.configHeart.timeLine - heart.timeInit)) /
          300) *
        this.configHeart.flowDirection;
      heart.y -= movement;

      this.drawHeart(
        ctx,
        heart.x,
        heart.y,
        heart.width / 2,
        heart.height / 2,
        `hsl(${heart.colorH} ${this.configHeart.colorSaturate}% ${this.configHeart.colorLight}% / ${heart.opacity}%)`
      );

      heart.opacity += this.configHeart.opacityGrowth;
    });

    if (this.isPlaying) requestAnimationFrame(() => this.draw());
  }

  private drawHeart(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    colorFill: string
  ) {
    ctx.save();
    ctx.beginPath();
    const topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(
      x,
      y,
      x - width / 2,
      y,
      x - width / 2,
      y + topCurveHeight
    );
    ctx.bezierCurveTo(
      x - width / 2,
      y + (height + topCurveHeight) / 2,
      x,
      y + (height + topCurveHeight) / 1.4,
      x,
      y + height
    );
    ctx.bezierCurveTo(
      x,
      y + (height + topCurveHeight) / 1.8,
      x + width / 2,
      y + (height + topCurveHeight) / 2,
      x + width / 2,
      y + topCurveHeight
    );
    ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fillStyle = colorFill;
    ctx.fill();
    ctx.restore();
  }
}

// Utility functions
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
