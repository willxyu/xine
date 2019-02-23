// Javascript code defining xine.nxs
//   We follow a common structure, that is: 
//    a single alias collates all Initiation Functions
//    onLoad calls this alias

// Utilities    : display(), trigger alias, `js
// Error Logging: 
// UI Functions : shtml
// UI Templates :
// GMCP eventing:

xi.commitNXSMain = function() {
  client.package_create('xine',"XINE for Nexus")
  var xine = client.get_package('xine')
  
  // Utilties Folder
  var folder = client.reflex_create(xine, "Utilities", 'group', 'xine')
  // `js
  var alias = client.reflex_create(folder, "`js, execute Javascript" , 'alias', 'xine')
  alias.text = '^`js[ ]+(.*)$'
  alias.matching = 'regexp'
  alias.actions.push({action: 'script', script: `
    var s  = args[1]
    var sx = eval(s)
    if (typeof display == 'function') { display(sx) }
    console.log(sx)
  `})
  // `echo
  alias = client.reflex_create(folder, "`echo, ala Mudlet", 'alias', 'xine')
  alias.text = '^`echo[ ]+(.*)$'
  alias.matching = 'regexp'
  alias.actions.push({action: 'script', script: `
    if (typeof xiu != 'undefined') { xiu.echo(args[1]) }
  `})
  var funct = client.reflex_create(folder, "xi-error", 'function', 'xine')
  funct.code = `
   client.exec_function_obj = function(obj, args) {
    if (obj == null) return false;
    if ((!obj.code) || (!obj.code.length)) return false;
    client.exec_script(obj.code, args, undefined, 'Function ' + client.current_package + ' [' + obj.name + ']');
    return true; }
   client.exec_script = function(script, args, current_package, id) {
    try {
        // add the API to the scope
        var api = '';
        for (fn in Nexus) api += 'var '+fn+' = Nexus.'+fn+'; ';
        var fn = new Function("args", "current_package", api + script);
        var ep = api + script
        fn(args, current_package);
     } catch(err) {
        var m = err.stack.split('\\n')
        var n = m[1] || ''
        var o = n.match(/\\<anonymous\\>\\:(\\d+)/)
        var p = o[1]
        var q = ep.split('\\n')
        var r = q[(parseInt(p) - 3)]
        client.print("<span style='color: red'><b>Error in " + id + ":</b><br/>" + err + "</span>");
        client.print('<span style="color: yellow"><i>' + r + '</i></span>')
     } }
  `
}

xi.commitNXSMain()
