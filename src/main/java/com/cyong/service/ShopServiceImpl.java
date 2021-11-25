package com.cyong.service;

import com.cyong.mapper.ShopMapper;
import com.cyong.pojo.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    ShopMapper shopMapper;
    @Override
    public void addShop(String Sname) {
        shopMapper.addShop(Sname);
    }

    @Override
    public Shop findShopBySid(int sid) {
        return shopMapper.findShopBySid(sid);
    }

    @Override
    public int getSidByUid(int uid) {
        return shopMapper.getSidByUid(uid);
    }

    @Override
    public void updateShop(Shop shop) {
        shopMapper.updateShop(shop);
    }

    @Override
    public String getSiconBySid(int sid) {
        return shopMapper.getSiconBySid(sid);
    }
}
