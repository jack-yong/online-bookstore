package com.cyong.pojo;

public class BookDetail {
    private int Bid;
    private String Bimage;
    private float Bprice;
    private String Bname;
    private int Sid;
    private String Sname;
    private String Sicon;
    private int Bsalednum;
    private int Bcommentnum;
    private String Bauthor;
    private String Bpublisher;
    private String Bpublishdate;
    private float Boriprice;
    private float Stransprice;
    private String Sactivity;
    private int Bversion;
    private int Bpagenum;
    private int Bwordnum;
    private String Bprintdate;
    private int Bsize;
    private String Bpaperstyle;
    private int Bprintnum;
    private String Bpackage;
    private String Bisbn;
    private String Bcontentsummary;
    private String Bauthorsummary;
    private String Bmediacomment;
    private String Btastecontent;
    private int Bstocknum;
    private String Buploaddate;
    private String Btype;

    public BookDetail() {
    }

    public BookDetail(int bid, String bimage, float bprice, String bname, int sid, String sname, String sicon, int bsalednum, int bcommentnum, String bauthor, String bpublisher, String bpublishdate, float boriprice, float stransprice, String sactivity,int bversion, int bpagenum, int bwordnum, String bprintdate, int bsize, String bpaperstyle, int bprintnum, String bpackage, String bisbn, String bcontentsummary, String bauthorsummary, String bmediacomment, String btastecontent, int bstocknum, String buploaddate, String btype) {
        Bid = bid;
        Bimage = "images/books/"+bimage;
        Bprice = bprice;
        Bname = bname;
        Sid = sid;
        Sname = sname;
        Sicon = "images/shopicons/"+sicon;
        Bsalednum = bsalednum;
        Bcommentnum = bcommentnum;
        Bauthor = bauthor;
        Bpublisher = bpublisher;
        Bpublishdate = bpublishdate;
        Boriprice = boriprice;
        Stransprice = stransprice;
        Sactivity = sactivity;
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
        Btype = btype;
    }

    public int getBid() {
        return Bid;
    }

    public void setBid(int bid) {
        Bid = bid;
    }

    public String getBimage() {
        return "images/books/"+Bimage;
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

    public String getSicon() {
        return "images/shopicons/"+Sicon;
    }

    public void setSicon(String sicon) {
        Sicon = sicon;
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

    public String getBauthor() {
        return Bauthor;
    }

    public void setBauthor(String bauthor) {
        Bauthor = bauthor;
    }

    public String getBpublisher() {
        return Bpublisher;
    }

    public void setBpublisher(String bpublisher) {
        Bpublisher = bpublisher;
    }

    public String getBpublishdate() {
        return Bpublishdate;
    }

    public void setBpublishdate(String bpublishdate) {
        Bpublishdate = bpublishdate;
    }

    public float getBoriprice() {
        return Boriprice;
    }

    public void setBoriprice(float boriprice) {
        Boriprice = boriprice;
    }

    public float getStransprice() {
        return Stransprice;
    }

    public void setStransprice(float stransprice) {
        Stransprice = stransprice;
    }

    public String getSactivity() {
        return Sactivity;
    }

    public void setSactivity(String sactivity) {
        Sactivity = sactivity;
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

    public String getBprintdate() {
        return Bprintdate;
    }

    public void setBprintdate(String bprintdate) {
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

    public String getBuploaddate() {
        return Buploaddate;
    }

    public void setBuploaddate(String buploaddate) {
        Buploaddate = buploaddate;
    }

    public String getBtype() {
        return Btype;
    }

    public void setBtype(String btype) {
        Btype = btype;
    }

    @Override
    public String toString() {
        return "BookDetail{" +
                "Bid=" + Bid +
                ", Bimage='" + Bimage + '\'' +
                ", Bprice=" + Bprice +
                ", Bname='" + Bname + '\'' +
                ", Sid=" + Sid +
                ", Sname='" + Sname + '\'' +
                ", Sicon='" + Sicon + '\'' +
                ", Bsalednum=" + Bsalednum +
                ", Bcommentnum=" + Bcommentnum +
                ", Bauthor='" + Bauthor + '\'' +
                ", Bpublisher='" + Bpublisher + '\'' +
                ", Bpublishdate='" + Bpublishdate + '\'' +
                ", Boriprice=" + Boriprice +
                ", Stransprice=" + Stransprice +
                ", Sactivity='" + Sactivity + '\'' +
                ", Bversion=" + Bversion +
                ", Bpagenum=" + Bpagenum +
                ", Bwordnum=" + Bwordnum +
                ", Bprintdate='" + Bprintdate + '\'' +
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
                ", Buploaddate='" + Buploaddate + '\'' +
                ", Btype='" + Btype + '\'' +
                '}';
    }
}
