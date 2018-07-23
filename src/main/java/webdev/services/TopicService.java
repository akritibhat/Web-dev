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
import webdev.models.Topic;
import webdev.repositories.CourseRepository;
import webdev.repositories.LessonRepository;
import webdev.repositories.ModuleRepository;
import webdev.repositories.TopicRepository;

@RestController
@CrossOrigin(origins = "*")
public class TopicService {

	@Autowired
	LessonRepository lessonRepository;

	@Autowired
	ModuleRepository moduleRepository;

	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	TopicRepository topicRepository;

	@GetMapping("/api/topic")
	public List<Topic> findAllTopics() {
		return (List<Topic>) topicRepository.findAll();
	}

	@GetMapping("/api/lesson/{lid}/topic")
	public List<Topic> findAllTopicsForLesson(@PathVariable(name = "lid") int lessonId) {
		Optional<Lesson> optionalModule = lessonRepository.findById(lessonId);
		if (optionalModule.isPresent()) {
			Lesson lesson = optionalModule.get();
			return (List<Topic>) lesson.getTopics();
		}
		return null;
	}

	@PostMapping("/api/lesson/{lid}/topic")
	public Topic createTopic(@PathVariable(name = "lid") int lessonId, @RequestBody Topic newTopic) {
		Optional<Lesson> data = lessonRepository.findById(lessonId);

		if (data.isPresent()) {
			Lesson lesson = data.get();
			if(newTopic==null)
				newTopic=new Topic();
			if(newTopic.getTitle()== null || newTopic.getTitle().length()<=0)
				newTopic.setTitle("New Topic");
			newTopic.setLesson(lesson);
			return topicRepository.save(newTopic);
		}
		return null;
	}

	

	@DeleteMapping("/api/topic/{tid}")
	public void deleteTopic(@PathVariable("tid") int topicId) {
		topicRepository.deleteById(topicId);
	}
	
	@PutMapping("/api/topic/{tid}")
	public Topic updateTopic(@PathVariable("tid") int topicId, @RequestBody Topic newTopic) {
		Optional<Topic> data = topicRepository.findById(topicId);
		if (data.isPresent()) {
			Topic topic = data.get();
			topic.setTitle(newTopic.getTitle());
			if(topic.getTitle()==null || topic.getTitle().length()<=0)
				topic.setTitle("Default Topic");
			topicRepository.save(topic);
			return topic;
		}
		return null;
	}

	@GetMapping("/api/topic/{tid}")
	public Topic findTopicById(@PathVariable("tid") int topicId) {
		Optional<Topic> data = topicRepository.findById(topicId);
		if (data.isPresent()) {
			return data.get();
		}
		return null;
	}


}
