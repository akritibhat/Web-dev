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

import webdev.models.Lesson;
import webdev.models.Topic;
import webdev.models.Widget;
import webdev.repositories.TopicRepository;
import webdev.repositories.WidgetRepository;

@RestController
@CrossOrigin(origins = "*")
public class WidgetService {
	@Autowired
	WidgetRepository repository;
	@Autowired
	TopicRepository topicRepository;

	@GetMapping("/api/topic/{topicId}/widget")
	public List<Widget> findAllWidgetsForTopic(@PathVariable("topicId") int topicId) {
		Optional<Topic> optionalTopic = topicRepository.findById(topicId);
		if (optionalTopic.isPresent()) {
			Topic topic = optionalTopic.get();
			return topic.getWidgets();
		}
		return null;
	}

	@PostMapping("/api/topic/{topicId}/widget")
	public Widget createWidget(@PathVariable(name = "topicId") int topicId, @RequestBody Widget newWidget) {
		Optional<Topic> data = topicRepository.findById(topicId);

		if (data.isPresent()) {
			Topic topic = data.get();

			newWidget.setTopic(topic);
			return repository.save(newWidget);
		}
		return null;
	}

	@PostMapping("/api/topic/{topicId}/widgets")
	public void saveAllWidgetsForTopic(@PathVariable("topicId") int topicId, @RequestBody List<Widget> widgets) {
		Optional<Topic> data = topicRepository.findById(topicId);
		if (data.isPresent()) {
			Topic topic = data.get();
			List<Widget> temp = topic.getWidgets();
			for (Widget widget : temp) {
				repository.delete(widget);
			}
			for (Widget widget : widgets) {
				widget.setTopic(topic);
				repository.save(widget);
			}
		}

	}

	@PostMapping("/api/widget/save")
	public void saveAllWidgets(@RequestBody List<Widget> widgets) {
		repository.deleteAll();
		for (Widget widget : widgets) {
			repository.save(widget);
		}
	}

	@PutMapping("/api/widget/{widgetId}")
	public Widget updateWidget(@PathVariable("widgetId") int widgetId, @RequestBody Widget newWidget) {
		Optional<Widget> widgetData = repository.findById(widgetId);
		if (widgetData.isPresent()) {
			Widget widget = widgetData.get();
			widget.setName(newWidget.getName());
			widget.setOrderNumber(newWidget.getOrderNumber());
			widget.setStyle(newWidget.getStyle());
			widget.setText(newWidget.getText());
			widget.setTopic(newWidget.getTopic());
			widget.setWidgetType(newWidget.getWidgetType());
			widget.setLink(newWidget.getLink());
			widget.setSize(newWidget.getSize());
			return repository.save(widget);
		} else {
			return new Widget();
		}
	}

	@GetMapping("/api/widget")
	public List<Widget> findAllWidgets() {
		return (List<Widget>) repository.findAll();
	}
	
	@GetMapping("/api/widget/{widgetId}")
	public Widget getWidgetById(@PathVariable("widgetId") int widgetId) {
		Optional<Widget> widgetData = repository.findById(widgetId);
		if (widgetData.isPresent()) {
			Widget widget = widgetData.get();
			return widget;
		}
		return new Widget();
	}

	@DeleteMapping("/api/widget/{widgetId}")
	public void deleteWidget(@PathVariable("widgetId") int widgetId) {
		repository.deleteById(widgetId);
	}
}
