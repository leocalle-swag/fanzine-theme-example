function apply(image) {
  const data = image.data
  const colors = [
    [255, 79, 154],
    [255, 214, 90],
    [140, 230, 190],
    [186, 160, 255],
  ]
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 8) continue
    const n = ((i / 4) * 1664525 + 1013904223) >>> 0
    if (n % 900 > 18) continue
    const color = colors[n % colors.length]
    data[i] = color[0]
    data[i + 1] = color[1]
    data[i + 2] = color[2]
  }
}
