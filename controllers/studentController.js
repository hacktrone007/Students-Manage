const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '../data/students.json');

// read student data  
const readData = () => JSON.parse(fs.readFileSync(filepath))
const writeData = (data) => fs.writeFileSync(filepath, JSON.stringify(data, null, 2));


exports.getAllStudents = (req, res) => {
    const students = readData();
    res.json(students);
}

exports.getStudentById = (req, res) => {
    const students = readData();
    const student = students.find((s) => s.id === parseInt(req.params.id));

    student ? res.json(student) : res.status(404).json({
        message: "Student not found"
    });
    
}


exports.createStudent = (req, res) => {
    const students = readData();
    const {
        name,
        age,
        email,
        course
    } = req.body;
   if (!name || !age || !email || !course) {
        return res.json({
            message: 'All fields are required'
        })
    }
    const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name,
        age,
        email,
        course
    };
     
    students.push(newStudent);
    writeData(students);
    res.json(newStudent);
};
exports.updateStudent = (req, res) => {
    const students = readData();
    const id = parseInt(req.params.id);
    const index = students.findIndex((s) => s.id === id);
    // read the current students 
    // get id from url 
    // find the index of student to be updated
    if (index === -1) {
        return res.status(404).json({
            message: 'Student not found'
        })
    }
    const updatedStudent = {
        ...students[index],
        ...req.body
    };
    students[index] = updatedStudent;
    writeData(students);
    res.json(updatedStudent);
    
}

exports.deleteStudent = (req, res) => {
    let students = readData();
    const id = parseInt(req.params.id);
    
    if (!students.find((s) => s.id === id)) {
        return res.json({
            message: 'student not found'
        })
    }
    
    students = students.filter((s) => s.id !== id);
    writeData(students);
    res.json({
        message: 'student deleted successfully'
    })
    
}
exports.searchStudents = (req, res) => {
    const {
        course
    } = req.query;
    const students = readData();
    // Signals and System 
    // signals and system 
    const filtered = students.filter((s) => s.course.toLowerCase() === course.toLowerCase());
    filtered.length ? res.json(filtered) : res.status(404).json({
        message: 'No Students found for this course'
    });
};

