package com.examly.springappuser.service;

import java.util.Map;

import com.examly.springappuser.model.User;
import com.examly.springappuser.model.LoginDTO;

public interface UserService {

   User registerUser(User user);

   Map<String,Object> loginUserByEmailId(LoginDTO loginDTO);

   User getUserByEmailId(String emailId);
}
