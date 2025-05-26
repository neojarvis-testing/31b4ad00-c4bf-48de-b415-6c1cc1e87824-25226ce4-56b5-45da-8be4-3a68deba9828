package repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import model.User;

@Repository
public interface UserRepo extends JpaRepository<User,Integer>{
    Optional<User> findByEmailId(String emailId);
}
