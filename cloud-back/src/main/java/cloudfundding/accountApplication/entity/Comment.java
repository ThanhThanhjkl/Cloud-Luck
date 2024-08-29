package cloudfundding.accountApplication.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "comments")
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "contents")
    private String contents;

    @Column(name = "account_id")
    private int accountId;

    @Column (name = "product_id")
    private int productId;

    @Column (name = "date")
    private String date;
}
