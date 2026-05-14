import { useEffect, useState } from 'react'
import API from '../services/api'
import { toast, ToastContainer } from 'react-toastify'

function AddStudentForm({
  refreshStudents,
  editingStudent,
  setEditingStudent,
  closeForm,
  darkMode
}) {

  const [student, setStudent] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    age: '',
    email: '',
    phoneNumber: ''
  })

  useEffect(() => {

    if (editingStudent) {

      setStudent({
        name: editingStudent.name || '',
        dateOfBirth:
          editingStudent.dateOfBirth?.split('T')[0] || '',
        gender: editingStudent.gender || '',
        age: editingStudent.age || '',
        email: editingStudent.email || '',
        phoneNumber: editingStudent.phoneNumber || ''
      })
    }

  }, [editingStudent])

  const calculateAge = (dob) => {

    const birthDate = new Date(dob)

    const today = new Date()

    let age =
      today.getFullYear() - birthDate.getFullYear()

    const monthDifference =
      today.getMonth() - birthDate.getMonth()

    if (
      monthDifference < 0 ||
      (
        monthDifference === 0 &&
        today.getDate() < birthDate.getDate()
      )
    ) {
      age--
    }

    return age
  }

  const handleChange = (e) => {

    const { name, value } = e.target

    if (name === 'dateOfBirth') {

      const calculatedAge = calculateAge(value)

      setStudent({
        ...student,
        dateOfBirth: value,
        age: calculatedAge
      })

      return
    }

    setStudent({
      ...student,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (editingStudent) {

        await API.put(
          `/students/${editingStudent.id}`,
          student
        )

        toast.success('Student Updated Successfully')

      } else {

        await API.post('/students', student)

        toast.success('Student Added Successfully')
      }

      refreshStudents()

      closeForm()

    } catch (error) {

      if (error.response?.data?.message) {

        toast.error(error.response.data.message)

      } else {

        toast.error('Something went wrong')
      }
    }
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999
      }}
    >

      <ToastContainer />

      <div
        className="card border-0 shadow rounded-4 p-4"
        style={{
          width: '600px',
          backgroundColor: darkMode
            ? '#1f2937'
            : '#ffffff',
          color: darkMode
            ? '#ffffff'
            : '#111827'
        }}
      >

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h4 className="fw-bold m-0">

            {editingStudent
              ? 'Edit Student'
              : 'Add Student'}

          </h4>

          <button
            className="btn-close btn-close-white"
            onClick={closeForm}
          />

        </div>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control rounded-4"
                value={student.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Date Of Birth
              </label>

              <input
                type="date"
                name="dateOfBirth"
                className="form-control rounded-4"
                value={student.dateOfBirth}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Gender
              </label>

              <select
                name="gender"
                className="form-select rounded-4"
                value={student.gender}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

              </select>

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control rounded-4"
                value={student.email}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-12 mb-4">

              <label className="form-label">
                Phone Number
              </label>

              <input
                type="text"
                name="phoneNumber"
                className="form-control rounded-4"
                value={student.phoneNumber}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="d-flex justify-content-end gap-2">

            <button
              type="button"
              className="btn btn-secondary rounded-4"
              onClick={closeForm}
            >
              Cancel
            </button>

            <button
              className="btn btn-dark rounded-4 px-4"
            >
              {editingStudent
                ? 'Update'
                : 'Add'}
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default AddStudentForm