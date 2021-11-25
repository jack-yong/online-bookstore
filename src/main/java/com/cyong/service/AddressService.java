package com.cyong.service;

import com.cyong.pojo.Address;

import java.util.ArrayList;

public interface AddressService {
    public Address getAddressByAid(int aid);

    //通过用户名uid获取这个用户的所有地址
    public ArrayList<Address> getAddressByUid(int uid);

    //添加新地址
    public void addAddress(Address address);

    //修改地址，并返回原有地址目前处在地址栏的位置
    public int modifyAddress(Address addressBean);

    //获得username当前地址数量，若<8返回success,若>=8返回address_overflow
    public int getAddressCount(int uid);

    //获得username地址中最后一个地址的id
    public String getMaxAidByUid(int uid);

    //删除aid地址，同时获得第一个地址
    public String deleteAddress(int uid,int aid);

    //删除aid地址
    public void deleteAddress(int aid);


    //获得uid地址中第一个地址的id
    public String getMinAidByUid(int uid);

    //选中aid地址，但先把之前选中的置为不选中
    public void checkAddress(int uid,int aid);

    public void updateUnCheck(int uid);

    public void updateCheck(int aid);
}
