import { useEffect, useState } from 'react'
import API from '../services/api'
import StudentTable from '../components/StudentTable'
import AddStudentForm from '../components/AddStudentForm'

import {
  FaUserGraduate,
  FaUsers,
  FaFemale,
  FaMale,
  FaSearch,
  FaPlus
} from 'react-icons/fa'

function Dashboard({ onLogout }) {

  const [students, setStudents] = useState([])
  const [editingStudent, setEditingStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)

  const fetchStudents = async () => {
    try {
      const response = await API.get('/students')
      setStudents(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this student?'
    )

    if (!confirmDelete) return

    try {

      await API.delete(`/students/${id}`)

      fetchStudents()

    } catch (error) {
      console.log(error)
    }
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
  )

  const maleStudents = students.filter(
    (student) => student.gender === 'Male'
  ).length

  const femaleStudents = students.filter(
    (student) => student.gender === 'Female'
  ).length

  return (
    <div
      className="container-fluid min-vh-100 py-4"
      style={{ backgroundColor: '#f5f7fb' }}
    >

      <div className="container bg-white rounded-4 shadow p-0 overflow-hidden">

        <div
          className="d-flex justify-content-between align-items-center p-4 text-white"
          style={{ backgroundColor: '#1f6b4f' }}
        >

          <div>
            <h3 className="m-0 fw-bold">
              Silicon Instructors
            </h3>

            <small>
              Student Management System
            </small>
          </div>

          <button
            className="btn btn-light"
            onClick={onLogout}
          >
            Logout
          </button>

        </div>

        <div className="p-4">

          <div className="row g-4 mb-4">

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-3">
                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <p className="text-muted mb-1">
                      Total Students
                    </p>

                    <h2 className="fw-bold">
                      {students.length}
                    </h2>
                  </div>

                  <FaUsers size={32} color="#1f6b4f" />

                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-3">
                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <p className="text-muted mb-1">
                      Male Students
                    </p>

                    <h2 className="fw-bold">
                      {maleStudents}
                    </h2>
                  </div>

                  <FaMale size={32} color="#1f6b4f" />

                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-3">
                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <p className="text-muted mb-1">
                      Female Students
                    </p>

                    <h2 className="fw-bold">
                      {femaleStudents}
                    </h2>
                  </div>

                  <FaFemale size={32} color="#1f6b4f" />

                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-3">
                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <p className="text-muted mb-1">
                      Search Results
                    </p>

                    <h2 className="fw-bold">
                      {filteredStudents.length}
                    </h2>
                  </div>

                  <FaSearch size={32} color="#1f6b4f" />

                </div>
              </div>
            </div>

          </div>

          <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">

            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search student by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: '350px' }}
            />

            <button
              className="btn text-white rounded-pill px-4"
              style={{ backgroundColor: '#1f6b4f' }}
              onClick={() => {
                setShowForm(!showForm)
                setEditingStudent(null)
              }}
            >
              <FaPlus className="me-2" />
              Add Student
            </button>

          </div>

          {(showForm || editingStudent) && (
            <AddStudentForm
              refreshStudents={fetchStudents}
              editingStudent={editingStudent}
              setEditingStudent={setEditingStudent}
              closeForm={() => {
                setShowForm(false)
                setEditingStudent(null)
              }}
            />
          )}

          <StudentTable
            students={filteredStudents}
            deleteStudent={deleteStudent}
            setEditingStudent={(student) => {
              setEditingStudent(student)
              setShowForm(true)
            }}
          />

        </div>
      </div>
    </div>
  )
}

export default Dashboard