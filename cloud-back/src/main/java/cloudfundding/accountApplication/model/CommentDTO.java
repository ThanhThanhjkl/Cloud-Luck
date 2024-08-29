package cloudfundding.accountApplication.model;

import lombok.Data;

@Data
public class CommentDTO {
    private int id;
    private String contents;
    private int accountId;
    private int productId;
    private String date;
}
