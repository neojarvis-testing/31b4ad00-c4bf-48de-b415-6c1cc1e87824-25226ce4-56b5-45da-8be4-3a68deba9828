package com.examly.springapploan.service;

import java.util.List;

import com.examly.springapploan.model.Notification;

public interface NotificationService {
    public List<Notification> fetchAllNotifications();
    public Notification addNewNotification(Notification notification);
    public Notification updateNotification(Long notificationId, Notification notification);
}
