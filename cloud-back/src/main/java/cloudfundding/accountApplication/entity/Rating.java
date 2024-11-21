package cloudfundding.accountApplication.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "rating")
@Data
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "product_id")
    private int productId;

    @Column(name = "account_id")
    private int accountId;

    @Column(name = "contents")
    private String contents;

    @Column(name = "image")
    private String image;
}
