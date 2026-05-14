using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementAPI.Data;
using StudentManagementAPI.Models;

namespace StudentManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL STUDENTS

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        // ADD STUDENT

        [HttpPost]
        public async Task<ActionResult<Student>> AddStudent(Student student)
        {
            // CHECK DUPLICATE EMAIL

            var existingEmail = await _context.Students
                .FirstOrDefaultAsync(
                    s => s.Email == student.Email
                );

            if (existingEmail != null)
            {
                return BadRequest(
                    new
                    {
                        message =
                            "Email already exists. Please use another email."
                    }
                );
            }

            // CHECK DUPLICATE PHONE NUMBER

            var existingPhone = await _context.Students
                .FirstOrDefaultAsync(
                    s => s.PhoneNumber == student.PhoneNumber
                );

            if (existingPhone != null)
            {
                return BadRequest(
                    new
                    {
                        message =
                            "Phone number already exists. Please use another number."
                    }
                );
            }

            _context.Students.Add(student);

            await _context.SaveChangesAsync();

            return Ok(student);
        }

        // UPDATE STUDENT

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(
            int id,
            Student updatedStudent
        )
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            // CHECK DUPLICATE EMAIL

            var emailExists = await _context.Students
                .AnyAsync(
                    s =>
                        s.Email == updatedStudent.Email &&
                        s.Id != id
                );

            if (emailExists)
            {
                return BadRequest(
                    new
                    {
                        message =
                            "Email already exists. Please use another email."
                    }
                );
            }

            // CHECK DUPLICATE PHONE NUMBER

            var phoneExists = await _context.Students
                .AnyAsync(
                    s =>
                        s.PhoneNumber == updatedStudent.PhoneNumber &&
                        s.Id != id
                );

            if (phoneExists)
            {
                return BadRequest(
                    new
                    {
                        message =
                            "Phone number already exists. Please use another number."
                    }
                );
            }

            student.Name = updatedStudent.Name;

            student.DateOfBirth =
                updatedStudent.DateOfBirth;

            student.Gender =
                updatedStudent.Gender;

            student.Age =
                updatedStudent.Age;

            student.Email =
                updatedStudent.Email;

            student.PhoneNumber =
                updatedStudent.PhoneNumber;

            await _context.SaveChangesAsync();

            return Ok(student);
        }

        // DELETE STUDENT

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}