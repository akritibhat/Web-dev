package webdev.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import webdev.models.Widget;

public interface WidgetRepository
extends CrudRepository<Widget, Integer>{
@Query("SELECT w FROM Widget w JOIN w.topic t WHERE t.id =:tid ORDER BY w.orderNumber")
Iterable<Widget> findWidgetsForTopic(@Param("tid") int tid);
}
