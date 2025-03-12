import { useState, useEffect } from 'react';
import { Property } from '@/data/properties';

export interface Notification {
  id: string;
  type: 'price_drop' | 'price_increase' | 'availability' | 'system';
  title: string;
  message: string;
  propertyId?: string;
  createdAt: Date;
  isRead: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // 初期化時にローカルストレージから通知を取得
  useEffect(() => {
    const storedNotifications = localStorage.getItem('timedrop-notifications');
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications);
        // 日付文字列をDateオブジェクトに変換
        const formattedNotifications = parsedNotifications.map((notification: any) => ({
          ...notification,
          createdAt: new Date(notification.createdAt)
        }));
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error('Failed to parse notifications from localStorage', error);
        localStorage.removeItem('timedrop-notifications');
      }
    } else {
      // 初期通知を作成
      const initialNotifications: Notification[] = [
        {
          id: 'welcome',
          type: 'system',
          title: 'TimeDrop へようこそ',
          message: '時間とともに変わる宿泊予約サービスをお楽しみください。',
          createdAt: new Date(),
          isRead: false
        }
      ];
      setNotifications(initialNotifications);
      localStorage.setItem('timedrop-notifications', JSON.stringify(initialNotifications));
    }
  }, []);

  // 通知を保存
  const saveNotifications = (updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications);
    localStorage.setItem('timedrop-notifications', JSON.stringify(updatedNotifications));
  };

  // 新しい通知を追加
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}`,
      createdAt: new Date(),
      isRead: false
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    saveNotifications(updatedNotifications);
    return newNotification;
  };

  // 通知を既読にする
  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId ? { ...notification, isRead: true } : notification
    );
    saveNotifications(updatedNotifications);
  };

  // すべての通知を既読にする
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, isRead: true }));
    saveNotifications(updatedNotifications);
  };

  // 通知を削除
  const removeNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
    saveNotifications(updatedNotifications);
  };

  // すべての通知を削除
  const clearAllNotifications = () => {
    saveNotifications([]);
  };

  // 価格変動通知を作成（ウォッチリストの物件用）
  const createPriceDropNotification = (property: Property, oldPrice: number, newPrice: number) => {
    const percentDrop = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    
    return addNotification({
      type: 'price_drop',
      title: `${property.name}の価格が下がりました`,
      message: `価格が¥${oldPrice.toLocaleString()}から¥${newPrice.toLocaleString()}に下がりました（${percentDrop}%オフ）`,
      propertyId: property.id
    });
  };

  // 未読通知の数を取得
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.isRead).length;
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    createPriceDropNotification,
    getUnreadCount
  };
};