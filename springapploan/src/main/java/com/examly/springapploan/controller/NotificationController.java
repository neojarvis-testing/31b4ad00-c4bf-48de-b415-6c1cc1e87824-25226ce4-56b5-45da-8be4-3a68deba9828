package com.examly.springapploan.controller;

import com.examly.springapploan.model.Notification;
import com.examly.springapploan.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import lombok.*;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;


    @GetMapping
    public ResponseEntity<?> getAllNotifications() {
        List<Notification> notifications = notificationService.fetchAllNotifications();
        if(notifications == null) {
            return ResponseEntity.status(500).body("unable to fetch loan notifications at this moment");
        }
        return ResponseEntity.status(200).body(notifications);
    }

    @PostMapping
    @PreAuthorize("hasRole('BRANCH MANAGER')")
    public ResponseEntity<String> createNewNotification(@Valid @RequestBody Notification notification) {
        Notification savedNotification = notificationService.addNewNotification(notification);

        if(savedNotification == null) {
            return ResponseEntity.status(500).body("unable to create the notification. please try again later");
        }
        return ResponseEntity.status(201).body("Notification created successfully");
    }

    @PutMapping("/{notificationId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> updateNotification(@PathVariable("notificationId") Long notificationId, @Valid @RequestBody Notification notification) {

        Notification updatedNotification = notificationService.updateNotification(notificationId, notification);
        if(updatedNotification == null) {
            return ResponseEntity.status(500).body("unable to update the notification. please try again later");
        }
        return ResponseEntity.status(201).body("Notification updated successfully");
    }
}
