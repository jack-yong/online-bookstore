/*
 * author：lzc
 */

var latestLists = new Array();
var myLists = new Array();
var searchLists = new Array();
var mylisttag = 0;//0：还没有查询过“我的群组”；1：已查询过“我的群组”
var searchtag = 0;//0：还没进行过搜索；1：已经进行过搜索

function list(id,name){
	this.id = id;
	this.name = name;
}

function shortof(str){
	if(str.length>18){
		return str.substring(0,17) + "...";
	} else {
		return str;
	}
}
/*
 * 弹出框出现时，所做的操作
 * 注意：母页面中，记录“选择过的群组”的写法为：<input type="hidden" id="selectedvalue" value="">
 * 参数说明：
 * 1.nohistorymsg:没有最近的历史记录时，进行的提示文字
 * 2.grouplist:"group"表示是选择群组页面，"list"表示是选择列表页面
 */
function initallAddGroup(nohistorymsg, grouplist){
	//重置所有变量
	latestLists.length = 0;
	myLists.length = 0;
	searchLists.length = 0;
	mylisttag = 0;
	searchtag = 0;
	
	//初始化存储latestLists数组
	var mytable = $("#selectTable");
	if( mytable.find("tr").length != 0){
		mytable.find("input[type='checkbox']").each(function(){
			latestLists.push(new list(this.id,this.value));
			$("label[for='" + this.id + "']").html(shortof(this.value));
		});
	} else {
		$("#nohistory").html(nohistorymsg);
	}
	
	//若母页面中有已选群组的初始值，则将其显示在右侧“已选群组”中
	var selectedvalueId = document.getElementById("selectedvalue");
	if(grouplist == "group" && selectedvalueId){
		var selectList = $("#selectedvalue").val();
		var addList = "";
		var selectedvalues = new Array();
		var selectednum = 0;
		selectedvalues = selectList.split(",");
		for(var i=0; i<selectedvalues.length; i++){
			var name = selectedvalues[i];
			if(name!=""){
				selectednum++;
				var value = name.split(":")[1];
				addList += "<tr>" +
					"<td>" + shortof(value) + "</td>" + 
					"<td width='28px'><a name='" + name + "' onclick='delItemFn(this)' class='blueletter'>删除</a></td>" +
					"</tr>";
			}
		}
		$("#selectedNumId").html(selectednum);
		$(addList).appendTo("#resultTableId");
		if(selectList == "" || selectList.substr(0,1) != ","){
			selectList = ","+selectList;
		}
		$("#selectedList").val(selectList);
		
	}
}

/*
 * 功能：	搜索群组，将结果进行展示
 * href：	执行查询操作的action地址，前端搜索时为“查询我的群组”的action，后端搜索时为“后端搜索群组”的action
 * obj：		要传递给href的参数
 * frontback：	标识前端搜索还是后端搜索，“front”前端，“back”后端
 * 注意：	action的返回值中，必须有一个名为lists的List，且这个List中的元素要包括id和name两个成员变量
 */
