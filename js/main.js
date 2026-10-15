/* Contacto y enlaces.
   Completa solo con datos reales. Una cadena vacía oculta ese canal o botón.
   No inventes correos, números ni URLs.
   whatsapp: solo dígitos, con código de país (ejemplo: 59170000000).
   instagram y linkedin: URL completa, https://…
   El GitHub de Miguel está en el HTML de Fundadores. */
var CONTACT = {
  email: "",
  whatsapp: "",
  instagram: "",
  linkedin: "",
  linkedinMiguel: "",
  linkedinJazid: "",
  githubJazid: ""
};

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

  function sectionFor(link) {
    var el = document.querySelector(link.getAttribute("href"));
    if (!el) return null;
    return el.closest("section") || el;
  }

  if ("IntersectionObserver" in window && links.length) {
    var seen = [];
    links.forEach(function (link) {
      var section = sectionFor(link);
      if (!section || seen.indexOf(section) !== -1) return;
      seen.push(section);
    });

    if (seen.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            links.forEach(function (link) {
              var section = sectionFor(link);
              if (section === entry.target) {
                link.setAttribute("aria-current", "true");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
      );
      seen.forEach(function (section) {
        observer.observe(section);
      });
    }
  }

  var TEMPLATES = {
    proyecto: [
      "Hola.",
      "",
      "Quiero proponer un proyecto de IA para que la red lo revise.",
      "",
      "Nombre:",
      "Universidad:",
      "Correo:",
      "",
      "Problema y para quién es:",
      "Método:",
      "Datos y recursos:",
      "Uso ético de la IA:"
    ].join("\n"),
    docente: [
      "Hola.",
      "",
      "Quiero sumarme como docente revisor.",
      "",
      "Nombre:",
      "Universidad:",
      "Área:",
      "Correo:",
      "Disponibilidad:"
    ].join("\n"),
    embajador: [
      "Hola.",
      "",
      "Quiero ser embajador en mi universidad.",
      "",
      "Nombre:",
      "Universidad:",
      "Correo:",
      "Cómo puedo ayudar en el campus:"
    ].join("\n"),
    aliado: [
      "Hola.",
      "",
      "Quiero conversar como aliado.",
      "",
      "Nombre:",
      "Organización:",
      "Correo:",
      "Cómo podemos colaborar:"
    ].join("\n")
  };

  var SUBJECTS = {
    proyecto: "Propuesta de proyecto de IA",
    docente: "Quiero sumarme como docente",
    embajador: "Quiero ser embajador",
    aliado: "Quiero ser aliado"
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll("[role='tab']"));
  var panel = document.querySelector("#panel-rol");
  var draft = document.querySelector("#plantilla");
  var copyButton = document.querySelector("#copiar");
  var status = document.querySelector("#copiar-estado");
  var actions = document.querySelector("#acciones-mensaje");
  var currentRole = "proyecto";

  function clean(value) {
    return String(value || "").trim();
  }

  function selectRole(role) {
    if (!TEMPLATES[role]) role = "proyecto";
    var changed = role !== currentRole;
    currentRole = role;
    tabs.forEach(function (tab) {
      var on = tab.getAttribute("data-rol") === role;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });
    var active = document.querySelector("[data-rol='" + role + "'][role='tab']");
    if (panel && active) panel.setAttribute("aria-labelledby", active.id);
    if (draft && changed) draft.value = TEMPLATES[role];
    if (status && changed) status.textContent = "";
    refreshOutbound();
  }

  function refreshOutbound() {
    if (!actions || !draft) return;
    var text = draft.value;
    var email = clean(CONTACT.email);
    var mail = document.querySelector("#abrir-correo");
    if (email && email.indexOf("@") !== -1 && email.indexOf(" ") === -1) {
      if (!mail) {
        mail = document.createElement("a");
        mail.id = "abrir-correo";
        mail.className = "btn btn-ghost";
        mail.textContent = "Abrir en mi correo";
        actions.appendChild(mail);
      }
      mail.href =
        "mailto:" +
        email +
        "?subject=" +
        encodeURIComponent(SUBJECTS[currentRole] || "JADAI") +
        "&body=" +
        encodeURIComponent(text);
    } else if (mail) {
      mail.remove();
    }

    var digits = clean(CONTACT.whatsapp).replace(/\D/g, "");
    var wa = document.querySelector("#abrir-whatsapp");
    if (digits) {
      if (!wa) {
        wa = document.createElement("a");
        wa.id = "abrir-whatsapp";
        wa.className = "btn btn-ghost";
        wa.target = "_blank";
        wa.rel = "noopener noreferrer";
        wa.textContent = "WhatsApp";
        actions.appendChild(wa);
      }
      wa.href = "https://wa.me/" + digits + "?text=" + encodeURIComponent(text);
    } else if (wa) {
      wa.remove();
    }
  }

  function roleFromHash() {
    var id = (location.hash || "").replace("#", "");
    if (TEMPLATES[id]) return id;
    if (id === "proponer" || id === "contacto") return "proyecto";
    return "";
  }

  function showContact() {
    var section = document.getElementById("proponer");
    if (!section) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  if (tabs.length && draft && panel) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        selectRole(tab.getAttribute("data-rol"));
      });
    });

    var tablist = document.querySelector("[role='tablist']");
    if (tablist) {
      tablist.addEventListener("keydown", function (event) {
        var key = event.key;
        if (
          key !== "ArrowRight" &&
          key !== "ArrowLeft" &&
          key !== "ArrowDown" &&
          key !== "ArrowUp" &&
          key !== "Home" &&
          key !== "End"
        ) {
          return;
        }
        event.preventDefault();
        var index = tabs.indexOf(document.activeElement);
        if (index < 0) index = 0;
        if (key === "ArrowRight" || key === "ArrowDown") {
          index = (index + 1) % tabs.length;
        } else if (key === "ArrowLeft" || key === "ArrowUp") {
          index = (index - 1 + tabs.length) % tabs.length;
        } else if (key === "Home") {
          index = 0;
        } else if (key === "End") {
          index = tabs.length - 1;
        }
        selectRole(tabs[index].getAttribute("data-rol"));
        tabs[index].focus();
      });
    }

    document.querySelectorAll("a[data-rol]").forEach(function (link) {
      link.addEventListener("click", function () {
        selectRole(link.getAttribute("data-rol"));
        showContact();
      });
    });

    window.addEventListener("hashchange", function () {
      var role = roleFromHash();
      if (!role) return;
      selectRole(role);
      showContact();
    });

    draft.addEventListener("input", refreshOutbound);

    var fromHash = roleFromHash();
    var initial = fromHash || "proyecto";
    if (initial === "proyecto") {
      currentRole = "";
    }
    selectRole(initial);
    if (fromHash) showContact();
  }

  function showLink(key, label) {
    var value = clean(CONTACT[key]);
    document.querySelectorAll("[data-contact='" + key + "']").forEach(function (item) {
      var anchor = item.tagName === "A" ? item : item.querySelector("a");
      if (!anchor || !value || !/^https:\/\//i.test(value)) {
        item.hidden = true;
        return;
      }
      anchor.href = value;
      if (!anchor.getAttribute("aria-label") && label) {
        anchor.setAttribute("aria-label", label);
      }
      item.hidden = false;
    });
  }

  showLink("linkedinMiguel", "LinkedIn de Miguel Angel Vega Moreno");
  showLink("linkedinJazid", "LinkedIn de Jazid Andrey Ovando Durán");
  showLink("githubJazid", "GitHub de Jazid Andrey Ovando Durán");

  document.querySelectorAll(".avatar[data-foto]").forEach(function (avatar) {
    var src = clean(avatar.getAttribute("data-foto"));
    if (!src) return;
    var img = document.createElement("img");
    img.alt = "";
    img.src = src;
    avatar.insertBefore(img, avatar.firstChild);
  });

  var channelBlock = document.querySelector("#canales-bloque");
  var channelList = document.querySelector("#canales");
  if (channelBlock && channelList) {
    var channels = [];
    var email = clean(CONTACT.email);
    if (email && email.indexOf("@") !== -1) {
      channels.push({ name: "Correo", href: "mailto:" + email, text: email });
    }
    var waDigits = clean(CONTACT.whatsapp).replace(/\D/g, "");
    if (waDigits) {
      channels.push({
        name: "WhatsApp",
        href: "https://wa.me/" + waDigits,
        text: "WhatsApp"
      });
    }
    [
      ["instagram", "Instagram"],
      ["linkedin", "LinkedIn"]
    ].forEach(function (pair) {
      var url = clean(CONTACT[pair[0]]);
      if (/^https:\/\//i.test(url)) {
        channels.push({ name: pair[1], href: url, text: pair[1] });
      }
    });

    if (channels.length) {
      channels.forEach(function (channel) {
        var item = document.createElement("li");
        var anchor = document.createElement("a");
        anchor.href = channel.href;
        anchor.textContent = channel.text;
        if (channel.href.indexOf("mailto:") !== 0) {
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
        }
        var term = document.createElement("span");
        term.textContent = channel.name;
        item.appendChild(term);
        item.appendChild(anchor);
        channelList.appendChild(item);
      });
      channelBlock.hidden = false;
    }
  }

  function markCopied() {
    if (status) status.textContent = "Mensaje copiado.";
  }

  function markManual() {
    if (!draft || !status) return;
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
