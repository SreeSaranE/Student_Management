import { useEffect, useState } from 'react'
import API from '../services/api'
import { toast, ToastContainer } from 'react-toastify'

function AddStudentForm({
  refreshStudents,
  editingStudent,
  setEditingStudent,
  closeForm
}) {

  const [student, setStudent] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    age: '',
    email: '',
    phoneNumber: ''
  })

  const [loading, setLoading] = useState(false)

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

    let age = today.getFullYear() - birthDate.getFullYear()

    const monthDiff =
      today.getMonth() - birthDate.getMonth()

    if (
      monthDiff < 0 ||
      (
        monthDiff === 0 &&
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

    const birthDate = new Date(value)

    const today = new Date()

    let calculatedAge =
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
      calculatedAge--
    }

    setStudent({
      ...student,
      dateOfBirth: value,
      age: calculatedAge > 0 ? calculatedAge : 0
    })

    return
  }

  setStudent({
    ...student,
    [name]: value
  })
}

  const resetForm = () => {

    setStudent({
      name: '',
      dateOfBirth: '',
      gender: '',
      age: '',
      email: '',
      phoneNumber: ''
    })

    setEditingStudent(null)

    closeForm()
  }

  const validateForm = () => {

    if (
      !student.name ||
      !student.dateOfBirth ||
      !student.gender
    ) {

      toast.error('Please fill all required fields')

      return false
    }

    if (student.age <= 0) {

      toast.error('Invalid age')

      return false
    }

    if (
      student.phoneNumber &&
      student.phoneNumber.length < 10
    ) {

      toast.error('Phone number should be minimum 10 digits')

      return false
    }

    return true
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

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

      resetForm()

      refreshStudents()

    } catch (error) {

      if (error.response?.data?.message) {

  toast.error(error.response.data.message)

} else {

  toast.error('Something went wrong')
}

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">

      <ToastContainer />

      <h4 className="fw-bold mb-4">
        {editingStudent
          ? 'Edit Student'
          : 'Add Student'}
      </h4>

      <form onSubmit={handleSubmit}>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label className="form-label">Name</label>

            <input
              type="text"
              name="name"
              className="form-control rounded-3"
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
              className="form-control rounded-3"
              value={student.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Gender</label>

            <select
              name="gender"
              className="form-select rounded-3"
              value={student.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Age</label>

            <input
              type="number"
              name="age"
              className="form-control rounded-3"
              value={student.age}
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              name="email"
              className="form-control rounded-3"
              value={student.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Phone Number
            </label>

            <input
              type="text"
              name="phoneNumber"
              className="form-control rounded-3"
              value={student.phoneNumber}
              onChange={handleChange}
            />
          </div>

        </div>

        <button
          className="btn btn-success px-4 rounded-pill me-2"
          disabled={loading}
        >
          {loading
            ? 'Processing...'
            : editingStudent
              ? 'Update Student'
              : 'Add Student'}
        </button>

        <button
          type="button"
          className="btn btn-secondary rounded-pill"
          onClick={resetForm}
        >
          Cancel
        </button>

      </form>

    </div>
  )
}

export default AddStudentForm