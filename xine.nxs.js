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
  
  // `js
  var alias = client.reflex_create(xine, "`js, execute Javascript" , 'alias', 'xine')
  alias.text = '^`js[ ]+(.*)$'
  alias.actions.push({action: 'script', script: `
    var s  = args[1]
    var sx = eval(s)
    display(sx)
    console.log(sx)
  `})
  // `echo
  alias = client.reflex_create(xine, "`echo, ala Mudlet", 'alias', 'xine')
  alias.text = '^`echo[ ]+(.*)$'
  alias.actions.push({action: 'script', script: `
    if (typeof xiu != 'undefined') { xiu.echo(args[1]) }
  `})
    
}

xi.commitNXSMain()
