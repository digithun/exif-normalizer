import { assert } from 'chai'
import resolveExif, { getImageFromUrl } from './exif'
import exif from 'exif-js'

describe('resolveExif', function () {
  it('can load an html image', function (done) {
    let image = new Image()
    image.onload = function () {
      resolveExif(image)
        .then(function (result) {
          return getImageFromUrl(result)
        })
        .then(function (image) {
          assert.equal(image.width, 600)
          assert.equal(image.height, 450)
          done()
        })
        .catch(function () {
          assert.fail('Failed to process image')
        })
    }
    image.onerror = function () {
      assert.fail('Failed to load image')
    }
    image.src = './test_images/Landscape_2.jpg'
  })

  it('can load a url', function () {
    return resolveExif('./test_images/Landscape_6.jpg')
      .then(function (result) {
        return getImageFromUrl(result)
      })
      .then(function (image) {
        assert.equal(image.width, 600)
        assert.equal(image.height, 450)
      })
  })

  it('can thumbnail', function () {
    return resolveExif('./test_images/Landscape_2.jpg', 200)
      .then(function (result) {
        return getImageFromUrl(result)
      })
      .then(function (image) {
        assert.equal(image.width, 200)
        assert.equal(image.height, 150)
      })
  })

  function createResultDiv() {
    const resultDiv = document.createElement('div')
    resultDiv.style.border = '1px red solid'
    resultDiv.style.display = 'inline-block'
    return resultDiv
  }

  it('Should UPSIZE image that larger than canvas size', function () {
    const resultDiv = createResultDiv()
    document.body.appendChild(resultDiv)
    return resolveExif('./test_images/IMG_0041.jpg', 5024)
      .then(function (result) {
        return getImageFromUrl(result)
      })
      .then(function (image) {
        image.style.width = "300px"
        resultDiv.appendChild(image)
        assert.equal(image.width, 200)
        assert.equal(image.height, 150)
      })
  })

  it('Should DOWNSIZE image that larger than canvas size', function () {
    const resultDiv = createResultDiv()
    document.body.appendChild(resultDiv)
    return resolveExif('./test_images/IMG_0041.jpg', 2000)
      .then(function (result) {
        return getImageFromUrl(result)
      })
      .then(function (image) {
        image.style.width = "300px"
        resultDiv.appendChild(image)
        assert.equal(image.width, 200)
        assert.equal(image.height, 150)
      })
  })


  it('Should UPSIZE ROTATE image that larger than canvas size', function () {
    const resultDiv = createResultDiv()
    document.body.appendChild(resultDiv)
    return resolveExif('./test_images/IMG_0042.jpg', 5024)
      .then(function (result) {
        return getImageFromUrl(result)
      })
      .then(function (image) {
        image.style.width = "300px"
        resultDiv.appendChild(image)
        assert.equal(image.width, 200)
        assert.equal(image.height, 150)
      })
  })

  it('Should DOWNSIZE ROTATE image that larger than canvas size', function () {
    const resultDiv = createResultDiv()
    document.body.appendChild(resultDiv)
    return resolveExif('./test_images/IMG_0042.jpg', 2000)
      .then(function (result) {
        return getImageFromUrl(result)
      })
      .then(function (image) {
        image.style.width = "300px"
        resultDiv.appendChild(image)
        assert.equal(image.width, 200)
        assert.equal(image.height, 150)
      })
  })

  it('IMG_0002 Should UPSIZE ROTATE image that larger than canvas size', function () {
    const resultDiv = createResultDiv()
    document.body.appendChild(resultDiv)
    return resolveExif('./test_images/IMG_0002.jpg', 5024)
      .then(function (result) {
        return getImageFromUrl(result)
      })
      .then(function (image) {
        image.style.width = "300px"
        resultDiv.appendChild(image)
        assert.equal(image.width, 200)
        assert.equal(image.height, 150)
      })
  })

  it(' IMG_0002 Should DOWNSIZE ROTATE image that larger than canvas size', function () {
    const resultDiv = createResultDiv()
    document.body.appendChild(resultDiv)
    return resolveExif('./test_images/IMG_0002.jpg', 2000)
      .then(function (result) {
        return getImageFromUrl(result)
      })
      .then(function (image) {
        image.style.width = "300px"
        resultDiv.appendChild(image)
        assert.equal(image.width, 200)
        assert.equal(image.height, 150)
      })
  })
 

  it('Can UPSIZE image that smaller than canvas size correctly', function () {
    const resultDiv = createResultDiv()
    document.body.appendChild(resultDiv)
    return resolveExif('./test_images/BAY.png', 200)
      .then(function (result) {
        return getImageFromUrl(result)
      })
      .then(function (image) {
        resultDiv.appendChild(image)
        assert.equal(image.width, 200)
        assert.equal(image.height, 150)
      })
  })

  it('Can DOWNSIZE image that smaller than canvas size correctly', function () {
    const resultDiv = createResultDiv()
    document.body.appendChild(resultDiv)
    return resolveExif('./test_images/BAY.png', 200)
      .then(function (result) {
        return getImageFromUrl(result)
      })
      .then(function (image) {
        resultDiv.appendChild(image)
        assert.equal(image.width, 200)
        assert.equal(image.height, 150)
      })
  })
})
