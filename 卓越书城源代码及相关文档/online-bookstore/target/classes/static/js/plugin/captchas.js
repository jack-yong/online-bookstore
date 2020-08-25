$(function(){
	setTimeout("createCode()", 10);
});
var code ; //在全局 定义验证码
function createCode(){ 
	code = "";
	var codeLength = 4;//验证码的长
	$("#checkCode").val('');

    var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

    for(var i=0;i<codeLength;i++) {
		var charIndex = Math.floor(Math.random()*32);
		code +=selectChar[charIndex];
	}
	if(code.length != codeLength){
       	createCode();
	}
	$("#checkCode").val(code);
	$("#checkCode").val(code);
}