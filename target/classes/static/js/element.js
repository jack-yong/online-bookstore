
function loadTabs(){
    if($(".tabcontainer").length > 0) {
        $(".tabcontainer>ul").addClass("tabs");
        var linebottom = '<div class="linebottom"></div>';
        $(".tabcontainer").each(function(i){
            if($(this).attr("type")!="asy"){
                $(this).children(".tabdiv:first").addClass("current");
                $(this).children("ul:first").children("li:first").addClass("current");
                $(this).children(".tabdiv").each(function(i){
                    $(this).addClass("tabdiv_"+i);
                });
                $(this).children("ul:first").children("li").each(function(i){
                    $(this).click(function(){
                        $(this).parent("ul").siblings(".current").removeClass("current").hide();
                        $(this).parent("ul").siblings(".tabdiv_" + i).addClass("current").show();
                        var height = tabsHeight + $(this).parent("ul").siblings(".tabdiv_" + i).height()+ 25;
                        $(this).parent("ul").parent(".tabcontainer").css({"height":height+"px"});
                        //var width = $(this).parent("ul").parent(".tabcontainer").width();
                        //$(this).parent("ul").siblings(".tabdiv_" + i).css({"width":width+"px"});
                        $(this).siblings(".current").removeClass("current");
                        $(this).addClass("current");
                    });
                });
            }
            var tabsHeight = $(this).children(".tabs").height();
            var height = tabsHeight + $(this).children("div.current").height()+ 25;
            var width = $(this).width() - 25;
            $(this).css({"height":height+"px"});
            $(this).children("div.current").css({"width":width+"px"});
            $(this).children(".tabdiv").hide();
            $(this).children("div.current").show();
            $(this).children("ul:first").after(linebottom);
            $(this).children("ul:first").children("li").each(function(i){
                $(this).click(function(){
                    $(this).siblings(".current").removeClass("current");
                    $(this).addClass("current");                
                });
            });
            
        });
    }
}

function loadDataTable(){
	if($(".datatable").length > 0) {
		$(".datatable").each(function(i){
			if(!$(this).find("tr:first").hasClass("tabletitle")){
				$(this).attr("cellspacing", "0");
				$(this).attr("cellpadding", "0");
				$(this).find("tr:first").addClass("tabletitle");
				$(this).find("tr:not(.tabletitle)").addClass("tablevalue");
				$(this).find("tr:nth-child(even)").addClass("odd");
			}
		});
	}
}

function loadFormTable(){
	if($(".formtable").length > 0) {
		$(".formtable").each(function(i){
			if(!$(this).find("td:first").hasClass("formlabel")){
				$(this).attr("cellspacing", "0");
				$(this).attr("cellpadding", "0");
				$(this).find("tr").each(function(){
					$(this).find("td:first").addClass("formlabel");
					$(this).find("td:nth-child(2)").addClass("formcontent");
					$(this).find("td:nth-child(3)").addClass("formfunction");
				});
			}
		});
		$(".formtable").each(function(i){
			var text = $.trim($(this).find(".formlabel").text());
			if(text.length == 0){
				var only = true;
				var max = 10;
				$(this).find(".formlabel").each(function(){
					if($(this).find("img").length <= 1){
						only = true;
						max = $(this).find("img").width()>max ? $(this).find("img").width() : max;
					}else{
						only = false;
					}
				});
				if(only){
					$(this).find(".formlabel").css({'width':max+'px', 'padding':'0 5px'});
				}
			}
		});
	}
}

function loadBigBlueButton(){
	var divheight=$(".bigbluebutton").height();
	var imgeheight=$(".bigbluebutton img").height();
	if(imgeheight>divheight){
    	$(".bigbluebutton img").height(divheight);
	}else{
		$(".bigbluebutton img").css("padding-top", Math.round((divheight-imgeheight)/2)+"px");
		$(".bigbluebutton img").css("padding-bottom", Math.round((divheight-imgeheight)/2)+"px");
	}
}

function loadImgLink(){
	var divheight=$(".imglink").height();
	var imgeheight=$(".imglink img").height();
	if(imgeheight>divheight){
    	$(".imglink img").height(divheight);
	}else{
		$(".imglink img").css("padding-top", Math.round((divheight-imgeheight)/2)+"px");
		$(".imglink img").css("padding-bottom", Math.round((divheight-imgeheight)/2)+"px");
	}
}

function loadItemTable(){
	$(".itemtable").each(function(){
		if(!$(this).find("tr:first").hasClass("tabletitle")){
			$(this).attr("cellspacing", "0");
			$(this).attr("cellpadding", "0");
			$(this).find("tr:first").addClass("tabletitle");
		}
	});
}

function loadList(){
	$(".list").each(function(){
		var lineodd = '<div class="lineout odd"></div>';
		var lineeven = '<div class="lineout even"></div>';
		$(this).children("div").addClass("linein");
		$(this).children("div:nth-child(odd)").wrap(lineodd);
		$(this).children("div:nth-child(even)").wrap(lineeven);
		$(this).removeClass("list").addClass("listready");
	});
}

function loadListTitle(){
	var img = '';
	$(".listtitle").each(function(){
		$(this).removeClass("listtitle").addClass("listtitleready");
		img = $(this).attr("bg");
		if(img != undefined){
			$(this).prepend("<img src='"+img+"' class='title' />");
		}
		$(this).append("<div class='clear'></div>");
	});
}

function loadDottedBox(){
	$(".dottedbox").each(function(){
		var bg = $(this).attr("bg");
		if(bg != undefined){
			$(this).css({"background-image":"url("+bg+")"});
			$(this).css({"background-position":"right top"});
			$(this).css({"background-repeat":"no-repeat"});
		}
	});
}

function loadPubBanner(){
	if($(".pub_banner").attr("class") != undefined && $(".pub_banner").html().length < 5){
		var user = $(".pub_banner").attr("user");
		var sys = $(".pub_banner").attr("sys");
		var acctoken = $(".pub_banner").attr("acctoken");
		var index = $(".pub_banner").attr("index");
		var handleUrl = $(".pub_banner").attr("handleurl");
		var subuser = user;
		if(user.length>20){
			subuser = user.substr(0, 17)+"...";
		}
		$.ajax({  
	        url:bannerAddr+"banner.jsp?callback=?",  
	        type:"get",
	        dataType:"jsonp",  
	        data:{'user':user,'sys':sys,'subuser':subuser,'acctoken':acctoken, 'index':index},  
	        jsonp:"jsonp_callback",  
	        success:function(result) {  
	            $(".pub_banner").html(result[0].html);
	            $.getScript(bannerAddr+"pub_banner.js");
	            $.getScript(msgAddr+"js/newMsg.js");
	            if(sys.length > 0){
	            	$(".pub_banner #"+sys).addClass("hidden");
	            }
	            if($("#bannerlogin").length > 0){
	            	var href = $("#bannerlogin").attr("href");
	            	var more = "&handleUrl=" + handleUrl + "&redirectUrl=" + location.href;
	            	$("#bannerlogin").attr("href", href+more);
	            }
	            if(user !=undefined && user.length > 0){
	            	checkUserName(user);
	            }
	        }
	    });
	}
}

function checkUserName(user){
	$(".pub_banner").after("<div id=\"box\"></div>");
	$.ajax({  
        url:userInfoAddr+"api/getUserInfoByEmailAjax?callback=?&userEmailList=["+user+"]",  
        type:"get",
        dataType:"json",  
        success:function(result) {
        	if( result[0].userName == null || result[0].userName == "" ){
        		var mytip = {
    				title:"您的个人信息尚未完善",
    				content:"请进入账号设置中心完善您的个人信息。",
    				formore:"账号设置",
    				url:userInfoAddr + "user/userinfo"
        		};
        		$("#box").tipbox(mytip);
        	}
        }
    });
}

function loadScrollToTop(){
	if($("#backtop").attr("id")!="backtop"){
		$("body").append("<p id=\"backtop\"><a href=\"javascript:void(0)\"><span></span>回到顶部</a></p>");
	}
	$("#backtop").hide();
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 200) {
				$('#backtop').fadeIn();
			} else {
				$('#backtop').fadeOut();
			}
		});
		$('#backtop a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
}


function loadElement(){
	loadTabs();
	loadDataTable();
	loadFormTable();
	loadItemTable();
	loadList();
	loadListTitle();
	loadDottedBox();
	loadBigBlueButton();
	loadImgLink();
	loadScrollToTop()
}

$(function(){
	loadPubBanner();
	loadElement();
});