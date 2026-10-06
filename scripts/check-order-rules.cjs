const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
 const code = ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 module._compile(code, filename);
};
const { validateOrderLine, lineTotal } = require('../lib/order-rules.ts');
const line = { productIndex: 0, flavors: [{name:'BBQ',pieces:4},{name:'Parmesano',pieces:3},{name:'Mango habanero',pieces:3}], ranchExtras:1, cheeseExtras:2, notes:'' };
assert.equal(validateOrderLine(line),'');
assert.equal(lineTotal(line),200);
assert.notEqual(validateOrderLine({...line,flavors:[{name:'BBQ',pieces:9}]}),'');
assert.notEqual(validateOrderLine({...line,flavors:[{name:'BBQ',pieces:5},{name:'BBQ',pieces:5}]}),'');
assert.notEqual(validateOrderLine({...line,ranchExtras:-1}),'');
assert.notEqual(validateOrderLine({...line,productIndex:6,flavors:[]}),'');
assert.equal(lineTotal({...line,productIndex:3,ranchExtras:1,cheeseExtras:0}),105);
assert.equal(validateOrderLine({...line,productIndex:3,flavors:[{name:'BBQ',pieces:4},{name:'Parmesano',pieces:4}],cheeseExtras:0}),'');
console.log('PASS: totals, piece distribution, duplicate flavors, extras and unavailable products.');
