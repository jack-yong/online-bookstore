package com.cyong.mapper;

import com.cyong.pojo.BookInCart;
import com.cyong.pojo.Orderform;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface OrderformMapper {

    //通过Oid获取订单对象
    public Orderform findOrderFormByOid(@Param("oid")int oid);

    //通过Uid获取这个用户的订单记录总数
    public int getOrderPageCountByUid(@Param("uid")int uid);

    //删除订单号为oid的订单
    public void deleteOrder(@Param("oid")int oid);

    //添加新订单记录
    @Options(useGeneratedKeys = true, keyProperty = "Oid", keyColumn = "Oid")
    public void addOrder(Orderform orderBean);

    public ArrayList<Orderform> findOrderFormsByUidByPage(@Param("uid")int uid);

    public ArrayList<BookInCart> findBookByOid(@Param("Oid")int Oid);

    public ArrayList<Orderform> findBookBySid(@Param("Sid")int Sid);
}
