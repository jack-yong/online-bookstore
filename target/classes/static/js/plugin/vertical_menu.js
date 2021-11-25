(function(a) {
	a.fn.webwidget_vertical_menu_ready = function(p) {
		var w = a(this);
		var isOutMenu = true;
		if (w.children("ul").length == 0 || w.find("li").length == 0) {
			isOutMenu = false;
			if(w.parent().find(".webwidget_vertical_menu_content").length > 0){
				w.click(function(){
					isOutMenu = false;
					var content = $(this).parent().find(".webwidget_vertical_menu_content");
					var margin_top = 0, outLeft = 0;
					if($(".content").length > 0){
						outLeft = $(".content").offset().left;
					}else if($("#inner").length > 0){
						outLeft = $("#inner").offset().left;
					}
					var margin_left = w.offset().left - $(content).width() + w.width() - outLeft;
					$(content).css({"left":margin_left+"px","margin-top":margin_top+"px"});
					$(content).toggle();
				});
				$(".webwidget_vertical_menu_content").hover(function(){
					$(this).show();
				},function(){
					$(this).fadeOut(800);
				});
				w.removeClass("webwidget_vertical_menu");
			}else{
				w.html("缺少菜单内容");
			}
			return null;
		}
		w.find("li").click(function() {
			if(w.find("ul li ul").width() < 50){
				w.find("ul li ul").css({'width':'100px'});
			}
			var margin_top = 0;
			var margin_left = 0;
			if($(window).width() < w.offset().left + w.children("ul").width() + 35){
				margin_left = 0 - w.find("ul li ul").width() + w.width() ;
			}
			$(this).children("ul").css({"margin-top":"0","margin-left":margin_left+"px"});
			$(this).children("ul").toggle();
			$(this).children("ul").hover(function(){
				$(this).show();
			},function(){
				$(this).fadeOut(800);
			});
		});
	};
})(jQuery);
function vertical_menu_start(){
	$(".webwidget_vertical_menu").webwidget_vertical_menu_ready();
	$(".webwidget_vertical_menu").attr("class", "webwidget_vertical_menu_ready");
}
$(document).ready(function(){
	vertical_menu_start();
});