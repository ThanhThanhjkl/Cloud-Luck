package cloudfundding.accountApplication.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "account")
@Data
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;

    private String password;
    @Column(name = "email", unique = true)
    private String email;

    @Column (name = "role")
    private String role;

    @Column (name = "avatar", columnDefinition = "LONGTEXT")
    private String avatar;

    @Column (name = "url")
    private String url;

    @Column (name = "about", columnDefinition = "LONGTEXT")
    private String about;
}
