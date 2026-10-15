(function () {
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

  var copyButton = document.querySelector("#copiar");
  var draft = document.querySelector("#plantilla");
  var status = document.querySelector("#copiar-estado");

  function markCopied() {
    status.textContent =
      "Texto copiado. Pégalo cuando el correo de JADAI esté publicado.";
  }

  function markManual() {
    draft.focus();
    draft.select();
    status.textContent =
      "No se pudo copiar solo. El texto quedó seleccionado para que lo copies a mano.";
  }

  function copyFromSelection() {
    draft.focus();
    draft.select();
    try {
      return document.execCommand("copy");
    } catch (error) {
      return false;
    }
  }

  if (copyButton && draft && status) {
    copyButton.addEventListener("click", function () {
      var text = draft.value;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(markCopied, function () {
          if (copyFromSelection()) markCopied();
          else markManual();
        });
        return;
      }
      if (copyFromSelection()) markCopied();
      else markManual();
    });
  }
})();
