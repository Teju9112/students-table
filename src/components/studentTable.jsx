function StudentTable({ students, deleteStudent, setEditStudent }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>
            <td>
              <div className="action-buttons">
                <button className="edit-btn" onClick={() => setEditStudent({ ...student, index })}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => deleteStudent(index)}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;