/**
 * 检验登录信息合法性
 */
function checkLoginInfo (username,password) {
    var regx = /^[A-Za-z0-9]*$/;
    
    if(username == "" || !regx.test(username)) //检验用户名 
    {
        window.alert("用户名不合法!");
        return false;  
    } 
    if(password == "" || !regx.test(password)) //检验密码
    {
        window.alert("密码不合法!");
        return false;  
    } 

    return true;    
}
