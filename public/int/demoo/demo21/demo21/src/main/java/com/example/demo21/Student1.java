package com.example.demo21;

import org.springframework.beans.factory.annotation.Autowired;
//setter dependency.
public class Student1{
    private Teacher teacher;
    @Autowired
    public void setTeacher(Teacher teacher)
    {
        this.teacher=teacher;
    }
    public void Greet(){
        teacher.Hello();
        System.out.println("Hello from Student class");
    }
}

