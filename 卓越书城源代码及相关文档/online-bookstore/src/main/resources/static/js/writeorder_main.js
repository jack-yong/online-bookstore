//步骤条
$(document).ready(function(){
	//步骤条
	$(".writeordermain .stepcircle").eq(0).css("background","#009966");
	$(".writeordermain .stepcircle").eq(1).css("background","#009966");
	$(".writeordermain .stepname").eq(0).css("color","#009966");
	$(".writeordermain .stepname").eq(1).css("color","#009966");
	$(".writeordermain .stepbar").eq(0).css("background","#009966");
	readAddress();
});


//提交订单（主要为了先获取地址号）
function submitOrder() //提交订单
{
	//获取当前选中的地址id(通过每个地址框的input hidden获得)
	var aid=-1;
	$('.addressul').children('li').each(function(){

		 if(rgb2hex($(this).css('border-color')) == "#c40000") //选中的
		 {
			 aid=$(this).children('input[name=hidden_aid]').val();
			 return false; //跳出
		 }
	 });
	if(aid == -1)
	{
		alert("请填写收货人地址!");
		return false;
	}
	
	window.location.href='tomakeOrder?Aid=' + aid;

}


/*
 * 读取地址(初次进入时，查取username的所有地址)
 */
function readAddress(){
	  
	$.ajax({
          type:"post", 
          url:"readAddress",
          success:function(data){
              
        	  var addressList=eval('('+data+')');
        	  
        	  //清空上次的绿色选中样式
        	  clearLastCheckBorder();
        	  
        	  //显示地址
        	  for(var i=0;i<addressList.length;i++)
        		  showAddressHTML(addressList[i]);
          }
      });
}


/*
 * 修改地址
 */
function modifyAddress(aid){
	 
	if(confirm("确定要修改该地址吗？") == true)
	{
	    //获取表单数据
	    receiver_name=$("input[name=receiver_name]").val().trim();
	    receive_address=$("input[name=receive_address]").val().trim();
	    receive_code=$("input[name=receive_code]").val().trim();
	    receive_phone=$("input[name=receive_phone]").val().trim();
	    receive_fixphone=$("input[name=receive_fixphone]").val().trim();
	    loc_province=$("#loc_province option:selected").text();
	    loc_city=$("#loc_city option:selected").text();
	    loc_town=$("#loc_town option:selected").text();
	    
	    
	    if(!checkAddressInfo(receiver_name,receive_address,receive_code,receive_phone,receive_fixphone,loc_province,loc_city,loc_town))
	        return false;
	    else
	    {    	
	        //ajax后台将收货地址写入数据库
	        $.ajax({
	            type:"post", 
	            url:"AddressClServlet?dowhat=modifyAddress", 
	            data:{
	            	aid:aid,
	                receiver_name:receiver_name,
	                receive_address:receive_address,
	                receive_code:receive_code,
	                receive_phone:receive_phone,
	                receive_fixphone:receive_fixphone,
	                loc_province:loc_province,
	                loc_city:loc_city,
	                loc_town:loc_town,
	            },
	            success:function(data){
	             
	            	var data=eval('('+data+')');
	            	alert("修改成功~");
	            	
	            	//界面上修改内容（data.index为要删记录在地址栏的位置）
	            	modifyAddressHTML(data.address,data.index);
	            		
	            	location.reload(true); //刷新 相当于关闭        	
	            }
	        });
	    }  
	}
}

