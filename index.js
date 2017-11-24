"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXIF_TRANSFORMS = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.getImageFromUrl = getImageFromUrl;
exports.getCanvasForImage = getCanvasForImage;
exports.exifTransformCanvas = exifTransformCanvas;
exports.transformCanvas = transformCanvas;

var _exifJs = require("exif-js");

var _exifJs2 = _interopRequireDefault(_exifJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXIF_TRANSFORMS = exports.EXIF_TRANSFORMS = {
  1: { rotate: 0, flip: false },
  2: { rotate: 0, flip: true },
  3: { rotate: Math.PI, flip: false },
  4: { rotate: Math.PI, flip: true },
  5: { rotate: Math.PI * 1.5, flip: true },
  6: { rotate: Math.PI * 0.5, flip: false },
  7: { rotate: Math.PI * 0.5, flip: true },
  8: { rotate: Math.PI * 1.5, flip: false }
};

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(image) {
    var maxWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'url';
    var quality = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.95;
    var url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!HTMLCanvasElement.prototype.toBlob) require("blueimp-canvas-to-blob");

            if (!(typeof image == "string")) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return getImageFromUrl(image);

          case 4:
            image = _context.sent;

          case 5:
            _context.next = 7;
            return new _promise2.default(function (resolve, reject) {
              _exifJs2.default.getData(image, function () {
                var orientation = _exifJs2.default.getTag(this, "Orientation");
                if (orientation) {
                  var _canvas = getCanvasForImage(image, maxWidth);
                  var w = _canvas.width;
                  var h = _canvas.height;

                  if (orientation > 4) {
                    var temp = _canvas.width;
                    _canvas.width = _canvas.height;
                    _canvas.height = temp;
                  }

                  var _ctx = _canvas.getContext("2d");

                  exifTransformCanvas(_ctx, orientation);
                  _ctx.drawImage(image, 0, 0, image.width, image.height, -w / 2, -h / 2, w, h);
                  if (type === 'blob') _canvas.toBlob(function (blob) {
                    console.log('toblob');
                    resolve(blob);
                  }, 'image/jpeg', quality);else {
                    resolve(_canvas.toDataURL());
                  }
                } else {
                  if (type === 'blob') {
                    var canvas = getCanvasForImage(image, maxWidth);
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0);
                    canvas.toBlob(function (blob) {
                      console.log('toblob');
                      resolve(blob);
                    }, 'image/jpeg', quality);
                  } else {
                    resolve(image.src);
                  }
                }
              });
            });

          case 7:
            url = _context.sent;
            return _context.abrupt("return", url);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function resolveExif(_x) {
    return _ref.apply(this, arguments);
  }

  return resolveExif;
}();

function getImageFromUrl(url) {
  return new _promise2.default(function (resolve, reject) {
    var image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = function () {
      resolve(image);
    };
    image.onerror = function (e) {
      reject(e);
    };
    image.src = url;
  });
}

function getCanvasForImage(image, maxWidth) {
  var canvas = document.createElement("canvas");
  var w = image.width;
  var h = image.height;

  if (maxWidth && w > maxWidth) {
    var ratio = w / h;
    w = maxWidth;
    h = w / ratio;
  }
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

function exifTransformCanvas(ctx, orientation) {
  var transform = EXIF_TRANSFORMS[orientation];
  if (transform) {
    return transformCanvas(ctx, transform.rotate, transform.flip);
  }
  return ctx;
}

function transformCanvas(ctx) {
  var degrees = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var flip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.rotate(degrees);
  if (flip) {
    ctx.scale(-1, 1);
  }
  return ctx;
}
