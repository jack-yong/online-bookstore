(function($) {

	var left = $(window).width() / 2 - 350;
    $.facebox = function(data, klass) {
    	$.facebox.loading();

    	if (data.ajax) fillFaceboxFromAjax(data.ajax);
    	else if (data.image) fillFaceboxFromImage(data.image);
    	else if (data.div) fillFaceboxFromHref(data.div);
    	else if ($.isFunction(data)) data.call($);
    	else $.facebox.reveal(data, klass);
    };

  /*
   * Public, $.facebox methods
   */

  $.extend($.facebox, {
    settings: {
      opacity      : 0.1,
      overlay      : true,
      loadingImage : baseAddr + 'css/images/loading.gif',
      closeImage   : baseAddr + 'css/images/closelabel.gif',
      imageTypes   : [ 'png', 'jpg', 'jpeg', 'gif' ],
      faceboxHtml  : '\
    <div id="facebox" style="display:none;"> \
      <div class="popup"> \
              <div class="body"> \
              	<a href="#" class="close"><img src="css/images/closelabel.gif" border="0" />\
              	</a> \
			  	<div class=facetitle></div> \
              	<div class="facecontent"></div> \
              </div> \
      </div> \
    </div>'
    },

    loading: function() {
      init();
      if ($('#facebox .loading').length == 1) return true;
      showOverlay();

      $('#facebox .facecontent').empty();
      $('#facebox .body').children().hide().end().append('<div class="loading"><img src="'+$.facebox.settings.loadingImage+'"/></div>');

      $('#facebox').css({
        top:	getPageScroll()[1] + (getPageHeight() / 8),
        left:	385.5
      }).show();

      $(document).bind('keydown.facebox', function(e) {
        if (e.keyCode == 27) 
		$.facebox.close();
        return true;
      });
      $(document).trigger('loading.facebox');
    },

    reveal: function(data, klass) {
		/*alert(data);*/
      $(document).trigger('beforeReveal.facebox');
      if(klass) 
	  $('#facebox .facecontent').addClass(klass);
      $('#facebox .facecontent').html(data);
      $('#facebox .loading').remove();
      $('#facebox .body').children().fadeIn('normal');
      $('#facebox').css('left', left);
      $(document).trigger('reveal.facebox').trigger('afterReveal.facebox');
    },

    close: function() {
      $(document).trigger('close.facebox');
      return false;
    }
  });

  /*
   * Public, $.fn methods
   */

  $.fn.faceboxReady = function(settings) {
    init(settings);

    function clickHandler() {
      $.facebox.loading(true);
      // support for rel="facebox.inline_popup" syntax, to add a class
      // also supports deprecated "facebox[.inline_popup]" syntax
      var klass = this.rel.match(/facebox\[?\.(\w+)\]?/);
	  $('#facebox .facetitle').html(this.title);
      if (klass){ 
    	  klass = klass[1];
      }
      if($(this).attr("size") == 's'){
    	  $("#facebox .facecontent").css({"width":"400px"});
    	  left = $(window).width() / 2 - 200;
      }else{
    	  $("#facebox .facecontent").css({"width":"700px"});
    	  left = $(window).width() / 2 - 350;
      }
      fillFaceboxFromHref(this.href, klass);
      return false;
    }
    return this.click(clickHandler);
  };

  /*
   * Private methods
   */

  // called one time to setup facebox on this page
  function init(settings) {
    if ($.facebox.settings.inited) 
	return true;
    else 
	$.facebox.settings.inited = true;

    $(document).trigger('init.facebox');
    makeCompatible();

    var imageTypes = $.facebox.settings.imageTypes.join('|');
    $.facebox.settings.imageTypesRegexp = new RegExp('\.' + imageTypes + '$', 'i');

    if (settings) 
	$.extend($.facebox.settings, settings);
    if($("#facebox").length == 0){
    	$('body').append($.facebox.settings.faceboxHtml);
    }
    var preload = [ new Image(), new Image() ];
    preload[0].src = $.facebox.settings.closeImage;
    preload[1].src = $.facebox.settings.loadingImage;

    $('#facebox').find('.b:first, .bl, .br, .tl, .tr').each(function() {
      preload.push(new Image());
      preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1');
    });

    $('#facebox .close').click($.facebox.close);
    $('#facebox .close_image').attr('src', $.facebox.settings.closeImage);
  }

  // getPageScroll() by quirksmode.com
  function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } 
	else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } 
	else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;	
    }
    return new Array(xScroll,yScroll);
  }

  // Adapted from getPageSize() by quirksmode.com
  function getPageHeight() {
    var windowHeight;
    if (self.innerHeight) {	// all except Explorer
      windowHeight = self.innerHeight;
    } 
	else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight;
    } 
	else if (document.body) { // other Explorers
      windowHeight = document.body.clientHeight;
    }	
    return windowHeight;
  }

  // Backwards compatibility
  function makeCompatible() {
    var $s = $.facebox.settings;

    $s.loadingImage = $s.loading_image || $s.loadingImage;
    $s.closeImage = $s.close_image || $s.closeImage;
    $s.imageTypes = $s.image_types || $s.imageTypes;
    $s.faceboxHtml = $s.facebox_html || $s.faceboxHtml;
  }

  // Figures out what you want to display and displays it
  // formats are:
  //     div: #id
  //   image: blah.extension
  //    ajax: anything else
  function fillFaceboxFromHref(href, klass) {
    // div
    if (href.match(/#/)) {
      var url = window.location.href.split('#')[0];
      var target = href.replace(url,'');
      $.facebox.reveal($(target).clone().show(), klass);

    // image
    } 
	else if (href.match($.facebox.settings.imageTypesRegexp)) {
      fillFaceboxFromImage(href, klass);
    // ajax
    } 
	else {
      fillFaceboxFromAjax(href, klass);
    }
  }

  function fillFaceboxFromImage(href, klass) {
    var image = new Image();
    image.onload = function() {
      $.facebox.reveal('<div class="image"><img src="../widged/' + image.src + '" /></div>', klass);
    };
    image.src = href;
    //getStyle();
  }

  function fillFaceboxFromAjax(href, klass) {
    $.get(href,'', function(data) {
		$.facebox.reveal(data, klass); 
		//getStyle();
	});	
  }

  function skipOverlay() {
    return $.facebox.settings.overlay == false || $.facebox.settings.opacity === null;
  }

  function showOverlay() {
    if (skipOverlay()) return;

    if ($('#facebox_overlay').length == 0){
      $("body").append('<div id="facebox_overlay" class="facebox_hide"></div>');
    }
    $('#facebox_overlay').hide().addClass("facebox_overlayBG").css('opacity', $.facebox.settings.opacity)/*.click(function() { $(document).trigger('close.facebox'); })*/.fadeIn(200);
    return false;
  }

  function hideOverlay() {
    if (skipOverlay()) return;
      $('#facebox_overlay').fadeOut(200, function(){
      $("#facebox_overlay").removeClass("facebox_overlayBG");
      $("#facebox_overlay").addClass("facebox_hide");
      $("#facebox_overlay").remove();
    });
    
    return false;
  }

  /*
   * Bindings
   */
  $(document).bind('close.facebox', function() {
    $(document).unbind('keydown.facebox');
    $('#facebox').fadeOut(function() {
      $('#facebox .facecontent').removeClass().addClass('facecontent');
      hideOverlay();
      $('#facebox .loading').remove();
    });
  });

})(jQuery);
function facebox_start(rel){
	$('a[rel*='+rel+']').faceboxReady();
	$('a[rel*='+rel+']').attr('rel',rel+'ready');
}
