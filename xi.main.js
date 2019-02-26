// System distribution
//  xi.nxs      > Initializer
//  xi.main.js  > Github-side code for XINE, imported & run within "window"
//  xine.nxs    > Amalgamated Nexus-side code for XINE, imported & run within "Nexus"
//  xine-custom > User-specified overwrites of XINE

// packets
//  - [xim] - main
//  - [xiu] - utils, display, trigger-test, inline-js
//  - [xis] - shtml
//  - [xix] - uxtem, [templates], inc monospec, reskin, game-specific windows<tab/nontab configs>
//  - [xig] - gmcpf

xi      = typeof xi      != 'undefined' ? xi      : {}
xi.main = typeof xi.main != 'undefined' ? xi.main : {}
xi.opts = typeof xi.opts != 'undefined' ? xi.opts : {}

xi.opts.debugTier = 5 // default debug tier
xi.opts.debug     = 3 // threshold (print any debug message above "3")
xi.opts.vebug     = false

xi.main.debug = function(msg, tier, masked) {
  var tier = tier
  if (typeof xi.opts.debugTier == 'number') { tier = xi.opts.debugTier }
  if (typeof tier == 'undefined') { tier = 3 }
  if (xi.opts.debug && tier > xi.opts.debug) {
   console.log(msg)
   if (xi.opts.vebug && !masked) { xi.write(msg) }
  }
}

xi.main.dependencies = [
 'https://raw.githubusercontent.com/willxyu/xine/master/xi.utils.js',
 'https://raw.githubusercontent.com/willxyu/xine/master/xine.utilities.nxs.js',
 'https://raw.githubusercontent.com/willxyu/xine/master/xine.scroll.nxs.js',
 'https://raw.githubusercontent.com/willxyu/xine/master/xine.shtml.nxs.js',
 'https://raw.githubusercontent.com/willxyu/xine/master/xine.alias.nxs.js',
 // 'https://raw.githubusercontent.com/willxyu/xine/master/xine.youtube.nxs.js',
]

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

xim = xi.main  // Shorthand, shouldn't really access most things in "main"

xim.initiate()
