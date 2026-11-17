// ═══════════════════════════════════════════════════════════
// Sulfury — page Équipe : copie des pseudos, réseaux repliables,
// compteurs
// ═══════════════════════════════════════════════════════════
(function () {
    "use strict";

    // ─── Copie du pseudo + message en bas de l'écran ──────
    var toast = document.getElementById("toast");
    var toastTimer;

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 1500);
    }

    // Repli pour les navigateurs sans API presse-papiers (ou qui la refusent)
    function legacyCopy(text) {
        return new Promise(function (resolve, reject) {
            var area = document.createElement("textarea");
            area.value = text;
            area.setAttribute("readonly", "");
            area.style.position = "fixed";
            area.style.opacity = "0";
            document.body.appendChild(area);
            area.select();
            var ok = false;
            try { ok = document.execCommand("copy"); } catch (e) { /* ignoré */ }
            document.body.removeChild(area);
            ok ? resolve() : reject();
        });
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).catch(function () {
                return legacyCopy(text);
            });
        }
        return legacyCopy(text);
    }

    document.querySelectorAll(".handle").forEach(function (button) {
        button.addEventListener("click", function () {
            var pseudo = button.getAttribute("data-copy");
            copyText(pseudo).then(function () {
                showToast("Nom d'utilisateur copié : " + pseudo);
            }).catch(function () {
                showToast("Impossible de copier le nom d'utilisateur.");
            });
        });
    });

    // ─── Réseaux : au-delà de 4, on montre 3 liens + un bouton « +X » ─
    // Sans JavaScript, tous les liens restent visibles (grille de 4 colonnes).
    var VISIBLE = 3;

    document.querySelectorAll(".socials").forEach(function (list) {
        var items = Array.prototype.slice.call(list.children);
        if (items.length <= VISIBLE + 1) return;

        var extra = items.slice(VISIBLE);
        var li = document.createElement("li");
        var toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "socials-toggle";
        li.appendChild(toggle);

        function render(expanded) {
            toggle.setAttribute("aria-expanded", String(expanded));
            if (expanded) {
                extra.forEach(function (item) {
                    item.hidden = false;
                    item.classList.add("fresh");
                });
                list.appendChild(li); // le bouton passe en dernière position
                toggle.textContent = "−";
                toggle.setAttribute("aria-label", "Masquer les autres liens");
            } else {
                extra.forEach(function (item) {
                    item.hidden = true;
                    item.classList.remove("fresh");
                });
                list.insertBefore(li, extra[0]); // le bouton occupe la 4e case
                toggle.textContent = "+" + extra.length;
                toggle.setAttribute("aria-label", "Afficher " + extra.length + " autres liens");
            }
        }

        toggle.addEventListener("click", function () {
            render(toggle.getAttribute("aria-expanded") !== "true");
        });
        render(false);
    });

    // ─── Le disque suit légèrement la souris (comme sur l'accueil) ─
    var head = document.querySelector(".page-head");
    var disc = document.querySelector(".head-art-disc");
    var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (head && disc && canHover && !reduceMotion) {
        head.addEventListener("pointermove", function (e) {
            var r = head.getBoundingClientRect();
            var dx = (e.clientX - (r.left + r.width * 0.7)) / r.width;
            var dy = (e.clientY - (r.top + r.height * 0.5)) / r.height;
            disc.style.setProperty("--px", (dx * 22).toFixed(1) + "px");
            disc.style.setProperty("--py", (dy * 22).toFixed(1) + "px");
        });
        head.addEventListener("pointerleave", function () {
            disc.style.setProperty("--px", "0px");
            disc.style.setProperty("--py", "0px");
        });
    }

    // ─── Compteurs (calculés depuis le HTML : rien à mettre à jour à la main) ─
    var total = document.querySelectorAll(".member").length;
    document.querySelectorAll("[data-team-count]").forEach(function (el) {
        el.textContent = total;
    });
    document.querySelectorAll(".group").forEach(function (group) {
        var count = group.querySelectorAll(".member").length;
        var badge = group.querySelector(".group-count");
        if (badge) badge.textContent = String(count).padStart(2, "0");
    });
})();
