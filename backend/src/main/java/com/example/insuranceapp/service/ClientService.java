package com.example.insuranceapp.service;

import com.example.insuranceapp.dto.ClientSummaryDto;
import com.example.insuranceapp.model.Client;
import com.example.insuranceapp.repository.ClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final FileStorageService fileStorageService;

    public ClientService(ClientRepository clientRepository, FileStorageService fileStorageService) {
        this.clientRepository = clientRepository;
        this.fileStorageService = fileStorageService;
    }

    public List<ClientSummaryDto> getAllClientSummaries() {
        List<ClientSummaryDto> summaries = new ArrayList<>();
        clientRepository.findAll().forEach(client ->
                summaries.add(new ClientSummaryDto(
                        client.getId(),
                        client.getFirstName(),
                        client.getLastName(),
                        client.getProfilePicturePath()
                ))
        );
        return summaries;
    }

    public Optional<Client> getClientById(Long clientId) {
        return clientRepository.findById(clientId);
    }

    @Transactional // Ensure atomicity
    public Optional<Client> updateProfilePicture(Long clientId, MultipartFile file) {
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        if (clientOptional.isPresent()) {
            Client client = clientOptional.get();
            String filePath = fileStorageService.storeFile(file, clientId);
            client.setProfilePicturePath(filePath);
            clientRepository.save(client); // This will perform an update
            return Optional.of(client);
        }
        return Optional.empty();
    }

    // Placeholder for creating/updating client textual info (if needed later)
    // public Client saveClient(Client client) {
    //     return clientRepository.save(client);
    // }
}