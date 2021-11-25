package com.cyong.service;

import com.cyong.pojo.Shop;

public interface ShopService {
    //添加一个uid开设的店铺,sid为自动增长
    public void addShop( String Sname);

    //通过sid查询店铺信息
    public Shop findShopBySid(int sid);

    //查找uid用户开的店铺号sid
    public int getSidByUid(int uid);

    //用shop中的sid找到并更新其信息
    public void updateShop(Shop shop);

    public String getSiconBySid(int sid);

}
