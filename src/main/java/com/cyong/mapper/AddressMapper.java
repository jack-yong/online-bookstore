package com.cyong.mapper;

import com.cyong.pojo.Address;
import com.cyong.pojo.Orderform;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

//表示这个是一个mybatis的类
@Mapper
@Repository
public interface AddressMapper {

    public Address getAddressByAid(@Param("aid") int aid);

    //通过用户名uid获取这个用户的所有地址
    public ArrayList<Address> getAddressByUid(@Param("uid")int uid);

    //添加新地址
    @Options(useGeneratedKeys = true, keyProperty = "Aid", keyColumn = "Aid")
    public void addAddress(Address address);

    //修改地址，并返回原有地址目前处在地址栏的位置
    public int modifyAddress(Address addressBean);

    //获得username当前地址数量，若<8返回success,若>=8返回address_overflow
    public int getAddressCount(@Param("uid")int uid);

    //获得username地址中最后一个地址的id
    public String getMaxAidByUid(@Param("uid")int uid);

    //删除aid地址
    public void deleteAddress(@Param("aid")int aid);

    //获得uid地址中第一个地址的id
    public String getMinAidByUid(@Param("uid")int uid);


    public void updateUnCheck(@Param("uid")int uid);

    public void updateCheck(@Param("aid")int aid);

}
