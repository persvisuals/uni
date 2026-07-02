(function(){
  function ready(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn); else fn(); }
  ready(function(){
    const nav=document.querySelector('.nav');
    if(nav){
      const links=nav.querySelector('.navlinks');
      const btn=nav.querySelector('.menu,.hamb');
      if(links && btn){
        if(!links.id) links.id='primary-navigation';
        btn.classList.add('menu');
        btn.type='button';
        btn.setAttribute('aria-controls', links.id);
        btn.setAttribute('aria-expanded','false');
        if(!btn.textContent.trim() || btn.textContent.trim()==='☰' || btn.textContent.trim()==='Menu') btn.textContent='Meni';
        const setOpen=(open)=>{links.classList.toggle('is-open',open);btn.setAttribute('aria-expanded',String(open));};
        btn.addEventListener('click',function(e){e.stopPropagation();setOpen(!links.classList.contains('is-open'));});
        links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
        document.addEventListener('click',function(e){if(!nav.contains(e.target)) setOpen(false);});
        document.addEventListener('keydown',function(e){if(e.key==='Escape') setOpen(false);});
      }
    }

    document.querySelectorAll('img[data-fallback]').forEach(function(img){
      const slot=img.closest('.image-slot');
      const ph=slot ? slot.querySelector('.placeholder,.slot') : null;
      const loaded=function(){ if(img.naturalWidth>0){ img.classList.remove('is-missing'); if(ph) ph.style.display='none'; } };
      const missing=function(){ img.classList.add('is-missing'); if(ph) ph.style.display='flex'; };
      img.addEventListener('load',loaded); img.addEventListener('error',missing);
      if(img.complete){ img.naturalWidth>0 ? loaded() : missing(); }
    });
  });
})();
