"use strict";

var apply = function apply(action) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  //babel-env
  console.log("./" + action + ")(" + args + ")");
  require("./" + action).apply(undefined, args);
};

module.exports = apply;