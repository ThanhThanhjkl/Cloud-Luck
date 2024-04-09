package cloudfundding.repository.implement;

import cloudfundding.repository.PersonRepository;
import cloudfundding.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;


@Repository
public class PersonRepositoryImpl implements PersonRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<Person> getAllPersons() {
        String sql = "SELECT * FROM EMPLOYEE";

        return jdbcTemplate.query(sql, new RowMapper<Person>() {
            @Override
            public Person mapRow(ResultSet rs, int index) throws SQLException {
                Person person = new Person();
                person.setId(rs.getInt("id"));
                person.setName(rs.getString("name"));
                return person;
            }
        });
    }
}

