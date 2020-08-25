package com.cyong.mapper;

import com.cyong.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//表示这个是一个mybatis的类
@Mapper
@Repository
public interface UserMapper {
    List<User> queryUserList();

    User queryUserById(@Param("Uid") int Uid);

    int addUser(User user);

    int updateUser(User user);

    int deleteUser(@Param("Uid") int Uid);

    User queryUserByUnickname(@Param("Unickname") String Unickname);
}
