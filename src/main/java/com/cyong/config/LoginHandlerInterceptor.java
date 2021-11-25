package com.cyong.config;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginHandlerInterceptor implements HandlerInterceptor{
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        Object loginuser = request.getSession().getAttribute("loginuser");
//        if(loginuser == null){
//            request.setAttribute("msg","没有登陆，请先登录");
////            返回到指定的页面
//            request.getRequestDispatcher("/index").forward(request,response);
//            return false;
//        }else {
//            return true;
//        }
//
//    }

}
