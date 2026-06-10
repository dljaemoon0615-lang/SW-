const PIN_W = 36;
const PIN_H = 44;
const PIN_W_SELECTED = 42;
const PIN_H_SELECTED = 50;

const iconCache = new Map<string, string>();
const imageCache = new Map<string, Promise<HTMLImageElement | null>>();

export function pinMarkerSize(selected: boolean) {
  return {
    w: selected ? PIN_W_SELECTED : PIN_W,
    h: selected ? PIN_H_SELECTED : PIN_H,
  };
}

function cacheKey(photoUrl: string | null, rank: number, selected: boolean) {
  return `${photoUrl ?? "none"}|${rank}|${selected}`;
}

function canvasImageSrc(url: string): string {
  if (url.startsWith("/")) return url;
  return `/_next/image?url=${encodeURIComponent(url)}&w=96&q=80`;
}

function loadImage(url: string): Promise<HTMLImageElement | null> {
  const cached = imageCache.get(url);
  if (cached) return cached;

  const promise = new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = canvasImageSrc(url);
  });

  imageCache.set(url, promise);
  return promise;
}

function drawPinPath(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const sx = w / 36;
  const sy = h / 44;
  ctx.beginPath();
  ctx.moveTo(18 * sx, 1.5 * sy);
  ctx.bezierCurveTo(10.5 * sx, 1.5 * sy, 4.5 * sx, 8 * sy, 4.5 * sx, 15.5 * sy);
  ctx.bezierCurveTo(4.5 * sx, 24 * sy, 18 * sx, 42 * sy, 18 * sx, 42 * sy);
  ctx.bezierCurveTo(18 * sx, 42 * sy, 31.5 * sx, 24 * sy, 31.5 * sx, 15.5 * sy);
  ctx.bezierCurveTo(31.5 * sx, 8 * sy, 25.5 * sx, 1.5 * sy, 18 * sx, 1.5 * sy);
  ctx.closePath();
}

function drawPinMarker(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rank: number,
  selected: boolean,
  photo: HTMLImageElement | null,
) {
  const fill = selected ? "#7ba7e8" : "#6a96d8";
  const badgeFill = selected ? "#2a3f7a" : "#3d528f";
  const sx = w / 36;
  const sy = h / 44;
  const cx = 18 * sx;
  const cy = 15.5 * sy;
  const r = 9 * Math.min(sx, sy);

  ctx.clearRect(0, 0, w, h);

  drawPinPath(ctx, w, h);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
  ctx.clip();

  if (photo) {
    const iw = photo.naturalWidth || photo.width;
    const ih = photo.naturalHeight || photo.height;
    const scale = Math.max((r * 2) / iw, (r * 2) / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(photo, cx - dw / 2, cy - dh / 2, dw, dh);
  } else {
    ctx.fillStyle = "#eef2fc";
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.fillStyle = badgeFill;
    ctx.font = `bold ${Math.round(11 * Math.min(sx, sy))}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(rank), cx, cy);
  }
  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();

  const bx = cx + r * 0.62;
  const by = cy + r * 0.62;
  const br = 7 * Math.min(sx, sy);

  ctx.beginPath();
  ctx.arc(bx, by, br, 0, Math.PI * 2);
  ctx.fillStyle = badgeFill;
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.font = `bold ${Math.round(8 * Math.min(sx, sy))}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(rank), bx, by);
}

function renderToDataUrl(
  rank: number,
  selected: boolean,
  photo: HTMLImageElement | null,
): string {
  const { w, h } = pinMarkerSize(selected);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return pinMarkerSvgFallback(rank, selected);

  drawPinMarker(ctx, w, h, rank, selected, photo);
  return canvas.toDataURL("image/png");
}

/** 사진 없이 즉시 쓸 수 있는 SVG 폴백 */
export function pinMarkerSvgFallback(rank: number, selected: boolean): string {
  const { w, h } = pinMarkerSize(selected);
  const fill = selected ? "#7ba7e8" : "#6a96d8";
  const stroke = selected ? "#2a3f7a" : "#3d528f";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 36 44">
    <path d="M18 1.5 C10.5 1.5 4.5 8 4.5 15.5 C4.5 24 18 42 18 42 C18 42 31.5 24 31.5 15.5 C31.5 8 25.5 1.5 18 1.5 Z" fill="${fill}" stroke="#fff" stroke-width="2"/>
    <circle cx="18" cy="15.5" r="10" fill="#eef2fc"/>
    <text x="18" y="19.5" text-anchor="middle" font-size="11" font-weight="700" fill="${stroke}" font-family="system-ui,sans-serif">${rank}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function getPinMarkerDataUrlSync(rank: number, selected: boolean): string {
  return pinMarkerSvgFallback(rank, selected);
}

export async function getPinMarkerDataUrl(
  rank: number,
  selected: boolean,
  photoUrl: string | null,
): Promise<string> {
  const key = cacheKey(photoUrl, rank, selected);
  const hit = iconCache.get(key);
  if (hit) return hit;

  let photo: HTMLImageElement | null = null;
  if (photoUrl) {
    photo = await loadImage(photoUrl);
  }

  const dataUrl = renderToDataUrl(rank, selected, photo);
  iconCache.set(key, dataUrl);
  return dataUrl;
}

export function toGoogleMarkerIcon(
  googleMaps: typeof google,
  dataUrl: string,
  selected: boolean,
): google.maps.Icon {
  const { w, h } = pinMarkerSize(selected);
  return {
    url: dataUrl,
    scaledSize: new googleMaps.maps.Size(w, h),
    anchor: new googleMaps.maps.Point(w / 2, h - 2),
  };
}
