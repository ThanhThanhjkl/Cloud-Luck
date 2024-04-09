package cloudfundding.service.implement;

import cloudfundding.repository.PersonRepository;
import cloudfundding.model.Person;
import cloudfundding.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PersonServiceImpl implements PersonService {
    @Autowired
    private PersonRepository personRepository;

    @Override
    public List<Person> getAllPersons() {
        return personRepository.getAllPersons();
    }

//    @Override
//    public Void addPerson(Person person) {
//        personRepository.addPerson()
//    }
}
