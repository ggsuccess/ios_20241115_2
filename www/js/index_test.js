// /*
//  * Licensed to the Apache Software Foundation (ASF) under one
//  * or more contributor license agreements.  See the NOTICE file
//  * distributed with this work for additional information
//  * regarding copyright ownership.  The ASF licenses this file
//  * to you under the Apache License, Version 2.0 (the
//  * "License"); you may not use this file except in compliance
//  * with the License.  You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing,
//  * software distributed under the License is distributed on an
//  * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
//  * KIND, either express or implied.  See the License for the
//  * specific language governing permissions and limitations
//  * under the License.
//  */

// // Wait for the deviceready event before using any of Cordova's device APIs.
// // See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

// var rootPageUrl = 'https://test.ju-bu.co.kr/';
// //function 
// //var isReloaded = localStorage.getItem('isReloaded');
// var app = {

//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        
//     },

//     onDeviceReady: function(){        
//         // FCM 초기화
//         cordova.plugins.firebase.messaging.requestPermission().then(function() {
//             console.log("Push permission granted");
            
//             // FCM 토큰 가져오기
//             cordova.plugins.firebase.messaging.getToken().then(function(token) {
//                 // FCM 토큰을 성공적으로 받아왔을 때
//                 if (token) {
//                     localStorage.setItem('fcmtoken',token);
//                     updateTokenOnServer(token);
//                 }
//                 console.log("Got device token: ", token);
//             });
            
//             // 메시지 수신 리스너 설정
//             cordova.plugins.firebase.messaging.onMessage(function(payload) {
//                 alert(payload);
//                 console.log("New foreground FCM message: "+ payload);
//             });
            
//             // 백그라운드 메시지 리스너 설정
//             cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) {
//                 alert(payload);
//                 console.log("New background FCM message: ", payload);
//             });
//         }).catch(function(error) {
//             alert(error);
//             console.error("Failed to get push permission: ", error);
//         });
//         this.receivedEvent('deviceready');
//     },

//     receivedEvent: function(id) {
//         if(id == 'deviceready') {
//            window.location.replace(rootPageUrl);
           
//         }
//     }
// };

// function updateTokenOnServer(fcmToken) {
//     // 서버에 FCM 토큰을 POST로 전송
//     //fetch('http://10.8.0.6:8888/admin/api/updateFcmToken', {
//     //fetch('https://6acc-211-218-40-72.ngrok-free.app/admin/api/updateFcmToken', {
//     fetch('/admin/api/updateFcmToken', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token: fcmToken }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("서버에 FCM 토큰이 업데이트되었습니다:", data);
//     })
//     .catch(error => {
//         console.error("FCM 토큰 서버 전송 실패:", error);
//     });
// }
// window.updateFCMToken = function() {
//     return new Promise((resolve, reject) => {
//         cordova.plugins.firebase.messaging.getToken().then(function(token) {
//             if (token) {
//                 updateTokenOnServer(token);
//                 resolve(token);
//             } else {
//                 reject('토큰을 받아올 수 없습니다.');
//             }
//         }).catch(function(error) {
//             reject(error);
//         });
//     })
// app.initialize();


var onDeviceReady = function(){
    runFrebase();
}
document.addEventListener('deviceready', this.onDeviceReady, false);

var runFrebase = function() {
    cordova.plugins.firebase.messaging.requestPermission().then(function() {
        console.log("Push permission granted");
        
        // FCM 토큰 가져오기
        cordova.plugins.firebase.messaging.getToken().then(function(token) {
            // FCM 토큰을 성공적으로 받아왔을 때
            if (token) {
                localStorage.setItem('fcmtoken',token);
                updateTokenOnServer(token);
            }
            console.log("Got device token: ", token);
        });
        
        // 메시지 수신 리스너 설정
        cordova.plugins.firebase.messaging.onMessage(function(payload) {
            alert(payload);
            console.log("New foreground FCM message: "+ payload);
        });
        
        // 백그라운드 메시지 리스너 설정
        cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) {
            alert(payload);
            console.log("New background FCM message: ", payload);
        });
    }).catch(function(error) {
        alert(error);
        console.error("Failed to get push permission: ", error);
    });
    //this.receivedEvent('deviceready');
}
function updateTokenOnServer(fcmToken) {
    // 서버에 FCM 토큰을 POST로 전송
    //fetch('http://10.8.0.6:8888/admin/api/updateFcmToken', {
    //fetch('https://6acc-211-218-40-72.ngrok-free.app/admin/api/updateFcmToken', {
    fetch('https://a6b9-211-218-40-72.ngrok-free.app/admin/api/updateFcmToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: fcmToken }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("서버에 FCM 토큰이 업데이트되었습니다:", data);
    })
    .catch(error => {
        console.error("FCM 토큰 서버 전송 실패:", error);
    });
}