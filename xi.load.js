// Simple prettification script with handlers for updating & removal

xi      = typeof xi      != 'undefined' ? xi      : {}
xi.load = typeof xi.load != 'undefined' ? xi.load : {}

xi.load.init = function() {
  $('.xil-container').remove()
  
  var classr = 'xi-load'
  var inject = function(rule) { $('body').append('<div class="' + classr + '">&shy;<style>' + rule + '</style></div>') }

  var rules = ''
  rules += '.xil-container {width: 560px; height: 310px; z-index:50; }\n'
  rules += '.xil-content, .xil-cover {width: calc(100% - 6px - 6px); height: calc(100% - 7px - 7px); }\n'
  rules += '.xil-content, .xil-cover {position: absolute; left: 50%; top: 50%; transform: translate( -50%, -50%); }\n'
  rules += '.xil-content {border-top, border-bottom: 1px solid rgba(47, 142, 123, 1); }\n'
  rules += '.xil-content {background: linear-gradient(45deg, rgba(30,112,145,0.35) 0%,rgba(47,137,143,0.13) 67%, rgba(88,166,212,0.25) 100%); }\n'
  rules += '.xil-cover   {background: linear-gradient(135deg, rgba(0,0,0,0.98) 0%,rgba(0,0,0,0.97) 41%,rgba(0,0,0,0.94) 100%); }\n'
  rules += '.xil-top-right {position: absolute; right: 0%; top: 0%; width: 11px; height: 15px; border-top: 2px solid rgba(71, 224, 193, 1); border-right: 2px solid rgba(71, 224, 193, 1); }\n'
  rules += '.xil-top-left {position: absolute; left: 0%; top: 0%; width: 11px; height: 15px; border-top: 2px solid rgba(71, 224, 193, 1); border-left: 2px solid rgba(71, 224, 193, 1); }\n'
  rules += '.xil-bottom-right {position: absolute; right: 0%; bottom: 0%; width: 11px; height: 15px; border-bottom: 2px solid rgba(71, 224, 193, 1); border-right: 2px solid rgba(71, 224, 193, 1); }\n'
  rules += '.xil-bottom-left {position: absolute; left: 0%; bottom: 0%; width: 11px; height: 15px; border-bottom: 2px solid rgba(71, 224, 193, 1); border-left: 2px solid rgba(71, 224, 193, 1); }\n'
  
  rules += '#xil-loader {position: absolute; left: 50%; top: 50%; width: 510px; height: 270px; transform: translate( -50%, -50% ); }\n'
  rules += '.xil-main {display: none; position: absolute; top: 34%; left: 50%; transform: translate( -50%, -50% ); }\n'
  rules += '.xil-main {font-family: "Lucida", sans-serif; font-size: 42pt; color: rgba(9, 12, 15, 1); text-shadow: -1px 0 rgba(87, 142, 123, 1), 0 1px rgba(67, 152, 113, 1), 1px 0 rgba(47, 152, 103, 1), 0 -1px rgba(27, 142, 93, 1); }\n'
  rules += '@import url("https://fonts.googleapis.com/css?family=Dosis");'
  rules += '.xil-updates {position: absolute; top: 55%; left: 50%; transform: translate( -50%, -50% ); }\n'
  rules += '.xil-updates {font-family: "Dosis", sans-serif; font-size: 9pt; color: rgba(125,125,125,1); }\n'
  
  rules += '#xil-options {position:absolute; right:0px; top:15px; width:40%; height:100%; overflow-y:scroll; display:none; }\n'
  rules += '#xil-options::-webkit-scrollbar {width:0px; background:transparent; }\n'
  rules += '#xil-options::-webkit-scrollbar {background: #FF0000; }\n'  
  rules += '.xil-checkbox {font-family:"Lucida"; display:block; position:relative; padding-left:23px; margin-bottom:4px; cursor:pointer; font-size:12px; user-select:none; line-height:16px; }\n'
  rules += '.xil-checkbox input {position:absolute; opacity:0; cursor:pointer; height:0; width:0; }\n'
  rules += '.checkmark {position:absolute; top:0; left:0; height:16px; width:16px; background-color:#eee; }\n'
  rules += '.xil-checkbox:hover input ~ .checkmark {background-color: #ccc; }\n'
  rules += '.xil-checkbox input:checked ~ .checkmark {background-color:rgba(49, 178, 152, 1); }\n' // #2196F3; 
  rules += '.checkmark:after {content:""; position:absolute; display:none; }\n'
  rules += '.xil-checkbox input:checked ~ .checkmark:after {display:block; }\n'
  rules += '.xil-checkbox .checkmark:after {left:5px; top:2px; width:4px; height:7px; border:solid white; border-width:0 3px 3px 0; transform: rotate(45deg); }\n'

  rules += '#xil-autoload, #xil-enact {font-family: "Lucida"; font-size:12px; color:rgba(125,125,125,1); cursor:pointer; display:none; }\n'
  rules += '#xil-autoload {position:absolute; left:44px; top:49%; }\n'
  rules += '#xil-enact {position:absolute; left:44px; top:calc(49% + 21px); transition:all 230ms; text-decoration: underline; }\n'
  rules += '#xil-enact:hover {color:rgba(71, 224, 193, 1); }\n'
  rules += '#xil-enact:before {content:"  "; }\n'
  rules += '#xil-enact:hover:before {content:"» "; }\n'
  
  rules += '.xil-hovered {position:absolute; right:-205px; top:7px; height:calc(100% - 8px - 8px); width:210px; }\n'
  rules += '.xil-hovered {border-right:1px solid rgba(125,125,125,1); border-top:1px solid rgba(125,125,125,1); border-bottom:1px solid rgba(125,125,125,0.55); }\n'
  rules += '.xil-hovered {background:rgba(1,1,1,1); }\n'
  rules += '#xil-hoveredText {margin-left:8px; margin-right: 5px; font-family: "Lucida"; font-size:12px; color:rgba(125,125,125,1); }\n'
  
  $('.' + classr).remove()
  inject(rules)

  var name = 'loader'
  var d    = ''
  d += '<div id="xil-'+name+'" class="xil-container">'
  d += '<div id="xil-'+name+'-top-right"    class="xil-top-right"   ></div>'
  d += '<div id="xil-'+name+'-top-left"     class="xil-top-left"    ></div>'
  d += '<div id="xil-'+name+'-bottom-right" class="xil-bottom-right"></div>'
  d += '<div id="xil-'+name+'-bottom-left"  class="xil-bottom-left" ></div>'
  d += '<div id="xil-'+name+'-hovered"      class="xil-hovered"><div id="xil-hoveredText"></div></div>'
  d += '<div id="xil-'+name+'-cover"        class="xil-cover"       ></div>'
  d += '<div id="xil-'+name+'-content"      class="xil-content"     >'
  d += '<div id="xil-'+name+'-text">'
  d += '<div id="xil-'+name+'-E"            class="xil-main">E</div>'
  d += '<div id="xil-'+name+'-N"            class="xil-main">N</div>'
  d += '<div id="xil-'+name+'-I"            class="xil-main">I</div>'
  d += '<div id="xil-'+name+'-X"            class="xil-main">X</div>'
  d += '<div id="xil-'+name+'-updates"      class="xil-updates"></div>'
  d += '</div>'
  d += '</div>'
  d += '</div>'
  $('body').append(d)
  $('.xil-hovered').css('display','none')
  $('#xil-'+name+'-X.xil-main')
    .fadeIn({duration: 130, easing: 'swing'})
    .animate({ left: "-=50" }, 2700 )
  $('#xil-'+name+'-I.xil-main')
    // .show(340, 'swing')
    .fadeIn({duration: 340, easing: 'swing'})
    .animate({ left: "-=20" }, 2400 )
  $('#xil-'+name+'-N.xil-main')
    // .show(560, 'swing')
    .fadeIn({duration: 560, easing: 'swing'})
    .animate({ left: "+=10" }, 2100 )
  $('#xil-'+name+'-E.xil-main')
    // .show(790, 'swing')
    .fadeIn({duration: 790, easing: 'swing'})
    .animate({ left: "+=50" }, 1800, 'swing', xi.main.first )
}

