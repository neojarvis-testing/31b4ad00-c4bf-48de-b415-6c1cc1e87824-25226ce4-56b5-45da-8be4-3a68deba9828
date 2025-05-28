package com.examly.springappuser.controller;

import org.springframework.web.bind.annotation.*;

import com.examly.springappuser.model.LoginDTO;
import com.examly.springappuser.model.User;
import com.examly.springappuser.service.UserService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/users/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
        // System.out.println("login request received");
        try{
            return ResponseEntity.ok(userService.loginUserByEmailId(loginDTO));
        }
        catch(RuntimeException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        System.out.println("request received");
        try{
            String status= userService.registerUser(user);
            if(status=="User Registered Successfully"){
                return ResponseEntity.status(HttpStatus.CREATED).body("OK");
            }else{
                return ResponseEntity.status(400).body("User Already Exists");
            }
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch(RuntimeException e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    } 

    @GetMapping("/user/byEmail/{emailId}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String emailId){
        User user= userService.getUserByEmailId(emailId);
        return ResponseEntity.ok(user);
    }

}
