import React, { useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState(0);

  const handleAddStudent = () => {
    if (newStudentName.trim() !== '' && newStudentGrade >= 0) {
      setStudents([
        ...students,
        { name: newStudentName, grade: newStudentGrade },
      ]);
      setNewStudentName('');
      setNewStudentGrade(0);
    }
  };

  const handleRemoveStudent = (index) => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  const calculateAverage = () => {
    if (students.length === 0) return 0;
    const sum = students.reduce((acc, student) => acc + student.grade, 0);
    return sum / students.length;
  };

  return (
    <div>
      <h1>Average Grades</h1>
      <div>
        <input
          type="text"
          placeholder="Student Name"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Grade"
          value={newStudentGrade}
          onChange={(e) => setNewStudentGrade(Number(e.target.value))}
        />
        <button onClick={handleAddStudent}>Add Student</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>
                <button onClick={() => handleRemoveStudent(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Average: {calculateAverage().toFixed(2)}</h2>
    </div>
  );
}

export default App;
