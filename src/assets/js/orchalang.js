// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

function arrayContains(needle, arrhaystack) {
  var lower = needle.toLowerCase();
  return (arrhaystack.indexOf(lower) > -1);
}

(function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["node_modules/codemirror/lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineMode("orchalang", function (conf) {
    var keywords = ["receive", "from", "compute", "when", "send", "to", "with", "condition"];
    var keywords2 = ["terminates", "fails"];
    var logicalOperator = ["and", "or", "not"];
    return {
      token: function (stream, state) {
        stream.eatWhile(/\w/);
        if (arrayContains(stream.current(), keywords)) {
          return "keyword";
        } else if (arrayContains(stream.current(), keywords2)) {
          return "variable-2";
        }
        else if (arrayContains(stream.current(), logicalOperator)) {
          return "atom";
        }
        stream.next();
      }
    };

  });

  CodeMirror.defineMIME("text/x-orchalang", "orchalang");

});