//在界面上修改index地址栏
function modifyAddressHTML(address,index){

	//手机还是固话
	phoneNumber=(address.Aphone == null || address.Aphone == "") ? address.Afixphone : address.Aphone;

	//添加地址框
	$('.addressul').children('li').eq(index).html("<div>"
			+address.Aprovince+address.Acity+"&nbsp;&nbsp;<span>（"+address.Areceivername+" 收）</span></div>\
		  	<div>"+address.Aaddress+"</div>\
		  	<div>"+phoneNumber+"</div>\
		  	<a href='layouts/writeorder_modifyaddress.jsp?aid="+address.Aid+"&receiver_name="+address.Areceivername+"&province="+address.Aprovince+"&city="+address.Acity+"&town="+address.Atown+"&address="+address.Aaddress+"&phone="+address.Aphone+"&fixphone="+address.Afixphone+"&code="+address.Acode+"&check=1' rel='facebox' title='修改地址'>修改</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onclick='checkAddress(this,\""+address.Aid+"\")'>使用</a><a href='javascript:void(0)' style='float:right' onclick='deleteAddress(this,\""+address.Aid+"\")'>删除</a>\
		  	<input type='hidden' name='hidden_aid' value='"+address.Aid+"'/>");
}

/*
 * 删除地址
 */
function deleteAddress(element,aid){
	
	if(confirm("确定要删除该地址吗？") == true)
	{
		isChecked=false;
		if(rgb2hex($(element).parent('li').css('border-color')) == "#c40000") //要删除的正好是选中的那个地址
			isChecked=true;
		
		length=$('.addressul').children('li').length;
		if(length == 1)
			isChecked=false;
		
		$.ajax({
	        type:"post", 
	        url:"deleteAddress",
	        data:{
	        	Aid:aid,
	        	isChecked:isChecked
	        },
	        success:function(){
	
	        	//删去该地址栏
	        	$(element).parent('li').remove();
	
	        	//还有其它地址栏且选中的那个要删
	        	if(isChecked == true)
	        		$('.addressul').children('li').first().css('border-color','#c40000'); //将第1个选上
	        }
	    });
	}
}

/*
 * 添加地址
 */
function addAddress(){

    //获取表单数据
    receiver_name=$("input[name=receiver_name]").val().trim();
    receive_address=$("input[name=receive_address]").val().trim();
    receive_code=$("input[name=receive_code]").val().trim();
    receive_phone=$("input[name=receive_phone]").val().trim();
    receive_fixphone=$("input[name=receive_fixphone]").val().trim();
    check=$("input[name=default_address_checkbox]").is(':checked') == true ? 1 : 0; //mysql不支持bool
    loc_province=$("#loc_province option:selected").text();
    loc_city=$("#loc_city option:selected").text();
    loc_town=$("#loc_town option:selected").text();
    
    if(!checkAddressInfo(receiver_name,receive_address,receive_code,receive_phone,receive_fixphone,loc_province,loc_city,loc_town))
        return false;
    else
    {
        //如果一个地址都没有的时候添加，将强制选中这个
        check= $('.addressul').children('li').length == 0 ? 1 : check;
    	
        //ajax后台将收货地址写入数据库
        $.ajax({
            type:"post", 
            url:"addAddress",
            data:{
                receiver_name:receiver_name,
                receive_address:receive_address,
                receive_code:receive_code,
                receive_phone:receive_phone,
                receive_fixphone:receive_fixphone,
                loc_province:loc_province,
                loc_city:loc_city,
                loc_town:loc_town,
                check:check
            },
            success:function(data){
             
            	var data=eval('('+data+')');
            	
            	if(data.result == "SUCCESS")
            	{
            		alert("您已成功添加一条新的收货地址~");
              	  	
            		//清空上次的绿色选中样式
              	  	clearLastCheckBorder();
            		
              	  	//界面上添加
            		showAddressHTML(data.address);
            		
            		location.reload(true); //刷新 相当于关闭
            	}
            	else //ADDRESSNUM_OVERFLOW 
            		alert("最多只能添加8个地址哦~如果您确实需要添加，请删除一个地址。");
            	
            }
        });
    }  
}

//选中地址（若本身就是默认地址，则跳过）
function checkAddress(element,aid){

	if(rgb2hex($(element).parent('li').css('border-color')) != "#c40000")
	{
		$.ajax({
	        type:"post", 
	        url:"checkAddress",
	        data:{
	        	Aid:aid
	        },
	        success:function(){
	
	        	clearLastCheckBorder();
	        	$(element).parent('li').css('border-color','#c40000');
	        	
	        }
	    });
	}
}

