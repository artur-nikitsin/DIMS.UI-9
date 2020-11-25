const facebookSDK = () => {
  window.fbAsyncInit = function() {
    window.FB.init({
      appId: 'dims-2021',
      cookie: true,
      xfbml: true,
      version: 'v9.0',
    });
  };

  (function(d, s, id) {
    let js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};
export default facebookSDK;
