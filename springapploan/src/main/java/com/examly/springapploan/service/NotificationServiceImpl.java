package com.examly.springapploan.service;

import com.examly.springapploan.model.Notification;
import com.examly.springapploan.repository.NotificationRepository;
import com.examly.springapploan.service.NotificationService;

import java.util.List;

import com.examly.springapploan.exception.LoanDetailsNotFoundException;

import lombok.*;
import jakarta.validation.Valid;

import org.springframework.stereotype.*;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<Notification> fetchAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public Notification addNewNotification(@Valid Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public Notification updateNotification(Long notificationId, @Valid Notification notification) {
        notificationRepository.findByNotificationId(notificationId).orElseThrow(
                () -> new LoanDetailsNotFoundException("cannot perform update, as this notification not exists"));

        Notification updateNotification = Notification
                .builder()
                .message(null)
                .isRead(notification.isRead())
                .loan(notification.getLoan())
                .loanDisbursement(notification.getLoanDisbursement())
                .loanApplication(notification.getLoanApplication())
                .build();

        return notificationRepository.save(updateNotification);
    }
}
