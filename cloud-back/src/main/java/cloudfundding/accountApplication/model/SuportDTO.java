package cloudfundding.accountApplication.model;

import lombok.Data;

@Data
public class SuportDTO {
    private int id;
    private String suportContent;
    private int accountId;
    private int productId;
    private String date;
}
