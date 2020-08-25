/**
 * 检验注册信息合法性
 */
function checkRegisterInfo (username,password,repassword) {
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
    if(repassword == "" || !regx.test(repassword)) //检验确认密码  
    {
        window.alert("用户名不合法!");
        return false;  
    }
    if(password != repassword)
    {
        window.alert("两次输入的密码不一致!");
        return false;  
    } 

    return true;    
}