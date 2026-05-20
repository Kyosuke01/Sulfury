// ─── Generic copy + toast ─────────────────────────────────
function copyPseudo(pseudo, toastId) {
    navigator.clipboard.writeText(pseudo).catch(function () {
        // Fallback for browsers without clipboard API
        var el = document.createElement("textarea");
        el.value = pseudo;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    });

    var toast = document.getElementById(toastId);
    if (!toast) return;

    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 1200);
}

// ─── Accordéon Dynamique pour les réseaux sociaux (>3) ───
document.addEventListener("DOMContentLoaded", function () {
    const linkContainers = document.querySelectorAll(".link");
    
    linkContainers.forEach(container => {
        const links = Array.from(container.querySelectorAll("a"));
        if (links.length > 3) {
            // Masquer les liens à partir de l'index 3 (4ème élément)
            links.forEach((link, index) => {
                if (index >= 3) {
                    link.style.display = "none";
                }
            });
            
            // Créer le bouton d'expansion "+"
            const toggleBtn = document.createElement("button");
            toggleBtn.type = "button";
            toggleBtn.className = "toggle-links-btn";
            toggleBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
            toggleBtn.title = "Voir plus de liens";
            
            toggleBtn.addEventListener("click", function () {
                const isExpanded = container.classList.toggle("expanded");
                
                links.forEach((link, index) => {
                    if (index >= 3) {
                        link.style.display = isExpanded ? "flex" : "none";
                    }
                });
                
                toggleBtn.innerHTML = isExpanded 
                    ? '<i class="fa-solid fa-minus"></i>' 
                    : '<i class="fa-solid fa-plus"></i>';
                toggleBtn.title = isExpanded ? "Voir moins" : "Voir plus de liens";
            });
            
            container.appendChild(toggleBtn);
        }
    });
});