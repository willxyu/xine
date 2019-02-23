
xi.commitNXSAliases = function() {
  var f = function(str) { return str }
     // var o = str.split('\n'); var s = ''; o.forEach(function(val) { s += val.trim() + '\n' }); return s }
  
  var xine = client.get_package('xine')
  var folder = client.reflex_create(xine, "Alias Access", 'group', 'xine')
  
  // .sal
  var alias = client.reflex_create(folder, ".sal, show aliases" , 'alias', 'xine')
  alias.text = '^\.sal$'
  alias.matching = 'regexp'
  var code = `xia.display(xia.loop(client.packages))`
  alias.actions.push({action: 'script', script: f(code) })
  
  // .sal filter
  var alias = client.reflex_create(folder, ".sal filter" , 'alias', 'xine')
  alias.text = '^^\.sal[ ]+(.*)$'
  alias.matching = 'regexp'
  code = `
  var matches = arguments[0]
  var filter  = matches[1]
  xia.display(xia.loop(client.packages), filter)
  `
  alias.actions.push({action: 'script', script: f(code) })
  
  // xi.aliases
  var funct = client.reflex_create(folder, "xi.alias", 'function', 'xine')
  var code = `
  chainSortBy = xiu.chainSortBy
  sort_by     = xiu.sort_by
  
  xia = typeof xia != 'undefined' ? xia : {}
  xia.class = 'xia-alias'
  
  xia.loop = function(arr) {
    var out = []
    if (arr.type == 'alias') { return [arr] }
    if (arr.type == 'group' && arr.enabled) { // remove arr.enabled if you want to screen disabled packages
        for (var i = 0; i < arr.items.length; i++) { out = out.concat(xia.loop(arr.items[i])) }; return out }
    if (arr instanceof Array) { for (var i = 0; i < arr.length; i++) { out = out.concat(xia.loop(arr[i])) }; return out }
    return out
  }
  
  xia.aliasdisplay = function(arr, filter) {
    // sort arr by id
    arr.sort( chainSortBy([
     sort_by('id', true, null),
     sort_by('name', true, null)
    ]) )
    console.log(arr)
    
    // style rules
    $('.' + xia.class).remove()
    inject('.xia-alias-mute { color: rgba( 67, 67, 67, 1 ); }', xia.class)
    
    var c   = 0
    var str = '<br>'
    if (typeof filter == 'string') {
        str += '<div id="xia-alias" class="mono"><span class="xia-alias-mute">Searching </span>' + arr.length
        str += '<span class="xia-alias-mute"> aliases for </span>' + filter
        str += '<span class="xia-alias-mute">: </span></div><br>'
    }
    for (var i = 0; i < arr.length; i++) {
      var m    = arr[i]
      var name = m.name; if (name == '') { name = 'unnamed' }
      if (typeof filter == 'string') {
        if (name.match(filter) || m.text.match(filter) ) {
          c += 1
          str += '<div id="xia-alias" class="mono"><span class="xia-alias-mute"> (' + lpad(m.id, 4) + ') '
          str += rpad( name.substring(0, 23), 23 ) + ' &ddagger; </span>' + m.text + '</div>'
        }
      } else {
        str += '<div id="xia-alias" class="mono"><span class="xia-alias-mute"> (' + lpad(m.id, 4) + ') '
        str += rpad( name.substring(0, 23), 23 ) + ' &ddagger; </span>' + m.text + '</div>'
      }
    }
    if (typeof filter == 'string') {
      str += '<br><div id="xia-alias" class="mono"><span class="xia-alias-mute">Matched </span>' + filter
      str += '<span class="xia-alias-mute"> in </span>' + c + '<span class="xia-alias-mute"> of </span>' + arr.length
      str += '<span class="xia-alias-mute"> aliases.</span></div>'
    } else {
      str += '<br><div id="xia-alias" class="mono"><span class="xia-alias-mute">Displaying </span>' + arr.length
      str += '<span class="xia-alias-mute"> aliases.</span></div>'
    }
    xia.write('<div id="xia-alias">' + str + '</div>')
  }
  `
  funct.code = f(code)
}

xi.commitNXSAliases()
