try {
if (!document.location.hash) {
  document.location.hash = document.querySelector('.show-start').id;
  document.location.reload();
} else {
  (document.querySelector(document.location.hash) || {style: {display: ""}}).style.display = 'block';
  var func = function () {
    (document.querySelector(document.location.hash) || {style: {opacity: 0}}).style.opacity =
      new Number((document.querySelector(document.location.hash) || {style: {opacity: 0}}).style.opacity) +
      0.1;
    if ((document.querySelector(document.location.hash) || {style: {opacity: 1}}).opacity == 1) {
      clearTimeout(timeout);
    } else {
      timeout = setTimeout(function () {
        func();
      }, 50);
    }
  };
  var timeout = setTimeout(func, 50);
}

function change_page_wrapper(page) {
  return function () {
    var func = function () {
      document.querySelector(document.location.hash).style.opacity =
        new Number(
          document.querySelector(document.location.hash).style.opacity
        ) - 0.1;
      if (document.querySelector(document.location.hash).style.opacity <= 0) {
        clearTimeout(timeout);
        document.querySelector(document.location.hash).style.display = 'none';
        document.location.hash = page;
        document.location.reload();
      } else {
        timeout = setTimeout(function () {
          func();
        }, 50);
      }
    };
    var timeout = setTimeout(func, 50);
  };
}

var buttons_change = Array.from(document.querySelectorAll('.change-page'));
for (var i in buttons_change) {
  var item = buttons_change[i];
  if (!item.disabled) {
    if (!document.getElementById(item.dataset.toPage)) {
      console.warn(
        `DANGLING BUTTON!!!! It tries to lead to ${item.dataset.toPage}!`
      );
    }
    item.addEventListener('click', change_page_wrapper(item.dataset.toPage));
  }
}
var pages = Array.from(document.querySelectorAll('.page'));
console.log(`${pages.length} pages`);
} catch(e) {
  document.querySelector("nav").innerHTML += e.toString();
}