"use client";

import { useEffect, useRef } from "react";

interface GlobeNode {
  lat: number;
  lon: number;
  label: string;
  size: number;
  glow: boolean;
}

interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  visible: boolean;
}

const GRID_COLOR = "rgba(79, 70, 229, 0.10)";
const GLOBE_LINE_COLOR = "rgba(79, 70, 229, 0.24)";

const nodes: GlobeNode[] = [
  { lat: 9.0, lon: 7.5, label: "Abuja", size: 5, glow: true },
  { lat: 6.5, lon: 3.4, label: "Lagos", size: 4.5, glow: true },
  { lat: -1.3, lon: 36.8, label: "Nairobi", size: 4, glow: true },
  { lat: -26.2, lon: 28.0, label: "Johannesburg", size: 3.5, glow: true },
  { lat: 30.0, lon: 31.2, label: "Cairo", size: 3, glow: false },
  { lat: 14.7, lon: -17.4, label: "Dakar", size: 2.5, glow: false },
  { lat: 5.6, lon: -0.2, label: "Accra", size: 3, glow: false },
  { lat: -4.3, lon: 15.3, label: "Kinshasa", size: 2.5, glow: false },
  { lat: -33.9, lon: 18.4, label: "Cape Town", size: 2.5, glow: false },
  { lat: 15.5, lon: 32.5, label: "Khartoum", size: 2, glow: false },
  { lat: 12.4, lon: -1.5, label: "Ouagadougou", size: 1.8, glow: false },
  { lat: 3.9, lon: 11.5, label: "Yaoundé", size: 2, glow: false },
  { lat: 0.3, lon: 6.7, label: "São Tomé", size: 1.5, glow: false },
  { lat: 11.1, lon: 42.8, label: "Djibouti", size: 1.8, glow: false },
  { lat: -13.9, lon: 33.8, label: "Lilongwe", size: 1.8, glow: false },
];

const arcs: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 6],
  [1, 6],
  [1, 7],
  [2, 3],
  [2, 14],
  [3, 8],
  [4, 9],
  [5, 6],
  [0, 7],
  [7, 1],
  [1, 10],
  [2, 3],
  [3, 11],
];

