CREATE TABLE IF NOT EXISTS books (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL UNIQUE,
  author VARCHAR(100) NOT NULL, 
  year INT NOT NULL CHECK(year >= 1800),
  description VARCHAR(1000) NOT NULL,
  imagePath VARCHAR(255),
  pagesCount INT NOT NULL CHECK(pagesCount > 0),
  rating INT NOT NULL CHECK(rating >= 0 AND rating <= 5),
  clickCount INT NOT NULL DEFAULT 0 CHECK(clickCount >= 0)
);