package com.example.insuranceapp.repository;

import com.example.insuranceapp.model.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {
    // Spring Data JDBC will provide implementations for basic CRUD operations.
    // You can add custom query methods here if needed.
}