const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors'); //cross server stuff 

PORT=8080;

// connect to db
let db;
(async () => {
	db = await open({
		filename: 'data.sqlite',
		driver: sqlite3.Database
	});
})();

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

app.get('/getTermInfo', async (req,res) => {
	const instructors = await db.all("SELECT * FROM Instructor;"); // get instrcutor names 
	//get courses and sections...alr sorta set to classes ig 
	const coursesWsec = await db.all("SELECT c.id as course_id,c.name as course_name,s.id as section_id,s.instructor_id FROM course c LEFT JOIN section s ON c.id = s.course_id ORDER BY c.id, s.id;");
	
	//map data to match old hardcoded 
	//const initialCourses = [
    // {id: 1, name: "1370",
		//  sections: [
		//   {id: 1, instructor: 12},
		//   {id: 2, instructor: 2} ]
		//   }

		const coursesMap = new Map();

		//map over data 
		coursesWsec.forEach(courseWsec => {
			if(!coursesMap.has(courseWsec.course_id)) {
				coursesMap.set(courseWsec.course_id, {
					id: courseWsec.course_id,
					name: courseWsec.course_name,
					sections: []
				});
			}	

			if(courseWsec.section_id) {
				coursesMap.get(courseWsec.course_id).sections.push({
					id: courseWsec.section_id,
					instructor : courseWsec.instructor_id
				});
			}
		});
	
	const coursesFinal = Array.from(coursesMap.values());
	res.json({instructors, courses : coursesFinal}); //passed as an obj holding arrays !
});

app.post('/addSection', async (req,res) => {

	try{ 
		const {course_id, instructor_id } = req.body;
		const postSec = await db.run("INSERT INTO Section(course_id,instructor_id) VALUES(?,?)",[course_id,instructor_id]);
		console.log(postSec);

		res.json({
			id: postSec.lastID,
			instructor : instructor_id
		});
	} catch {
		console.log('Error adding section:');
		res.status(500).json({error: 'Failed to add section'});
	}
});

//put route - updating existing information 
app.put('/updateSection', async (req,res) => {

	try {
		const {section_id, instructor_id} = req.body;
		console.log('Updating section:', { section_id, instructor_id });

		const postSec = await db.run("UPDATE section SET instructor_id = ? WHERE id = ?",[instructor_id, section_id]);

		res.json({
			id: section_id,
			instructor: instructor_id
		});

 	} catch {
		console.log('Error adding section:');
		res.status(500).json({error: 'Failed to add section'});
	}
});

app.delete('/deleteSection/:section_id', async (req,res) => {

	try {

		const section_id = parseInt(req.params.section_id, 10);
		
		console.log('Deleting section:', section_id);
		
		const result = await db.run(
			"DELETE FROM section WHERE id = ?",
			[section_id]
		);

		res.json({
			success: true,
			id: section_id
		});

	} catch {
		console.log('Error deleting section:');
		res.status(500).json({ error: 'Failed to delete section' });
	}
});

app.post('/addCourse', async (req,res)=> {

	try {
		const { name } = req.body;
		
		console.log('Adding course:', name);
		
		const result = await db.run(
			"INSERT INTO course (name) VALUES (?)",
			[name]
		);

		res.json({
			id: result.lastID,
			name: name,
			sections: []  // New course has no sections
		});
		

	} catch {
		console.log('Error adding course:');
		res.status(500).json({ error: 'Failed to add course' });
	}

});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
