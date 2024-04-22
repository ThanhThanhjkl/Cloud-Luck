package cloudfundding.productApplication.repository.implement;

import cloudfundding.productApplication.model.ReturnDTO;
import cloudfundding.productApplication.repository.ReturnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ReturnRepositoryImpl implements ReturnRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<ReturnDTO> getReturnByProductId(int productId) {
        String sql = "SELECT * FROM RETURNS WHERE `product-id` = ?";
        return jdbcTemplate.query(sql, new Object[]{productId}, new RowMapper<ReturnDTO>() {
            @Override
            public ReturnDTO mapRow(ResultSet rs, int index) throws SQLException {
                ReturnDTO returnDTO = new ReturnDTO();
                returnDTO.setId(rs.getInt("id"));
                returnDTO.setName(rs.getString("name"));
                returnDTO.setDescriptions(rs.getString("descriptions"));
                returnDTO.setCost(rs.getInt("cost"));
                returnDTO.setTitle(rs.getString("title"));
                returnDTO.setProductId(rs.getInt("product-id"));
                returnDTO.setImage(rs.getString("image"));
                return returnDTO;
            }
        });
    }

    @Override
    public ReturnDTO getReturnById(int id) {
        String sql = "SELECT * FROM RETURNS WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new RowMapper<ReturnDTO>() {
            @Override
            public ReturnDTO mapRow(ResultSet rs, int index) throws SQLException {
                ReturnDTO returnDTO = new ReturnDTO();
                returnDTO.setId(rs.getInt("id"));
                returnDTO.setName(rs.getString("name"));
                returnDTO.setDescriptions(rs.getString("descriptions"));
                returnDTO.setCost(rs.getInt("cost"));
                returnDTO.setTitle(rs.getString("title"));
                returnDTO.setProductId(rs.getInt("product-id"));
                returnDTO.setImage(rs.getString("image"));
                return returnDTO;
            }
        });
    }

    @Override
    public ResponseEntity<String> updateReturn(ReturnDTO returnDTO) {
        String sql = "UPDATE `returns` SET name = ?, descriptions = ?, cost = ?, title = ?, `product-id` = ?, image = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, returnDTO.getName(), returnDTO.getDescriptions(), returnDTO.getCost(),
                returnDTO.getTitle(), returnDTO.getProductId(), returnDTO.getImage(), returnDTO.getId());
        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.OK).body("Updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Update failed");
        }
    }


    @Override
    public ResponseEntity<String> createReturn(ReturnDTO returnDTO) {
        String sql = "INSERT INTO `returns` (name, descriptions, cost, title, `product-id`, image) VALUES (?, ?, ?, ?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, returnDTO.getName(), returnDTO.getDescriptions(), returnDTO.getCost(),
                returnDTO.getTitle(), returnDTO.getProductId(), returnDTO.getImage());
        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.OK).body("created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("create failed");
        }
    }

    @Override
    public ResponseEntity<String> deleteReturn(int id) {
        String sql = "DELETE FROM RETURNS WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.OK).body("Deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Delete failed");
        }
    }

}