xi.load.update = function(msg) {
  $('.xil-updates').text(msg)
}

xi.load.remove = function() {
  var classr = 'xi-load'
  $('#xil-loader').remove()
  $('.' + classr).remove()
}

xi.load.options = function() {
  var name = 'loader'
  var xin  = client.get_variable('XINE-0')
  var auto = client.get_variable('XINE-A')
  var m = clone(xi.main.dependencies)
  var o = []
  var d = ''
  d += '<div id="xil-'+name+'-options" onmouseleave="xi.load.unmoused()">'
  for (var i = 0; i < m.length; i++) {
    var c = ''
    if (xin instanceof Array) {
      if (xin.indexOf(m[i].url) != -1) { c = 'checked="checked"' }
    } else if (m[i].default) {
        c = 'checked="checked"'
        o.push(m[i].url) }
    d += '<label class="xil-checkbox" onmouseover="xi.load.moused(\''+m[i].url+'\')">' + m[i].url
    d += '<input type="checkbox" ' + c + '>'
    d += '<span class="checkmark"></span></label>'
  }
  d += '</div>'
  d = '<div id="xil-options">' + d + '</div>'
  $('.xil-content').append(d)
  var e = ''
  e += '<div id="xil-autoload"><label class="xil-checkbox">Autoload on Startup?<input type="checkbox"'
  if (auto === false) { } else {
  e += 'checked="checked"' }
  e += '><span class="checkmark"></span></label></div>'
  e += '<div id="xil-enact" onclick="xi.load.enact()">Enact & Close</div>'
  $('.xil-content').append(e)
  $('.xil-main').animate({ left: "-=140" }, 1300)
  $('.xil-updates').hide(1300)
  $('#xil-options').show(1600)
  $('#xil-autoload').show(1600)
  $('#xil-enact').show(1600)
}

xi.load.enact = function() {
  // Retrieve saved XINE-0
  var xin  = client.get_variable('XINE-0')
  var auto = client.get_variable('XINE-A')
  // Evalute Checkboxes
  
  // Calculate changes, both enabled & dis-abled
  var undo = []
  
  // Save XINE-0
  
  // Save XINE-A
  
  // Enact differences
  xi.main.undo(undo)
  xi.main.second()
  // Close
  xi.load.remove()
}

xi.load.moused = function(script) {
  if (!script) { $('.xil-hovered').css('display','none'); return }
  var m = clone(xi.main.dependencies)
  for (var i = 0; i < m.length; i++) {
    if (m[i].url == script) {
      $('#xil-hoveredText').text(m[i].desc)
      break
    }
  }
  $('.xil-hovered').css('display','block')
}

xi.load.unmoused = function() {
  $('.xil-hovered').css('display','none')
}

xi.load.init()
