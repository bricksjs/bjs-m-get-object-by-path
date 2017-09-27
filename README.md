## bjs-m-get-object-by-path

Return the value at given object path and parent path.

## Install

```bash
$ npm install @bricksjs/m-gobp
```

## Usage

```js
var getObject = require('bjs-m-gobp');

var context = {
  foo: {
    bar: {
      baz: function() {
      }
    }
  }
};

// Use defined context
getObject('foo.bar.baz', context);


process.foo = {
    bar: {
      baz: function() {
      }
    }
};

// Use global context
getObject('foo.bar.baz');
```

## Returns

```js
{
  path: context.foo.bar
  fullPath: context.foo.bar.baz
}
```
