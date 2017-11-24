# exif normalizer

Rotate and flip an image to match exif orientation
This Fork includes toBlob mode

Meant for use in browser.
Sorry, it won't work in webworkers :(

### Useage

```
import resolveExif from 'exif-normalizer';

// use HTML Image object or
// image data url or
// image url
resolveExif(image).then(function(imageUrl) {
  ...
});
```

You can also pass a max width to thumbnail the image too:

```
resolveExif(image, 600)
```

### ToBlob

You can also set quality

```
let exportType = 'blob'
let jpgBlobQuality = 0.95
resolveExif(image, 600, exportType, exportBlobQuality)
```