package com.example.myapp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { Application.class })
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class DemoApplicationTests {

	@Test
	public void testfindAllHellos() {
		
		String body = RestAssured.
      given().
        accept(ContentType.JSON).
      when().
        get("/api/hello").
      then().
        statusCode(HttpStatus.SC_OK).
        contentType(ContentType.JSON).
        extract().asString();
    Assert.assertThat(body, Matchers.equalTo("Retrieved entity with id: blah"));
	}

}
