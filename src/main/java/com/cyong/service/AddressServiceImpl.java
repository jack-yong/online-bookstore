package com.cyong.service;

import com.cyong.mapper.AddressMapper;
import com.cyong.pojo.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    AddressMapper addressMapper;

    @Override
    public Address getAddressByAid(int aid) {
        return addressMapper.getAddressByAid(aid);
    }

    @Override
    public ArrayList<Address> getAddressByUid(int uid) {
        return addressMapper.getAddressByUid(uid);
    }

    @Override
    public void addAddress(Address address) {
        addressMapper.addAddress(address);
    }

    @Override
    public int modifyAddress(Address addressBean) {
        return 0;
    }

    @Override
    public int getAddressCount(int uid) {
        return 0;
    }

    @Override
    public String getMaxAidByUid(int uid) {
        return null;
    }

    @Override
    public String deleteAddress(int uid,int aid) {
        addressMapper.deleteAddress(aid);
        return addressMapper.getMinAidByUid(uid);
    }

    //删除aid地址
    public void deleteAddress(int aid){
        addressMapper.deleteAddress(aid);
    }


    //获得uid地址中第一个地址的id
    public String getMinAidByUid(int uid){
        return addressMapper.getMinAidByUid(uid);
    }

    @Override
    public void checkAddress(int uid, int aid) {
        addressMapper.updateUnCheck(uid);
        addressMapper.updateCheck(aid);
        return;
    }

    public void updateUnCheck(int uid){
        addressMapper.updateUnCheck(uid);
        return;
    }

    public void updateCheck(int aid){
        addressMapper.updateCheck(aid);
        return;
    }
}
