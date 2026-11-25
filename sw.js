/* APOLLO+ 서비스 워커: 앱이 닫혀 있을 때도 알림을 받아 보여 줍니다 */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
importScripts('firebase-config.js');

firebase.initializeApp(self.APOLLO_FB);
const messaging = firebase.messaging();

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

/* 서버가 '데이터 형식'으로 보낸 알림을 직접 표시 (제목·내용·이동 주소) */
messaging.onBackgroundMessage(function (payload) {
  if (payload.notification) return;            /* 파이어베이스 콘솔 테스트 알림은 자동 표시됨 */
  const d = payload.data || {};
  return self.registration.showNotification(d.title || 'APOLLO+', {
    body: d.body || '',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    tag: d.tag || undefined,
    data: { url: d.url || './' }
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || './';
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
