package com.cyong.pojo;

import com.cyong.util.Define;

import java.util.ArrayList;
import java.util.Date;

public class Orderform {
    private int Oid; //订单号
    private int Uid;    //用户名
    private int Sid;    //店铺号
    private int Aid;    //地址号
    private float Ototalbooksprice; //小计价格
    private float Ototaltransprice; //运费价格
    private float Stransprice; //单位运费
    private String Sicon;
    private String Sname;
    private Date  Osubmittime;  //提交时间
    private Date Opaytime;  //支付时间
    private Date Oreceivetime;  //收货时间
    private Date Ofinishedtime;     //完成时间
    private int Ostatus;    //订单状态
    private ArrayList<BookInCart> bookInCartBeanList = new ArrayList<BookInCart>(); ;

    public Orderform() {
    }

    public Orderform(int oid, int uid, int sid, int aid, float ototalbooksprice, float ototaltransprice, float stransprice, String sicon, String sname, Date osubmittime, Date opaytime, Date oreceivetime, Date ofinishedtime, int ostatus, ArrayList<BookInCart> bookInCartBeanList) {
        Oid = oid;
        Uid = uid;
        Sid = sid;
        Aid = aid;
        Ototalbooksprice = ototalbooksprice;
        Ototaltransprice = ototaltransprice;
        Stransprice = stransprice;
        Sicon = "images/shopicons/"+sicon ;
        Sname = sname;
        Osubmittime = osubmittime;
        Opaytime = opaytime;
        Oreceivetime = oreceivetime;
        Ofinishedtime = ofinishedtime;
        Ostatus = ostatus;
        this.bookInCartBeanList = bookInCartBeanList;
    }

    public Orderform(int uid, int sid, int aid, float ototalbooksprice, float ototaltransprice,Date osubmittime,int ostatus){
        Uid = uid;
        Sid = sid;
        Aid = aid;
        Ototalbooksprice = ototalbooksprice;
        Ototaltransprice = ototaltransprice;
        Osubmittime = osubmittime;
        Ostatus = ostatus;

    }
    public int getOid() {
        return Oid;
    }

    public void setOid(int oid) {
        Oid = oid;
    }

    public int getUid() {
        return Uid;
    }

    public void setUid(int uid) {
        Uid = uid;
    }

    public int getSid() {
        return Sid;
    }

    public void setSid(int sid) {
        Sid = sid;
    }

    public int getAid() {
        return Aid;
    }

    public void setAid(int aid) {
        Aid = aid;
    }

    public float getOtotalbooksprice() {
        return Ototalbooksprice;
    }

    public void setOtotalbooksprice(float ototalbooksprice) {
        Ototalbooksprice = ototalbooksprice;
    }

    public float getOtotaltransprice() {
        return Ototaltransprice;
    }

    public void setOtotaltransprice(float ototaltransprice) {
        Ototaltransprice = ototaltransprice;
    }

    public Date getOsubmittime() {
        return Osubmittime;
    }

    public void setOsubmittime(Date osubmittime) {
        Osubmittime = osubmittime;
    }

    public Date getOpaytime() {
        return Opaytime;
    }

    public void setOpaytime(Date opaytime) {
        Opaytime = opaytime;
    }

    public Date getOreceivetime() {
        return Oreceivetime;
    }

    public void setOreceivetime(Date oreceivetime) {
        Oreceivetime = oreceivetime;
    }

    public Date getOfinishedtime() {
        return Ofinishedtime;
    }

    public void setOfinishedtime(Date ofinishedtime) {
        Ofinishedtime = ofinishedtime;
    }

    public int getOstatus() {
        return Ostatus;
    }

    public void setOstatus(int ostatus) {
        Ostatus = ostatus;
    }

    public float getStransprice() {
        return Stransprice;
    }

    public void setStransprice(float stransprice) {
        Stransprice = stransprice;
    }

    public String getSicon() {
        return "images/shopicons/"+Sicon;
    }

    public void setSicon(String sicon) {
        Sicon = sicon;
    }

    public String getSname() {
        return Sname;
    }

    public void setSname(String sname) {
        Sname = sname;
    }

    public ArrayList<BookInCart> getBookInCartBeanList() {
        return bookInCartBeanList;
    }

    public void setBookInCartBeanList(ArrayList<BookInCart> bookInCartBeanList) {
        this.bookInCartBeanList = bookInCartBeanList;
    }

    //计算订单总价
    public void calOrderPrice(){

        Ototalbooksprice=0.0f;
        for(int i=0;i<bookInCartBeanList.size();i++)
        {
            BookInCart bookInCartBean=bookInCartBeanList.get(i);
            Ototalbooksprice += bookInCartBean.getBprice() * bookInCartBean.getTboughtnum();
        }
    }

    //计算运费（每3本加一次运费）
    public void calOrderTotalTransPrice(){

        //计算订单中书总数
        int bookNum=0;
        for(int i=0;i<bookInCartBeanList.size();i++)
        {
            BookInCart bookInCartBean = bookInCartBeanList.get(i);
            bookNum += bookInCartBean.getTboughtnum();
        }

        int circle=bookNum / Define.TRANS_UNIT_NUM;
        if(bookNum % Define.TRANS_UNIT_NUM != 0) //多余
            circle++;

        Ototaltransprice = circle * Stransprice;
    }

    @Override
    public String toString() {
        return "Orderform{" +
                "Oid=" + Oid +
                ", Uid=" + Uid +
                ", Sid=" + Sid +
                ", Aid=" + Aid +
                ", Ototalbooksprice=" + Ototalbooksprice +
                ", Ototaltransprice=" + Ototaltransprice +
                ", Stransprice=" + Stransprice +
                ", Sicon='" + Sicon + '\'' +
                ", Sname='" + Sname + '\'' +
                ", Osubmittime=" + Osubmittime +
                ", Opaytime=" + Opaytime +
                ", Oreceivetime=" + Oreceivetime +
                ", Ofinishedtime=" + Ofinishedtime +
                ", Ostatus=" + Ostatus +
                ", bookInCartBeanList=" + bookInCartBeanList +
                '}';
    }
}
