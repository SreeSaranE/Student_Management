import { useState } from 'react'

function StudentTable({
  students,
  deleteStudent,
  setEditingStudent,
  darkMode,
  visibleColumns
}) {

  const [currentPage, setCurrentPage] = useState(1)

  const studentsPerPage = 5

  const indexOfLastStudent =
    currentPage * studentsPerPage

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage

  const sortedStudents = [...students].sort(
    (a, b) => a.name.localeCompare(b.name)
  )

  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  )

  const totalPages = Math.ceil(
    students.length / studentsPerPage
  )

  return (
    <>

      <div
        className="card border-0 shadow-sm rounded-4 overflow-hidden"
        style={{
          backgroundColor: darkMode
            ? '#1f2937'
            : '#ffffff'
        }}
      >

        <div className="table-responsive">

          <table
            className="table align-middle mb-0"
            style={{
              color: darkMode
                ? '#ffffff'
                : '#111827',
              backgroundColor: darkMode
                ? '#1f2937'
                : '#ffffff'
            }}
          >

            <thead>

              <tr
                style={{
                  backgroundColor: darkMode
                    ? '#111827'
                    : '#f3f4f6',
                  color: darkMode
                    ? '#ffffff'
                    : '#111827'
                }}
              >

                {visibleColumns.name && (
                  <th
                    style={{
                      backgroundColor: darkMode
                        ? '#111827'
                        : '#f3f4f6',
                      color: darkMode
                        ? '#ffffff'
                        : '#111827'
                    }}
                  >
                    Name
                  </th>
                )}

                {visibleColumns.dob && (
                  <th
                    style={{
                      backgroundColor: darkMode
                        ? '#111827'
                        : '#f3f4f6',
                      color: darkMode
                        ? '#ffffff'
                        : '#111827'
                    }}
                  >
                    DOB
                  </th>
                )}

                {visibleColumns.gender && (
                  <th
                    style={{
                      backgroundColor: darkMode
                        ? '#111827'
                        : '#f3f4f6',
                      color: darkMode
                        ? '#ffffff'
                        : '#111827'
                    }}
                  >
                    Gender
                  </th>
                )}

                {visibleColumns.age && (
                  <th
                    style={{
                      backgroundColor: darkMode
                        ? '#111827'
                        : '#f3f4f6',
                      color: darkMode
                        ? '#ffffff'
                        : '#111827'
                    }}
                  >
                    Age
                  </th>
                )}

                {visibleColumns.email && (
                  <th
                    style={{
                      backgroundColor: darkMode
                        ? '#111827'
                        : '#f3f4f6',
                      color: darkMode
                        ? '#ffffff'
                        : '#111827'
                    }}
                  >
                    Email
                  </th>
                )}

                {visibleColumns.phone && (
                  <th
                    style={{
                      backgroundColor: darkMode
                        ? '#111827'
                        : '#f3f4f6',
                      color: darkMode
                        ? '#ffffff'
                        : '#111827'
                    }}
                  >
                    Phone
                  </th>
                )}

                <th
                  style={{
                    backgroundColor: darkMode
                      ? '#111827'
                      : '#f3f4f6',
                    color: darkMode
                      ? '#ffffff'
                      : '#111827'
                  }}
                >
                  
                </th>

              </tr>

            </thead>

            <tbody>

              {currentStudents.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-4"
                    style={{
                      backgroundColor: darkMode
                        ? '#1f2937'
                        : '#ffffff',
                      color: darkMode
                        ? '#ffffff'
                        : '#111827'
                    }}
                  >
                    No Students Found
                  </td>

                </tr>

              ) : (

                currentStudents.map((student) => (

                  <tr
                    key={student.id}
                    style={{
                      backgroundColor: darkMode
                        ? '#1f2937'
                        : '#ffffff',
                      color: darkMode
                        ? '#ffffff'
                        : '#111827'
                    }}
                  >

                    {visibleColumns.name && (
                      <td
                        style={{
                          backgroundColor: darkMode
                            ? '#1f2937'
                            : '#ffffff',
                          color: darkMode
                            ? '#ffffff'
                            : '#111827'
                        }}
                      >
                        {student.name}
                      </td>
                    )}

                    {visibleColumns.dob && (
                      <td
                        style={{
                          backgroundColor: darkMode
                            ? '#1f2937'
                            : '#ffffff',
                          color: darkMode
                            ? '#ffffff'
                            : '#111827'
                        }}
                      >
                        {student.dateOfBirth?.split('T')[0]}
                      </td>
                    )}

                    {visibleColumns.gender && (
                      <td
                        style={{
                          backgroundColor: darkMode
                            ? '#1f2937'
                            : '#ffffff',
                          color: darkMode
                            ? '#ffffff'
                            : '#111827'
                        }}
                      >
                        {student.gender}
                      </td>
                    )}

                    {visibleColumns.age && (
                      <td
                        style={{
                          backgroundColor: darkMode
                            ? '#1f2937'
                            : '#ffffff',
                          color: darkMode
                            ? '#ffffff'
                            : '#111827'
                        }}
                      >
                        {student.age}
                      </td>
                    )}

                    {visibleColumns.email && (
                      <td
                        style={{
                          backgroundColor: darkMode
                            ? '#1f2937'
                            : '#ffffff',
                          color: darkMode
                            ? '#ffffff'
                            : '#111827'
                        }}
                      >
                        {student.email}
                      </td>
                    )}

                    {visibleColumns.phone && (
                      <td
                        style={{
                          backgroundColor: darkMode
                            ? '#1f2937'
                            : '#ffffff',
                          color: darkMode
                            ? '#ffffff'
                            : '#111827'
                        }}
                      >
                        {student.phoneNumber}
                      </td>
                    )}

                    <td
                      style={{
                        backgroundColor: darkMode
                          ? '#1f2937'
                          : '#ffffff'
                      }}
                    >

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditingStudent(student)}
                      >
                        ✎
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteStudent(student.id)}
                      >
                        ⛌
                      </button>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      <div className="d-flex justify-content-center gap-2 mt-4">

        {[...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            className={`btn btn-sm ${
              currentPage === index + 1
                ? darkMode
                  ? 'btn-light'
                  : 'btn-dark'
                : darkMode
                  ? 'btn-outline-light'
                  : 'btn-outline-dark'
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