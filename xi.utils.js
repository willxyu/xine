xi       = typeof xi       != 'undefined' ? xi       : {}
xi.utils = typeof xi.utils != 'undefined' ? xi.utils : {}

xi.utils.clean = function(css) { if (typeof css != 'string') { return css }; var n = Number(css.replace(/[^-\d\.]/g,'')); return n }

xi.utils.clone = function(obj) {
  var copy
  if (null == obj || 'object' != typeof obj) { return obj }
  if (obj instanceof Date) { copy = new Date(); copy.setTime(obj.getTime()); return copy }
  if (obj instanceof Array) { copy = []; for (var i = 0; i < obj.length; i++) { copy[i] = xi.utils.clone(obj[i]) }; return copy }
  if (obj instanceof Object) { copy = {}; for (var attr in obj) { if (obj.hasOwnProperty(attr)) { copy[attr] = xi.utils.clone(obj[attr]) } }; return copy }
  throw new Error('Unable to copy obj! Type not supported.') }

xi.utils.comma = function(n) { var bits = n.toString().split('.'); bits[0] = bits[0].replace(/\B(?=(\d{3})+(?!\d))/g,','); return bits.join('.') } /* https://stackoverflow.com/a/2901298 */

// xi.utils.display = function(obj) {
//  var r = function( k, v ) { if (typeof v === 'function') { var q = '' + v; q = q.substring(0, 120); return 'Fx() > ' + q }; return v };
//  var m = JSON.stringify(a, r, 3); ow_Write('<span class="normal">' + m + '</span><br/>') }

xi.utils.interval = function(a, b) {
  if (!a) { return 0 }
  var a = a; var b = b || new Date();
  if (b > a) { b = [a, a = b][0] } // swap variables
  var diff = a.getTime() - b.getTime()
  var msecs= diff % 1000
  var secs = Math.floor(diff / 1000)
  var mins = Math.floor(secs / 60)
      secs = secs % 60
  var hrs  = Math.floor(mins / 60)
      mins = mins % 60
  var days = Math.floor(hrs / 24)
      hrs  = hrs % 24
  return {msecs: msecs, secs: secs, mins: mins, hrs: hrs, days: days} }

xi.utils.key  = function(obj, val) { for (var prop in obj) { if (obj.hasOwnProperty(prop)) { if (obj[prop] === val) { return prop } } } }

xi.utils.lpad = function(str, len, ch) {
  if (typeof str == 'number') { str = str.toString() }; if (ch == null) { ch = ' ' };
  var r = len - str.length; if (r < 0) { r = 0 }; return ch.repeat(r) + str }

xi.utils.title= function(str) { return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) }

xi.utils.round= function(num, dec)  { var mult = 10 ^ (dec || 0); return Math.floor(num * mult + 0.5) / mult }

xi.utils.rpad = function(str, len, ch) {
  if (typeof str == 'number') { str = str.toString() }; if (ch == null) { ch = ' ' };
  var r = len - str.length; if (r < 0) { r = 0 }; return str + ch.repeat(r) }

xi.utils.uniarr = function(arr) { var a = arr.concat(); for (var i = 0; i < a.length; ++i) {for (var j = i+1; j < a.length; ++j) { if (a[i] === a[j]) { a.splice(j--, 1) } } }; return a } // https://stackoverflow.com/a/1584377

xi.utils.uuid = function() {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') { d += performance.now() }
  var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(v) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (v == 'x' ? r : ( r&0x3|0x8)).toString(16) })
  return uid }

// Display
// https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json
JSON.stringifyOnce = function(obj, replacer, indent){
  var printedObjects    = []
  var printedObjectKeys = []
  function printOnceReplacer(key, value) {
    if (printedObjects.length > 5000){ return 'object too long'; }
    var printedObjIndex = false
    printedObjects.forEach(function(obj, index){ if (obj===value) { printedObjIndex = index; } })
    if (key == '') {
       var q = value
       if (typeof value == 'function') { q = 'F() ' + (value + '').substring(0, 120) + '...' }
       printedObjects.push(obj)
       printedObjectKeys.push('root')
       return q
    } else if (typeof value == 'function') {
       var qualifiedKey = key || '(empty key)'
       var q = '' + value; q = 'F() ' + q.substring(0, 120) + '...' 
       printedObjects.push(q)
       printedObjectKeys.push(qualifiedKey)
       if (replacer) { return replacer(key, value) } else { return q }
    } else if (printedObjIndex + '' != 'false' && typeof value == 'object') {
       if (printedObjectKeys[printedObjIndex] == 'root') {
         return '(pointer to root)' 
       } else {
         return '(see '+ ((!!value && !!value.constructor) ? value.constructor.name.toLowerCase() : typeof value) + ' with key ' + printedObjectKeys[printedObjIndex] + ')'
       }
    } else {
       var qualifiedKey = key || '(empty key)'
       printedObjects.push(value)
       printedObjectKeys.push(qualifiedKey)
       if (replacer) { return replacer(key, value) } else { return value }
    }
  }
  return JSON.stringify(obj, printOnceReplacer, indent)
}

xi.utils.display = function(a) { var x = JSON.stringifyOnce(a, null, 4); print(x) }

xiu = xi.utils
