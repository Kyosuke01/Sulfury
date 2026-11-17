// ═══════════════════════════════════════════════════════════
// Sulfury — accueil : machine à écrire + mouvements de l'affiche
// ═══════════════════════════════════════════════════════════
(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ─── Machine à écrire ─────────────────────────────────
    // Le premier mot est déjà dans le HTML (lisible sans JS) : on l'efface, puis on enchaîne.
    var words = ["communautaire.", "chill.", "sympa."];
    var target = document.getElementById("message");
    var index = 0;
    var length = words[0].length;

    function type() {
        if (length < words[index].length) {
            length++;
            target.textContent = words[index].slice(0, length);
            setTimeout(type, 70);
        } else {
            setTimeout(erase, 2300);
        }
    }

    function erase() {
        if (length > 0) {
            length--;
            target.textContent = words[index].slice(0, length);
            setTimeout(erase, 32);
        } else {
            index = (index + 1) % words.length;
            setTimeout(type, 350);
        }
    }

    if (target && !reduceMotion) setTimeout(erase, 2600);

    if (reduceMotion) return;

    // ─── Affiche : parallaxe souris + rotation au scroll ──
    var hero = document.querySelector(".hero-bleed");
    var poster = document.getElementById("poster");
    var discLogo = document.getElementById("disc-logo");
    var ticking = false;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function update() {
        ticking = false;
        var y = window.scrollY;
        var vh = window.innerHeight;

        if (discLogo && y < vh * 1.5) {
            discLogo.style.setProperty("--rot", (y * 0.045).toFixed(2) + "deg");
        }

    }

    function requestUpdate() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();

    if (hero && poster && finePointer) {
        hero.addEventListener("pointermove", function (e) {
            var r = hero.getBoundingClientRect();
            var dx = (e.clientX - (r.left + r.width * 0.7)) / r.width;
            var dy = (e.clientY - (r.top + r.height * 0.5)) / r.height;
            poster.style.setProperty("--px", (dx * 22).toFixed(1) + "px");
            poster.style.setProperty("--py", (dy * 22).toFixed(1) + "px");
        });
        hero.addEventListener("pointerleave", function () {
            poster.style.setProperty("--px", "0px");
            poster.style.setProperty("--py", "0px");
        });
    }
})();
