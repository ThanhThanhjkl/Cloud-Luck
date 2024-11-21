package cloudfundding.productApplication.repository.implement;

import cloudfundding.productApplication.model.ReturnDTO;
import cloudfundding.productApplication.repository.ProductsRepository;
import cloudfundding.productApplication.model.ProductsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public List<ProductsDTO> getAllProducts() {
        String sql = "SELECT * FROM PRODUCTS";
        return jdbcTemplate.query(sql, new RowMapper<ProductsDTO>() {
            @Override
            public ProductsDTO mapRow(ResultSet rs, int index) throws SQLException {
                ProductsDTO products = new ProductsDTO();
                products.setId(rs.getInt("id"));
                products.setName(rs.getString("name"));
                products.setDescriptions(rs.getString("descriptions"));
                products.setDate(rs.getDate("date"));
                products.setCost(rs.getInt("cost"));
                products.setSale_cost(rs.getInt("sale-cost"));
                products.setTitle(rs.getString("title"));
                String imagesString = rs.getString("images");
                products.setAccount_id(rs.getInt("account-id"));
                products.setMain_image(rs.getString("main-image"));
                products.setMethods(rs.getString("methods"));
                products.setVideo_url(rs.getString("video-url"));

                // Count the number of rows in the funded table with product_id = id
                String fundedSql = "SELECT COUNT(*) FROM FUNDED WHERE account_id = ?";
                int sold = jdbcTemplate.queryForObject(fundedSql, Integer.class, rs.getInt("account-id"));
                products.setSold(sold);

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
    public List<ProductsDTO> getProductsByAccountId(Long accountId) {
        String sql = "SELECT * FROM PRODUCTS WHERE `account-id` = ?";
        return jdbcTemplate.query(sql, new Object[]{accountId}, new RowMapper<ProductsDTO>() {
            @Override
            public ProductsDTO mapRow(ResultSet rs, int index) throws SQLException {
                ProductsDTO products = new ProductsDTO();
                products.setId(rs.getInt("id"));
                products.setName(rs.getString("name"));
                products.setDescriptions(rs.getString("descriptions"));
                products.setDate(rs.getDate("date"));
                products.setCost(rs.getInt("cost"));
                products.setSale_cost(rs.getInt("sale-cost"));
                products.setTitle(rs.getString("title"));
                String imagesString = rs.getString("images");
                products.setAccount_id(rs.getInt("account-id"));
                products.setMain_image(rs.getString("main-image"));
                products.setMethods(rs.getString("methods"));
                products.setVideo_url(rs.getString("video-url"));

                // Count the number of rows in the funded table with product_id = id
                String fundedSql = "SELECT COUNT(*) FROM FUNDED WHERE account_id = ?";
                int sold = jdbcTemplate.queryForObject(fundedSql, Integer.class, rs.getInt("account-id"));
                products.setSold(sold);

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
    public ProductsDTO getProductsById(Long id) {
        String sql = "SELECT * FROM PRODUCTS WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new RowMapper<ProductsDTO>() {
            @Override
            public ProductsDTO mapRow(ResultSet rs, int index) throws SQLException {
                ProductsDTO products = new ProductsDTO();
                products.setId(rs.getInt("id"));
                products.setName(rs.getString("name"));
                products.setDescriptions(rs.getString("descriptions"));
                products.setDate(rs.getDate("date"));
                products.setCost(rs.getInt("cost"));
                products.setSale_cost(rs.getInt("sale-cost"));
                products.setSold(rs.getInt("sold"));
                products.setTitle(rs.getString("title"));
                String imagesString = rs.getString("images");
                products.setAccount_id(rs.getInt("account-id"));
                products.setMain_image(rs.getString("main-image"));
                products.setMethods(rs.getString("methods"));
                products.setVideo_url(rs.getString("video-url"));

                // Count the number of rows in the funded table with product_id = id
                String fundedSql = "SELECT COUNT(*) FROM FUNDED WHERE account_id = ?";
                int sold = jdbcTemplate.queryForObject(fundedSql, Integer.class, rs.getInt("account-id"));
                products.setSold(sold);
                
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
    public ResponseEntity<String> updateProduct(ProductsDTO products) {
        String sql = "UPDATE PRODUCTS SET name = ?, descriptions = ?, date = ?, cost = ?, `sale-cost` = ?, sold = ?, title = ?, images = ?, `account-id` = ?, `main-image` = ?, methods = ?, `video-url` = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, products.getName(), products.getDescriptions(), products.getDate(), products.getCost(), products.getSale_cost(), products.getSold(), products.getTitle(), String.join(",", products.getImages()), products.getAccount_id(), products.getMain_image(), products.getMethods(), products.getVideo_url(), products.getId());
        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.OK).body("Product updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to update product");
        }
    }

    @Override
    public ResponseEntity<String> addProduct(ProductsDTO products) {
        String sql = "INSERT INTO PRODUCTS (name, descriptions, date, cost, `sale-cost`, sold, title, images, `account-id`, `main-image`, methods, `video-url`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql,
                products.getName(),
                products.getDescriptions(),
                products.getDate(),
                products.getCost(),
                products.getSale_cost(),
                products.getSold(),
                products.getTitle(),
                String.join(",", products.getImages()),
                products.getAccount_id(),
                products.getMain_image(),
                products.getMethods(),
                products.getVideo_url()
        );

        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.OK).body("Product added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add product");
        }
    }

    @Override
        public ResponseEntity<String> deleteProduct(Long id) {
        String sql = "DELETE FROM PRODUCTS WHERE id = ?";
        String sql2 = "DELETE FROM COMMENTS WHERE product_id = ?";
        String sql3 = "DELETE FROM RETURNS WHERE `product-id` = ?";
        String sql4 = "DELETE FROM SUPORT WHERE product_id = ?";

        try {
            jdbcTemplate.update(sql, id);
            jdbcTemplate.update(sql2, id);
            jdbcTemplate.update(sql3, id);
            jdbcTemplate.update(sql4, id);
            return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete product");
        }
    }
}
