package com.examly.springappuser.service;

import org.springframework.stereotype.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.examly.springappuser.model.User;
import com.examly.springappuser.model.LoginDTO;
import com.examly.springappuser.repository.UserRepo;
import com.examly.springappuser.service.JWTUtil;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private final String[] roles={"CUSTOMER","LOAN MANAGER","BRANCH MANAGER"};

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    public Map<String,Object> loginUserByEmailId(LoginDTO loginDTO){
        Map<String,Object> res = new HashMap<>();
        User userByEmail=userRepo.findByEmailId(loginDTO.getEmailId()).orElse(null);
        if(userByEmail !=null && userByEmail.getPassword().equals(loginDTO.getPassword())){
            String jwt_token= jwtUtil.generateToken(userByEmail.getEmailId());
            res.put("status","success");
            res.put("token",jwt_token);
        }else{
            throw new RuntimeException("Invalid Credentials");
        }
        return res;
    }

    @Override
    public User registerUser(User user){
        if(!Arrays.asList(roles).contains(user.getUserRole())){
            throw new IllegalArgumentException("Invalid user role");
        }

        if(user.getUserName()==null || user.getEmailId()==null 
        || user.getPassword()==null || user.getMobileNumber()==null || user.getUserRole()==null){
            throw new RuntimeException("Missing Required Field");
        }
        return userRepo.save(user);
    }

    @Override
    public User getUserByEmailId(String emailId){
        Optional<User>user=userRepo.findByEmailId(emailId);
        if(user.isEmpty()){
            return null;
        }
        return user.get();
    }
}
