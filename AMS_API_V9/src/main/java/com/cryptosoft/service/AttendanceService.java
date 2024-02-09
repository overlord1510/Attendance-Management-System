package com.cryptosoft.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cryptosoft.dtos.AssignAttendanceRequest;
import com.cryptosoft.dtos.BatchesOfInstructor;
import com.cryptosoft.dtos.CourseAttendance;
import com.cryptosoft.entity.Attendance;
import com.cryptosoft.entity.Batch;
import com.cryptosoft.entity.Course;
import com.cryptosoft.entity.Instructor;
import com.cryptosoft.entity.Student;
import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.repository.AttendanceRepository;
import com.cryptosoft.repository.BatchRepository;
import com.cryptosoft.repository.CourseRepository;
import com.cryptosoft.repository.InstructorRepository;
import com.cryptosoft.repository.StudentRepository;
import com.cryptosoft.repository.UserAuthRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AttendanceService {

	private final InstructorRepository instructorRepository;
	private final UserAuthRepository authRepository;
	private final StudentRepository studentRepository;
	private final CourseRepository courseRepository;
	private final BatchRepository batchRepository;
	private final AttendanceRepository attendanceRepository;

	public List<BatchesOfInstructor> getInstructorBatches(String email) throws EntityNotFoundException {

		UserAuth userAuth = authRepository.findByEmail(email)
				.orElseThrow(() -> new EntityNotFoundException("Instructor not found with email :" + email));

		Instructor instructor = instructorRepository.findByUserAuth(userAuth)
				.orElseThrow(() -> new EntityNotFoundException("Instructor not found with email :" + email));
		List<BatchesOfInstructor> batchList = new ArrayList<BatchesOfInstructor>();
		instructor.getCourses().forEach((course) -> {
			instructor.getBatches().forEach((batch) -> {
				if (batch.getCourses().contains(course)) {
					// @formatter:off
					batchList.add(BatchesOfInstructor.builder()
							.batchId(batch.getId())
							.batchName(batch.getBatchName())
							.batchType(batch.getBatchType())
							.department(batch.getDepartment())
							.semester(batch.getSemester())
							.CourseId(course.getId())
							.CourseName(course.getCourseName())
							.build()); 
					// @formatter:on

				}
			});
		});

		System.out.println(batchList);
		return batchList;
	}

	public void assignAttendance(AssignAttendanceRequest assignAttendanceRequest) {

		List<Student> allStudents = studentRepository.findAllByBatchesId(assignAttendanceRequest.getBatchId());
		// possibly put below student inside try catch
		List<Student> presentStudents = studentRepository.findAllById(assignAttendanceRequest.getStudentIds());
		Course course = courseRepository.getReferenceById(assignAttendanceRequest.getCourseId());
		Batch batch = batchRepository.getReferenceById(assignAttendanceRequest.getBatchId());

		ArrayList<Attendance> attendance = new ArrayList<Attendance>();

		allStudents.forEach(student -> {
			// @formatter:off
			Attendance attendee = Attendance.builder()
					.student(student)
					.course(course)
					.batch(batch)
					.date(assignAttendanceRequest.getDate())
					.present(presentStudents.contains(student))
					.build();
			// @formatter:on
			attendance.add(attendee);

		});
		attendanceRepository.saveAll(attendance);

	}

	public List<CourseAttendance> getCompleteAttendanceByEmail(String email) {
		// Find the student by email
		Student student = studentRepository.findByUserAuthEmail(email)
				.orElseThrow(() -> new EntityNotFoundException("Student not found with email: " + email));

		// Retrieve all attendance records for the student
		List<Attendance> attendanceRecords = attendanceRepository.findByStudentId(student.getId());

		HashMap<Integer, CourseAttendance> attendanceMap = new HashMap<Integer, CourseAttendance>();

		// Group attendance records by courses
		attendanceRecords.forEach((attendance) -> {

			
			if (attendanceMap.containsKey(attendance.getCourse().getId())) {
				CourseAttendance course = attendanceMap.get(attendance.getCourse().getId());
				course.setTotalDays(course.getTotalDays()+1);
				course.setDaysPresent((attendance.isPresent())?course.getDaysPresent()+1:course.getDaysPresent());
				attendanceMap.put(attendance.getCourse().getId(), course);
			}else {
				// @formatter:off
				attendanceMap.put(attendance.getCourse().getId(), CourseAttendance.builder()
						.id(attendance.getCourse().getId())
						.courseName(attendance.getCourse().getCourseName())
						.courseCode(attendance.getCourse().getCourseCode())
						.courseType(attendance.getCourse().getCourseType())
						.daysPresent((attendance.isPresent())?1:0)
						.totalDays(1)
						.build());
				// @formatter:on
			}
		});

		ArrayList<CourseAttendance> completeAttendance = new ArrayList<CourseAttendance>();
		
		for (Map.Entry<Integer, CourseAttendance> entry : attendanceMap.entrySet()) {
			completeAttendance.add(entry.getValue());
		}
		
		return completeAttendance;
	}

}
