package cloudfundding.accountApplication.service;

import cloudfundding.accountApplication.entity.Account;
import cloudfundding.accountApplication.entity.Address;
import cloudfundding.accountApplication.model.*;
import cloudfundding.accountApplication.repository.AddressRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface AddressService {
    List<AddressDTO> getAll();

    List<AddressDTO> getByAccountId(int accountId);

    AddressDTO getOne(int id);

    AddressDTO createAddress(AddressDTO addressDTO);

    AddressDTO updateAddress(AddressDTO addressDTO);

    boolean deleteAddress(int id);
}

@Transactional
@Service
class AddressServiceImpl implements AddressService {
    @Autowired
    AddressRepository addressRepository;

    @Autowired
    TokenService tokenService;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<AddressDTO> getAll() {
        List<AddressDTO> addressDTOs = new ArrayList<>();
        addressRepository.findAll().forEach((item) -> {
            addressDTOs.add(modelMapper.map(item, AddressDTO.class));
        });
        return addressDTOs;
    }

    @Override
    public List<AddressDTO> getByAccountId(int accountId) {
        List<AddressDTO> addressDTOs = new ArrayList<>();
        List<Address> addresses = addressRepository.findAllByAccountId(accountId);
        for (Address address : addresses) {
            addressDTOs.add(modelMapper.map(address, AddressDTO.class));
        }
        return addressDTOs;
    }

    @Override
    public AddressDTO getOne(int id) {
        Address address = addressRepository.getById(id);
        return modelMapper.map(address, AddressDTO.class);
    }

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO) {
        Address address = modelMapper.map(addressDTO, Address.class);
        address.setAccountId(Integer.parseInt(addressDTO.getAccountId()));
        Address savedAddress = addressRepository.save(address);
        return modelMapper.map(savedAddress, AddressDTO.class);
    }

    @Override
    public AddressDTO updateAddress(AddressDTO addressDTO) {
        Address address = modelMapper.map(addressDTO, Address.class);
        address.setAccountId(Integer.parseInt(addressDTO.getAccountId()));
        address.setId(addressDTO.getId());
        Address savedAddress = addressRepository.save(address);
        return modelMapper.map(savedAddress, AddressDTO.class);
    }

    @Override
    public boolean deleteAddress(int id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
            return true;
        }
        return false;
    }
}