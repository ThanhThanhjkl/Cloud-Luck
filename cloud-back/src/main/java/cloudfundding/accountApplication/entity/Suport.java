package cloudfundding.accountApplication.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "suport")
@Data
public class Suport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "suport_content")
    private String suportContent;

    @Column(name = "account_id")
    private int accountId;

    @Column (name = "product_id")
    private int productId;

    @Column (name = "date")
    private String date;
}
