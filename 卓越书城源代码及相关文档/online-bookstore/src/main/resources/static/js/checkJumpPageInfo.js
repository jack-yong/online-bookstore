/**
 * 检验跳转页数信息合法性
 */
function checkJumpPageInfo (jumpPage,pageCount) {

    if(jumpPage == "") 
    {
        window.alert("请填写要跳转到的页数!");
        return false;  
    } 
    
    if(Math.round(jumpPage) != jumpPage)
    {
        window.alert("跳转页数只能是数字!");
        return false;    
    }
    
    if(jumpPage > pageCount || jumpPage < 1)
    {
        window.alert("跳转页数超出合法范围!");
        return false;   
    }
    
    return true;    
}
