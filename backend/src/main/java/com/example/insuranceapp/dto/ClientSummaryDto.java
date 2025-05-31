package com.example.insuranceapp.dto;

public class ClientSummaryDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String profilePicturePath;

    // Constructor, Getters, Setters
    public ClientSummaryDto(Long id, String firstName, String lastName, String profilePicturePath) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePicturePath = profilePicturePath;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getProfilePicturePath() { return profilePicturePath; }
    public void setProfilePicturePath(String profilePicturePath) { this.profilePicturePath = profilePicturePath; }
}