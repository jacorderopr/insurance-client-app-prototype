-- Sample data (ensure placeholder image paths match accessible files or adjust accordingly)
-- For the prototype, we'll assume these paths will eventually point to real images.
-- The FileStorageService will create paths like /profile-pictures/client-X-uuid.ext

INSERT INTO clients (first_name, last_name, address, date_of_birth, profile_picture_path, policy_number, policy_type, coverage_start_date, coverage_end_date) VALUES
('Jose', 'Cordero', '123 Main St, Anytown, USA', '1985-06-15', '/profile-pictures/placeholder1.png', 'POL123456', 'Auto', '2023-01-01', '2025-01-01'),
('Jane', 'Smith', '456 Oak Ave, Otherville, USA', '1990-11-22', '/profile-pictures/placeholder2.png', 'POL654321', 'Home', '2022-07-15', '2024-07-15'),
('Alice', 'Johnson', '789 Pine Ln, Sometown, USA', '1978-03-30', NULL, 'POL789012', 'Life', '2021-05-20', '2051-05-20'),
('Bob', 'Brown', '101 Maple Dr, Anycity, USA', '1995-09-10', '/profile-pictures/default-profile.png', 'POL345678', 'Auto', '2023-08-01', '2024-08-01');