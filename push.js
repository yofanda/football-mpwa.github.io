var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BMgLJggbBt9zo21l0ZeIgMn0CjGt3ND0u6C90XlueUKlFL_UN6EyDxYdEQmq62B12Nle-R7CUrGfqFxxijy5DqE",
   "privateKey": "5mu9RiCBPgn6o1gl6YCNjiJb3nU9bZqvTEYi67Wr5_I"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cUnfZIcrGsQ:APA91bEey6Gqdcm_kppmu3U4y_18bLNcnq64xK8hPrsRC8pGn5vWwJsGAOoe0SCVdD8TmAT2gg72I2XZwwuLvcHof-eaGC2P373eaGcHbfKZkZxJCCLzs5oU-B4WlYv0aDsmnkqUDjfb",
   "keys": {
       "p256dh": "BEs+mVbQxVRZAktsZpDd+Z9eK85wes1XjZEmXMlMHu57RvBuTn6OCwBrft9fEoJlKQUcRIoRIP2y7f0bva/xt40=",
       "auth": "Ck8ggew6DKQWDkC388F1iQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi coyyy !';
 
var options = {
   gcmAPIKey: '349119934523',
   TTL: 60,
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
  ).catch(function(err){
console.log(err);
});