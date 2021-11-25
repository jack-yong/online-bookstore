$(document).ready(function(){
	if($("#backtop").attr("id")!="backtop"){
		$("body").append("<p id=\"backtop\"><a href=\"javascript:void(0)\"><span></span>回到顶部</a></p>");
	}
	// hide #back-top first
	$("#backtop").hide();
	
	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 200) {
				$('#backtop').fadeIn();
			} else {
				$('#backtop').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#backtop a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});