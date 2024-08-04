package cloudfundding.productApplication.repository.implement;

import cloudfundding.productApplication.model.FundedDTO;
import cloudfundding.productApplication.repository.FundedRepository;
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
public class FundedRepositoryimpl implements FundedRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public ResponseEntity<String> addFunded(FundedDTO funded) {
        List<FundedDTO> list = getFundedByAccountId((long) funded.getAccount_id());
        if (list.stream().anyMatch(item -> item.getReturn_id() == funded.getReturn_id())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("already exit");
        } else {
            int rowsAffected = insertFunded(funded);
            if (rowsAffected > 0) {
                return ResponseEntity.status(HttpStatus.OK).body("funded successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to funding");
            }
        }
    }

    @Override
    public List<FundedDTO> getFundedByAccountId(Long accountId) {
        String sql = "SELECT * FROM FUNDED WHERE `account_id` = ?";
        return jdbcTemplate.query(sql, new Object[]{accountId}, new RowMapper<FundedDTO>() {
            @Override
            public FundedDTO mapRow(ResultSet rs, int index) throws SQLException {
                FundedDTO funded = new FundedDTO();
                funded.setId(rs.getInt("id"));
                funded.setReturn_id(rs.getInt("return_id"));
                funded.setAccount_id(rs.getInt("account_id"));

                return funded;
            }
        });
    }

    private int insertFunded(FundedDTO funded) {
        String sql = "INSERT INTO FUNDED (id, return_id, account_id) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql,
                funded.getId(),
                funded.getReturn_id(),
                funded.getAccount_id());
    }

    @Override
    public ResponseEntity<String> deleteFunded(int id) {
        String sql = "DELETE FROM FUNDED WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.OK).body("Deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Delete failed");
        }
    }
}
