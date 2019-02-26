xi = typeof xi != 'undefined' ? xi : {}
xi.body = $('body')

client.handle_read = function(datum) {
  xi = typeof xi != 'undefined' ? xi : {}
  xi.perf = new Date().getTime()
  var arr = new Uint8Array(datum.data)
  var s   = ''
  for (var i = 0; i < arr.length; ++i) { s += String.fromCharCode(arr[i]) }
  client.read_data(s)
}

client.read_data = function(s) {
  xi = typeof xi != 'undefined' ? xi : {}
  var body = xi.body
  var str
  do {
    str = client.handle_telnet_read(s)
    s   = ''
    if (str === false) { break }
    if (gagged) { continue }
    var lines = client.telnet_split(str)
        lines = client.parse_lines(lines)
    if (lines === false) { continue }
    client.current_block = lines
    if (triggers_enabled) {
      var now = new Date().getTime()
      lines = client.handle_triggers(lines)
      body.trigger('xi-pert', [now])
    }
    client.handle_beep_code(lines)
    for (var i = 0; i < lines.length; ++i) {
      var t = ''
      if (lines[i].line) {
        t = lines[i].line
      } else if (lines[i].prompt) {
        t = lines[i].prompt
      }
      if (t.length) { client.handle_on_msg_recv(t) }
    }
    run_function('onBlock', null, 'ALL')
    
    client.display_text_block(lines)
    body.trigger('xi-perf')
    client.current_line = undefined
    client.current_block = undefined
  } while (str !== false)
}

$(document).off('xi-pert')
$(document).on('xi-pert', function(e, data) {
  xi.pertr = new Date().getTime() - data
  xi.body.trigger('xiPert')
})

$(document).off('xi-perf')
$(document).on('xi-perf', function() {
  xi.perft = new Date().getTime() - xi.perf
  xi.body.trigger('xiPerf')
})

if (typeof ws != 'undefined') { ws.onmessage = client.handle_read }
