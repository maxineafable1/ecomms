CREATE DATABASE ecomms_db;

-- \c ecomms_db, to connect to the db

CREATE TABLE IF NOT EXISTS users (
  user_id uuid DEFAULT gen_random_uuid(),
  username VARCHAR(20) UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);

ALTER TABLE users
ADD COLUMN seller BOOLEAN DEFAULT FALSE NOT NULL;

CREATE TABLE IF NOT EXISTS tokens (
  token_id SERIAL,
  refresh TEXT,
  user_id uuid,
  PRIMARY KEY (token_id),
  FOREIGN KEY (user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  price NUMERIC(8, 2) NOT NULL,
  stock NUMERIC(5) NOT NULL,
  category VARCHAR(100),
  image_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  user_id uuid,
  PRIMARY KEY (product_id),
  FOREIGN KEY (user_id)
    REFERENCES users(user_id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cart (
  cart_id SERIAL PRIMARY KEY,
  quantity NUMERIC(5) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  product_id INT REFERENCES products ON DELETE CASCADE,
  user_id uuid REFERENCES users ON DELETE CASCADE
);

