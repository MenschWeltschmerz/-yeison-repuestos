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
