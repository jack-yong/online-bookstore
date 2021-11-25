package com.cyong.pojo;

public class BookComment {
    private String Uavatar;
    private String Unickname;
    private String Tcomment;
    private String Tcommenttime;

    public BookComment() {
    }

    public BookComment(String uavatar, String unickname, String tcomment, String tcommenttime) {
        Uavatar = uavatar;
        Unickname = unickname;
        Tcomment = tcomment;
        Tcommenttime = tcommenttime;
    }

    public String getUavatar() {
        return Uavatar;
    }

    public void setUavatar(String uavatar) {
        Uavatar = uavatar;
    }

    public String getUnickname() {
        return Unickname;
    }

    public void setUnickname(String unickname) {
        Unickname = unickname;
    }

    public String getTcomment() {
        return Tcomment;
    }

    public void setTcomment(String tcomment) {
        Tcomment = tcomment;
    }

    public String getTcommenttime() {
        return Tcommenttime;
    }

    public void setTcommenttime(String tcommenttime) {
        Tcommenttime = tcommenttime;
    }

    @Override
    public String toString() {
        return "BookComment{" +
                "Uavatar='" + Uavatar + '\'' +
                ", Unickname='" + Unickname + '\'' +
                ", Tcomment='" + Tcomment + '\'' +
                ", Tcommenttime='" + Tcommenttime + '\'' +
                '}';
    }
}
