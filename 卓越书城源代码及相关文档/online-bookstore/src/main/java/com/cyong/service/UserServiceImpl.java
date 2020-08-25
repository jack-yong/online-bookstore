package com.cyong.service;

import com.cyong.mapper.UserMapper;
import com.cyong.pojo.User;
import com.cyong.util.LoginResultEnum;
import com.cyong.util.RegisterResultEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    LoginResultEnum loginResultEnum = null;
    RegisterResultEnum registerResultEnum =null;
    @Override
    public List<User> queryUserList() {
        List<User> users = userMapper.queryUserList();
        return users;
    }

    @Override
    public User queryUserById(int Uid) {
        User user = userMapper.queryUserById(Uid);
        return user;
    }

    @Override
    public int updateUser(User user) {
        int i = userMapper.updateUser(user);
        return i;
    }

    @Override
    public int deleteUser(int Uid) {
        int i = userMapper.deleteUser(Uid);
        return i;
    }

    @Override
    public User queryUserByUnickname(String Unickname) {
        User user = userMapper.queryUserByUnickname(Unickname);
        return user;
    }

    @Override
    public LoginResultEnum checkLogin(User user) {
        User user_r = userMapper.queryUserByUnickname(user.getUnickname());
        if (user_r==null){
            loginResultEnum = LoginResultEnum.USERNAME_UNEXISTED;  //用户不存在
        }
        else if(user_r.getUpassword().equals(user.getUpassword())){
            loginResultEnum = LoginResultEnum.SUCCESS;       //密码正确
        }
        else {
            loginResultEnum = LoginResultEnum.PASSWORD_ERROR;      //密码错误
        }
        return loginResultEnum;
    }

    @Override
    public RegisterResultEnum add(User user) {
        if(userMapper.queryUserByUnickname(user.getUnickname())!=null){
            registerResultEnum = RegisterResultEnum.USERNAME_DUPLICATED; //用户名存在
        }
        else {
            userMapper.addUser(user);
            registerResultEnum = RegisterResultEnum.SUCCESS;        //注册成功
        }
        return registerResultEnum;
    }

    @Override
    public String getUavatarByUid(int Uid) {
        String uavatar = "avatar.jpg";
        User user = userMapper.queryUserById(Uid);
        if (user!=null){
            uavatar = user.getUavatar();
        }
        return uavatar;
    }
}
