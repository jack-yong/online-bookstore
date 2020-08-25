package com.cyong.pojo;

public class Shop {
    private int Sid;    //店铺号
    private String Sname;   //店铺名
    private int Uid;    //用户名
    private String Sicon;   //店铺图标
    private String Ssummary;    //店铺简介
    private String Sactivity;   //店铺活动
    private float Stransprice;  //书籍单位运费

    public Shop() {
    }

    public Shop(int sid,String sicon) {
        Sid = sid;
        Sicon = sicon;
    }

    public Shop(int sid, String sname, int uid, String sicon, String ssummary, String sactivity, float stransprice) {
        Sid = sid;
        Sname = sname;
        Uid = uid;
        Sicon = sicon;
        Ssummary = ssummary;
        Sactivity = sactivity;
        Stransprice = stransprice;
    }

    public int getSid() {
        return Sid;
    }

    public void setSid(int sid) {
        Sid = sid;
    }

    public String getSname() {
        return Sname;
    }

    public void setSname(String sname) {
        Sname = sname;
    }

    public int getUid() {
        return Uid;
    }

    public void setUid(int uid) {
        Uid = uid;
    }

    public String getSicon() {
        return Sicon;
    }

    public void setSicon(String sicon) {
        Sicon = sicon;
    }

    public String getSsummary() {
        return Ssummary;
    }

    public void setSsummary(String ssummary) {
        Ssummary = ssummary;
    }

    public String getSactivity() {
        return Sactivity;
    }

    public void setSactivity(String sactivity) {
        Sactivity = sactivity;
    }

    public float getStransprice() {
        return Stransprice;
    }

    public void setStransprice(float stransprice) {
        Stransprice = stransprice;
    }

    @Override
    public String toString() {
        return "Shop{" +
                "Sid=" + Sid +
                ", Sname='" + Sname + '\'' +
                ", Uid=" + Uid +
                ", Sicon='" + Sicon + '\'' +
                ", Ssummary='" + Ssummary + '\'' +
                ", Sactivity='" + Sactivity + '\'' +
                ", Stransprice=" + Stransprice +
                '}';
    }
}
