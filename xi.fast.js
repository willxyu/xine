xi = typeof xi != 'undefined' ? xi : {}

xi.output  = $('#output_main .output')
xi.scrollb = $('#output_main .output_scrollback')

$.ajax({url: 'https://raw.githubusercontent.com/wilsonpage/fastdom/master/fastdom.min.js'})
 .done(function(data) {
  try { eval(data) } catch(err) { console.log(err) } 
 })

ow_Write = function(selector, text) {
  if (text.trim() == '') { return }
  if (typeof fastdom != 'undefined') {
    var div = '<div id="msg'    + num_msgs + '" class="line">' + text + '</div>'
    var eiv = '<div id="sb_msg' + num_msgs + '" class="line">' + text + '</div>'
    console.log(div)
    xi.output.append(div)
    xi.scrollb.append(eiv)
   /*
    var output = client.document.querySelectorAll(selector + ' .output')[0] // not sure I agree with this
    fastdom.measure(function() {
      // Measure
      var h = output.scrollHeight
      fastdom.mutate(function() {
        // Mutate
        output.scrollTop = h
      })
    })*/
  } else { // Original Code
    window.requestAnimationFrame(function() {
      var hooks = $.cssHooks
      $.cssHooks = {}
      var output = client.document.querySelectorAll(selector + ' .output')[0]
      var newel  = document.createElement('div')
          newel.innerHTML = text
          newel.className = 'line'
          newel.id        = 'msg' + num_msgs
      output.appendChild(newel)
      var scrollb = client.document.querySelectorAll(selector + ' .output_scrollback')[0]
      var newel  = document.createElement('div')
          newel.innerHTML = text
          newel.className = 'line'
          newel.id        = 'sb_msg' + num_msgs
      scrollb.appendChild(newel)
      trim_ow(selector)
      num_msgs++
      scrollback_num_msgs++
      if (selector === '#output_main') {
        if (no_prompts || gag_prompts) {
          var el = client.document.querySelectorAll('#output_main .prompt')
          for (var i = 0; i < el.length; i++) { el[i].style.display = 'none' }
          if ((!no_prompts) && el.length > 0) { el[el.length - 1].style.display = 'block' }
        }
        if (show_timestamps) {
          var el = client.document.querySelectorAll('#output_main .output #msg' + (num_msgs - 1) + ' .timestamp')
          for (var i = 0; i < el.length; i++) { el[i].classList.remove('no_out') }
        }
        if (show_scroll_timestamps) {
          var el = client.document.querySelectorAll('#output_main .output_scrollback #sb_msg' + (num_msgs - 1) + ' .timestamp')
          for (var i = 0; i < el.length; i++) { el[i].classList.remove('no_out') }
        }
      }
      output.scrollTop = output.scrollHeight
      $.cssHooks = hooks
    })
  }
}


function trim_ow(selector)
{
    var output = $(selector +" .output div.line");
    if (output.length > msg_limit)
        output.slice(0, output.length - msg_limit).remove();

    output = $(selector +" .output_scrollback div.line");
    if (output.length >= scrollback_msg_limit)
    {
        var elem = output.slice(0, output.length - scrollback_msg_limit);
        var h = 0;
        elem.each(function() { h += $(this).height(); });
        var scrollback = $(selector +" .output_scrollback");
        var scroll = scrollback.scrollTop();
        elem.remove();
        scrollback.scrollTop(scroll - h);
        scrollback.prop('spos', scrollback.prop("scrollTop"));
    }
}
