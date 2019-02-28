// Simple prettification script with handlers for updating & removal

xi      = typeof xi      != 'undefined' ? xi      : {}
xi.load = typeof xi.load != 'undefined' ? xi.load : {}

xi.load.init = function() {
  var classr = 'xi-load'
  var inject = function(rule) { $('body').append('<div class="' + classr + '">&shy;<style>' + rule + '</style></div>' }

  var rules = ''
  rules += '.xil-container {width: 560px; height: 310px; }\n'
  rules += '.xil-content {width: calc(100% - 6px - 6px); height: calc(100% - 7px - 7px); }\n'
  rules += '.xil-content {border-top, border-bottom: 1px solid rgba(47, 142, 123, 1); }\n'
  rules += '.xil-content {background: linear-gradient(45deg, rgba(30,112,145,0.45) 0%,rgba(47,137,143,0.23) 87%, rgba(125,185,232,0.45) 100%); }\n'
  rules += '.xil-content {position: absolute; left: 50%; top: 50%; transform: translate( -50%, -50%); }\n'
  rules += '.xil-top-right {position: absolute; right: 0%; top: 0%; width: 11px; height: 15px; border-top: 2px solid rgba(71, 224, 193, 1); border-right: 2px solid rgba(71, 224, 193, 1); }\n'
  rules += '.xil-top-left {position: absolute; left: 0%; top: 0%; width: 11px; height: 15px; border-top: 2px solid rgba(71, 224, 193, 1); border-left: 2px solid rgba(71, 224, 193, 1); }\n'
  rules += '.xil-bottom-right {position: absolute; right: 0%; bottom: 0%; width: 11px; height: 15px; border-bottom: 2px solid rgba(71, 224, 193, 1); border-right: 2px solid rgba(71, 224, 193, 1); }\n'
  rules += '.xil-bottom-left {position: absolute; left: 0%; bottom: 0%; width: 11px; height: 15px; border-bottom: 2px solid rgba(71, 224, 193, 1); border-left: 2px solid rgba(71, 224, 193, 1); }\n'
  
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
  d += '<div id="xil-'+name+'-E'>E</div>'
  d += '<div id="xil-'+name+'-N'>N</div>'
  d += '<div id="xil-'+name+'-I'>I</div>'
  d += '<div id="xil-'+name+'-X'>X</div>'
  d += '</div>'
  d += '</div>'
  d += '</div>'
  $('body').append(d)
}

xi.load.update = function(msg) {

}

xi.load.remove = function() {
  $('#xil-loader').remove()
  $('.' + classr).remove()
}

