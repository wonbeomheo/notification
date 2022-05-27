// const xhr = new XMLHttpRequest();
// const container = document.getElementById('left-sidebar-wrapper');

// xhr.onload = function() {
//   if (this.status === 200 || 304) {
//     container.innerHTML = xhr.responseText;
//   } else {
//     console.warn("404 Page");
//   }
// }

// xhr.open('GET', './assets/templates/left-sidebar.html');
// xhr.send();

const xhr_sidebar = new XMLHttpRequest();
const xhr_topbar = new XMLHttpRequest();
const container_sidebar = document.getElementById('left-sidebar-wrapper');
const container_topbar = document.getElementById('topbar-wrapper');

xhr_sidebar.onload = function() {
  if(xhr_sidebar.readyState === XMLHttpRequest.DONE) {
    if(xhr_sidebar.status === 200 || 304) {
      container_sidebar.innerHTML = xhr_sidebar.responseText;
    } else {
      console.log('request has problems.');
    }
  }
};

xhr_sidebar.open('GET', './assets/templates/left-sidebar.html');
xhr_sidebar.send();

xhr_topbar.onload = function() {
  if(xhr_topbar.readyState === XMLHttpRequest.DONE) {
    if(xhr_topbar.status === 200 || 304) {
      container_topbar.innerHTML = xhr_topbar.responseText;
    } else {
      console.log('request has problems.');
    }
  }
};

xhr_topbar.open('GET', './assets/templates/topbar.html');
xhr_topbar.send();
