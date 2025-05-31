package com.example.insuranceapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import jakarta.annotation.PostConstruct;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDirValue; // e.g., ./uploads from application.properties

    private Path profilePictureStorageLocation;

    @PostConstruct
    public void init() {
        this.profilePictureStorageLocation = Paths.get(uploadDirValue, "profile-pictures").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.profilePictureStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file, Long clientId) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = "";
        try {
            if (originalFileName.contains(".")) {
                fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            // Sanitize and create a unique filename
            String fileName = "client-" + clientId + "-" + UUID.randomUUID().toString() + fileExtension;

            Path targetLocation = this.profilePictureStorageLocation.resolve(fileName);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }
            // Return the relative path to be stored in DB and used by frontend
            return "/profile-pictures/" + fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + originalFileName + ". Please try again!", ex);
        }
    }
}