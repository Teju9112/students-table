import { useState, useEffect } from "react";

function StudentForm({ addStudent, editStudent, updateStudent, setEditStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setEmail(editStudent.email);
      setAge(editStudent.age);
    }
  }, [editStudent]);

  const handleCancel = () => {
    setName("");
    setEmail("");
    setAge("");
    setEditStudent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !age) {
      alert("All fields are required");
      return;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      alert("Enter valid email");
      return;
    }
    const studentData = { id: editStudent ? editStudent.id : Date.now(), name, email, age };
    if (editStudent) {
      updateStudent(studentData);
    } else {
      addStudent(studentData);
    }
    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button type="submit">
          {editStudent ? "Update Student" : "Add Student"}
        </button>
        {(editStudent || name || email || age) && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;