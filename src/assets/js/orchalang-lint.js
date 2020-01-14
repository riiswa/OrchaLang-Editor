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

  function cleanString(str) {
    return str.replace(/\s+/g, ' ').trim();
  }

  function generateError(line, lineNumber) {
    return {
      message: "Syntax error at instruction: " + line,
      severity: "error",
      from: {line: lineNumber, ch: 0, sticky: null},
      to: {line: lineNumber, ch: line.length, sticky: null}
    }
  }

  function analysis(syntax, line, lineNumber) {
    const cleanLine = cleanString(line);
    if (!syntax.test(cleanLine)) return generateError(cleanLine, lineNumber)
  }

  function validator(text, options) {

    const sendSyntax = /send (.*?)(\.(.*))? to (.*?)/;
    const versionSyntax = /version(\s*):(\s*)(.*?)/;
    const domainSyntax = /domain(\s*):(\s*)(.*?)/;
    const titleSyntax = /title(\s*):(\s*)(.*?)/;
    const authorsSyntax = /authors(\s*):(\s*)(.*?)/;
    const descriptionSyntax = /description(\s*):(\s*)(.*?)/;
    const computeSyntax = /compute (.*?)( with (.*))?/;
    const receiveSyntax = /receive (.*?) from (\w+)( condition (.*))?/;

    const errors = [];
    const lines = text.split('\n');
    for (const [lineNumber, line] of lines.entries()) {
      const cleanLine = cleanString(line);
      if (cleanLine === '' || cleanLine.startsWith('//') || cleanLine.startsWith('when') || cleanLine.includes('with')) {
      } else if (cleanLine.startsWith('send')) {
        errors.push(analysis(sendSyntax, line, lineNumber))
      } else if (cleanLine.startsWith('version')) {
        errors.push(analysis(versionSyntax, line, lineNumber))
      } else if (cleanLine.startsWith('domain')) {
        errors.push(analysis(domainSyntax, line, lineNumber))
      } else if (cleanLine.startsWith('title')) {
        errors.push(analysis(titleSyntax, line, lineNumber))
      } else if (cleanLine.startsWith('description')) {
        errors.push(analysis(descriptionSyntax, line, lineNumber))
      } else if (cleanLine.startsWith('compute')) {
        errors.push(analysis(computeSyntax, line, lineNumber))
      } else if (cleanLine.startsWith('receive')) {
        errors.push(analysis(receiveSyntax, line, lineNumber))
      } else if (cleanLine.startsWith('authors')) {
        errors.push(analysis(authorsSyntax, line, lineNumber))
      } else errors.push(generateError(cleanLine, lineNumber))
    }
    return errors.filter(o => o)
  }

  CodeMirror.registerHelper("lint", "orchalang", validator);

});
