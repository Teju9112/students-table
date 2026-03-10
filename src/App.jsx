import { useState, useEffect } from "react"
import StudentTable from "./components/studentTable"
import StudentForm from "./components/StudentForm"
import data from "./data/students.json"
import "./App.css"
import * as XLSX from "xlsx"

function App() {

  const [students, setStudents] = useState(() => {
  const savedStudents = localStorage.getItem("students")
  return savedStudents ? JSON.parse(savedStudents) : data
})
  const [editStudent, setEditStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  const addStudent = (student) => {
    setStudents([...students, student])
  }
  const deleteStudent = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete?")

  if (confirmDelete) {
    const updatedStudents = students.filter((student) => student.id !== id)
    setStudents(updatedStudents)
  }
}
const updateStudent = (updatedStudent) => {

  const updatedList = students.map((student) =>
    student.id === updatedStudent.id ? updatedStudent : student
  )

  setStudents(updatedList)
  setEditStudent(null)

}

const downloadExcel = () => {

  const excelData = students.map(student => ({
    Name: student.name,
    Email: student.email,
    Age: student.age
  }))

  const worksheet = XLSX.utils.json_to_sheet(excelData)

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, "Students")

  XLSX.writeFile(workbook, "students.xlsx")

}

useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students))
}, [students])

useEffect(() => {
  setTimeout(() => {
    setLoading(false)
  }, 2000)
}, [])

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
  <p>Loading students...</p>
) : (
  <StudentTable
    students={students}
    deleteStudent={deleteStudent}
    setEditStudent={setEditStudent}
  />
)}

<button onClick={downloadExcel}>
  Download Excel
</button>


    </div>
    
  )
}


export default App