/*
* Copyright (C) 2010 Joel Sutherland
* Licenced under the MIT license
* http://www.newmediacampaigns.com/page/zoomable-jquery-image-gallery-jphotogrid
*/
(function($) {
	$.fn.jphotogrid = function(settings, callback) {
		settings = $.extend(true, {
			activeClass: 'active',
			selectedClass: 'selected',
			baseCSS: {},
			selectedCSS: {}
		}, settings);

		var url = settings.flickrbase + settings.feedapi + '?';
		var first = true;
		
		//Convert floats to absolute
		function toAbsolute(el){
			$(el).children().each(function(){
				var pos = $(this).position();
				$(this).data('ptop',Math.floor(Number(pos.top)) + 'px');
				$(this).data('pleft',Math.floor(Number(pos.left)) + 'px');
			}).each(function(){
				placeOriginal(this);
			});
		}
		
		function placeOriginal(el, animate, callback){
			var dtop = $(el).data('ptop');
			var dleft = $(el).data('pleft');
			var props = $.extend({
				top: dtop,
				left: dleft
			}, settings.baseCSS);
			if(animate){
				$(el).animate(props, 'slow', function(){
					if($.isFunction(callback)) callback();
				});
			}
			else{
				$(el).css($.extend(props, {position: 'absolute'}));
			}
		}
		
		function hideSelected(callback){
			$container.find('.' + settings.selectedClass).each(function(){
				$(this).removeClass(settings.selectedClass);
				placeOriginal(this, true);
			});
			if($.isFunction(callback)) callback();
		}
		
		function select(el){
			hideSelected(function(){
				$(el).addClass('selected').removeClass('active');
				$(el).animate(settings.selectedCSS, 'slow');
			});
		}

		for(var key in settings.qstrings){
			if(!first)
				url += '&';
			url += key + '=' + settings.qstrings[key];
			first = false;
		}

		return $(this).each(function(){
			$container = $(this);
			$(this).css('position','relative');
			toAbsolute(this);
			
			$(this).children()
				.css('cursor', 'pointer')
				.hover(function(){
					if(!$(this).hasClass(settings.selectedClass))
						$(this).addClass(settings.activeClass);
				},function(){
					$(this).removeClass(settings.activeClass);
				});
			$('.' + settings.activeClass).live('click', function(){				
				select(this);
			});
			$('.' + settings.selectedClass).live('click', function(){
				hideSelected();
			});
			
			$(this).find('div')
				.hover(function(){
					$(this).css('opacity', 0);
				},function(){
					$(this).css('opacity', .5);
				})
				.click(function(){
					$(this).css('opacity', 0);
					$li = $(this).parent();
					$li.css("z-index", 99);
					$li.animate({
						top: 0,
						left: 0,
						width: '100%',
						height: '400px'
					}, 'slow');
				});
			});
	}
})(jQuery);