const CONTINENTS: { name: string; coords: [number, number][] }[] = [
  {
    name: "Africa",
    coords: [
      [37.5, 12],
      [43, 11.5],
      [50, 12],
      [51.5, 11],
      [43, 4.5],
      [41.5, -1],
      [41, -10],
      [40, -17],
      [35.5, -25],
      [33, -28],
      [28, -33.5],
      [18, -35],
      [16, -34],
      [12, -32],
      [10, -26],
      [13, -22],
      [11.5, -17],
      [8, -13],
      [5, -5],
      [2, 2],
      [-3, 4],
      [-8, 5],
      [-15, 4.5],
      [-17, 6],
      [-16, 12],
      [-15, 15],
      [-17, 20],
      [-14, 22],
      [-12, 24],
      [-8, 27],
      [-5, 30],
      [2, 31],
      [10, 37],
      [11, 37.5],
      [15, 37],
      [22, 37],
      [25, 37],
      [30, 37],
      [37.5, 37],
      [42, 37],
      [42, 30],
      [45, 22],
      [43, 17],
      [43, 12],
      [37.5, 12],
    ],
  },
  {
    name: "Europe",
    coords: [
      [-9, 36],
      [-6, 37],
      [0, 38],
      [3, 40],
      [5, 43],
      [8, 44],
      [14, 46],
      [20, 47],
      [22, 48],
      [24, 55],
      [22, 57],
      [25, 60],
      [28, 65],
      [25, 68],
      [20, 70],
      [15, 70],
      [10, 63],
      [5, 60],
      [0, 55],
      [-3, 52],
      [-5, 48],
      [-9, 44],
      [-9, 40],
      [-9, 36],
    ],
  },
  {
    name: "Asia",
    coords: [
      [26, 42],
      [30, 42],
      [36, 37],
      [42, 38],
      [50, 42],
      [55, 45],
      [60, 50],
      [65, 55],
      [70, 58],
      [80, 60],
      [90, 65],
      [100, 68],
      [110, 70],
      [120, 68],
      [130, 65],
      [140, 60],
      [145, 55],
      [140, 48],
      [135, 42],
      [130, 35],
      [122, 30],
      [120, 22],
      [115, 15],
      [105, 10],
      [100, 5],
      [102, 1],
      [100, -5],
      [95, 5],
      [90, 10],
      [85, 18],
      [80, 22],
      [73, 20],
      [68, 22],
      [62, 25],
      [57, 22],
      [52, 18],
      [48, 12],
      [44, 12],
      [38, 12],
      [36, 20],
      [36, 30],
      [30, 35],
      [26, 38],
      [26, 42],
    ],
  },
  {
    name: "North America",
    coords: [
      [-140, 60],
      [-130, 55],
      [-125, 50],
      [-122, 48],
      [-120, 42],
      [-118, 35],
      [-115, 30],
      [-110, 25],
      [-105, 20],
      [-90, 18],
      [-83, 10],
      [-77, 8],
      [-75, 10],
      [-72, 12],
      [-65, 18],
      [-60, 22],
      [-65, 25],
      [-70, 30],
      [-75, 35],
      [-75, 40],
      [-70, 45],
      [-65, 47],
      [-62, 50],
      [-65, 55],
      [-70, 58],
      [-80, 60],
      [-90, 62],
      [-100, 65],
      [-110, 68],
      [-120, 68],
      [-130, 65],
      [-140, 62],
      [-140, 60],
    ],
  },
  {
    name: "South America",
    coords: [
      [-80, 10],
      [-75, 12],
      [-65, 12],
      [-62, 8],
      [-60, 5],
      [-52, 5],
      [-50, 2],
      [-48, -5],
      [-40, -10],
      [-38, -15],
      [-40, -20],
      [-42, -25],
      [-45, -30],
      [-50, -33],
      [-55, -38],
      [-60, -43],
      [-65, -48],
      [-68, -55],
      [-63, -55],
      [-58, -52],
      [-53, -45],
      [-50, -38],
      [-48, -30],
      [-45, -25],
      [-42, -18],
      [-40, -12],
      [-38, -8],
      [-36, -5],
      [-40, 0],
      [-48, 2],
      [-50, 5],
      [-60, 5],
      [-65, 0],
      [-72, -5],
      [-78, 0],
      [-80, 5],
      [-80, 10],
    ],
  },
  {
    name: "Australia",
    coords: [
      [114, -22],
      [118, -20],
      [122, -18],
      [128, -15],
      [132, -12],
      [136, -12],
      [140, -15],
      [142, -18],
      [145, -20],
      [148, -22],
      [152, -26],
      [154, -28],
      [152, -32],
      [150, -36],
      [148, -38],
      [145, -38],
      [142, -38],
      [138, -36],
      [134, -34],
      [130, -32],
      [125, -30],
      [120, -28],
      [116, -26],
      [114, -24],
      [114, -22],
    ],
  },
  {
    name: "Greenland",
    coords: [
      [-45, 60],
      [-40, 63],
      [-35, 66],
      [-30, 70],
      [-25, 75],
      [-20, 78],
      [-25, 82],
      [-35, 84],
      [-50, 83],
      [-60, 80],
      [-65, 76],
      [-60, 72],
      [-55, 68],
      [-50, 64],
      [-45, 60],
    ],
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function quadraticPoint(
  start: ProjectedPoint,
  control: { x: number; y: number },
  end: ProjectedPoint,
  t: number
) {
  const inverse = 1 - t;

  return {
    x: inverse * inverse * start.x + 2 * inverse * t * control.x + t * t * end.x,
    y: inverse * inverse * start.y + 2 * inverse * t * control.y + t * t * end.y,
  };
}

export function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let rotation = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (lat: number, lon: number): ProjectedPoint => {
      const latRad = toRadians(lat);
      const lonRad = toRadians(lon);
      const rotationRad = toRadians(rotation);
      const radius = height * 0.78;
      const centerX = width * 0.72;
      const centerY = height * 0.5;
      const sphereX = Math.cos(latRad) * Math.cos(lonRad);
      const sphereY = Math.sin(latRad);
      const sphereZ = Math.cos(latRad) * Math.sin(lonRad);
      const rotatedX =
        sphereX * Math.cos(rotationRad) + sphereZ * Math.sin(rotationRad);
      const rotatedZ =
        -sphereX * Math.sin(rotationRad) + sphereZ * Math.cos(rotationRad);

      return {
        x: centerX + rotatedX * radius,
        y: centerY - sphereY * radius,
        z: rotatedZ,
        visible: rotatedZ > -0.1,
      };
    };

    const drawDotGrid = () => {
      ctx.fillStyle = GRID_COLOR;

      for (let x = 0; x <= width; x += 48) {
        for (let y = 0; y <= height; y += 48) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawLinePath = (points: ProjectedPoint[]) => {
      let drawing = false;

      ctx.beginPath();
      points.forEach((point) => {
        if (!point.visible) {
          drawing = false;
          return;
        }

        if (!drawing) {
          ctx.moveTo(point.x, point.y);
          drawing = true;
          return;
        }

        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    };

    const drawGlobeGrid = () => {
      ctx.strokeStyle = GLOBE_LINE_COLOR;
      ctx.lineWidth = 0.8;

      for (let lat = -80; lat <= 80; lat += 20) {
        const points: ProjectedPoint[] = [];

        for (let lon = 0; lon <= 360; lon += 4) {
          points.push(project(lat, lon));
        }

        drawLinePath(points);
      }

      for (let lon = 0; lon < 360; lon += 20) {
        const points: ProjectedPoint[] = [];

        for (let lat = -90; lat <= 90; lat += 4) {
          points.push(project(lat, lon));
        }

        drawLinePath(points);
      }
    };

    const drawContinentPath = (
      coords: [number, number][],
      fillStyle: string,
      strokeStyle: string,
      lineWidth: number
    ) => {
      let penDown = false;

      ctx.beginPath();
      coords.forEach(([lon, lat]) => {
        const point = project(lat, lon);

        if (point.z < -0.05) {
          penDown = false;
          return;
        }

        if (!penDown) {
          ctx.moveTo(point.x, point.y);
          penDown = true;
          return;
        }

        ctx.lineTo(point.x, point.y);
      });

      ctx.fillStyle = fillStyle;
      ctx.fill();
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = "round";
      ctx.stroke();
    };

    const drawContinents = () => {
      CONTINENTS.forEach((continent) => {
        drawContinentPath(
          continent.coords,
          "rgba(79, 70, 229, 0.07)",
          "rgba(79, 70, 229, 0.28)",
          0.9
        );
      });

      const africa = CONTINENTS.find((continent) => continent.name === "Africa");
      if (!africa) return;

      drawContinentPath(
        africa.coords,
        "rgba(79, 70, 229, 0.12)",
        "rgba(67, 56, 202, 0.44)",
        1.2
      );
    };

    const getArcControl = (start: ProjectedPoint, end: ProjectedPoint) => {
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      return {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2 - distance * 0.18,
      };
    };

    const drawConnections = (projectedNodes: ProjectedPoint[], now: number) => {
      arcs.forEach(([startIndex, endIndex], arcIndex) => {
        const start = projectedNodes[startIndex];
        const end = projectedNodes[endIndex];

        if (!start.visible || !end.visible) return;

        const opacity = clamp(Math.min(start.z, end.z) * 0.45 + 0.05, 0, 0.5);
        const control = getArcControl(start, end);

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(control.x, control.y, end.x, end.y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const t = ((now / 2000 + arcIndex * 0.23) % 1 + 1) % 1;
        const packet = quadraticPoint(start, control, end, t);

        ctx.beginPath();
        ctx.fillStyle = `rgba(79, 70, 229, ${clamp(opacity * 1.2, 0, 0.85)})`;
        ctx.arc(packet.x, packet.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawNodes = (projectedNodes: ProjectedPoint[], now: number) => {
      projectedNodes.forEach((point, index) => {
        if (!point.visible) return;

        const node = nodes[index];
        const alpha = clamp(point.z * 0.8 + 0.4, 0, 1);

        if (node.glow) {
          const pulse = (Math.sin(now / 1000 + index) + 1) / 2;
          const halo = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            node.size * 5
          );

          halo.addColorStop(0, `rgba(109, 40, 217, ${0.15 * pulse * alpha})`);
          halo.addColorStop(1, "rgba(109, 40, 217, 0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(point.x, point.y, node.size * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(79, 70, 229, ${alpha})`;
        ctx.arc(point.x, point.y, node.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(79, 70, 229, ${alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(point.x, point.y, node.size * 0.45, 0, Math.PI * 2);
        ctx.fill();

        if (node.glow && point.z > 0.25) {
          ctx.font = "10px sans-serif";
          ctx.fillStyle = `rgba(67, 56, 202, ${alpha})`;
          ctx.fillText(node.label, point.x + node.size + 7, point.y + 3);
        }
      });
    };

    const drawVignette = () => {
      const vignette = ctx.createRadialGradient(
        width * 0.72,
        height * 0.5,
        height * 0.3,
        width * 0.72,
        height * 0.5,
        height * 0.9
      );

      vignette.addColorStop(0, "rgba(255,255,255,0)");
      vignette.addColorStop(1, "rgba(255, 255, 255, 0.72)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const drawLeftFade = () => {
      const fade = ctx.createLinearGradient(0, 0, width * 0.42, 0);

      fade.addColorStop(0, "rgba(255, 255, 255, 1)");
      fade.addColorStop(0.55, "rgba(255, 255, 255, 0.88)");
      fade.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, width * 0.42, height);
    };

    const animate = () => {
      const now = Date.now();
      const projectedNodes = nodes.map((node) => project(node.lat, node.lon));

      ctx.clearRect(0, 0, width, height);
      rotation += 0.06;

      drawDotGrid();
      drawGlobeGrid();
      drawContinents();
      drawConnections(projectedNodes, now);
      drawNodes(projectedNodes, now);
      drawLeftFade();
      drawVignette();

      animationFrame = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full"
    />
  );
}
