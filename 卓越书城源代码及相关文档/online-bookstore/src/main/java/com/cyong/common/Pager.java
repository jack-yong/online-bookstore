package com.cyong.common;

public class Pager {
    private int pageSize;//每页显示条数

    private int currentPage;//当前页数

    private int totolResults;//返回数据总条数

    public Pager() {
    }

    public Pager(int pageSize, int currentPage, int totolResults) {
        this.pageSize = pageSize;
        this.currentPage = currentPage;
        this.totolResults = totolResults;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getTotalPages(){
        return (int)Math.ceil(totolResults / (double) pageSize);
    }

    public int getStartResults(){
        return (currentPage - 1) * pageSize;
    }

    public int getTotolResults() {
        return totolResults;
    }

    public void setTotolResults(int totolResults) {
        this.totolResults = totolResults;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public boolean hasPrevPages(){
        return currentPage > 1;
    }

    public boolean hasNextPages(){
        return currentPage < this.getTotalPages();
    }

    @Override
    public String toString() {
        return "Pager{" +
                "pageSize=" + pageSize +
                ", currentPage=" + currentPage +
                ", totolResults=" + totolResults +
                '}';
    }
}
