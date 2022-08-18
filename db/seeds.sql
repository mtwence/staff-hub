INSERT INTO department (name)
VALUES ("Sassy"), ("Silly"), ("Spicy");

INSERT INTO role (title, salary, department_id)
VALUES ('Sassologist', 100000, 1),
('Silly Soldier', 120000, 2),
('Spicy Qurl', 140000, 3),
('Silliest Soldier', 200000, 2),
('Senior Sassologist', 250000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Massie', 'Malagasy',5, NULL),
('Jilly', 'Schnilly', 4, NULL),
('Feisty', 'Scheisty', 5, NULL),
('Willy', 'Dilly', 2, 2),
('Cassie', 'Lassie', 1, 1);