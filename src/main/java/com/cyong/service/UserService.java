package com.cyong.service;

import com.cyong.pojo.User;
import com.cyong.util.LoginResultEnum;
import com.cyong.util.RegisterResultEnum;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {
    List<User> queryUserList();

    User queryUserById(int Uid);

    int updateUser(User user);

    int deleteUser(int Uid);

    User queryUserByUnickname(String Unickname);

    public LoginResultEnum checkLogin(User user);

    public RegisterResultEnum add(User user);

    public String getUavatarByUid(int Uid);

}
