package controller;

import org.springframework.web.bind.annotation.*;

import model.LoginDTO;
import model.User;
import service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/users/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
        try{
            return ResponseEntity.ok(userService.loginUserByEmailId(loginDTO));
        }
        catch(RuntimeException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/user/register")
    public ResponseEntity<String> registerUser(@RequestBody User user){
        try{
            userService.registerUser(user);
            return ResponseEntity.status(201).body("OK");
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch(RuntimeException e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    } 

    @GetMapping("/user/byEmail")
    public ResponseEntity<User> getUserByEmail(@RequestParam String emailId){
        User user= userService.getUserByEmailId(emailId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/user/check")
    public String hello(){
        return "Hello World";
    }
}
