package com.example.insuranceapp.controller;

import com.example.insuranceapp.dto.ClientSummaryDto;
import com.example.insuranceapp.model.Client;
import com.example.insuranceapp.service.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*") // Allow all origins for prototype simplicity, refine for production
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<List<ClientSummaryDto>> getAllClients() {
        List<ClientSummaryDto> clients = clientService.getAllClientSummaries();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<Client> getClientById(@PathVariable Long clientId) {
        return clientService.getClientById(clientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{clientId}/profile-picture")
    public ResponseEntity<?> uploadProfilePicture(@PathVariable Long clientId, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload.");
        }
        try {
            return clientService.updateProfilePicture(clientId, file)
                    .map(client -> ResponseEntity.ok().body(client.getProfilePicturePath())) // Return new path
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found with id: " + clientId));
        } catch (Exception e) {
            // Log the exception e.g. e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage());
        }
    }
}