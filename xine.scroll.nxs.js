xi.commitNXSScroll = function() {
  var f = function(str) { return str }
     // var o = str.split('\n'); var s = ''; o.forEach(function(val) { s += val.trim() + '\n' }); return s }
  
  var xine = client.get_package('xine')
  var folder = client.reflex_create(xine, "Scroll Ctrl", 'group', 'xine')
  
  // xi.aliases
  var funct = client.reflex_create(folder, "xi.scroll", 'function', 'xine')
  var code = `
  xic = typeof xic != 'undefined' ? xic : {}
  xic.bypass = true

  client.do_layout = function () {
    var tree = client.client_layout;
    var el = $('#'+tree.id);
    el.css('display', 'block').css('width', '100%').css('height', '100%');
    layout_subtree(tree);
    if (xic.bypass) { } else {
     $('.custom-scroll').each(function() {
        if ($(this).getNiceScroll().length)
            $(this).getNiceScroll().resize();
     });
     scrollable(el.find('.tab_content'));
     scrollable($('.floater').find('.tab_content')); 
    }
  }

  client.redraw_interface = function () {
    var orig_mobile = client.mobile;
    // swap mobile mode as needed
    if ($(window).width() > 1000)
        client.mobile = 0;
    else if ($(window).width() > 750)
        client.mobile = 1;
    else
        client.mobile = 2;
    if (client.real_mobile) client.mobile = 2;

    // if the layout type changed, we need to redraw everything
    if (client.mobile != orig_mobile) {
        reset_ui(false);
        return;
    }

    clear_scrolling();

    client.do_layout(); // CHANGED

    client.apply_stylesheet();
    client.mapper.handle_redraw();
    draw_affdef_tab();
    update_tab_captions();
    update_output_windows();
    client.fix_input_line_height(false);
    relayout_status_bar();
    relayout_gauges();
    draw_bottom_buttons();
    setup_scrolling();
    record_floater_locations();
    client.update_fonts();
    client.update_tooltip_state();
    client.setup_movement_compass();
    client.update_layout_for_mobile();
    $('body').removeClass('reverted');
    if (client.reverted) $('body').addClass('reverted');
    if (GMCP.gauge_data) {
        parse_gauges(GMCP.gauge_data);
        if (client.game == 'Lusternia') parse_lusternia_wounds(GMCP.gauge_data);
    }

    // the resizable jQuery plug-in doesn't handle our DOM shenanigans very well, so we need to fix it
    $('.ui-resizable').each(function() {
        var i = $(this).resizable('instance');
        i.element = $(this);
        i.handles.s[0] = $(this).children('.ui-resizable-s')[0];
    });
  }

  client.get_output_template = function (container) {

    var t = $("<div/>").attr("id", container)
                       .addClass("output_container")

    t.append(
        $("<div/>").addClass("output_wrap")
                   .append(
                        $('<div/>').addClass('output_scrollback_wrapper').
                            append(
                            $("<div/>").addClass("output_scrollback")
                                       .addClass("border-standard")
                                       .addClass("tnc_default")
                                       .attr("data-container", container)
//                                       .bind('scroll', function(event) {
                                       // .mousewheel(function(event, delta) {
//                                       .bind('wheel', function(event, delta) {
                                            // output_scroll("#" + $(this).attr("data-container"), -120 * delta);
                                            // event.stopImmediatePropagation();
                                       // })
                                       .dblclick(function(event) {
                                         hide_scrollback("#" + $(this).attr("data-container"));
                                         event.stopImmediatePropagation();
                                       })
                                       .mouseup(function(event) {
                                         if (client.copy_on_mouseup) document.execCommand ("Copy");
                                       })
                        )
                   )
                   .append(
                        $("<div/>").addClass("border-standard")
                                   .addClass("hide_scrollback")
                                   .attr("data-container", container)
                                   .html("Hide")
                                   .click(function () {
                                        hide_scrollback("#" + $(this).attr("data-container"));
/*
                                        $("#" + $(this).attr("data-container") + " .output").css("overflow", "hidden").prop({scrollTop: $("#" + $(this).attr("data-container") + " .output").prop("scrollHeight")});
                                        $("#" + $(this).attr("data-container") + " .output_scrollback, #" + $(this).attr("data-container") + " .output_scrollback_wrapper, #" + $(this).attr("data-container") + " .hide_scrollback").hide();
                                        $("#" + $(this).attr("data-container") + " .show_scrollback").show();
*/
                                    })
                   )
                   .append(
                        $("<div/>").addClass("show_scrollback")
                                   .attr("data-container", container)
                                   .click(function (event) {
                                        output_scroll("#" + $(this).attr("data-container"), 0);
                                        event.stopImmediatePropagation();
                                    })
                    )
                   .append(
                        $("<div/>").addClass("output")
                                   .addClass("border-standard")
                                   .addClass("tnc_default")
                                   .attr("data-container", container)
                       /*
                                   .mousewheel(function(event, delta) {
                                        if ($("#" + $(this).attr("data-container") + " > .output_scrollback").css('display') != "block" && delta > 0)
                                        {
                                            output_scroll("#" + $(this).attr("data-container"), 0);
                                        } else if ($("#" + $(this).attr("data-container") + " > .output_scrollback").css('display') == "block") {
                                            output_scroll("#" + $(this).attr("data-container"), -30 * delta);
                                        }
                                        event.stopImmediatePropagation();
                                   })
                                   */
                                   .mouseup(function(event) {
                                     if (client.copy_on_mouseup) document.execCommand ("Copy");
                                   })
                    )
    )
    var scroller = t.find('.output_scrollback');
    // scrollable(scroller);
    console.log('hahaha')
    var wrapper = t.find('.output_scrollback_wrapper');
    wrapper.resizable({ handles: 's', containment: 'parent' });
    return t;
  }

  client.draw_tab_content = function(tab, existing) {
    var res = $("<div/>")
            .attr("id", "tab_content_" + tab.id)
            .addClass("tab_content")
            .addClass("frame_border")
            .addClass("tab_type_"+tab.type)
            .addClass("scrolling");

    if (existing.length && existing.children().length) {
        existing.children().appendTo(res);
    }
    else
    {
        var html;
        if (tab.tab_type == "content")
            html = tab.content_html;
        else if (tab.tab_type == "channel")
            html = client.get_output_template("channel_" + tab.channel);
        else if (tab.tab_type == "main_output")
            html = client.get_output_template("output_main");
        if (html !== undefined)
            res.html(html);
    }

    return res;
  }


  client.clear_scrolling()
  $('.custom-scroll').removeClass('custom-scroll')

  window.setTimeout( function() { 
    client.redraw_interface();
    $('#output_main').remove(); 
    $('#tab_content_main_output').html(client.get_output_template("output_main"));
    
    var c = 'mehr'
    var inject = function(rule) { $('body').append('<div class="' + c + '">&shy;<style>' + rule + '</style></div>') }
    $('.mehr').remove()
    inject('#tab_content_main_output {overflow-y: scroll !important; }\\n')
    inject('.output_wrap > .output {overflow-y: scroll !important; }\\n')
    
  }, 1000 )
  `
  funct.code = f(code)
}

xi.commitNXSScroll()
