package cloudfundding.productApplication.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class Products {
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
}
