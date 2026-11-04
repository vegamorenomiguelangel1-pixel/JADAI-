(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  var toggle = document.querySelector("#nav-toggle");
  var nav = document.querySelector("#nav");

  if (toggle && nav) {
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.checked = false;
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        toggle.checked = false;
      }
    });
  }

  var links = Array.prototype.slice.call(
    document.querySelectorAll(".nav-panel a[href^='#']")
  );
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          links.forEach(function (link) {
            if (link.getAttribute("href") === id) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  var copyStatus = document.querySelector("#copia-estado");
  var copyTimer;

  function announceCopy(message) {
    if (!copyStatus) return;
    copyStatus.textContent = message;
    copyStatus.classList.add("is-on");
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(function () {
      copyStatus.classList.remove("is-on");
      copyStatus.textContent = "";
    }, 2200);
  }

  function copyText(text, okMessage, button) {
    function done() {
      announceCopy(okMessage || "Copiado");
      if (button) {
        var original = button.textContent;
        button.textContent = "Listo";
        button.classList.add("is-copied");
        window.setTimeout(function () {
          button.textContent = original;
          button.classList.remove("is-copied");
        }, 1600);
      }
    }

    function fallback() {
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (error) {
        ok = false;
      }
      document.body.removeChild(field);
      if (ok) done();
      else announceCopy("No se pudo copiar. Selecciónalo a mano.");
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
      return;
    }
    fallback();
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      copyText(button.getAttribute("data-copy") || "", button.getAttribute("data-ok"), button);
    });
  });

  var draftButton = document.querySelector("#copiar");
  var draft = document.querySelector("#plantilla");
  var draftStatus = document.querySelector("#copiar-estado");
  if (draftButton && draft && draftStatus) {
    draftButton.addEventListener("click", function () {
      copyText(draft.value, "Texto copiado.", draftButton);
      draftStatus.textContent = "Texto copiado.";
    });
  }

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealItems = document.querySelectorAll(".reveal");
    if (revealItems.length) {
      document.documentElement.classList.add("can-reveal");
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealItems.forEach(function (item, index) {
        item.style.transitionDelay = Math.min(index % 6, 5) * 70 + "ms";
        revealObserver.observe(item);
        if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
          item.classList.add("is-in");
        }
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (item) {
      item.classList.add("is-in");
    });
  }

  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".tilt-card").forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var box = card.getBoundingClientRect();
        var px = (event.clientX - box.left) / box.width - 0.5;
        var py = (event.clientY - box.top) / box.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + py * -7 + "deg) rotateY(" + px * 9 + "deg)";
        card.style.setProperty("--gx", event.clientX - box.left + "px");
        card.style.setProperty("--gy", event.clientY - box.top + "px");
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "none";
      });
    });
  }

  var header = document.querySelector(".site-header");
  if (header && document.body.classList.contains("hub")) {
    var onScrollHeader = function () {
      header.classList.toggle("is-compact", window.scrollY > 24);
    };
    onScrollHeader();
    window.addEventListener("scroll", onScrollHeader, { passive: true });
  }

  var canvas = document.querySelector("#marca-fondo");
  if (!canvas || !canvas.getContext || !document.body.classList.contains("hub")) {
    return;
  }

  var ctx = canvas.getContext("2d");
  var marks = [];
  var mouse = { x: 0.5, y: 0.5 };
  var scrollY = 0;
  var width = 0;
  var height = 0;
  var dpr = 1;
  var running = false;

  function countForSize() {
    if (width < 720) return 10;
    if (width < 1100) return 16;
    return 22;
  }

  function paintLogo(x, y, size, alpha) {
    var scale = size / 240;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.translate(-120, -120);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "#2A9279";
    ctx.fillStyle = "#2A9279";
    ctx.lineWidth = 3.4;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(120, 120, 104, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(120, 44);
    ctx.lineTo(54.18, 158);
    ctx.lineTo(185.82, 158);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(54.18, 158, 10.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(185.82, 158, 10.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(120, 44, 10.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function seedMarks() {
    var count = countForSize();
    marks = [];
    var i;
    for (i = 0; i < count; i += 1) {
      marks.push({
        x: Math.random(),
        y: Math.random(),
        size: 36 + Math.random() * 74,
        driftX: (Math.random() - 0.5) * 0.00012,
        driftY: (Math.random() - 0.5) * 0.00018,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0004 + Math.random() * 0.0006,
        alpha: 0.08 + Math.random() * 0.09,
        depth: 0.35 + Math.random() * 0.65
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedMarks();
  }

  function drawMark(mark, time) {
    var parallaxX = (mouse.x - 0.5) * 48 * mark.depth;
    var parallaxY = (mouse.y - 0.5) * 36 * mark.depth + scrollY * 0.035 * mark.depth;
    var floatX = Math.sin(time * mark.speed + mark.phase) * 18;
    var floatY = Math.cos(time * mark.speed * 0.8 + mark.phase) * 22;
    var x = mark.x * width + parallaxX + floatX;
    var y = mark.y * height + parallaxY + floatY;
    paintLogo(x, y, mark.size, mark.alpha);
  }

  function frame(time) {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);
    var i;
    for (i = 0; i < marks.length; i += 1) {
      marks[i].x += marks[i].driftX;
      marks[i].y += marks[i].driftY;
      if (marks[i].x < -0.08) marks[i].x = 1.08;
      if (marks[i].x > 1.08) marks[i].x = -0.08;
      if (marks[i].y < -0.08) marks[i].y = 1.08;
      if (marks[i].y > 1.08) marks[i].y = -0.08;
      drawMark(marks[i], time);
    }
    ctx.globalAlpha = 1;
    window.requestAnimationFrame(frame);
  }

  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    var i;
    for (i = 0; i < marks.length; i += 1) {
      paintLogo(
        marks[i].x * width,
        marks[i].y * height,
        marks[i].size,
        marks[i].alpha
      );
    }
  }

  function start() {
    resize();
    if (reduceMotion) {
      drawStatic();
      return;
    }
    running = true;
    window.requestAnimationFrame(frame);
  }

  window.addEventListener("resize", function () {
    resize();
    if (reduceMotion) drawStatic();
  });

  window.addEventListener(
    "scroll",
    function () {
      scrollY = window.scrollY || 0;
      if (reduceMotion) return;
    },
    { passive: true }
  );

  window.addEventListener(
    "pointermove",
    function (event) {
      if (reduceMotion) return;
      mouse.x = event.clientX / width;
      mouse.y = event.clientY / height;
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", function () {
    if (reduceMotion) return;
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true;
      window.requestAnimationFrame(frame);
    }
  });

  start();
})();
