
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(req => console.log('Service Worker Registered!'))
          .catch(err => console.log('Service Worker Failed', err));
      });
    }
  
