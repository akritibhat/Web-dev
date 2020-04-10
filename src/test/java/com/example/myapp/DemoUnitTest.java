package com.example.myapp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@Mock
  private HelloService helloService;

@Test
  public void shouldRetrieveAnEntity() {
    // Given
    Mockito.when(this.helloService.findAllHellos()).thenReturn(null);
    // When
    ResponseEntity<String> actualResponse = this.demoController.findAllHellos();
    // Then
  }

}
