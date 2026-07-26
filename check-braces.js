const fs = require('fs');
const code = fs.readFileSync('worker.js', 'utf8');

// Strip strings, template literals, comments
let result = '';
let i = 0;
while (i < code.length) {
  // Single-line comment
  if (code[i] === '/' && code[i+1] === '/') {
    while (i < code.length && code[i] !== '\n') { result += ' '; i++; }
    continue;
  }
  // Multi-line comment
  if (code[i] === '/' && code[i+1] === '*') {
    while (i < code.length && !(code[i] === '*' && code[i+1] === '/')) { result += ' '; i++; }
    if (i < code.length) { result += '  '; i += 2; }
    continue;
  }
  // Template literal
  if (code[i] === '`') {
    result += '`'; i++;
    while (i < code.length && code[i] !== '`') {
      if (code[i] === '\\') { result += code[i]; i++; if(i<code.length){result+=code[i];i++;} }
      else { result += code[i]; i++; }
    }
    if (i < code.length) { result += code[i]; i++; }
    continue;
  }
  // String literals
  if (code[i] === '"' || code[i] === "'") {
    const q = code[i]; i++;
    while (i < code.length && code[i] !== q) {
      if (code[i] === '\\') { result += code[i]; i++; if(i<code.length){result+=code[i];i++;} }
      else { result += code[i]; i++; }
    }
    if (i < code.length) { result += code[i]; i++; }
    continue;
  }
  result += code[i]; i++;
}

// Count braces
let depth = 0, extras = [];
for (let j = 0; j < result.length; j++) {
  if (result[j] === '{') depth++;
  else if (result[j] === '}') {
    depth--;
    if (depth < 0) {
      const lineNum = result.substring(0, j).split('\n').length;
      extras.push({line: lineNum});
    }
  }
}
console.log('Final depth:', depth);
console.log('Extra } count:', extras.length);
if (extras.length > 0) {
  console.log('First extra at line:', extras[0].line);
  const pos = extras[0].pos || 0;
  // find approximate position
  let lines = result.split('\n');
  for (let k = Math.max(0, extras[0].line - 2); k < Math.min(lines.length, extras[0].line + 3); k++) {
    console.log(`L${k+1}: ${lines[k].substring(0, 120)}`);
  }
}
