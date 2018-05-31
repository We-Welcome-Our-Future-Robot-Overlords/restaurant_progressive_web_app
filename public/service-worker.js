// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'RestauWant';
var cacheName = 'restaurant_progressive_web_app';
var filesToCache = [
    '/',
    '/javascripts/index.js',
    '/javascripts/map.js',
    '/javascripts/snapimage.js',
    '/stylesheets/style.css',
    '/bootstrap/css/bootstrap.min.css',
    '/bootstrap/js/bootstrap.min.js',
    '/selectize/css/selectize.bootstrap3.css',
    '/selectize/js/standalone/selectize.min.js',
    '/open-iconic/font/fonts/open-iconic.ttf',
    '/open-iconic/font/fonts/open-iconic.woff',
    '/open-iconic/font/css/open-iconic.css',
    '/jquery/jquery.min.js'
];


/**
 * installation event: it adds all the files to be cached
 */
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});


/**
 * activation of service worker: it removes all cashed files if necessary
 */
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    /*
     * Fixes a corner case in which the app wasn't returning the latest data.
     * You can reproduce the corner case by commenting out the line below and
     * then doing the following steps: 1) load app for first time so that the
     * initial New York City data is shown 2) press the refresh button on the
     * app 3) go offline 4) reload the app. You expect to see the newer NYC
     * data, but you actually see the initial data. This happens because the
     * service worker is not yet activated. The code below essentially lets
     * you activate the service worker faster.
     */
    return self.clients.claim();
});


/**
 * this is called every time a file is fetched. This is a middleware, i.e. this method is
 * called every time a page is fetched by the browser
 */
self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    if (e.request.method === 'GET') {
        e.respondWith(
            caches.open(cacheName).then(function (cache) {
                return cache.match(e.request)
                    .then(function (response) {
                        var fetchPromise = fetch(e.request)
                            .then(function (networkResponse) {
                                cache.put(e.request,
                                    networkResponse.clone());
                                return networkResponse;
                            })
                        return response || fetchPromise;
                    })
            })
        );
    }
});