//在界面上追加显示新的地址栏
function showAddressHTML(address){

	//手机还是固话
	phoneNumber=(address.Aphone == null || address.Aphone == "") ? address.Afixphone : address.Aphone;

	//添加地址框
	  $('.addressul').append("<li>\
			  	<div>"+address.Aprovince+address.Acity+"&nbsp;&nbsp;<span>（"+address.Areceivername+" 收）</span></div>\
			  	<div>"+address.Aaddress+"</div>\
			  	<div>"+phoneNumber+"</div>\
			  	<a href='javascript:void(0)' onclick='checkAddress(this,\""+address.Aid+"\")'>使用</a><a href='javascript:void(0)' style='float:right' onclick='deleteAddress(this,\""+address.Aid+"\")'>删除</a>\
			  	<input type='hidden' name='hidden_aid' value='"+address.Aid+"'/></li>");
	  
	  //是否用选中（框变绿色）
	  if(address.Acheck == 1)
		  $('.addressul').children('li').last().css('border-color','#c40000');
}

//获得当前check与否
function getAddressCheck(element){
	
	if(rgb2hex($(element).parent('li').css('border-color')) == "#c40000") //选中
		return 1;
	else
		return 0;
}


//清空红色边框
function clearLastCheckBorder(){
	
	 $('.addressul').children('li').each(function(){

		 if(rgb2hex($(this).css('border-color')) == "#c40000")
		 {
			 $(this).css('border-color','#DCDCDC')
			 return;
		 }
	 });
}

//验证新地址的合法性
function checkAddressInfo(){
    
    //判空验证
    if(isEmpty(receiver_name)){alert('收件人姓名不能为空!');return false;}
    if(isEmpty(receive_address)){alert('收货地址不能为空!');return false;}
    if(isEmpty(receive_code)){alert('邮政编码不能为空!');return false;}
    if(isEmpty(receive_phone) && isEmpty(receive_fixphone)){alert('至少要填写一种联系方式!');return false;}
    if(loc_province == "省份"){alert('请选择省份!');return false;}
    if(loc_city == "地级市"){alert('请选择地级市!');return false;}
    if(loc_town == "市、县、区"){alert('请选择市、县、区!');return false;}
    
    //合法性验证
    if(!isValid(/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,receiver_name))
    {
        alert('请填写正确的收件人姓名!');
        return false;
    }
    if(!isValid(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/,receive_address))
    {
        alert('请填写正确的收货地址!');
        return false;
    }
    if(!isValid(/[1-9]\d{5}/,receive_code))
    {
        alert('请填写正确的邮政编码!');
        return false; 
    }
    if(isEmpty(receive_phone))
    {
        if(!isValid(/(\d{4}-|\d{3}-)?(\d{8}|\d{7})/,receive_fixphone))
        {
            alert('请填写正确的固话号码!');
            return false;  
        }
    }
    else
    {
        if(!isValid(/1\d{10}/,receive_phone))
        {
            alert('请填写正确的手机号码!');
            return false;  
        }
    }

    return true;
}


//判空
function isEmpty(str){
    
    if(str == "")
        return true;
    else
        return false;
}

//以正则reg判合法性
function isValid(reg,str){
    if(reg.test(str))
        return true;
    else 
        return false;
}







/*
 * 将商品放回购物车
 */
