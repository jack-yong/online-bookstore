var focusedNum;

//获得鼠标落在编辑框内时的数量
function getFocusedNum(element){
    
    focusedNum=$(element).val();
}

//编辑数量（点edit）
function editNum(element){
    
    //数量框更新(同时检测合法性)
    num=$(element).val();
    reg=/^[1-9]\d*$/;
    if(reg.test(num) == false) //不合法，置为落焦前的值
        num=focusedNum;

    $(element).val(num);
       
    //获取单价
    unitprice=getUnitPrice(element);
    
    //小计更新
    updateSubTotal(element,unitprice,num);

    //总计更新
    updateTotalWhenChangeBoughtNum(element,unitprice,num-focusedNum);  
    updateTotal();
    
    //ajax后台更新
    index=$(element).parents('.cart_row_div').index(); //获得是第几本书（下标）
    ajaxUpdateNum(index-1,num);
}


//增加数量(点+)
function addNum(element){
    
    //数量框更新
    $numedit=$(element).siblings('.numedit');
    num=$numedit.val();
    $numedit.val(++num);
    
    //获取单价
    unitprice=getUnitPrice(element);
    
    //小计更新
    updateSubTotal(element,unitprice,num);
    
    //总计更新
    updateTotalWhenChangeBoughtNum(element,unitprice,1);
    updateTotal();
    
    //ajax后台更新
    index=$(element).parents('.cart_row_div').index(); //获得是第几本书（下标）
    ajaxUpdateNum(index-1,num);
}

//减少数量（点-）
function subNum(element){
    
    //数量框更新
    $numedit=$(element).siblings('.numedit');
    num=$numedit.val();
    if(num > 1)
        $numedit.val(--num);
    else
        return;
          
    //获取单价
    unitprice=getUnitPrice(element);
             
    //小计更新
    updateSubTotal(element,unitprice,num);
    
    //总计更新
    updateTotalWhenChangeBoughtNum(element,unitprice,-1);
    updateTotal();
    
    //ajax后台更新
    index=$(element).parents('.cart_row_div').index(); //获得是第几本书（下标）
    ajaxUpdateNum(index-1,num);
}

//获取单价
function getUnitPrice(element){

    $uprice=$(element).parent('div').parent('.cart_value_div').children('div').eq(1).children('span').eq(1);
    unitprice=$uprice.text();  
    return unitprice;
}

//更新小计
function updateSubTotal(element,unitprice,num){
    
    totalprice=unitprice*10*num/10;
    $(element).parent('div').parent('.cart_value_div').children('div').eq(3).children('span').eq(1).text(totalprice.toFixed(2));
}

//更新总计,点击+或-时触发(num是增加数量)
function updateTotalWhenChangeBoughtNum(element,unitprice,num){

    //选中了该项的才更新总计
    if($(element).parent('div').siblings('input').attr('checked') == 'checked')
    {
        $tprice=$('.cart_footer').children('div').eq(1).children('span').eq(1);
        totalprice=$tprice.text();
        totalprice = Number(totalprice) + Number(unitprice*num);
        $tprice.text(totalprice.toFixed(2));
    }
}

//更新总计，点击某一选项时触发
function updateTotal(){

    //获得总计价
    $tprice=$('.cart_footer').children('div').eq(1).children('span').eq(1);
    $tprice.text(0);
    totalprice=0;
    
    //获得件数
    $cNum=$('.cart_footer').children('div').eq(0).children('span');
    $cNum.text(0);
    checkedNum=0;
    
    $('input[name=bookincart_checkbox]').each(function(){

        //获得小计价
        subtotalprice=$(this).siblings('div').eq(3).children('span').eq(1).text();
       
        if($(this).attr('checked') == 'checked')
        {
            totalprice = Number(totalprice) + Number(subtotalprice);
            $tprice.text(totalprice.toFixed(2));
            $cNum.text(++checkedNum);
        }
    }); 
}


//选中每个记录的checkbox(更新总计+件数)
function checkBookInCartBox(element){

    //检查全选是否需要褪去或出现 (即是否为最后一个打勾、或第一个去勾的) 
    if(isCheckedAll() == true) //目前全勾
    {
        $('#allbooksincart_checkbox').attr('checked','checked'); //全选置勾
        $('#deleteall').css("visibility","visible");//显示批量删除
    }
    else
    {
        $('#allbooksincart_checkbox').removeAttr('checked'); //全选去勾
        $('#deleteall').css("visibility","hidden");//隐藏批量删除
    }
    
    //检查是否全部都没选，若是则不能显示结算部分
    if(isUnCheckedAll() == true)
    	$('.cart_footer').hide();
    else
    	$('.cart_footer').show();
       
    updateTotal(element);
    
    //ajax
    index=$(element).parents('.cart_row_div').index(); //获得是第几本书（下标）
    checked = $(element).attr('checked') == 'checked' ? true : false;
    ajaxUpdateACheck(index-1,checked);
}

