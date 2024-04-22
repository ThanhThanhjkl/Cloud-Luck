package cloudfundding.productApplication.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ProductsDTO {
    private int id;
    private String name;
    private String descriptions;
    private Date date;
    private int cost;
    private int sale_cost;
    private int sold;
    private List<String> images;
    private String title;
    private int account_id;
    private String main_image;
    private String methods;
    private String video_url;
}