function searchList(href,obj,frontback){
	var searchText = $("#searchText").val().trim();
	if(searchText!=""){
		$("#latestlist").removeClass("selected");
		$("#mylist").removeClass("selected");
		$("#nohistory").addClass("hidden");
		
		if(searchtag == 0){
			searchtag = 1;
			$("#buttontag").append("<button class='graybutton rightbutton selected' id='searchlist' " +
				"onclick='showSearchList()'>搜索结果</button>");
		} else{
			$("#searchlist").addClass("selected");
		}
		
		//直接在“我的群组”范围内进行前端搜索
		if(frontback == "front"){
			var localtag = 0;
			//若还没有查询过“我的群组”，进行查询
			if(mylisttag == 0){
				mylisttag = 1;
				if(href == "#"){//这是针对前端框架的示例页面的特殊操作
					myLists = latestLists;
				} else {
					$.post(href,obj,function(data){
						$.each(data.lists,function(i,value) {
							myLists.push(new list(value.id,value.name));
						});
						//这一部分要在这里写一遍，是为了避免myLists没有被赋值完成，就进行搜索
						localtag = 1;
						html = "";
						searchLists.length = 0;
						for(var i=0;i<myLists.length;i++){
							if(myLists[i].name.toLowerCase().match(searchText.toLowerCase())){
								html += 
									"<tr><td>" +
									"<input type='checkbox' id='" + myLists[i].id + "' name='" +myLists[i].id + ":" + myLists[i].name + "' " +
										   	"value='" + myLists[i].name + "' onclick='addItemFn(this)'></input>"+
									"<label for='" + myLists[i].id + "'>" + shortof(myLists[i].name) + "</label>" +
									"</td></tr>";
								searchLists.push(new list(myLists[i].id,myLists[i].name));
							}
						}
						$("#selectTable").html(html);
					});
				}
			}
			if(localtag == 0){
				html = "";
				searchLists.length = 0;
				for(var i=0;i<myLists.length;i++){
					if(myLists[i].name.toLowerCase().match(searchText.toLowerCase())){
						html += 
							"<tr><td>" +
							"<input type='checkbox' id='" + myLists[i].id + "' name='" +myLists[i].id + ":" + myLists[i].name +"' " +
								   	"value='" + myLists[i].name + "' onclick='addItemFn(this)'></input>"+
							"<label for='" + myLists[i].id + "'>" + shortof(myLists[i].name) + "</label>" +
							"</td></tr>";
						searchLists.push(new list(myLists[i].id,myLists[i].name));
					}
				}
				$("#selectTable").html(html);
			}
			
		} 
		//后端搜索
		else if(frontback == "back"){
			$.post(href,obj,function(data){
				html = "";
				searchLists.length = 0;
				$.each(data.lists,function(i,value) {
					html += 
						"<tr><td>" +
						"<input type='checkbox' id='" + value.id + "' name='" +value.id + ":" + value.name + "' " +
							   	"value='" + value.name + "' onclick='addItemFn(this)'></input>"+
						"<label for='" + value.id + "'>" + shortof(value.name) + "</label>" +
						"</td></tr>";
					searchLists.push(new list(value.id,value.name));
				});
				$("#selectTable").html(html);
			});
		}
	}
}

//显示“最近加入的列表”
function showLatestList(){
	$("#latestlist").addClass("selected");
	$("#mylist").removeClass("selected");
	$("#searchlist").removeClass("selected");
	
	html = "";
	if(latestLists.length == 0){
		$("#nohistory").removeClass("hidden");
	} else {
		$("#nohistory").addClass("hidden");
		for(var i in latestLists){
			html += 
				"<tr><td>" +
				"<input type='checkbox' id='" + latestLists[i].id + "' name='" +latestLists[i].id + ":" + latestLists[i].name + "' " +
						"value='" + latestLists[i].name + "' onclick='addItemFn(this)'></input>"+
				"<label for='" + latestLists[i].id + "'>" + shortof(latestLists[i].name) + "</label>" +
				"</td></tr>";
		}
	}
	$("#selectTable").html(html);
}

/*
 * 功能：	显示“我的群组”
 * href：	“查询我的群组”的action地址
 * obj：		要传递给href的参数
 * 注意：	action的返回值中，必须有一个名为lists的List，且这个List中的元素要包括id和name两个成员变量
 */
