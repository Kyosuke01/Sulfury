// ═══════════════════════════════════════════════════════════
// Sulfury — comportements partagés (navigation, apparitions,
// statistiques Discord en direct)
// ═══════════════════════════════════════════════════════════
(function () {
    "use strict";

    var doc = document;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ─── Navigation ───────────────────────────────────────
    var nav = doc.getElementById("nav");
    var burger = doc.getElementById("burger");
    var menu = doc.getElementById("menu");

    function setMenu(open) {
        menu.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    }

    burger.addEventListener("click", function () {
        setMenu(!menu.classList.contains("open"));
    });
    menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) setMenu(false);
    });
    doc.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setMenu(false);
    });

    function onScroll() {
        nav.classList.toggle("scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ─── Images : pas de menu contextuel (comme avant) ────
    doc.querySelectorAll("img").forEach(function (img) {
        img.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    });

    // ─── Année du pied de page ────────────────────────────
    doc.querySelectorAll("[data-year]").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    // ─── Apparition au défilement ─────────────────────────
    var reveals = doc.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("in");
                revealObserver.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
        reveals.forEach(function (el) { revealObserver.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add("in"); });
    }

    // ─── Statistiques ─────────────────────────────────────
    // Les gros chiffres comptent jusqu'à leur valeur quand ils entrent à l'écran.
    // Valeurs de secours : celles écrites dans le HTML (si l'API Discord est injoignable).
    var format = function (n) { return n.toLocaleString("fr-FR"); };

    function tween(el) {
        cancelAnimationFrame(el._raf);
        var from = el._shown, to = el._target;
        if (reduceMotion || from === to) {
            el._shown = to;
            el.textContent = format(to);
            return;
        }
        var start = performance.now();
        var duration = 1400;
        (function step(now) {
            var t = Math.min(1, (now - start) / duration);
            var eased = 1 - Math.pow(1 - t, 4);
            el._shown = Math.round(from + (to - from) * eased);
            el.textContent = format(el._shown);
            if (t < 1) el._raf = requestAnimationFrame(step);
        })(start);
    }

    var statEls = doc.querySelectorAll("[data-stat]");
    statEls.forEach(function (el) {
        var value = parseInt(el.textContent, 10) || 0;
        el._target = value;
        el._shown = value;
        el._animated = !!el.closest(".stat");
        el._seen = !el._animated;
    });

    function setStat(name, value) {
        statEls.forEach(function (el) {
            if (el.getAttribute("data-stat") !== name) return;
            el._target = value;
            if (el._seen) tween(el);
        });
    }

    if ("IntersectionObserver" in window) {
        var statObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                el._seen = true;
                el._shown = 0;
                tween(el);
                statObserver.unobserve(el);
            });
        }, { threshold: 0.4 });
        statEls.forEach(function (el) { if (el._animated) statObserver.observe(el); });
    } else {
        statEls.forEach(function (el) { el._seen = true; });
    }

    var live = doc.getElementById("live");
    fetch("https://discord.com/api/v9/invites/VFMfByp3ed?with_counts=true")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (typeof data.approximate_member_count === "number") {
                setStat("total", data.approximate_member_count);
            }
            if (typeof data.approximate_presence_count === "number") {
                setStat("online", data.approximate_presence_count);
                if (live) live.hidden = false;
            }
        })
        .catch(function () {
            // API injoignable : on garde les valeurs de secours, le bandeau « en ligne » reste masqué.
        });
})();
