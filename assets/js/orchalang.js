// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["node_modules/codemirror/lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineMode("orchalang", function () {

    function wordRegexp(words) {
      return new RegExp("^((" + words.join(")|(") + "))\\b");
    }

    const operators = /(\+|-|\*|\/|=|>|<|>=|<=|&|\||%|!|\^|\(|\))/;

    const atoms = wordRegexp(["true", "false", "and", "or", "not"]);

    const keywords = wordRegexp(["receive", "from", "compute", "when", "send", "to", "with", "condition"]);

    const positive = wordRegexp(["terminates"]);

    const negative = wordRegexp(["fails"]);

    const def = /[a-zA-Z]*\s*:/;


    function tokenBase(stream) {
      if (stream.eatSpace()) {
        return null;
      }

      if (stream.match(atoms)) {
        return 'atom';
      }

      if (stream.match(keywords)) {
        return 'keyword';
      }

      if (stream.match(positive)) {
        return "positive"
      }

      if (stream.match(negative)) {
        return "negative"
      }

      if (stream.match(def)) {
        return "def"
      }

      if (stream.match(def)) {
        return "def"
      }

      if (stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
        return "number"
      }

      var ch = stream.next();

      if (ch === "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
        return "number"
      }

      if (ch === "/" && stream.next() === "/") {
        stream.skipToEnd();
        return "comment";
      }

      if (operators.test(ch)) {
        return "operator";
      }

      stream.eatWhile(/\w/);

      return "variable"
    }

    return {

      startState: function () {
        return {
          tokenize: tokenBase,
        };
      },

      token: function (stream, state) {
        if (stream.sol())
          state.doInCurrentLine = 0;

        return state.tokenize(stream, state);
      },
    };

  });

  CodeMirror.defineMIME("text/orchalang", "orchalang");

});


