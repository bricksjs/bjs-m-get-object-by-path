'use strict';

var o = require('ospec');
var brick = require('../index');

o.spec('brick', function () {
  o('Path and object works', function () {
    var path = 'b.ns[0][0].method';

    var obj = {
      b: {
        ns: [[{
          method: function () {
          }
        }]]
      }
    };

    var _brick = brick(path, obj);


    o(typeof _brick).equals('object');
    o(_brick && _brick.hasOwnProperty('path')).equals(true);
    o(_brick && _brick.hasOwnProperty('fullPath')).equals(true);
    o(_brick && _brick.path).equals(obj.b.ns[0][0]);
    o(_brick && _brick.fullPath).equals(obj.b.ns[0][0].method);
  });


  o('Path and object not found works', function () {
    var path = 'b.ns[0][1].method';

    var obj = {
      b: {
        ns: [[{
          method: function () {
          }
        }]]
      }
    };

    var _brick = brick(path, obj);


    o(typeof _brick).equals('object');
    o(_brick).equals(null);
  });

  o('Path and without object works', function () {
    var path = 'b.ns.method';

    process.b = {
      ns: {
        method: function () {
        }
      }
    };


    var _brick = brick(path);

    o(typeof _brick).equals('object');
    o(_brick && _brick.hasOwnProperty('path')).equals(true);
    o(_brick && _brick.hasOwnProperty('fullPath')).equals(true);
    o(_brick && _brick.path).equals(process.b.ns);
    o(_brick && _brick.fullPath).equals(process.b.ns.method);
  });
});
