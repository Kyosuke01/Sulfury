// ─── Burger menu ──────────────────────────────────────────
const nav_burger    = document.getElementById("nav_burger");
const nav_link      = document.getElementById("nav_link");

nav_burger.addEventListener("click", function () {
    nav_link.classList.toggle("show_list");
});

// Close burger when clicking a link (mobile UX)
nav_link.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        nav_link.classList.remove("show_list");
    });
});

// ─── Navbar scroll effect ─────────────────────────────────
const nav = document.getElementById("nav");

window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
}, { passive: true });

// ─── Discord Status Badge ─────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
    const badge = document.createElement("a");
    badge.className = "discord-status-badge";
    badge.href = "https://discord.gg/VFMfByp3ed";
    badge.target = "_blank";
    badge.title = "Rejoindre le serveur Discord";
    badge.innerHTML = `
        <i class="fa-brands fa-discord"></i>
        <span class="status-text">
            <strong id="badge-online">14</strong> en ligne <span class="badge-separator">|</span> <strong id="badge-total">70</strong> membres <span class="badge-separator">|</span> <strong id="badge-boosts">0</strong> boosts
        </span>
    `;
    document.body.appendChild(badge);

    // Récupérer les statistiques en direct de Discord
    fetch('https://discord.com/api/v9/invites/VFMfByp3ed?with_counts=true')
        .then(res => res.json())
        .then(data => {
            if (data) {
                if (data.approximate_presence_count) {
                    const onlineEl = document.getElementById("badge-online");
                    if (onlineEl) onlineEl.textContent = data.approximate_presence_count;
                }
                if (data.approximate_member_count) {
                    const totalEl = document.getElementById("badge-total");
                    if (totalEl) totalEl.textContent = data.approximate_member_count;
                }
                if (data.guild && typeof data.guild.premium_subscription_count === 'number') {
                    const boostsEl = document.getElementById("badge-boosts");
                    if (boostsEl) boostsEl.textContent = data.guild.premium_subscription_count;
                }
            }
        })
        .catch(err => console.log("Statistiques de statut en direct indisponibles, utilisation des valeurs par défaut.", err));
});