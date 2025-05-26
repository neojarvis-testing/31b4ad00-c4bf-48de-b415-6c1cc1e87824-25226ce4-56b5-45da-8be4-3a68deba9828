package com.examly.springapploan.repository;

import org.springframework.stereotype.*;
import com.examly.springapploan.model.Notification;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {

    Optional<Notification> findByNotificationId(Long notificationId);
}
