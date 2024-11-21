package cloudfundding.accountApplication.model;

import lombok.Data;

@Data
public class RatingDTO {
    private Long id;

    private Long productId;

    private Long accountId;

    private String contents;

    private String image;
}
