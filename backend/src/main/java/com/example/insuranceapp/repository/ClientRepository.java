package com.example.insuranceapp.repository;

import com.example.insuranceapp.model.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for {@link Client} entities.
 * This interface extends {@link org.springframework.data.repository.CrudRepository},
 * which provides a set of generic CRUD (Create, Read, Update, Delete) operations.
 *
 * Spring Data JDBC (or JPA, depending on the underlying Spring Data module used)
 * will automatically provide implementations for these methods at runtime.
 *
 * <h3>Example CRUD operations inherited from CrudRepository:</h3>
 *
 * <h4>Create/Update:</h4>
 * <ul>
 *   <li>{@code Client save(Client client)}: Saves a given client. If the client is new, it's an insert.
 *       If the client has an existing ID, it's an update. Use the returned instance for further operations.</li>
 *   <li>{@code Iterable<Client> saveAll(Iterable<Client> clients)}: Saves all given clients.</li>
 * </ul>
 *
 * <h4>Read:</h4>
 * <ul>
 *   <li>{@code Optional<Client> findById(Long clientId)}: Retrieves a client by its ID.</li>
 *   <li>{@code boolean existsById(Long clientId)}: Returns whether a client with the given ID exists.</li>
 *   <li>{@code Iterable<Client> findAll()}: Returns all clients.</li>
 *   <li>{@code Iterable<Client> findAllById(Iterable<Long> clientIds)}: Returns all clients with the given IDs.</li>
 *   <li>{@code long count()}: Returns the number of clients available.</li>
 * </ul>
 *
 * <h4>Delete:</h4>
 * <ul>
 *   <li>{@code void deleteById(Long clientId)}: Deletes the client with the given ID.</li>
 *   <li>{@code void delete(Client client)}: Deletes a given client entity.</li>
 *   <li>{@code void deleteAllById(Iterable<? extends Long> clientIds)}: Deletes all clients with the given IDs.</li>
 *   <li>{@code void deleteAll(Iterable<? extends Client> clients)}: Deletes the given client entities.</li>
 *   <li>{@code void deleteAll()}: Deletes all clients managed by the repository.</li>
 * </ul>
 *
 * <p>You can add custom query methods here if needed, following Spring Data's
 * <a href="https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation">query method naming conventions</a>.
 * For example: {@code Optional<Client> findByEmail(String email);}
 * </p>
 */
@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {
    // Spring Data JDBC will provide implementations for basic CRUD operations.
    // You can add custom query methods here if needed.
}