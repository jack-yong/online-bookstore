package com.cyong.pojo;

import java.util.Date;

public class Book {
    private int Bid;    //书籍号
    private int Sid;    //店铺号
    private String Bimage; //图片
    private float  Bprice;  //促销价
    private String Bname; //书名
    private String Btype; //类别
    private String Bauthor; //作者
    private String Bpublisherl; //出版社
    private Date Bpublishdate; //出版日期
    private int  Bsalednum;     //成交量
    private int Bcommentnum;    //评价量
    private float Boriprice;    //定价
    private int Bversion;       //版次
    private int Bpagenum;       //页数
    private int Bwordnum;       //字数
    private Date Bprintdate;    //印刷日期
    private int Bsize;      //开本
    private String Bpaperstyle; //纸张
    private int Bprintnum;  //印次
    private String Bpackage;    //包装
    private String Bisbn;       //ISBN 号
    private String Bcontentsummary; //内容简介
    private String Bauthorsummary;  //作者简介
    private String Bmediacomment;   //媒体评论
    private String Btastecontent;    //试读章节
    private int Bstocknum;      //库存量
    private Date Buploaddate;   //上传时间

    public Book() {
    }

    public Book(int sid, String bimage, float bprice, String bname, String btype, String bauthor, String bpublisherl, Date bpublishdate, int bsalednum, int bcommentnum, float boriprice, int bversion, int bpagenum, int bwordnum, Date bprintdate, int bsize, String bpaperstyle, int bprintnum, String bpackage, String bisbn, String bcontentsummary, String bauthorsummary, String bmediacomment, String btastecontent, int bstocknum, Date buploaddate) {
        Sid = sid;
        Bimage = bimage;
        Bprice = bprice;
        Bname = bname;
        Btype = btype;
        Bauthor = bauthor;
        Bpublisherl = bpublisherl;
        Bpublishdate = bpublishdate;
        Bsalednum = bsalednum;
        Bcommentnum = bcommentnum;
        Boriprice = boriprice;
        Bversion = bversion;
        Bpagenum = bpagenum;
        Bwordnum = bwordnum;
        Bprintdate = bprintdate;
        Bsize = bsize;
        Bpaperstyle = bpaperstyle;
        Bprintnum = bprintnum;
        Bpackage = bpackage;
        Bisbn = bisbn;
        Bcontentsummary = bcontentsummary;
        Bauthorsummary = bauthorsummary;
        Bmediacomment = bmediacomment;
        Btastecontent = btastecontent;
        Bstocknum = bstocknum;
        Buploaddate = buploaddate;
    }

    public int getBid() {
        return Bid;
    }

    public void setBid(int bid) {
        Bid = bid;
    }

    public int getSid() {
        return Sid;
    }

    public void setSid(int sid) {
        Sid = sid;
    }

    public String getBimage() {
        return Bimage;
    }

    public void setBimage(String bimage) {
        Bimage = bimage;
    }

    public float getBprice() {
        return Bprice;
    }

    public void setBprice(float bprice) {
        Bprice = bprice;
    }

    public String getBname() {
        return Bname;
    }

    public void setBname(String bname) {
        Bname = bname;
    }

    public String getBtype() {
        return Btype;
    }

    public void setBtype(String btype) {
        Btype = btype;
    }

    public String getBauthor() {
        return Bauthor;
    }

    public void setBauthor(String bauthor) {
        Bauthor = bauthor;
    }

    public String getBpublisherl() {
        return Bpublisherl;
    }

    public void setBpublisherl(String bpublisherl) {
        Bpublisherl = bpublisherl;
    }

    public Date getBpublishdate() {
        return Bpublishdate;
    }

    public void setBpublishdate(Date bpublishdate) {
        Bpublishdate = bpublishdate;
    }

    public int getBsalednum() {
        return Bsalednum;
    }

    public void setBsalednum(int bsalednum) {
        Bsalednum = bsalednum;
    }

    public int getBcommentnum() {
        return Bcommentnum;
    }

    public void setBcommentnum(int bcommentnum) {
        Bcommentnum = bcommentnum;
    }

