/*
 * newmember.js	: style of kinds of fonts
 * author		: qiepei(qiepei001@gmail.com)
 * last_modify	: 2012-5-7 by lmqt(lmqt890930@163.com)
 */
//对于浮层的函数，用选择器做选择的时候，一定要先判断该id是否存在
var selectList="";
function selectAllFn(){
	var mytable = $("#searchTable");//获取搜索结果表
	if(mytable.find("tr").length == 0){//搜索结果表没内容，就去获取正常列表
		mytable = $("#selectTable");	
	}
	if( mytable ){
		mytable.find("input[type='checkbox']").each(function(){
			this.checked = true;
		});
	}	
}
function selectNoneFn(){
	var mytable = $("#searchTable");//获取搜索结果表
	if(mytable.find("tr").length == 0){//搜索结果表没内容，就去获取正常列表
		mytable = $("#selectTable");	
	}
	if( mytable ){
		mytable.find("input[type='checkbox']").each(function(){
			this.checked = false;
		});
	}	
}
function addUserFn(){
	var addList=$("#resultTableId").html();
	var mytable = $("#searchTable");//获取搜索结果表
	if(mytable.find("tr").length == 0){//搜索结果表没内容，就去获取正常列表
		mytable = $("#selectTable");
	}
	if( mytable ){
		var index = 0;	
		mytable.find("input[type='checkbox']").each(function(){
			if(this.checked && (!selectList.match(this.name))){
				selectList += this.name + ",";
				addList += "<tr><td>" + 
							this.value +
							"</td><td><a name=\"" + 
							this.name +
							"\" onclick=\"delItemUserFn(this)\" class=\"blueletter\">删除</a></td></tr>";
				index ++;
			}
		});
		var selectedNum = $("#selectedNumId").html();
		$("#selectedNumId").html(parseInt(selectedNum) + parseInt(index));
		$("#resultTableId").html(addList);
		$("#selectedList").val(selectList);
		selectNoneFn();
	}	
}
 
function delItemUserFn(obj){
	var selName = obj.name;
	selectList = selectList.replace(selName+",","");
	
	$("#selectedList").val(selectList);
	$(obj).parent().parent("tr").remove();
	var selectedNum = $("#selectedNumId").html();
	$("#selectedNumId").html(parseInt(selectedNum) - 1);
}
function searchFn(){
	var searchText = $("#searchText").val();
	var mytable = $("#selectTable");
	var searchresult="";
	if( mytable ){
		mytable.find("input[type='checkbox']").each(function(){
			if(this.value.match(searchText)){
				searchresult +="<tr><td colspan=\"3\"><input type=\"checkbox\" name=\""+ this.name +"\" value=\'"+this.value+"\' />"+ this.value +"</td></tr>";
			}
		});
		if(searchresult){//there exist results
			searchresult = "<tr><td>关键词："+searchText+"<td><td><a href=\"javascript:clearSearchFn()\" class=\"blueletter\">清空</a></td></tr>"+searchresult;	
		}else{
			searchresult="<tr><td>关键词："+searchText+"<td><td><a href=\"javascript:clearSearchFn()\" class=\"blueletter\">清空</a></td></tr>" + 
						 "<tr><td colspan=\"3\">没有搜索到结果</td></tr>";
		}
		$("#searchTable").html(searchresult);
		$("#selectTable").addClass("hidden");
	}
}
function clearSearchFn(){
	$("#searchText").val("");
	$("#searchTable").html("");
	$("#selectTable").removeClass("hidden").addClass("parseline");
}
function cancelNewAdminFn(){
	selectList="";
	$(document).trigger('close.facebox');	
}
function changeSelectList(obj, href){
	var groupId = obj.value;
	$.getJSON(href,{groupId:groupId},function(result){
		var tool = eval("("+result+")");
		var list = tool.group;
		var selectListTable="";
		for(var i=0;i < list.length;i++){
			selectListTable += "<tr><td><input type=\"checkbox\" name=\""+ list[i].id +"\" />"+ list[i].name +"</td></tr>";	
		}
		$("#selectTable").html(selectListTable);
	});
}
function clearFn(){
	var selectList="";	
}