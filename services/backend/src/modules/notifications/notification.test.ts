import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import notificationController from './notification.controller.js';
import Notification from './notification.model.js';
import { notificationEmitter } from './notification.emitter.js';

describe('Notification Controller Unit Tests', () => {
  const mockUserId = '60d0fe4f5311236168a109ca';
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    jest.restoreAllMocks();
    mockReq = {
      user: { userId: mockUserId },
      query: {},
      params: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      setHeader: jest.fn().mockReturnThis(),
      write: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    };
  });

  it('should get notifications list with pagination and unread counts', async () => {
    const mockList = [
      { _id: 'n1', title: 'Achievement unlocked', type: 'achievement' },
      { _id: 'n2', title: 'Lesson completed', type: 'lesson' },
    ];
    
    (jest.spyOn(Notification, 'find') as any).mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn(() => Promise.resolve(mockList as any)),
        }),
      }),
    });

    jest.spyOn(Notification, 'countDocuments')
      .mockResolvedValueOnce(2)   // total
      .mockResolvedValueOnce(1);  // unreadCount

    await notificationController.getNotifications(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        notifications: mockList,
        total: 2,
        unreadCount: 1,
        page: 1,
        pages: 1,
      })
    );
  });

  it('should mark a specific notification as read', async () => {
    const mockNotif = { _id: 'n1', userId: mockUserId, isRead: true };
    mockReq.params.id = 'n1';

    jest.spyOn(Notification, 'findOneAndUpdate').mockResolvedValue(mockNotif as any);

    await notificationController.markAsRead(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Marked as read',
        notification: mockNotif,
      })
    );
  });

  it('should mark all notifications as read', async () => {
    jest.spyOn(Notification, 'updateMany').mockResolvedValue({} as any);

    await notificationController.markAllAsRead(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'All notifications marked as read',
    });
  });

  it('should calculate correct notification stats and insights', async () => {
    jest.spyOn(Notification, 'countDocuments')
      .mockResolvedValueOnce(10) // total
      .mockResolvedValueOnce(4)  // unread
      .mockResolvedValueOnce(3)  // achievements
      .mockResolvedValueOnce(2)  // reminders
      .mockResolvedValueOnce(5)  // this week
      .mockResolvedValueOnce(1); // lessons completed

    const mockXpNotifications = [
      { metadata: { xpEarned: 100 } },
      { metadata: { xpEarned: 240 } },
    ];
    jest.spyOn(Notification, 'find').mockResolvedValue(mockXpNotifications as any);

    await notificationController.getNotificationStats(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      total: 10,
      unreadCount: 4,
      achievementsCount: 3,
      remindersCount: 2,
      insights: {
        notificationsThisWeek: 5,
        lessonsCompletedCount: 1,
        xpEarned: 340,
      },
    });
  });

  it('should clear all notifications history for a user', async () => {
    jest.spyOn(Notification, 'deleteMany').mockResolvedValue({} as any);

    await notificationController.clearHistory(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Notification history cleared',
    });
  });

  it('should export notifications activity log in JSON and CSV formats', async () => {
    const mockList = [
      { _id: 'n1', type: 'lesson', title: 'Lesson A', message: 'Message A', isRead: false, createdAt: new Date() },
    ];
    (jest.spyOn(Notification, 'find') as any).mockReturnValue({
      sort: jest.fn(() => Promise.resolve(mockList as any)),
    });

    // Test JSON export
    await notificationController.exportActivity(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockList);

    // Test CSV export
    mockReq.query.format = 'csv';
    await notificationController.exportActivity(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalled();
  });

  it('should initialize SSE stream and push dynamic updates', async () => {
    let closeCallback: any;
    mockReq.on = jest.fn((event: any, callback: any) => {
      if (event === 'close') {
        closeCallback = callback;
      }
    });

    // Call streamNotifications
    await notificationController.streamNotifications(mockReq, mockRes);

    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/event-stream');
    expect(mockRes.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache');
    expect(mockRes.setHeader).toHaveBeenCalledWith('Connection', 'keep-alive');

    // Emit a mock notification
    const testNotification = {
      userId: mockUserId,
      type: 'achievement',
      title: 'Streak Increased!',
      message: 'You achieved a 3-day streak!',
    };

    notificationEmitter.emit('new_notification', testNotification);

    // Verify it writes the notification payload to client connection
    expect(mockRes.write).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify(testNotification))
    );

    // Trigger the close event to clear the heartbeat interval
    if (closeCallback) {
      closeCallback();
    }
  });
});
