(function(){
  var els = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){ els.forEach(function(e){e.classList.add("is-visible");}); return; }
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
    });
  }, {threshold:0.15, rootMargin:"0px 0px -30px 0px"});
  els.forEach(function(e){ obs.observe(e); });
})();

(function(){
  var page = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest('a[href^="https://wa.me/"]');
    if(!a) return;
    var text = (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 60);
    if(typeof window.gtag === "function"){
      window.gtag("event", "whatsapp_click", {page: page, link_text: text});
    } else {
      (window.dataLayer = window.dataLayer || []).push({event: "whatsapp_click", page: page, link_text: text});
    }
  });
})();
