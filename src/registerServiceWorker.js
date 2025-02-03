/* eslint-disable no-console */
/**
 * @author Puji Ermanto <pujiermanto@gmail.com>
 * @since 2.0
 * @return {boolean}
 */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
        )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      // alert("New Content is downloading")
      console.log('New content is downloading.')
    },
    updated () {
      // alert("New content is available: Please refresh the page");
      console.log('New content is available: please refresh.')
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
