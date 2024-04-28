package cloudfundding.accountApplication.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;

    @Column(name = "post_code")
    private String postCode;

    @Column(name = "prefectures")
    private String prefectures;

    @Column(name = "district")
    private String district;

    @Column(name = "street")
    private String street;

    @Column(name = "phone")
    private String phone;

    @Column(name = "account_id")
    private int accountId;

    @Column(name = "default_select")
    private String defaultSelect;

}
