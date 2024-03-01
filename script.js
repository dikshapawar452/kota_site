class HoverText {
  constructor(el) {
    this.el = el;
    this.hover = false;
    this.calculatePosition();
    this.attachEventsListener();
  }

  attachEventsListener() {
    window.addEventListener('mousemove', e => this.onMouseMove(e));
    window.addEventListener('resize', e => this.calculatePosition(e));
  }

  calculatePosition() {
    gsap.set(this.el, {
      x: 0,
      y: 0,
      scale: 1
    });

    const box = this.el.getBoundingClientRect();
    this.x = box.left + box.width * 0.5;
    this.y = box.top + box.height * 0.5;
    this.width = box.width;
    this.height = box.height;
  }

  onMouseMove(e) {
    let hover = false;
    let hoverArea = this.hover ? 0.7 : 0.5;
    let x = e.clientX - this.x;
    let y = e.clientY - this.y;
    let distance = Math.sqrt(x * x + y * y);
    if (distance < this.width * hoverArea) {
      hover = true;
      if (!this.hover) {
        this.hover = true;
      }
      this.onHover(e.clientX, e.clientY);
    }

    if (!hover && this.hover) {
      this.onLeave();
      this.hover = false;
    }
  }

  onHover(x, y) {
    gsap.to(this.el, {
      x: (x - this.x) * 0.4,
      y: (y - this.y) * 0.4,
      scale: 1.15,
      ease: 'power2.out',
      duration: 0.4
    });

    this.el.style.zIndex = 10;
  }
  onLeave() {
    gsap.to(this.el, {
      x: 0,
      y: 0,
      scale: 1,
      ease: 'elastic.out(3.2, 2.4)',
      duration: 0.7
    });

    this.el.style.zIndex = 1;
  }
}

document.querySelectorAll('.lii span').forEach(span => {
  new HoverText(span);
});
document.querySelectorAll('.lii1 span').forEach(span => {
  new HoverText(span);
});
document.querySelectorAll('.lii2 span').forEach(span => {
  new HoverText(span);
});



// -----header-----

window.onload = function () {
  var navbar = document.getElementById("navbar");
  var sticky = navbar.offsetTop;

  function myFunction() {
      if (window.pageYOffset >= sticky) {
          navbar.classList.add("sticky")
      } else {
          navbar.classList.remove("sticky");
      }
  }

  window.onscroll = function () {
      myFunction()
  };
};


// -----copy----- //
function copyToClipboard(sourceId, targetId, successIconId, copyIconId) {
  var sourceElement = document.getElementById(sourceId);

  if (!sourceElement) {
    console.error('Source element not found.');
    return;
  }

  var tempInput = document.createElement('input');
  tempInput.value = sourceElement.textContent;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  var successIcon = document.getElementById(successIconId);
  var copyIcon = document.getElementById(copyIconId);

  if (successIcon && copyIcon) {
    copyIcon.style.display = 'none'; // Hide the fa-copy icon

    successIcon.style.display = 'inline';
    setTimeout(function () {
      successIcon.style.display = 'none';
      copyIcon.style.display = 'inline'; // Show the fa-copy icon after 2 seconds
    }, 2000);
  }
}







