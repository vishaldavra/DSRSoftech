'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "722665c177f10de23bbf413cb53f8ef5",
"assets/assets/images/bannar1.jpeg": "80f643ca392349b16fc8de22ce42c56b",
"assets/assets/images/bannar2.jpg": "0336c710640953a4d86336ecdd31c52d",
"assets/assets/images/bannar3.jpg": "e6b00fc192bb29eb0ff105f4ad42d846",
"assets/assets/images/bar_logo.png": "1f250aeeedf5d28abd7a2fb5bbc1eebb",
"assets/assets/images/img1.jpg": "71e86242fca831839833d1caa23f107e",
"assets/assets/images/img2.jpg": "bbcf97c1be29e77360e8407b7e2eaa05",
"assets/assets/images/img3.jpg": "1920c86e11a06921b339f00ff1d0ddea",
"assets/assets/images/logo0.png": "e941c8c4e11ca00fbff1234dfe0d7f56",
"assets/assets/images/logo1.png": "9d08ef4617721e691481384aa7b85e3f",
"assets/assets/images/logo3.png": "6d84625172679ee0f1955c94b7e4e681",
"assets/assets/images/m1.png": "bada109293952ab817918fcbff5d10f2",
"assets/assets/images/m2.png": "e05afcc99fba8efb4973458c0eec22c7",
"assets/assets/images/m3.png": "1a886b83d27b7f1abbe52ce36426a598",
"assets/assets/images/m4.png": "7477129f4b1f0c2318c9a1c771ea592c",
"assets/assets/images/m5.png": "0bc0299ef895b25765e057c4bae157c8",
"assets/assets/images/m6.png": "1ff3d26ecf58f9b6988e82d224fa9485",
"assets/assets/images/m7.png": "e537270a0661bfe599097e36e5d402b5",
"assets/assets/images/m8.png": "ca9d86732e156ceee9d30750b0a243a2",
"assets/assets/images/p1.png": "92aa6f68bd9273096533f1649cf6c770",
"assets/assets/images/p2.png": "ffdfef4f4d9fadfa6d97f54909b4095b",
"assets/assets/images/p3.png": "b03ba5e42619350a77ecf6d790aa4bc3",
"assets/assets/images/p4.png": "c2e6a64dc13598e77575cdafd85d4d03",
"assets/assets/images/p5.png": "bc8d7cda6d4426a738eae4f9f6be8fb0",
"assets/assets/images/p6.png": "6f837f029d98e9f0c8f84a6675617346",
"assets/assets/images/People.png": "2d3aade2e16138bbc3bb764f1e89ec71",
"assets/assets/images/servis.jpg": "5cbd743bc26a646572ccc8485c5bf5fa",
"assets/assets/images/team.jpg": "6916ba2d2b2defb3e6e4c3f6b129d1f9",
"assets/assets/images/topIMG.png": "4a565e23769027f215a6b07415d123d6",
"assets/assets/images/z1.jpg": "336d88cbf88dec88dd49a16d577e513f",
"assets/assets/images/z2.jpg": "0dece5474cd0dedb0795035bc6036657",
"assets/assets/images/z3.jpg": "120d24d4bdf2f5f84d505a59bafeef25",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "992133a9edfa4f0afd2602a9c2aa26ec",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "96f5490698a0e7d68bc83d431b947270",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "9a19ef2ea0e9e3e8a9d83a1b5371f069",
"/": "9a19ef2ea0e9e3e8a9d83a1b5371f069",
"main.dart.js": "7f726185876068a27fba4696e5aecacd",
"manifest.json": "5f9953445310fd4cfa90aca8829b8a4e",
"version.json": "0287ccf5df8ccc59dc6627b9900b3382"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
