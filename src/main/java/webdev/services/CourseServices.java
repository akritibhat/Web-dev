package webdev.services;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import webdev.models.Course;
import webdev.models.User;
import webdev.repositories.CourseRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class CourseServices {
	@Autowired
	CourseRepository courseRepository;

	@GetMapping("/api/course")
	public Iterable<Course> findAllCourses() {
		Iterable<Course> temp=  courseRepository.findAll(); 
		return temp;
	}

	@PostMapping("/api/course")
	public Course createCourse(@RequestBody Course course) {
		if(course==null)
			course=new Course();
		if(course.getTitle()== null || course.getTitle().length()<=0)
			course.setTitle("New Course");
		course.setModified(new Date());
		return courseRepository.save(course);
	}

	@DeleteMapping("/api/course/{courseId}")
	public void deleteCourse(@PathVariable("courseId") int id) {
		courseRepository.deleteById(id);
	}

	@PutMapping("/api/course/{courseId}")
	public Course updateCourse(@PathVariable("courseId") int courseId, @RequestBody Course newCourse) {
		Optional<Course> data = courseRepository.findById(courseId);
		if (data.isPresent()) {
			Course course = data.get();
			course.setModified(new Date());
			course.setTitle(newCourse.getTitle());
			course.setModules(newCourse.getModules());
			if(course.getTitle()==null || course.getTitle().length()<=0)
				course.setTitle("Default Course");
			courseRepository.save(course);
			return course;
		}
		return null;
	}
	
	@GetMapping("/api/course/{courseId}")
	public Course findCourseById(@PathVariable("courseId") int courseId) {
		Optional<Course> data = courseRepository.findById(courseId);
		if (data.isPresent()) {
			return data.get();
		}
		return null;
	}
}
