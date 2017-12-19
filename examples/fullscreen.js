

// ----------------------------------------
// Add a fullscreen button

var fullscreenActive;
(function() {

  function showFullscreen(e) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      fullscreenActive = true;
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
      fullscreenActive = true;
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
      fullscreenActive = true;
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      fullscreenActive = true;
    }

    // If fullscreen mode isn’t supported and we’re inside an iframe, let the default browser action continue.
    var isIframe = (top.location !== self.location);

    if (e && (fullscreenActive || !isIframe)) {
      e.preventDefault();
    }
  }

  function exitFullscreen(e) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fullscreenActive = false;
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
      fullscreenActive = false;
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
      fullscreenActive = false;
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      fullscreenActive = false;
    } else {
      return; // Let the browser handle it
    }

    if (e) e.preventDefault();
  }

  function fullscreenAvailable() {      
    return (document.documentElement.requestFullscreen ||
            document.documentElement.msRequestFullscreen ||
            document.documentElement.mozRequestFullScreen ||
            document.documentElement.webkitRequestFullscreen);
  }

  function fullscreenElementActive() {      
    return (document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullscreenElement ||
            document.webkitFullscreenElement);
  }

  function onShowFullScreen(e) {

    // If the user is pressing a modifier key, let the browser handle it
    if (e && (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) return;

    showFullscreen(e);

    onFullScreenChange();
  }

  function onExitFullScreen(e) {

    // If the user is pressing a modifier key, let the browser handle it
    if (e && (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)) return;

    exitFullscreen(e);

    onFullScreenChange();
  }

  function onFullScreenChange() {
    fullscreenActive = fullscreenElementActive() || (!fullscreenAvailable() && top.location === self.location) || false

    if (!fullscreenActive) {
      showFullScreenButton();
    } else {
      hideFullScreenButton();
    }
  }

  function showFullScreenButton() {
    document.getElementById('full-screen-button').style.display = 'block';
    document.getElementById('back-button').style.display = 'none';
    document.getElementById('exit-full-screen-button').style.display = 'none';
  }

  function hideFullScreenButton() {
    document.getElementById('full-screen-button').style.display = 'none';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('exit-full-screen-button').style.display = 'block';
  }

  // If we have all of the features we need…
  if (document.addEventListener) {

    // Show the button

    // fullscreenActive = // fullscreenElementActive() || top.location === self.location || false;

    onFullScreenChange();

    document.getElementById('full-screen-button').addEventListener('click', onShowFullScreen, false);
    document.getElementById('exit-full-screen-button').addEventListener('click', onExitFullScreen, false);
    document.getElementById('back-button').addEventListener('click', onExitFullScreen, false);

    document.addEventListener('fullscreenchange', onFullScreenChange);
    document.addEventListener('msfullscreenchange', onFullScreenChange);
    document.addEventListener('mozfullscreenchange', onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', onFullScreenChange);
  }

})();
