package com.kevharv.idm.ldap;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class LdapApplication {
    public static void main(String[] args) {
      SpringApplication.run(LdapApplication.class, args);
    }
    
    @GetMapping("/healthcheck")
    public String hello(@RequestParam(value = "ping", defaultValue = "PONG") String ping) {
      return String.format("%s", ping);
    }
}