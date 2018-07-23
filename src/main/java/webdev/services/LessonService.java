package webdev.services;

import java.util.List;
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
import webdev.models.Lesson;
import webdev.models.Module;
import webdev.repositories.CourseRepository;
import webdev.repositories.LessonRepository;
import webdev.repositories.ModuleRepository;

@RestController
@CrossOrigin(origins = "*")
public class LessonService {

	@Autowired
	LessonRepository lessonRepository;

	@Autowired
	ModuleRepository moduleRepository;

	@Autowired
	CourseRepository courseRepository;

	@GetMapping("/api/lesson")
	public List<Lesson> findAllLessons() {
		return (List<Lesson>) lessonRepository.findAll();
	}

	@GetMapping("/api/course/{cid}/module/{mid}/lesson")
	public List<Lesson> findAllLessonsForModule(@PathVariable(name = "mid") int moduleId, @PathVariable(name = "cid") int courseId) {
		Optional<Module> optionalModule = moduleRepository.findById(moduleId);
		if (optionalModule.isPresent()) {
			Module module = optionalModule.get();
			return (List<Lesson>) module.getLessons();
		}
		return null;
	}

	@PostMapping("/api/course/{cid}/module/{mid}/lesson")
	public Lesson createLesson(@PathVariable(name = "mid") int moduleId, @PathVariable(name = "cid") int courseId, @RequestBody Lesson newLesson) {
		Optional<Module> data = moduleRepository.findById(moduleId);

		if (data.isPresent()) {
			Module module = data.get();
			if(newLesson==null)
				newLesson=new Lesson();
			if(newLesson.getTitle()== null || newLesson.getTitle().length()<=0)
				newLesson.setTitle("New Lesson");
			newLesson.setModule(module);
			return lessonRepository.save(newLesson);
		}
		return null;
	}

	

	@DeleteMapping("/api/lesson/{lessonId}")
	public void deleteLesson(@PathVariable("lessonId") int lessonId) {
		lessonRepository.deleteById(lessonId);
	}

	@GetMapping("/api/lesson/{lessonId}")
	public Lesson findLessonById(@PathVariable("lessonId") int lessonId) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		if (data.isPresent()) {
			return data.get();
		}
		return null;
	}

	@PutMapping("/api/lesson/{lessonId}")
	public Lesson updateLesson(@PathVariable("lessonId") int lessonId, @RequestBody Lesson newLesson) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);
		if (data.isPresent()) {
			Lesson lesson = data.get();
			lesson.setTitle(newLesson.getTitle());
			if(lesson.getTitle()==null || lesson.getTitle().length()<=0)
				lesson.setTitle("Default lesson");
			lessonRepository.save(lesson);
			return lesson;
		}
		return null;
	}

}
