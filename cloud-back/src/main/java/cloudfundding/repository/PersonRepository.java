package cloudfundding.repository;

import cloudfundding.model.Person;

import java.util.List;

public interface PersonRepository {
    List<Person> getAllPersons();
}