function showMyList(href,obj){
	$("#latestlist").removeClass("selected");
	$("#mylist").addClass("selected");
	$("#searchlist").removeClass("selected");
	$("#nohistory").addClass("hidden");
	
	if(mylisttag == 0){//未查询过“我的群组”，进行查询，将结果存入js数组myLists中
		mylisttag = 1;
		if(href == "#"){
			myLists = latestLists;//此处只是替代
		} else {
			$.post(href,obj,function(data){
				html = "";
				$.each(data.lists,function(i,value) {
					html += 
						"<tr><td>" +
						"<input type='checkbox' id='" + value.id + "' name='" +value.id + ":" + value.name + "' " +
								"value='" + value.name + "' onclick='addItemFn(this)'></input>"+
						"<label for='" + value.id + "'>" + shortof(value.name) + "</label>" +
						"</td></tr>";
					myLists.push(new list(value.id,value.name));
				});
				$("#selectTable").html(html);
			});
		}
		
	} else {//已查询过“我的群组”，直接显示数组myLists中的值
		html = "";
		for(var i in myLists){
			html += 
				"<tr><td>" +
				"<input type='checkbox' id='" + myLists[i].id + "' name='" +myLists[i].id + ":" + myLists[i].name + "' " +
						"value='" + myLists[i].name + "' onclick='addItemFn(this)'></input>"+
				"<label for='" + myLists[i].id + "'>" + shortof(myLists[i].name) + "</label>" +
				"</td></tr>";
		}
		$("#selectTable").html(html);
	}
}

//显示“搜索结果”
function showSearchList(){
	$("#latestlist").removeClass("selected");
	$("#mylist").removeClass("selected");
	$("#searchlist").addClass("selected");
	$("#nohistory").addClass("hidden");
	
	html = "";
	for(var i in searchLists){
		html += 
			"<tr><td>" +
			"<input type='checkbox' id='" + searchLists[i].id + "' name='" +searchLists[i].id + ":" + searchLists[i].name +"' " +
					"value='" + searchLists[i].name + "' onclick='addItemFn(this)'></input>"+
			"<label for='" + searchLists[i].id + "'>" + shortof(searchLists[i].name) + "</label>" +
			"</td></tr>";
	}
	$("#selectTable").html(html);
}

//左边选中某个checkbox，将其添加到右边；取消选中，则将其从右边删除
function addItemFn(obj){
	var addList = "";
	var selectList = $("#selectedList").val();
	var selectedNum = $("#selectedNumId").html();
	
	if(obj.checked && (!selectList.match(","+obj.name+","))){//将左边选中的项，同时添加到右边
		selectList += obj.name + ",";
		addList = "<tr>" +
			"<td>" + shortof(obj.value) + "</td>" + 
			"<td width='28px'><a name='" + obj.name + "' onclick='delItemFn(this)' class='blueletter'>删除</a></td>" +
			"</tr>";
		$("#selectedNumId").html(parseInt(selectedNum) + 1);
		$(addList).appendTo("#resultTableId");
		$("#selectedList").val(selectList);
	} else if(obj.checked == false && (selectList.match(","+obj.name+","))){//将左边取消选中的项，同时从右边删除
		selectList = selectList.replace(","+obj.name+"," , ",");
		$("#selectedNumId").html(parseInt(selectedNum) - 1);
		$("a[name='"+obj.name+"']").parent().parent().remove();
		$("#selectedList").val(selectList);
	}
}

//右边点击“删除”链接，查看左边是否有当前项，有的话，将其设为未选中状态
function delItemFn(obj){
	var selectList = $("#selectedList").val();
	var selectedNum = $("#selectedNumId").html();
	
	selectList = selectList.replace(","+obj.name+",",",");
	$("#selectedList").val(selectList);
	$(obj).parent().parent().remove();
	$("#selectedNumId").html(parseInt(selectedNum) - 1);
	
	var mytable = $("#selectTable");
	if( mytable.find("tr").length != 0){
		mytable.find("input[type='checkbox']").each(function(){
			if(this.checked == true && this.name == obj.name){
				this.checked = false;
				return false;
			}
		});
	}
}

//确定操作，需要根据不同情况，用户自己编写
function subAddtoList(){
	var selectedList = $("#selectedList").val();//逗号开头，逗号结尾，中间每项为checkbox选中项的name
	if(selectedList!=","){
		$("#selectedvalue").val(selectedList);
		$(document).trigger('close.facebox');
	}
}

//取消操作
function cancelAddtoList(){
	$(document).trigger('close.facebox');
}