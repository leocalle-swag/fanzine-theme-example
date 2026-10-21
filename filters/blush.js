function apply(image) {
  const data = image.data
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 8) continue
    data[i] = Math.min(255, data[i] * 0.62 + 255 * 0.48)
    data[i + 1] = Math.min(255, data[i + 1] * 0.78 + 170 * 0.22)
    data[i + 2] = data[i + 2] * 0.7
  }
}
