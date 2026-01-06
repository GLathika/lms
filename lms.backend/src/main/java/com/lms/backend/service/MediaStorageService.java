package com.lms.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class MediaStorageService {

    private final Path fileStorageLocation;

    public MediaStorageService() {
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    // ✅ UPLOAD FILE TO LOCAL STORAGE
    public String uploadFile(MultipartFile file, Long courseId) {
        try {
            // Generate unique filename
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // Target location
            Path targetLocation = this.fileStorageLocation.resolve(fileName);

            // Copy file
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Return file download URL (assuming we serve static files or have a controller)
            // For now, returning a local URI or we need to add a ResourceHandler.
            // Let's assume there's a way to access it, or just return the file path/ID.
            // Ideally, we map /uploads/** to this directory.
            
            String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(fileName)
                    .toUriString();

            return fileUrl;

        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + file.getOriginalFilename() + ". Please try again!", ex);
        }
    }

    // ✅ DELETE FILE FROM LOCAL STORAGE
    public void deleteFile(String fileUrl) {
        try {
            // Extract filename from URL (this is a bit hacky, depends on URL structure)
            String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Files.deleteIfExists(filePath);
        } catch (Exception ex) {
            throw new RuntimeException("File delete failed: " + ex.getMessage(), ex);
        }
    }
}