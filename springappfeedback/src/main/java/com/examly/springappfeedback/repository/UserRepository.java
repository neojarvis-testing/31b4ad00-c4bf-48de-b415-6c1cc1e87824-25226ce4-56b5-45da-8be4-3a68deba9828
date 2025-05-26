package com.examly.springappfeedback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springappfeedback.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
