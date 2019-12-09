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

  function createAlertObject(message, severity, from, to, line) {
    return {
      message: message,
      severity: severity,
      from: {line: line, ch: to, sticky: null},
      to: {line: line, ch: from, sticky: null}
    }
  }

  function sendInstructionValidation(str) {
    const sendSyntax = /^send ?(?<data>.*?)?(\.(?<variables>.*))? to ?(?<destinations>.*?)$/;
    const sendSyntaxMessage = 'send <event>.result to <destination event handler>';
    if (sendSyntax.test(str)) {

      var missingPart = [];

      const groups = sendSyntax.exec(str).groups;

      if (!groups.data) missingPart.push('data');
      if (!groups.destinations) missingPart.push('destinations');
      if (!groups.variables) missingPart.push('variables');

      if (missingPart.length !== 0) {
        return {
          message: 'This instruction have missing field(s): ' + missingPart.join(', ') + '\n' + 'The send instruction syntax should be: ' + sendSyntaxMessage,
          severity: 'warning'
        }

      } else return {message: null, severity: null}

    } else {
      return {
        message: 'This instruction is incorrect.\n The send instruction syntax should be: ' + sendSyntaxMessage,
        severity: 'error'
      }
    }
  }

  function versionInstructionValidation(str) {
    const versionSyntax = /^version(\s*):(\s*)(?<version>.*?)$/;

    if (versionSyntax.test(str)) return {message: null, severity: null};
    else return {
      message: 'This instruction is incorrect.\n The version instruction syntax should be version: xx',
      severity: 'error'
    }
  }


  function validator(text, options) {
    const lines = text.split('\n');

    var result = [];

    for (const [i, line] of lines.entries()) {
      const cleanLine = cleanString(line);
      if (cleanLine === '') {
      } else if (cleanLine.startsWith('send')) {
        const validation = sendInstructionValidation(cleanLine);
        if (validation.message) {
          result.push(createAlertObject(validation.message, validation.severity, 0, line.length, i))
        }
      } else if (cleanLine.startsWith('version')) {
        const validation = versionInstructionValidation(cleanLine);
        if (validation.message) {
          result.push(createAlertObject(validation.message, validation.severity, 0, line.length, i))
        }
      } else {
        result.push(createAlertObject('This instruction don\'t exist', 'error', 0, line.length, i))
      }
    }

    return result

  }

  CodeMirror.registerHelper("lint", "orchalang", validator);

});
