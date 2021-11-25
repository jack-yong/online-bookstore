package com.cyong.controller;


import com.cyong.pojo.User;
import com.cyong.service.UserServiceImpl;
import com.cyong.util.LoginResultEnum;
import com.cyong.util.RegisterResultEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    private UserServiceImpl userService;
    @RequestMapping("/user/login")
    public String login(){
        return "login";
    }

    @RequestMapping("/manger/login")
    public String mangerlogin(){
        return "mangerlogin";
    }

    @RequestMapping("/user/tologin")
    public String tologin(Model model, @RequestParam("username") String username,
                          @RequestParam("password")  String password, HttpSession session){

        User user = new User(password,username);
        LoginResultEnum loginResultEnum = userService.checkLogin(user);
        if (loginResultEnum.equals(LoginResultEnum.USERNAME_UNEXISTED)){
            model.addAttribute("msg1","用户名不存在");
            return "login";
        }
        else if (loginResultEnum.equals(LoginResultEnum.PASSWORD_ERROR)){
            model.addAttribute("msg2","密码错误");
            return "login";
        }
        else {
            session.setAttribute("loginuser",username);
            return "redirect:/index";
        }
    }

    @RequestMapping("/user/tomangerlogin")
    public String tomangerlogin(Model model, @RequestParam("username") String username,
                          @RequestParam("password")  String password, HttpSession session){

        User user = new User(password,username);
        LoginResultEnum loginResultEnum = userService.checkLogin(user);
        if (loginResultEnum.equals(LoginResultEnum.USERNAME_UNEXISTED)){
            model.addAttribute("msg","用户名不存在");
            return "mangerlogin";
        }
        else if (loginResultEnum.equals(LoginResultEnum.PASSWORD_ERROR)){
            model.addAttribute("msg","密码错误");
            return "mangerlogin";
        }
        else {
            session.setAttribute("mangeruser",username);
            return "dashboard";
        }
    }

    @RequestMapping("/user/register")
    public String register(){
        return "register";
    }

    @RequestMapping("/user/toregister")
    public String toregister(Model model, @RequestParam("username") String username,
                             @RequestParam("password") String password){
        User user = new User(password,username);
        RegisterResultEnum resultEnum = userService.add(user);
        if (resultEnum.equals(RegisterResultEnum.USERNAME_DUPLICATED)){
            model.addAttribute("msg","用户名已存在");
            return "register";
        }
        else {
            return "redirect:/user/login";
        }
    }

    @RequestMapping("/user/loginout")
    public String loginout(HttpSession session){
        session.removeAttribute("loginuser");
        session.removeAttribute("mangeruser");
        return "redirect:/index";
    }


}

