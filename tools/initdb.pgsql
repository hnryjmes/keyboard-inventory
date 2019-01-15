-- Drops keyboards table
DROP TABLE IF EXISTS keyboards;

-- Creates keyboards table
CREATE TABLE IF NOT EXISTS keyboards (
  id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
  , user_id varchar(50) NOT NULL
  , brand varchar(50) NOT NULL
  , model varchar(50) NOT NULL
  , year smallint NULL
  , color varchar(50) NULL
);