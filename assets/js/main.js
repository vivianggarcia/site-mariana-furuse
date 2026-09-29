(function () {
  "use strict";

  /* ---------------- Mobile menu ---------------- */
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var open = mobileMenu.getAttribute("data-open") === "true";
      mobileMenu.setAttribute("data-open", open ? "false" : "true");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.setAttribute("data-open", "false");
      });
    });
  }

  /* ---------------- FAQ accordion + filter ---------------- */
  var faqList = document.getElementById("faq-list");
  if (faqList) {
    var faqItems = Array.prototype.slice.call(faqList.querySelectorAll(".faq-item"));

    faqItems.forEach(function (item) {
      var btn = item.querySelector(".faq-question");
      btn.addEventListener("click", function () {
        var isOpen = item.getAttribute("data-open") === "true";
        faqItems.forEach(function (i) {
          i.setAttribute("data-open", "false");
        });
        item.setAttribute("data-open", isOpen ? "false" : "true");
      });
    });

    var faqFilterBtns = document.querySelectorAll(".faq-filter-btn");
    faqFilterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        faqFilterBtns.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");

        var cat = btn.getAttribute("data-cat");
        faqItems.forEach(function (item) {
          var show = cat === "todos" || item.getAttribute("data-cat") === cat;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------------- Before / After compare — generic, supports multiple instances ---------------- */
  function setupCompareInstance(root) {
    var range = root.querySelector(".compare-range");
    var setPos = function (pct) {
      pct = Math.max(0, Math.min(100, pct));
      root.style.setProperty("--pos", pct + "%");
      if (range) range.value = pct;
    };

    if (range) {
      range.addEventListener("input", function () {
        setPos(parseFloat(range.value));
      });
    }

    var dragging = false;
    var updateFromClientX = function (clientX) {
      var rect = root.getBoundingClientRect();
      var pct = ((clientX - rect.left) / rect.width) * 100;
      setPos(pct);
    };

    root.addEventListener("pointerdown", function (e) {
      dragging = true;
      updateFromClientX(e.clientX);
    });
    window.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      updateFromClientX(e.clientX);
    });
    window.addEventListener("pointerup", function () {
      dragging = false;
    });

    return { setPos: setPos };
  }

  var compareInstances = {};
  document.querySelectorAll(".compare").forEach(function (el, idx) {
    var key = el.id || "compare-" + idx;
    compareInstances[key] = setupCompareInstance(el);
  });

  /* ---------------- Home comparator: case tabs (swap images on the single widget) ---------------- */
  var compareWidget = document.getElementById("compare-widget");
  if (compareWidget) {
    var CASES = {
      clareamento: {
        title: "Clareamento dental supervisionado",
        before: "assets/casos/antes-clareamento.jpg",
        after: "assets/casos/depois-clareamento.jpg"
      },
      bruxismo: {
        title: "Placa de bruxismo (placa oclusal)",
        before: "assets/casos/antes-bruxismo.jpg",
        after: "assets/casos/depois-bruxismo.jpg"
      },
      esportivo: {
        title: "Protetor bucal esportivo personalizado",
        before: "assets/casos/antes-protetor.jpg",
        after: "assets/casos/depois-protetor.jpg"
      }
    };
    var compareTitle = document.getElementById("compare-title");
    var beforeImg = document.getElementById("compare-before");
    var afterImg = document.getElementById("compare-after");
    var tabs = document.querySelectorAll(".compare-tab");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("is-active");
        });
        tab.classList.add("is-active");

        var key = tab.getAttribute("data-case");
        var c = CASES[key];
        if (!c) return;
        if (compareTitle) compareTitle.textContent = c.title;
        if (beforeImg) beforeImg.src = c.before;
        if (afterImg) afterImg.src = c.after;
        if (compareInstances["compare-widget"]) compareInstances["compare-widget"].setPos(50);
      });
    });
  }

  /* ---------------- Services data (shared) ---------------- */
  var SERVICES = [
    {
      id: "clareamento",
      title: "Clareamento dental supervisionado",
      desc: "Sorriso iluminado e natural com protocolos de consultório ou caseiro supervisionado, acompanhamento de perto e controle da sensibilidade com protocolo a laser incluso.",
      cat: "estetica",
      tag: "Resultado Real",
      home: true,
      thumb: "assets/casos/depois-clareamento.jpg",
      before: "assets/casos/antes-clareamento.jpg",
      after: "assets/casos/depois-clareamento.jpg"
    },
    {
      id: "limpeza",
      title: "Limpeza e prevenção",
      desc: "Remoção de tártaro e biofilme bacteriano para gengivas saudáveis e hálito fresco.",
      cat: "limpeza",
      tag: "Resultado Real",
      home: false,
      thumb: "assets/casos/depois-limpeza.jpg",
      before: "assets/casos/antes-limpeza.jpg",
      after: "assets/casos/depois-limpeza.jpg"
    },
    {
      id: "canal",
      title: "Tratamento de canal e urgências",
      desc: "Alívio imediato da dor e preservação do dente natural com Raio X digital na hora.",
      cat: "canal",
      tag: "Destaque",
      home: false
    },
    {
      id: "restauracoes",
      title: "Restaurações estéticas em resina",
      desc: "Resinas de alta tecnologia no tom exato dos seus dentes para estética e mastigação.",
      cat: "estetica",
      home: false
    },
    {
      id: "estetica-lentes",
      title: "Estética dental e lentes de porcelana",
      desc: "Harmonização do sorriso com laminados cerâmicos e restaurações de altíssima durabilidade.",
      cat: "estetica",
      home: false
    },
    {
      id: "bruxismo",
      title: "Placa de bruxismo (placa oclusal)",
      desc: "Proteção contra o desgaste dos dentes e alívio de dores na articulação (DTM), feita sob medida.",
      cat: "bruxismo",
      tag: "Resultado Real",
      home: true,
      thumb: "assets/casos/depois-bruxismo.jpg",
      before: "assets/casos/antes-bruxismo.jpg",
      after: "assets/casos/depois-bruxismo.jpg"
    },
    {
      id: "protetor",
      title: "Protetor bucal esportivo personalizado",
      desc: "Proteção de alto nível sob medida para praticantes de esportes e atletas, com identidade visual e cores personalizadas.",
      cat: "esportivo",
      tag: "Trabalhos Reais",
      home: true,
      thumb: "assets/casos/protetor-lopes.jpg",
      before: "assets/casos/antes-protetor.jpg",
      after: "assets/casos/depois-protetor.jpg",
      gallery: [
        "assets/casos/protetor-lopes.jpg",
        "assets/casos/protetor-prates.jpg",
        "assets/casos/protetor-ju.jpg",
        "assets/casos/protetor-lima.jpg"
      ]
    }
  ];

  /* ---------------- Home service list + filters ---------------- */
  var serviceList = document.getElementById("service-list");
  if (serviceList) {
    var renderServices = function (filter) {
      serviceList.innerHTML = "";
      SERVICES.filter(function (s) {
        return s.home && (filter === "todos" || s.cat === filter);
      }).forEach(function (s) {
        var el = document.createElement("article");
        el.className = "flex items-start gap-5 py-6 border-b border-verde/20";
        var thumbHtml = s.thumb
          ? '<img src="' + s.thumb + '" alt="' + s.title + ' &ndash; Dra. Mariana Furuse, Araçatuba SP" loading="lazy" width="72" height="72" class="w-[72px] h-[72px] object-cover shrink-0" />'
          : '';
        el.innerHTML =
          thumbHtml +
          '<div class="flex-1">' +
            '<h3 class="font-display text-xl leading-snug text-verde-800">' + s.title + '</h3>' +
            '<p class="text-sm text-tinta/70 mt-2 leading-relaxed">' + s.desc + '</p>' +
            '<a href="servicos.html#' + s.id + '" class="inline-block mt-3 text-[11px] uppercase tracking-[0.2em] text-verde hover:text-verde-800">Saiba mais</a>' +
          '</div>';
        serviceList.appendChild(el);
      });
    };
    renderServices("todos");

    var filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        renderServices(btn.getAttribute("data-filter"));
      });
    });
  }

  /* ---------------- Agendar form -> WhatsApp ---------------- */
  var form = document.getElementById("agendar-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = document.getElementById("nome").value.trim();
      var telefone = document.getElementById("telefone").value.trim();
      var cidade = document.getElementById("cidade").value.trim();
      var servico = document.getElementById("servico").value;

      var msg = "Olá Dra. Mariana! Gostaria de agendar um atendimento.\n" +
        "Nome: " + nome + "\n" +
        "Telefone: " + telefone + "\n" +
        "Cidade: " + cidade + "\n" +
        "Serviço de interesse: " + servico;

      var url = "https://wa.me/5518996001588?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------------- Privacy / LGPD banner ---------------- */
  var banner = document.getElementById("privacy-banner");
  if (banner) {
    var STORAGE_KEY = "mf_privacy_ack";
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        banner.style.display = "none";
      }
    } catch (err) {}

    var hide = function () {
      banner.style.display = "none";
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch (err) {}
    };
    var acceptBtn = document.getElementById("privacy-accept");
    var closeBtn = document.getElementById("privacy-close");
    var termsBtn = document.getElementById("privacy-terms");
    if (acceptBtn) acceptBtn.addEventListener("click", hide);
    if (closeBtn) closeBtn.addEventListener("click", hide);
    if (termsBtn) termsBtn.addEventListener("click", function () {
      alert("Política de Privacidade & Termos de Uso em breve nesta página.");
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  if ("IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }
})();
