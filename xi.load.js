// Simple prettification script with handlers for updating & removal

xi      = typeof xi      != 'undefined' ? xi      : {}
xi.load = typeof xi.load != 'undefined' ? xi.load : {}

xi.load.init = function() {
  var classr = 'xi-load'
  var inject = function(rule) { $('body').append('<div class="' + classr + '">&shy;<style>' + rule + '</style></div>') }

  var rules = ''
  rules += '.xil-container {width: 560px; height: 310px; }\n'
  rules += '.xil-content {width: calc(100% - 6px - 6px); height: calc(100% - 7px - 7px); }\n'
  rules += '.xil-content {border-top, border-bottom: 1px solid rgba(47, 142, 123, 1); }\n'
  rules += '.xil-content {background: linear-gradient(45deg, rgba(30,112,145,0.65) 0%,rgba(47,137,143,0.43) 47%, rgba(88,166,212,0.75) 100%); }\n'
  rules += '.xil-content {position: absolute; left: 50%; top: 50%; transform: translate( -50%, -50%); }\n'
  rules += '.xil-top-right {position: absolute; right: 0%; top: 0%; width: 11px; height: 15px; border-top: 2px solid rgba(71, 224, 193, 1); border-right: 2px solid rgba(71, 224, 193, 1); }\n'
  rules += '.xil-top-left {position: absolute; left: 0%; top: 0%; width: 11px; height: 15px; border-top: 2px solid rgba(71, 224, 193, 1); border-left: 2px solid rgba(71, 224, 193, 1); }\n'
  rules += '.xil-bottom-right {position: absolute; right: 0%; bottom: 0%; width: 11px; height: 15px; border-bottom: 2px solid rgba(71, 224, 193, 1); border-right: 2px solid rgba(71, 224, 193, 1); }\n'
  rules += '.xil-bottom-left {position: absolute; left: 0%; bottom: 0%; width: 11px; height: 15px; border-bottom: 2px solid rgba(71, 224, 193, 1); border-left: 2px solid rgba(71, 224, 193, 1); }\n'
  
  rules += '#xil-loader {position: absolute; left: 50%; top: 50%; width: 510px; height: 270px; transform: translate( -50%, -50% ); }\n'
  rules += '.xil-main {display: none; position: absolute; top: 43%; left: 50%; transform: translate( -50%, -50% ); }\n'
  rules += '.xil-main {font-family: "Lucida", sans-serif; font-size: 42pt; color: rgba(9, 46, 88, 0.97); text-shadow: -1px 0 rgba(87, 142, 123, 1), 0 1px rgba(67, 152, 113, 1), 1px 0 rgba(47, 152, 103, 1), 0 -1px rgba(27, 142, 93, 1); }\n'
  
  $('.' + classr).remove()
  inject(rules)

  var name = 'loader'
  var d    = ''
  d += '<div id="xil-'+name+'" class="xil-container">'
  d += '<div id="xil-'+name+'-top-right"    class="xil-top-right"   ></div>'
  d += '<div id="xil-'+name+'-top-left"     class="xil-top-left"    ></div>'
  d += '<div id="xil-'+name+'-bottom-right" class="xil-bottom-right"></div>'
  d += '<div id="xil-'+name+'-bottom-left"  class="xil-bottom-left" ></div>'
  d += '<div id="xil-'+name+'-content"      class="xil-content"     >'
  d += '<div id="xil-'+name+'-text">'
  d += '<div id="xil-'+name+'-E"  class="xil-main">E</div>'
  d += '<div id="xil-'+name+'-N"  class="xil-main">N</div>'
  d += '<div id="xil-'+name+'-I"  class="xil-main">I</div>'
  d += '<div id="xil-'+name+'-X"  class="xil-main">X</div>'
  d += '</div>'
  d += '</div>'
  d += '</div>'
  $('.xil-container').remove()
  $('body').append(d)
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
    .animate({ left: "+=50" }, 1800 )
}

xi.load.update = function(msg) {

}

xi.load.remove = function() {
  $('#xil-loader').remove()
  $('.' + classr).remove()
}

xi.load.init()
