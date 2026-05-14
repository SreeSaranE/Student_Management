import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import {
  FaMoon,
  FaSun,
  FaUsers,
  FaMale,
  FaFemale,
  FaSearch,
  FaPlus
} from 'react-icons/fa'

import API from '../services/api'
import StudentTable from '../components/StudentTable'
import AddStudentForm from '../components/AddStudentForm'

function Dashboard({ onLogout }) {

  const [students, setStudents] = useState([])
  const [editingStudent, setEditingStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    dob: true,
    gender: true,
    age: true,
    email: true,
    phone: true
  })

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
      'Delete this student?'
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

  const cardData = [
    {
      title: 'Total Students',
      value: students.length,
      icon: <FaUsers />
    },
    {
      title: 'Male Students',
      value: maleStudents,
      icon: <FaMale />
    },
    {
      title: 'Female Students',
      value: femaleStudents,
      icon: <FaFemale />
    },
    {
      title: 'Results',
      value: filteredStudents.length,
      icon: <FaSearch />
    }
  ]

  const toggleColumn = (column) => {

    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column]
    })
  }

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        backgroundColor: darkMode ? '#111827' : '#f5f7fb',
        transition: '0.3s'
      }}
    >

      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2
              className="fw-bold mb-1"
              style={{
                color: darkMode ? '#ffffff' : '#111827'
              }}
            >
              Student Management
            </h2>

            <small
              style={{
                color: darkMode ? '#9ca3af' : '#6b7280'
              }}
            >
              Minimal Dashboard
            </small>

          </div>

          <div className="d-flex gap-2">

            <button
              className="btn btn-sm"
              style={{
                backgroundColor: darkMode
                  ? '#1f2937'
                  : '#ffffff',
                color: darkMode
                  ? '#ffffff'
                  : '#111827'
              }}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={onLogout}
            >
              Logout
            </button>

          </div>

        </div>

        <div className="row g-4 mb-4">

          {cardData.map((card, index) => (

            <div className="col-md-3" key={index}>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1
                }}
                whileHover={{ y: -5 }}
                className="card border-0 shadow-sm rounded-4 p-4"
                style={{
                  backgroundColor: darkMode
                    ? '#1f2937'
                    : '#ffffff',
                  color: darkMode
                    ? '#ffffff'
                    : '#111827'
                }}
              >

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <small
                      style={{
                        color: darkMode
                          ? '#9ca3af'
                          : '#6b7280'
                      }}
                    >
                      {card.title}
                    </small>

                    <h3 className="fw-bold mt-2">
                      {card.value}
                    </h3>

                  </div>

                  <div style={{ fontSize: '1.5rem' }}>
                    {card.icon}
                  </div>

                </div>

              </motion.div>

            </div>
          ))}

        </div>

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

          <input
            type="text"
            className="form-control rounded-4 border-0 shadow-sm"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              maxWidth: '350px',
              backgroundColor: darkMode
                ? '#1f2937'
                : '#ffffff',
              color: darkMode
                ? '#ffffff'
                : '#111827'
            }}
          />

          <div className="d-flex gap-2 flex-wrap">

            <button
              className="btn btn-dark rounded-4 px-4"
              onClick={() => {
                setShowForm(true)
                setEditingStudent(null)
              }}
            >
              <FaPlus className="me-2" />
              Add Student
            </button>

          </div>

        </div>

        <StudentTable
          students={filteredStudents}
          deleteStudent={deleteStudent}
          setEditingStudent={(student) => {
            setEditingStudent(student)
            setShowForm(true)
          }}
          darkMode={darkMode}
          visibleColumns={visibleColumns}
        />

        {(showForm || editingStudent) && (

          <AddStudentForm
            refreshStudents={fetchStudents}
            editingStudent={editingStudent}
            setEditingStudent={setEditingStudent}
            closeForm={() => {
              setShowForm(false)
              setEditingStudent(null)
            }}
            darkMode={darkMode}
          />
        )}

      </div>
    </div>
  )
}

export default Dashboard