function AutoAlignImage (ImgD, ImgW, ImgH) {
  var image = new Image()
  image.src = ImgD.src
  if (image.width > 0 && image.height > 0) {
    // flag=true;
    if (image.width / image.height >= ImgW / ImgH) {
      if (image.width > ImgW) {
        ImgD.width = ImgW
        ImgD.height = (image.height * ImgW) / image.width
      } else {
        ImgD.width = image.width
        ImgD.height = image.height
      }
    } else {
      if (image.height > ImgH) {
        ImgD.height = ImgH
        ImgD.width = (image.width * ImgH) / image.height
      } else {
        ImgD.width = image.width
        ImgD.height = image.height
      }
    }
  }
  return ImgD
}
export {AutoAlignImage}
