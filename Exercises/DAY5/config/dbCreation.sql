CREATE TABLE
    users (
        id integer PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        age integer,
        role VARCHAR(255),
        isActive BOOLEAN
    );