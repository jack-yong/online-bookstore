var loadingImg = "<div class='centeralign' id='frloading'>"+
				"<img src='http://freedisk.free4lab.com/download?uuid=e5980a8c-9336-4791-b0b4-65ac731a5799' />"+
				"好友列表加载中...</div>";
if($("#myfriend").attr("id")!="myfriend"){
	var html = [];
	html[0] = "<div id=\"myfriend\"><span class=\"greyletter\" href=\"javascript:void(0)\">好友列表</span></div>";
	html[1] = "<div id=\"friendlist\" class=\"hidden\"></div>";
	var htmlSum = html.join("");
	$("body").append(htmlSum);
}

//去后端获取好友列表数据
function loadFriendList(){
	showFriendFrame("friend");
	$.getJSON(msgAddr +"getFriendListAction?callback=?",{},function(result){
		var friendList = result;
		var groupName = "我的好友";
		var groupMember = [];
		for(var i=0; i<friendList.length; i++){
			groupMember[i] = {
					avatar:"http://freedisk.free4lab.com/download?uuid="+friendList[i].avatar,
					userName:friendList[i].userName
					};
		}
		showGroup(groupName, groupMember);
	});
}

//好友列表内容框
function showFriendFrame(select){
	var htmlFrame = [];
	htmlFrame[0] = "<div class=\"padding10\">";
	if(select == "friend"){
		htmlFrame[1] = "<input type=\"button\" class=\"greybutton leftbutton selected\" value=\"我的好友\" />";
		htmlFrame[2] = "<input type=\"button\" class=\"greybutton rightbutton\" value=\"通讯录\" />";
	}else if(select == "addlist"){
		htmlFrame[1] = "<input type=\"button\" class=\"greybutton leftbutton\" value=\"我的好友\" />";
		htmlFrame[2] = "<input type=\"button\" class=\"greybutton rightbutton selected\" value=\"通讯录\" />";
	}
	htmlFrame[3] = "</div>";
	htmlFrame[4] = loadingImg + "<div id=\"friendcontent\" class=\"leftmargin_10\">";
	htmlFrame[5] = "</div>";
	
	var htmlFrameSum = htmlFrame.join("");
	$("#friendlist").html(htmlFrameSum);
}

//显示一组成员
function showGroup(groupName, groupMember){
	console.log(groupMember.length);
	var htmlInside = [];
	var groupMembers = [];
	htmlInside[0] = "<div class=\"greyletter groupname\">"+groupName+"</div>";
	//alert(groupMember.length);
	for(var i = 0; i < groupMember.length; i++){
		groupMembers[i] = "<div class=\"padding5 groupmember\" id=\""+groupMember[i].userId+"\" name=\""+groupMember[i].userName+"\">"+
							"<img src='"+groupMember[i].avatar+"' height=\"30px\" width=\"30px\"  class=\"leftfloat\"/>"+
							"<div class=\"leftfloat padding5\">"+groupMember[i].userName+"</div><div class=\"clear\"></div></div>";
	}
	htmlInside[1] = groupMembers.join("");
	var htmlInsideSum = htmlInside.join("");
	$("#frloading").hide();
	$("#friendcontent").append(htmlInsideSum);
}

//显示好友列表外框，根据屏幕高度宽度设置不同的形态
//显示好友列表外框，根据屏幕高度宽度设置不同的形态
function showFriendList(){
	var height;
	var top;
	height = $("#myfriend").offset().top - $(window).scrollTop();
	top = 0;
	$("#inner").css({"margin-right" : "auto", "margin-left" : "auto"});
	$(".pub_banner").css({"margin-right" : "auto", "margin-left" : "auto"});
	$(".banner").css({'width' : 'auto'});
	var widthMinus = $("#friendlist").width() - ($("body").width() - $("#inner").width()) / 2;
	if( widthMinus > 0 ){
		var marginRight = ($("body").width() - $("#inner").width()) / 2 + widthMinus;
		if( $("#inner").offset().left > widthMinus){
			var marginLeft = $("#inner").offset().left - widthMinus;
			$("#inner").css({"margin-right" : marginRight, "margin-left" : marginLeft});
			$(".pub_banner").css({"margin-right" : marginRight, "margin-left" : marginLeft});
			var width = $(".banner").width() - $("#friendlist").width();
			$(".banner").css({'width' : width+'px'});
			$(".banner .content").css({"margin-left" : marginLeft});
			$("#friendlist").css({'border-top':'none'});
		}else{
			$("#friendlist").css({'border-top':'1px solid #c8c8c8'});
			height -= 75;
			top += 75;
		}
	}
	$("#friendlist").css({"height" : height, "top" : top, "width" : '270px'});
	$("#friendcontent").css({"height" : height-100, "overflow": "auto"});
}

//点击“好友列表”的事件
$("#myfriend").click(function(){
	$("#friendlist").toggleClass("hidden");
	if( $("#friendlist").hasClass("hidden") ){
		$(this).css({"width":"100px"});
		$("#inner").css({"margin-right" : "auto", "margin-left" : "auto"});
		$(".pub_banner").css({"margin-right" : "auto", "margin-left" : "auto"});
		$(".banner").css({'width' : 'auto'});
		$(".banner .content").css({"margin-left" : "auto", "margin-right" : "auto"});
	}else{
		$(this).css({"width":"270px"});
		loadFriendList();
		showFriendList();
	}
});

//滚动滚轮的事件
$(window).scroll(function () {
	if(!$("#friendlist").hasClass("hidden")){
		showFriendList();
	}
});

//窗口大小改变的事件
$(window).resize(function(){
	if(!$("#friendlist").hasClass("hidden")){
		showFriendList();
	}
});