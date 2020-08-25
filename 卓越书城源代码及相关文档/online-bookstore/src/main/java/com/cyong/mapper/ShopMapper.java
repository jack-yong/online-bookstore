package com.cyong.mapper;

import com.cyong.pojo.Shop;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ShopMapper {
    //添加一个uid开设的店铺,sid为自动增长
    public void addShop(@Param("Sname") String Sname);

    //通过sid查询店铺信息
    public Shop findShopBySid(@Param("sid")int sid);

    //查找uid用户开的店铺号sid
    public int getSidByUid(@Param("uid")int uid);

    //用shop中的sid找到并更新其信息
    public void updateShop(Shop shop);

    public String getSiconBySid(@Param("sid")int sid);


}
