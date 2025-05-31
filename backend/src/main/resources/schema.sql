DROP TABLE IF EXISTS clients CASCADE;

CREATE TABLE clients (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    date_of_birth DATE,
    profile_picture_path VARCHAR(255), -- Stores relative path like /profile-pictures/image.jpg
    policy_number VARCHAR(50) UNIQUE,
    policy_type VARCHAR(50),
    coverage_start_date DATE,
    coverage_end_date DATE
);