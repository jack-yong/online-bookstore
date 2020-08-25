package com.cyong.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieUtil {
    //添加一个name,value的cookie
    public static void addCookie(HttpServletRequest request, HttpServletResponse response, String name, String value)
    {
        Cookie cookie=new Cookie(name, value);
        cookie.setMaxAge(3600*24);
        cookie.setPath("/hello");
        removeCookie(request,name); //若存在和name一样的cookie，先删除它
        response.addCookie(cookie);
    }

    //删除name对应的cookie
    public  static void removeCookie(HttpServletRequest request,String name){

        Cookie[] cookies=request.getCookies();
        for(int i=0;i<cookies.length;i++)
        {
            if(cookies[i].getName().equals(name))
            {
                cookies[i].setMaxAge(0);
                return;
            }
        }
    }

    //获得一个name的cookie
    public static Cookie  getCookie(HttpServletRequest request,String name)
    {
        Cookie[] cookies=request.getCookies();
        for(int i=0;i<cookies.length;i++)
        {
            if(cookies[i].getName().equals(name))
                return cookies[i];
        }
        return null;
    }
}
