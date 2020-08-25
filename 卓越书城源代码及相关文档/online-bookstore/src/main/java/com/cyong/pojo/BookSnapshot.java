package com.cyong.pojo;

public class BookSnapshot {
    private int Bid ;
    private String Bimage ;
    private float Bprice;
    private String Bname ;
    private String Sname;
    private int Bsalednum ;
    private int Bcommentnum;

    public BookSnapshot() {
    }

    public BookSnapshot(int bid, String bimage, float bprice, String bname, String sname, int bsalednum, int bcommentnum) {
        Bid = bid;
        Bimage = "images/books/"+bimage;
        Bprice = bprice;
        Bname = bname;
        Sname = sname;
        Bsalednum = bsalednum;
        Bcommentnum = bcommentnum;
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

    public String getSname() {
        return Sname;
    }

    public void setSname(String sname) {
        Sname = sname;
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

    @Override
    public String toString() {
        return "BookSnapshot{" +
                "Bid=" + Bid +
                ", Bimage='" + Bimage + '\'' +
                ", Bprice=" + Bprice +
                ", Bname='" + Bname + '\'' +
                ", Sname='" + Sname + '\'' +
                ", Bsalednum=" + Bsalednum +
                ", Bcommentnum=" + Bcommentnum +
                '}';
    }
}
