
-- Select all notes
SELECT * FROM notes;

-- Select all notes and limit to 5
SELECT * FROM notes
	LIMIT 5;
	
-- Select and sort by value
SELECT * FROM notes
	ORDER BY title ASC;
	
SELECT * FROM notes
	ORDER BY title DESC;

-- Select by exact title
SELECT * FROM notes
	WHERE title = 'Solaire Greeting';

-- Select by title containing value
SELECT * FROM notes
	WHERE title LIKE '%Miracle%';
	
-- Update title and content of specific notes
UPDATE notes
	SET title = 'Solaire Lamentations'
	WHERE title = 'Solaire Sad';

-- Insert note
INSERT INTO notes (title, content)
		VALUES	('Darkwraith Party', 'Get in the van, we''re gonna go farm some humanity');	

-- Delete note by id
DELETE FROM notes 
	WHERE id='3';
	
	