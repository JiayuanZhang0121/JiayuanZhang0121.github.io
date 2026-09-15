(function(){
  const el = document.querySelector('[data-clock]');
  if (!el) return;
  function tick(){
    const now = new Date();
    el.textContent = now.toLocaleString([], {
      year:'numeric', month:'2-digit', day:'2-digit',
      hour:'2-digit', minute:'2-digit'
    });
  }
  tick();
  setInterval(tick, 30000);
})();
