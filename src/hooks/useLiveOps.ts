import { useState, useEffect } from 'react';
import { Order, Alert } from '../types';

export function useLiveOps() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [counts, setCounts] = useState({
    foodics: 42,
    talabat: 18,
    breadfast: 7,
    insta: 4
  });

  useEffect(() => {
    const platforms: Order['platform'][] = ['Talabat', 'Foodics', 'Instagram', 'Breadfast'];
    const branches = ['Nasr City', 'Tagamoa', 'Maadi', 'Shoubra'];

    const orderInterval = setInterval(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        branch: branches[Math.floor(Math.random() * branches.length)],
        amount: Math.floor(Math.random() * 500) + 50,
        timestamp: new Date()
      };

      setOrders(prev => [newOrder, ...prev].slice(0, 10));
      setCounts(prev => ({
        ...prev,
        [newOrder.platform.toLowerCase()]: prev[newOrder.platform.toLowerCase() as keyof typeof prev] + 1
      }));
    }, 4000);

    const alertInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const types: Alert['type'][] = ['Error', 'Warning', 'Info'];
        const messages = [
          { ar: 'خطأ في الماكينة', en: 'Machine Error' },
          { ar: 'نقص في المخزون', en: 'Low Stock' },
          { ar: 'ازدحام شديد', en: 'Crowd Peak' }
        ];
        const msgIdx = Math.floor(Math.random() * messages.length);
        
        const newAlert: Alert = {
          id: Math.random().toString(36).substr(2, 9),
          type: types[Math.floor(Math.random() * types.length)],
          message: messages[msgIdx].ar,
          messageEn: messages[msgIdx].en,
          branch: branches[Math.floor(Math.random() * branches.length)],
          timestamp: new Date()
        };

        setAlerts(prev => [newAlert, ...prev].slice(0, 5));
      }
    }, 10000);

    return () => {
      clearInterval(orderInterval);
      clearInterval(alertInterval);
    };
  }, []);

  const addAlert = (alert: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    setAlerts(prev => [newAlert, ...prev].slice(0, 10));
  };

  return { orders, alerts, counts, addAlert };
}
