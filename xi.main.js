/* Distribution
     XINI as XINE loader             (.nxs)
     xi.main.js as XI Header         (.github)
     xine.main.nxs.js as XINE Header (.github)
     XINE as XINE Main               (.nxs)
     XCUS as XINE Custom             (.nxs)
 */

/* Workflow:
     Detail internal options for xi.main.js
     Detail .github files for download
     Detail .github files for default installment
     Define initiation routine
       Download debugging routine
       Download major utilities
       Download other .github files
       Check for XINE-0
       Request approval (bypass if XINE-0)
 */

xi      = typeof xi      != 'undefined' ? xi      : {}
xi.main = typeof xi.main != 'undefined' ? xi.main : {}

xi.main.dependencyPrefix = 'https://raw.githubusercontent.com/willxyu/xine/master/'
xi.main.dependencies = [
  {default: true,  url: 'xi.util.js',         desc: '', }, 
  {default: true,  url: 'xi.quanta.js',       desc: '', }, 
  {default: false, url: 'xi.fast.js',         desc: '', }, 
  {default: true,  url: 'xi.gmcp.js',         desc: '', }, 
  {default: true,  url: 'xine.main.nxs.js',   desc: '', }, 
  {default: false, url: 'xine.scroll.nxs.js', desc: '', }, 
  {default: true,  url: 'xine.shtml.nxs.js',  desc: '', }, 
  {default: true,  url: 'xine.alias.nxs.js',  desc: '', }, 
]

xi.main.first = function() {
  // First download & define debugging routine
  // Then download & define major utilities
  // Then download other .github files
  // Then request XINE-0
  // Evaluate XINE-0
  //   w/o XINE-0, Request & await approval, or
  //   second()
  var p = $.when(1)
      p = p.then(function() { return $.ajax({url: xi.main.dependencyPrefix + 'xi.util.js' }) 
         }).then(function(datum) {
           try { eval(datum) } catch(err) { console.log(err) }
         }).then(function() { return $.ajax({url: xi.main.dependencyPrefix + 'xi.mend.js' })
         }).then(function(datum) {
           try { eval(datum) } catch(err) { console.log(err) }
         })
}

xi.main.second = function() {
  // When approved or XINE-0 bypassed
  // Remove XINE
  // Run .github files
  // Execute XINE
  // Execute XCUS
}

xi.main.first()

xi.main.sequentialLoad = function() {
  var p = $.when(1)
  xi.main.dependencies.forEach(function(item, index) {
    let a = item
    p = p.then(function() {
      return $.ajax({ url: a + '?v=' + new Date().getTime() }).done(function(data) {
        xi.main.debug('Attempting eval(data) for ' + a + '.')
        try {
          eval(data)
        } catch(err) {
          xi.main.debug(err, 1) 
        }
      })
    })
  })
  
  p = p.then(function() { if (typeof send_command == 'function') { send_command('xine') } })
}

xi.main.initiate = function() {
  var c = client
  if (client.package_exists("xine") != 0) { client.package_remove("xine") }
  xi.main.sequentialLoad()
  if (client.package_exists("xine") != 0) { client.send_direct("xine") }
  if (client.package_exists("xine custom") != 0) { client.send_direct("xine custom") }
}

// xi.main.initiate()
