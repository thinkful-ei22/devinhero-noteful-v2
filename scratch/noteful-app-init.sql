-- Start from scratch, delete old tables
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS folders;


-- Create folders table
CREATE TABLE folders (
    id serial PRIMARY KEY,
    name text NOT NULL
);

ALTER SEQUENCE folders_id_seq RESTART WITH 100;

-- Add some test folders
INSERT INTO folders (name) VALUES
  ('Articles'),
  ('Lists'),
  ('Solaire'),
  ('Archive');


-- Create notes table
CREATE TABLE notes (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT current_timestamp,
	folder_id int REFERENCES folders(id) ON DELETE SET NULL
);

ALTER SEQUENCE notes_id_seq RESTART 1000;

-- Add some test data
INSERT INTO notes (title, content, folder_id)
   VALUES  ('LOCAL MAN PRAISES SUN', 'Earlier today, a man lifted his arms gracefully into the air and beheld the sun. Glorious!', 100),
			('Why Miracles Are Better Than Sorcery', 'Miracle users are known to be more prone to jolly cooperation, as well as being generally better people', 100),
			('10 Miracles to Attune to on a Sunny Day', 'bountiful sunlight, lightning spear, great lightning spear, heal, great heal excerpt, homeward, sunlight blade, sunlight spear, soothing sunlight, seek guidance', 101),
			('Invaders to Hunt', 'Marvelous Chester; Patches the Hyena; Kirk, Knight of Thorns; Knight Lautrec; Paladin Leeroy', 101),
			('Top Jolly Cooperation Spots', 'Ornstein and Smough, Quelaag, Bell Gargoyles', 101),
			('Solaire Greeting', 'Ah, hello! You don''t look Hollow, far from it! I am Solaire of Astora, an adherent of the Lord of Sunlight. Now that I am Undead, I have come to this great land, the birthplace of Lord Gwyn, to seek my very own sun! ...Do you find that strange? Well, you should! No need to hide your reaction. I get that look all the time! Hah hah hah!', 102),
			('Solaire Retaliate', 'If a stubborn beast you be, I have no choice! A Warrior of the Sun will not just sit and take it!', 102),
			('Solaire Sad', 'Why...? Why? After all this searching, I still cannot find it...', 102),
			('Solaire Revelation', 'Finally, I have found it, I have...! My very own sun... I am the sun...!', 102),
			('Incoherent Screaming', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAA AAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', NULL),
			('Unintelligible Whispering', 'wshshssshswhsh shshhhshsh whhshwhwspspsshhp shhh', NULL);


