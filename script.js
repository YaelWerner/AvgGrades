import React, { useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState(0);
  const [isAdvancedCourse, setIsAdvancedCourse] = useState(false);

  const handleAddStudent = () => {
    if (newStudentName.trim() !== '' && newStudentGrade >= 0) {
      setStudents([
        ...students,
        { name: newStudentName, grade: newStudentGrade, isAdvanced: isAdvancedCourse },
      ]);
      setNewStudentName('');
      setNewStudentGrade(0);
      setIsAdvancedCourse(false);
    }
  };

  const handleRemoveStudent = (index) => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  const calculateAverage = () => {
    if (students.length === 0) return 0;
    const sum = students.reduce((acc, student) => acc + (student.isAdvanced ? student.grade * 1.5 : student.grade), 0);
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
        <label>
          <input
            type="checkbox"
            checked={isAdvancedCourse}
            onChange={(e) => setIsAdvancedCourse(e.target.checked)}
          />
          Advanced Course
        </label>
        <button onClick={handleAddStudent}>Add Student</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>{student.isAdvanced ? 'Advanced' : 'Regular'}</td>
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
