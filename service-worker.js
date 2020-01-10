importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/top_scorer.html', revision: '1' },
    { url: '/pages/klasemen.html', revision: '1' },
    { url: '/pages/data_indexdb.html', revision: '1' },
    { url: '/pages/indexdb_api.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/font-awesome.css', revision: '1' },
    { url: '/css/materialize-social.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/iconfont/material-icons.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db-controller.js', revision: '1' },
    { url: '/js/pendaftaran_sw.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/image/PL.png', revision: '1' },
    { url: '/image/monitordeal2.png', revision: '1' },
    { url: '/image/logo_kelarin.png', revision: '1' },
    { url: '/image/monitordeal2.png', revision: '1' },
    { url: '/iconfont/MaterialIcons-Regular.woff2', revision: '1' },
    { url: '/manifest.json', revision: '1' },
]);
 
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses:[200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60*60*24*365,
          maxEntries: 30,
        }),
      ]
    })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});