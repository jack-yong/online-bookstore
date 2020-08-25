package com.cyong.util;

public class Define {
    public static final int bookSnapshotPageSize = 20;// 一页商品显示数目
    public static final int bookCommentPageSize =5;// 一页评价显示数目
    public static final int bookTradeRecordPageSize = 10;// 一页成交记录显示数目
    public static final int ORDER_PAGESIZE = 4;// 一页订单记录显示数目

    public static final int pageRange=5;//最多显示的页数跨度如1-5 6-11
    public static final int maxAddressNum=8;//每个用户最多8个地址

    public static final int addressUnchecked=0;//地址未选中
    public static final int addressChecked=1;//地址选中

    public static final int TRANS_UNIT_NUM=3; //运费每TRANS_UNIT_NUM本书算一次

    public static final int RAND_NUM=-1;

    //订单状态（Order）
    public static final int ORDERSTATUS_WAITPAY=1; //等待支付
    public static final int ORDERSTATUS_CONFIRMRECEIVED=2;//确认收货
    public static final int ORDERSTATUS_WAITCOMMENT=3;//等待评价
    public static final int ORDERSTATUS_FINISHED=4; //订单完成（还要等用户评价之后，才算整个交易的完成）

    //交易状态(Transaction)
    public static final int TRADESTATUS_WAITPAY=1; //等待支付
    public static final int TRADESTATUS_CONFIRMRECEIVED=2; //确认收货
    public static final int TRADESTATUS_WAITCOMMENT=3;//等待评价
    public static final int TRADESTATUS_FINISHED=4;//最终交易完成

    //令牌KEY（防止刷新、回退时所产生的重复提交）
    public static final String LOGIN_TOKEN="LOGIN_TOKEN";
    public static final String REGISTER_TOKEN="REGISTER_TOKEN";
    public static final String CART_TOKEN="CART_TOKEN";
    public static final String DETAIL_TOKEN="DETAIL_TOKEN";
    public static final String WRITEORDER_TOKEN="WRITEORDER_TOKEN";
    public static final String PAY_TOKEN="PAY_TOKEN";
    public static final String SHOPUPLOAD_TOKEN="SHOPUPLOAD_TOKEN";

    //SESSION最长时效
    public static final int SESSION_MAX_INTERVAL=900;

    //用户是否开店
    public static final int OPENED_SHOP_NO=0;
}
