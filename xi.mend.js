xi      = typeof xi      != 'undefined' ? xi      : {}
xi.mend = typeof xi.mend != 'undefined' ? xi.mend : {}

xi.mend.default   = 5
xi.mend.threshold = 3
xi.mend.write     = false

xi.mend.debug = function(msg, tier, masked) {
  var tier = tier
  if (typeof xi.mend.default == 'number') { tier = xi.mend.default }
  if (typeof tier == 'undefined') { tier = 3 }
  if (xi.mend.threshold && tier > xi.mend.threshold) {
    console.log(msg)
    if (xi.mend.write && !masked) { xi.write(msg) }
  }
}

xi.mend.setThreshold = function(n) { if (!n) { return }; xi.mend.threshold = n }
xi.mend.setDefault   = function(n) { if (!n) { return }; xi.mend.default = n }
xi.mend.toggleWrite  = function() {
  if (xi.mend.write) { xi.mend.write = false } else { xi.mend.write = true }
}

xid   = xi.mend
debug = xi.mend.debug
