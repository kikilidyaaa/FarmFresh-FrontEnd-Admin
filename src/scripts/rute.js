import 'regenerator-runtime';

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path === '/login.html') {
    import('../styles/style-log.css');
  } else if (path === '/registrasi.html') {
    import('../styles/style-reg.css');
  } else {
    import('../styles/main.css');
  }
});