    public float getBoriprice() {
        return Boriprice;
    }

    public void setBoriprice(float boriprice) {
        Boriprice = boriprice;
    }

    public int getBversion() {
        return Bversion;
    }

    public void setBversion(int bversion) {
        Bversion = bversion;
    }

    public int getBpagenum() {
        return Bpagenum;
    }

    public void setBpagenum(int bpagenum) {
        Bpagenum = bpagenum;
    }

    public int getBwordnum() {
        return Bwordnum;
    }

    public void setBwordnum(int bwordnum) {
        Bwordnum = bwordnum;
    }

    public Date getBprintdate() {
        return Bprintdate;
    }

    public void setBprintdate(Date bprintdate) {
        Bprintdate = bprintdate;
    }

    public int getBsize() {
        return Bsize;
    }

    public void setBsize(int bsize) {
        Bsize = bsize;
    }

    public String getBpaperstyle() {
        return Bpaperstyle;
    }

    public void setBpaperstyle(String bpaperstyle) {
        Bpaperstyle = bpaperstyle;
    }

    public int getBprintnum() {
        return Bprintnum;
    }

    public void setBprintnum(int bprintnum) {
        Bprintnum = bprintnum;
    }

    public String getBpackage() {
        return Bpackage;
    }

    public void setBpackage(String bpackage) {
        Bpackage = bpackage;
    }

    public String getBisbn() {
        return Bisbn;
    }

    public void setBisbn(String bisbn) {
        Bisbn = bisbn;
    }

    public String getBcontentsummary() {
        return Bcontentsummary;
    }

    public void setBcontentsummary(String bcontentsummary) {
        Bcontentsummary = bcontentsummary;
    }

    public String getBauthorsummary() {
        return Bauthorsummary;
    }

    public void setBauthorsummary(String bauthorsummary) {
        Bauthorsummary = bauthorsummary;
    }

    public String getBmediacomment() {
        return Bmediacomment;
    }

    public void setBmediacomment(String bmediacomment) {
        Bmediacomment = bmediacomment;
    }

    public String getBtastecontent() {
        return Btastecontent;
    }

    public void setBtastecontent(String btastecontent) {
        Btastecontent = btastecontent;
    }

    public int getBstocknum() {
        return Bstocknum;
    }

    public void setBstocknum(int bstocknum) {
        Bstocknum = bstocknum;
    }

    public Date getBuploaddate() {
        return Buploaddate;
    }

    public void setBuploaddate(Date buploaddate) {
        Buploaddate = buploaddate;
    }

    @Override
    public String toString() {
        return "Book{" +
                "Bid=" + Bid +
                ", Sid=" + Sid +
                ", Bimage='" + Bimage + '\'' +
                ", Bprice=" + Bprice +
                ", Bname='" + Bname + '\'' +
                ", Btype='" + Btype + '\'' +
                ", Bauthor='" + Bauthor + '\'' +
                ", Bpublisherl='" + Bpublisherl + '\'' +
                ", Bpublishdate=" + Bpublishdate +
                ", Bsalednum=" + Bsalednum +
                ", Bcommentnum=" + Bcommentnum +
                ", Boriprice=" + Boriprice +
                ", Bversion=" + Bversion +
                ", Bpagenum=" + Bpagenum +
                ", Bwordnum=" + Bwordnum +
                ", Bprintdate=" + Bprintdate +
                ", Bsize=" + Bsize +
                ", Bpaperstyle='" + Bpaperstyle + '\'' +
                ", Bprintnum=" + Bprintnum +
                ", Bpackage='" + Bpackage + '\'' +
                ", Bisbn='" + Bisbn + '\'' +
                ", Bcontentsummary='" + Bcontentsummary + '\'' +
                ", Bauthorsummary='" + Bauthorsummary + '\'' +
                ", Bmediacomment='" + Bmediacomment + '\'' +
                ", Btastecontent='" + Btastecontent + '\'' +
                ", Bstocknum=" + Bstocknum +
                ", Buploaddate=" + Buploaddate +
                '}';
    }
}
