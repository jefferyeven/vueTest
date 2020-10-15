function getPixelColor (aim, x, y) {
  var c = document.getElementById(aim)
  var ctx = c.getContext('2d')
  var imageData = ctx.getImageData(x, y, 1, 1)
  var pixel = imageData.data
  var r = pixel[0]
  var g = pixel[1]
  var b = pixel[2]
  var a = pixel[3] / 255
  a = Math.round(a * 100) / 100
  var rHex = r.toString(16)
  r < 16 && (rHex = '0' + rHex)
  var gHex = g.toString(16)
  g < 16 && (gHex = '0' + gHex)
  var bHex = b.toString(16)
  b < 16 && (bHex = '0' + bHex)
  var rgbaColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
  var rgbColor = 'rgb(' + r + ',' + g + ',' + b + ')'
  var hexColor = '#' + rHex + gHex + bHex
  var colorData = {
    rgba: rgbaColor,
    rgb: rgbColor,
    hex: hexColor,
    r: r,
    g: g,
    b: b,
    a: a
  }
  return colorData
}
export {
  getPixelColor
}
