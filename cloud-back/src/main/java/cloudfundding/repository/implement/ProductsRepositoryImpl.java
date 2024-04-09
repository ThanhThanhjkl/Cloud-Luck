package cloudfundding.repository.implement;

import cloudfundding.repository.ProductsRepository;
import cloudfundding.model.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class ProductsRepositoryImpl implements ProductsRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<Products> getAllProducts() {
        String sql = "SELECT * FROM PRODUCTS";
        return jdbcTemplate.query(sql, new RowMapper<Products>() {
            @Override
            public Products mapRow(ResultSet rs, int index) throws SQLException {
                Products products = new Products();
                products.setId(rs.getInt("id"));
                products.setName(rs.getString("name"));
                products.setDescriptions(rs.getString("descriptions"));
                products.setDate(rs.getDate("date"));
                products.setCost(rs.getInt("cost"));
                products.setSale_cost(rs.getInt("sale-cost"));
                products.setSold(rs.getInt("sold"));
                String imagesString = rs.getString("images");
                if (imagesString != null) {
                    List<String> imagesList = Arrays.asList(imagesString.split(","));
                    products.setImages(imagesList);
                } else {
                    products.setImages(new ArrayList<>());
                }

                return products;
            }
        });
    }

    @Override
    public void addProduct(Products products) {
        String sql = "INSERT INTO PRODUCTS(name, descriptions, date, cost, sale-cost, sold, images) VALUES('" + products.getName() + "','" + products.getDescriptions() + "'," +
                products.getDate() + ", " + products.getCost() + "," + products.getSale_cost() + "," + products.getSold() + "," + products.getImages() + ")";
        jdbcTemplate.execute(sql);
    }
}
