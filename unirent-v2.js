(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn();}
  function params(){return new URLSearchParams(window.location.search)}
  ready(function(){
    const p=params();
    // Prefill reservation form from homepage query string.
    ['pickupDate','pickupTime','returnDate','returnTime'].forEach(function(id){
      const el=document.getElementById(id); if(el && p.get(id)) el.value=p.get(id);
    });
    const vehicle=p.get('vehicle');
    if(vehicle){
      const title=document.getElementById('selectedTitle'), info=document.getElementById('selectedInfo'), panel=document.getElementById('selectedPanel');
      if(title&&info&&panel){title.textContent=vehicle; info.textContent='Vozilo je prosleđeno iz ponude. Proverite datume i završite rezervaciju.'; panel.classList.add('show'); setTimeout(()=>panel.classList.remove('show'),4200);}
    }
    // Convert offer-card CTAs on non-reservation pages into a real reservation flow.
    document.querySelectorAll('.car-card .more,.card .more').forEach(function(btn){
      const card=btn.closest('.car-card,.card');
      if(!card || location.pathname.endsWith('rezervacija-vozila.html')) return;
      const name=(card.querySelector('h3')||card.querySelector('.car-title'))?.textContent?.trim();
      if(!name) return;
      btn.textContent='Rezerviši →';
      btn.type='button';
      btn.addEventListener('click',function(){
        const q=new URLSearchParams({vehicle:name});
        ['pickupDate','pickupTime','returnDate','returnTime'].forEach(function(id){const el=document.getElementById(id); if(el&&el.value) q.set(id,el.value);});
        window.location.href='rezervacija-vozila.html?'+q.toString();
      });
    });
    // Date guard: return date should not be earlier than pickup date.
    const pd=document.getElementById('pickupDate'), rd=document.getElementById('returnDate');
    if(pd&&rd){
      const sync=function(){rd.min=pd.value; if(rd.value && pd.value && rd.value<pd.value) rd.value=pd.value;};
      pd.addEventListener('change',sync); sync();
    }
    // Improve reservation toggle accessibility.
    const autoToggle=document.getElementById('autoToggle');
    if(autoToggle){autoToggle.setAttribute('aria-pressed', String(!autoToggle.classList.contains('off'))); autoToggle.addEventListener('click',()=>setTimeout(()=>autoToggle.setAttribute('aria-pressed', String(!autoToggle.classList.contains('off'))),0));}
  });
})();
