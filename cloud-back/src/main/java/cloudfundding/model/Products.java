package cloudfundding.model;

import java.util.Date;
import java.util.List;

public class Products {
    private int id;
    private String name;
    private String descriptions;
    private Date date;
    private int cost;
    private int sale_cost;
    private int sold;
    private List<String> images;

    public Products() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getSale_cost() {
        return sale_cost;
    }

    public void setSale_cost(int sale_cost) {
        this.sale_cost = sale_cost;
    }

    public int getSold() {
        return sold;
    }

    public void setSold(int sold) {
        this.sold = sold;
    }

    public List<String> getImages() {
        return images;
    }
    public void setImages(List<String> images) {
        this.images = images;
    }
}
