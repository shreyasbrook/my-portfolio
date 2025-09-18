package com.example.demo21;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    public class Student{
        @RequestMapping("/welcome")
        public String Greet(){
            return "welcome to sdm college";
        }

        @RequestMapping("/bye")
        public String Bye(){
            return "thank you for visiting SDM college";
        }

    }


