import { useState, useEffect } from "react";
import StudentTable from "./components/studentTable";
import StudentForm from "./components/StudentForm";
import data from "./data/students.json";
import "./App.css";
import * as XLSX from "xlsx";

function App() {

  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : data;
  });

  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const deleteStudent = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
    }
  };

  const updateStudent = (updatedStudent) => {
    const updatedStudents = students.map((student, index) =>
      index === editStudent.index ? updatedStudent : student
    );
    setStudents(updatedStudents);
    setEditStudent(null);
  };

  const downloadExcel = () => {
    const excelData = students.map((student) => ({
      Name: student.name,
      Email: student.email,
      Age: student.age,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="container">

      <h1>Students Table</h1>

      <StudentForm
        addStudent={addStudent}
        editStudent={editStudent}
        updateStudent={updateStudent}
        setEditStudent={setEditStudent}
      />

      {loading ? (
        <p style={{textAlign:"center"}}>Loading students...</p>
      ) : (
        <StudentTable
          students={students}
          deleteStudent={deleteStudent}
          setEditStudent={setEditStudent}
        />
      )}

      <br/>

      <div className="download-container">
        <button className="download-btn" onClick={downloadExcel}>
           Download Excel
        </button>
      </div>

    </div>
  );
}

export default App;