//判断目前是否处于全选状态
function isCheckedAll(){
    
    result=true;
    $('input[name=bookincart_checkbox]').each(function(){
        if($(this).attr("checked") != "checked")
            result=false;
    });
    
    return result;
}

//是否全部都没选
function isUnCheckedAll(){
	
	result=true;
    $('input[name=bookincart_checkbox]').each(function(){
        if($(this).attr("checked") == "checked")
        {
        	result=false;
        	return;
        }
    });	
    return result;
}

//选中全选checkbox
function checkAllBooksInCartBox(){
    
    //获取总计价元素
    $tprice=$('.cart_footer').children('div').eq(1).children('span').eq(1);
    
    //改变所有子checkbox状态，同时改变总计
    var checked;
    if($('#allbooksincart_checkbox').attr('checked') == "checked") //选中状态，置所有为选中
    {
        $('input[name=bookincart_checkbox]').attr("checked","checked");
        checked=true;
      
        //显示结算
        $('.cart_footer').show();
        
        //显示批量删除
        $('#deleteall').css("visibility","visible");
    }
    else //未状态，置所有为未选中
    {
        $('input[name=bookincart_checkbox]').removeAttr("checked");
        checked=false;
        
        //隐藏结算
        $('.cart_footer').hide();
        
        //隐藏批量删除
        $('#deleteall').css("visibility","hidden");
    }

    updateTotal();    
            
    //ajax后台改变session
    ajaxUpdateAllChecks(checked);
}


//发送ajax请求修改session购买数量（增加、减少、改变数量时）
function ajaxUpdateNum(index,num){
     
     $.ajax({
        type:"post", 
        url:"updateBoughtNumInCart",
        data:{
            index:index,
            boughtNum:num
        }
    });
}

//发送ajax请求修改session的一个勾选（checked的真值决定是打勾还是去勾）
function ajaxUpdateACheck(index,checked){
     $.ajax({
        type:"post", 
        url:"checkABookInCart",
        data:{
            index:index,
            checked:checked
        }
    });
}


//发送ajax请求修改session的全部勾选（checked的真值决定是打勾还是去勾）
function ajaxUpdateAllChecks(checked){
     
     $.ajax({
        type:"post", 
        url:"checkAllBooksInCart",
        data:{
            checked:checked
        }
    });
}


//删除
function deleteABookInCart(element){
    
    if(window.confirm('确定要删除该商品吗？'))
    {
        //ajax删除session信息
        index=$(element).parents('.cart_row_div').index();
        ajaxDeleteABookInCart(index-1);
        
        //删除界面中那本书的信息
        $('.cart_row_div').eq(index-1).remove();
        
        //是否全选状态
        if(isCheckedAll() == true) //目前全勾
        {
            $('#allbooksincart_checkbox').attr('checked','checked'); //全选置勾
            $('#deleteall').css("visibility","visible");//显示批量删除
        }
        //检查是否全部都没选，若是则不能显示结算部分
        if(isUnCheckedAll() == true)
        	$('.cart_footer').hide();
        else
        	$('.cart_footer').show();
        
            
        //如果没有书了，在title后面提示内容
        if($('.cart_row_div').length == 0)
        {
            $('.cart').empty();
            $('.cart').append("<div class='cart_row_div font_bold_gray'>购物车还是空的哟~快去书城逛逛吧!</div><br>\
                <a href='/index' class='greenbutton'>热销书籍</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                ");

            //删除“右下角的结算”
             $('.cart_footer').remove();
        }
        else
        {    
            //更新合计
            updateTotal();
        }
        
        return true;
    }
    else
        return false;
}

//发送ajax请求修改session的全部勾选（checked的真值决定是打勾还是去勾）
function ajaxDeleteABookInCart(index){
     
     $.ajax({
        type:"post", 
        url:"delABookInCart",
        data:{
            index:index
        }
    });
}

//删除全部
function deleteAllBooksInCart(){
    
    if(window.confirm('你确定要清空购物车吗？'))
    {
        //ajax删除session信息
        ajaxDeleteAllBooksInCart();
        
        //清空界面中所有书的信息
        $('.cart').empty();
            
        //在title后面加没书的提示内容
        $('.cart').append("<div class='cart_row_div font_bold_gray'>购物车还是空的哟~快去书城逛逛吧!</div><br>\n" +
            "                <a href='/index' class='greenbutton'>热销书籍</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n" +
            "                ");
        
        //删除“右下角的结算”
        $('.cart_footer').remove();
        
        return true;
    }
    else
        return false;
}

//发送ajax请求删除session全部
function ajaxDeleteAllBooksInCart(){
     
     $.ajax({
        type:"post", 
        url:"delAllBooksInCart"
    });
}

