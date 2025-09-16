/* script.js — Global utilities for Image Tools Hub
   Author: (you)
   Provides shared functions for file uploads, previews, downloads,
   and tool initialization. Each tool can extend these.
*/

/* ---------- File Handling ---------- */

// Load image into <canvas> from <input type="file">
function loadImageFromFile(input, canvasId, callback) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById(canvasId);
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      if (callback) callback(img, canvas, ctx);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Convert canvas to downloadable file
function downloadCanvas(canvasId, filename = "output.png") {
  const canvas = document.getElementById(canvasId);
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/* ---------- Canvas Helpers ---------- */

function clearCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas(canvasId, newWidth, newHeight) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = newWidth;
  temp.height = newHeight;
  tctx.drawImage(canvas, 0, 0, newWidth, newHeight);
  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx.drawImage(temp, 0, 0);
}

function rotateCanvas(canvasId, degrees) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = canvas.width;
  temp.height = canvas.height;
  tctx.drawImage(canvas, 0, 0);

  if (degrees % 180 !== 0) {
    [canvas.width, canvas.height] = [canvas.height, canvas.width];
  }

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((degrees * Math.PI) / 180);
  ctx.drawImage(temp, -temp.width / 2, -temp.height / 2);
  ctx.restore();
}

function flipCanvas(canvasId, horizontal = false, vertical = false) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  const temp = document.createElement("canvas");
  const tctx = temp.getContext("2d");
  temp.width = canvas.width;
  temp.height = canvas.height;
  tctx.drawImage(canvas, 0, 0);

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.scale(horizontal ? -1 : 1, vertical ? -1 : 1);
  ctx.drawImage(
    temp,
    horizontal ? -canvas.width : 0,
    vertical ? -canvas.height : 0
  );
  ctx.restore();
}

/* ---------- UI Helpers ---------- */

// Show/hide elements
function show(el) {
  if (typeof el === "string") el = document.querySelector(el);
  if (el) el.style.display = "block";
}
function hide(el) {
  if (typeof el === "string") el = document.querySelector(el);
  if (el) el.style.display = "none";
}

// Attach simple event helpers
function onClick(id, handler) {
  document.getElementById(id)?.addEventListener("click", handler);
}
function onChange(id, handler) {
  document.getElementById(id)?.addEventListener("change", handler);
}

/* ---------- Example Init (per tool) ---------- */
// Usage inside resize.html, crop.html, etc.
//
// document.addEventListener("DOMContentLoaded", () => {
//   onChange("fileInput", e => loadImageFromFile(e.target, "canvas"));
//   onClick("downloadBtn", () => downloadCanvas("canvas", "edited.png"));
// });