function sendBookBackToCart(element){
   
	if(confirm("确定把该商品放回购物车吗？") == true)
	{
	   orderIndex=$(element).parents('.curorder_row_div').index(); //第几个订单
	   bookIndex=$(element).parent('td').parent('tr').index()-1; //第几本书
	   orderlength= $(element).parent('td').parent('tr').siblings('tr').length;//订单长度，为1表示已全部放回购物车

		console.log(orderIndex,bookIndex,orderlength);
	   //发送ajax给后台，请求删除session中第orderIndex中第bookIndex本书
	   $.ajax({
	        type:"post", 
	        url:"sendBookBackToCart",
	        data:{
	            orderIndex:orderIndex,
	            bookIndex:bookIndex
	        },
	        success:function(data){
	            
	            //获取该书费用
	            var bookPrice=$(element).parent('td').parent('tr').children('td').eq(4).children('span').text();
	            
	            //获取该订单当前的运费
	            var curTransPrice=$(element).parents('.curorder_row_div').children('.curorder_row_saler_div').children('div').children('span').eq(0).children('font').text();
	
	            //若订单中的书已被全部放回
	            if(orderlength == 1) //界面上直接删除订单
	            {   
	                updateTransTotalPrice(curTransPrice-0);//更新右下角运费
	                updateBooksTotalPrice(bookPrice);//更新右下角合计
	                updateActualTotalPrice();//更新右下角实付款
	                
	                $(element).parents('.curorder_row_div').remove();
	                
	                //判断是否所有订单都删除了
	                if($('.curorder_div').length == 0) //全删除
	                {
	                    $('.writeorder_info').append("<div class='emptyorder_div'><span class='font_bold_gray'>订单是空的哟~快去其它地方逛逛吧!</span><br><br>\
	                                   <a href='/index' class='green_a'>热销书籍</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
	                                   </div>");
	                    $('.cart_footer').remove(); //删除“右下角的结算”
	                }
	                else
	                    updateOrderNumber();//更新所有订单号数字
	            }
	            else //界面上删除这本书
	            {      
	            	var data=eval('('+data+')');
	            	
	                updateSubTotalTransPrice(element,data.totalTransPrice); //更新当前订单的运费   
	                updateSubTotal(element,bookPrice);//更新当前订单的小计
	                updateBooksTotalPrice(bookPrice);//更新右下角合计
	                updateTransTotalPrice(curTransPrice-data.totalTransPrice); //更新右下角运费
	                updateActualTotalPrice();//更新右下角实付款
	                
	                $(element).parent('td').parent('tr').remove();
	            }
	        }
	    });
	}
}

//更新当前订单的运费
function updateSubTotalTransPrice(element,totalTransPrice){
	   
	//获取当前订单小计
    $tTotal=$(element).parents('.curorder_row_div').children('.curorder_row_saler_div').children('div').children('span').eq(0).children('font');
    $tTotal.text(totalTransPrice.toFixed(2));
}


//更新当前订单的小计
function updateSubTotal(element,bookPrice){
    
    //获取当前订单小计
    $sTotal=$(element).parents('.curorder_row_div').children('.curorder_row_saler_div').children('div').children('span').eq(1).children('font').children('font');
    subTotal=$sTotal.text();
    subTotal=Number(subTotal) - Number(bookPrice);
    $sTotal.text(subTotal.toFixed(2));
}

//更新右下角合计
function updateBooksTotalPrice(bookPrice){
    
    $btprice=$('.cart_footer').children('div').eq(0).children('span').eq(1);
    booksTotalPrice=$btprice.text();
    booksTotalPrice=Number(booksTotalPrice) - Number(bookPrice);
    $btprice.text(booksTotalPrice.toFixed(2));
}

//更新右下角实付款
function updateActualTotalPrice(){
    
    booksPrice=$('.cart_footer').children('div').eq(0).children('span').eq(1).text();
    transPrice=$('.cart_footer').children('div').eq(1).children('span').eq(1).text();

    $atprice=$('.cart_footer').children('div').eq(2).children('span').eq(1);
    actualTotalPrice=Number(booksPrice) + Number(transPrice);
    $atprice.text(actualTotalPrice.toFixed(2));  
}

//更新右下角运费
function updateTransTotalPrice(transPriceDv){
    
    $ttprice=$('.cart_footer').children('div').eq(1).children('span').eq(1);
    transTotalPrice=$ttprice.text();
    transTotalPrice=Number(transTotalPrice) - Number(transPriceDv);
    $ttprice.text(transTotalPrice.toFixed(2));
}

//更新所有订单号数字
function updateOrderNumber(){
    
    $('.curorder_row_div').each(function(i){
        $(this).children('span').children('span').text(i+1);
    });           
}

//将rgb颜色转换成16进制值
function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}