package service;

import java.util.Map;

import model.User;
import model.LoginDTO;

public interface UserService {

   User registerUser(User user);

   Map<String,Object> loginUserByEmailId(LoginDTO loginDTO);

   User getUserByEmailId(String emailId);
}
