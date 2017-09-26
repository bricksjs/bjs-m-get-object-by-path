/* global window */
/* global global */
/* global process */
'use strict';

function lookup(context, splittedPath, i) {
  if (!context || i === splittedPath.length - 1) {
    return context;
  }

  var asArrayIndex = splittedPath[i].indexOf('[');
  if (asArrayIndex === -1) {
    if (context && context.hasOwnProperty(splittedPath[i])) {
      context = context[splittedPath[i]];
      return lookup(context, splittedPath, i + 1);
    }
  } else {
    var indexes = splittedPath[i].match(/\[.\]/g);
    var computedPath = splittedPath[i].replace(indexes.join(''), '');
    context = context[computedPath];
    for (var j = 0, len = indexes.length; j < len; j++) {
      context = context && context[indexes[j].replace('[', '').replace(']', '')];
      if (!context) {
        break;
      }
    }

    return lookup(context, splittedPath, i + 1);
  }
}

function getObjectByPath(path, context) {
  var splittedPath = path.split('.');
  var lastPath = splittedPath[splittedPath.length - 1];
  context = context ? context : process || global || window;

  context = lookup(context, splittedPath, 0);

  return  !context[lastPath] ? null : {
    path: context,
    fullPath: context[lastPath]
  };
}

module.exports = getObjectByPath;
