package com.example.demo21;

public class Student2 {
    public Teacher teacher;

    public Student2(Teacher teacher) {
        this.teacher = teacher;
    }

    public void Greet() {
        teacher.Hello();
        System.out.println("hello from student");
    }
}
