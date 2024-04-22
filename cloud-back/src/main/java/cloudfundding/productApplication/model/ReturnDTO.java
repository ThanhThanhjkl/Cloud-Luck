package cloudfundding.productApplication.model;

import lombok.Data;

@Data
public class ReturnDTO {
    private int id;

    private int productId;

    private int cost;

    private String name;

    private String title;

    private String descriptions;

    private String image;

}
