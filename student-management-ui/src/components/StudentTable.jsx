import { useState } from 'react'

function StudentTable({
  students,
  deleteStudent,
  setEditingStudent
}) {

  const [currentPage, setCurrentPage] = useState(1)

  const studentsPerPage = 5

  const indexOfLastStudent =
    currentPage * studentsPerPage

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage

  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  )

  const totalPages = Math.ceil(
    students.length / studentsPerPage
  )

  return (
    <>

      <div className="table-responsive">

        <table className="table align-middle table-hover bg-white rounded-4 overflow-hidden">

          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Students Found
                </td>
              </tr>
            ) : (
              currentStudents.map((student) => (

                <tr key={student.id}>

                  <td className="fw-semibold">
                    {student.name}
                  </td>

                  <td>
                    {student.dateOfBirth?.split('T')[0]}
                  </td>

                  <td>{student.gender}</td>

                  <td>{student.age}</td>

                  <td>{student.email}</td>

                  <td>{student.phoneNumber}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        setEditingStudent(student)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteStudent(student.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      <div className="d-flex justify-content-center mt-4 gap-2">

        {[...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            className={`btn ${
              currentPage === index + 1
                ? 'btn-success'
                : 'btn-outline-success'
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

      </div>

    </>
  )
}

export default StudentTable