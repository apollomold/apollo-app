/* APOLLO+ 서비스 워커 (4단계에서 알림 수신 코드를 여기에 추가합니다) */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
