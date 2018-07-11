package webdev.services;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import webdev.models.User;
import webdev.repositories.UserRepository;

@RestController
public class UserService {
	@Autowired
	UserRepository repository;
	
	@DeleteMapping("/api/user/{userId}")
	public void deleteUser(@PathVariable("userId") int id) {
		repository.deleteById(id);
	}
	
	@PostMapping("/api/user")
	public User createUser(@RequestBody User user, HttpSession session) {
		User cu= repository.save(user);
		session.setAttribute("currentUser", cu);
		return cu;
	}
	
	@GetMapping("/checkLogin")
	public User checkLogin(HttpSession session) {
		User currentUser = (User) session.getAttribute("currentUser");
		return findUserById(currentUser.getId());
	}
	
	@PostMapping("/api/login")
	public List<User> login(@RequestBody User user, HttpSession session) {
		System.out.println(checkLogin(session).getUsername());
		return (List<User>) repository.findUserByCredentials(user.getUsername(), user.getPassword());
	}
	
	@PostMapping("/api/logout")
	public void logout(HttpSession session) {
		session.invalidate();
	}
	
	@PostMapping("/login")
	public User loginUser(@RequestBody User user, HttpSession session) {
		User cu= repository.findUser(user.getUsername(), user.getPassword());
		session.setAttribute("currentUser", cu);
		return cu;
		 
	}
	
	@GetMapping("/api/user")
	public List<User> findAllUsers() {
		return (List<User>) repository.findAll();
	}
	
	@PutMapping("/api/user/{userId}")
	public User updateUser(@PathVariable("userId") int userId, @RequestBody User newUser) {
		Optional<User> data = repository.findById(userId);
		if(data.isPresent()) {
			User user = data.get();
			user.setPassword(newUser.getPassword());
			user.setFirstName(newUser.getFirstName());
			user.setLastName(newUser.getLastName());
			user.setEmail(newUser.getEmail());
			user.setDateOfBirth(newUser.getDateOfBirth());
			user.setContact(newUser.getContact());
			user.setRole(newUser.getRole());
			repository.save(user);
			return user;
		}
		return null;
	}
	
	@PutMapping("/api/profile")
	public User updateProfile(@RequestBody User newUser, HttpSession session) {
		User currentUser = (User) session.getAttribute("currentUser"); 
		User user = findUserById(currentUser.getId());
		if(user != null) {
			user.setPassword(newUser.getPassword());
			user.setFirstName(newUser.getFirstName());
			user.setLastName(newUser.getLastName());
			user.setEmail(newUser.getEmail());
			user.setDateOfBirth(newUser.getDateOfBirth());
			user.setContact(newUser.getContact());
			user.setRole(newUser.getRole());
			repository.save(user);
			return user;
		}
		return null;
	}
	
	@PutMapping("/api/user/admin/{userId}")
	public User updateUserProfile(@PathVariable("userId") int userId, @RequestBody User newUser) {
		Optional<User> data = repository.findById(userId);
		if(data.isPresent()) {
			User user = data.get();
			user.setUsername(newUser.getUsername());
			user.setPassword(newUser.getPassword());
			user.setFirstName(newUser.getFirstName());
			user.setLastName(newUser.getLastName());
			user.setRole(newUser.getRole());
			repository.save(user);
			return user;
		}
		return null;
	}
	
	@GetMapping("/api/user/{userId}")
	public User findUserById(@PathVariable("userId") int userId) {
		Optional<User> data = repository.findById(userId);
		if(data.isPresent()) {
			return data.get();
		}
		return null;
	}
}
