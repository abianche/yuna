-- Create schema
CREATE SCHEMA IF NOT EXISTS yuna;

-- Create issues table
CREATE TABLE
    yuna.issues (
        id SERIAL PRIMARY KEY,
        key VARCHAR(20) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'OPEN',
        assignee VARCHAR(100),
        reporter VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );