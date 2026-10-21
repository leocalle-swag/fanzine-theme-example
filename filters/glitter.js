function apply(image, params) {
  const data = image.data
  const spark = hexRgb(typeof params.spark === "string" ? params.spark : "#fff6c8")
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 8) continue
    const n = ((i / 4) * 1103515245 + 12345) >>> 0
    if (n % 1000 > 28) continue
    data[i] = spark[0]
    data[i + 1] = spark[1]
    data[i + 2] = spark[2]
  }
}

function hexRgb(hex) {
  const h = String(hex).replace("#", "")
  const full = h.length === 3 ? h.replace(/(.)/g, "$1$1") : h
  const n = Number.parseInt(full, 16)
  if (!Number.isFinite(n)) return [255, 246, 200]
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
