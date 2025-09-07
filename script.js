// MOBILE NAV
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
if(mobileToggle){
  mobileToggle.addEventListener('click', ()=>{
    if(navLinks.style.display==='flex') navLinks.style.display='none';
    else{
      navLinks.style.display='flex';
      navLinks.style.flexDirection='column';
      navLinks.style.position='absolute';
      navLinks.style.right='20px';
      navLinks.style.top='64px';
      navLinks.style.background='white';
      navLinks.style.padding='12px';
      navLinks.style.borderRadius='10px';
      navLinks.style.boxShadow='0 10px 30px rgba(11,99,199,0.08)';
    }
  });
}

// Mobile toggle (your existing code)
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* Default: hide nav links on small screens */
.nav-links {
  display: flex;
  gap: 15px;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    gap: 10px;
    background: #fff;
    position: absolute;
    top: 60px;
    right: 20px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  .nav-links.active {
    display: flex;
  }
}

  // Animate and remove after 2s
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2000);
}


// TABLE SORT
const table = document.querySelector('table');
if(table){
  const headers = table.querySelectorAll('th'); let sortDir = {};
  headers.forEach(header=>{
    header.addEventListener('click', ()=>{
      const colIndex = header.getAttribute('data-col');
      const rows = Array.from(table.querySelector('tbody').rows);
      rows.sort((a,b)=>{
        let valA = a.cells[colIndex].innerText.trim().toLowerCase();
        let valB = b.cells[colIndex].innerText.trim().toLowerCase();
        if(colIndex==='2'){ valA=parseInt(valA)||0; valB=parseInt(valB)||0; }
        if(valA<valB) return sortDir[colIndex]==='asc'?-1:1;
        if(valA>valB) return sortDir[colIndex]==='asc'?1:-1;
        return 0;
      });
      rows.forEach(r=>table.querySelector('tbody').appendChild(r));
      headers.forEach(h=>h.classList.remove('sort-asc','sort-desc'));
      sortDir[colIndex] = sortDir[colIndex]==='asc'?'desc':'asc';
      header.classList.add(sortDir[colIndex]==='asc'?'sort-asc':'sort-desc');
    });
  });
}

// SEARCH FILTER
const filterInput = document.getElementById('filterInput');
if(filterInput){
  filterInput.addEventListener('input', ()=>{
    const q = filterInput.value.trim().toLowerCase();
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(r=>{
      const name=r.cells[0].innerText.toLowerCase();
      const weapon=r.cells[1].innerText.toLowerCase();
      r.style.display = (name.includes(q)||weapon.includes(q))?'':'none';
    });
  });
}

/*copy*/
document.querySelectorAll('.copy-btn').forEach(btn=>{
btn.addEventListener('click', async ()=>{
const target = btn.getAttribute('data-target');
const el = document.getElementById(target);
try{
await navigator.clipboard.writeText(el.innerText.trim());
const old = btn.innerText;
btn.innerText = 'Copied!';
setTimeout(()=> btn.innerText = old, 1400);
}catch(e){
alert('Copy failed — select and copy manually.');
}
});
});
    // Deselect after copying
    window.getSelection().removeAllRanges();
  });
});

// Toast popup
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// KEYBOARD SEARCH SHORTCUT
window.addEventListener('keydown', e=>{
  if(e.key==='/' && document.activeElement!==filterInput){ e.preventDefault(); filterInput.focus(); }
});
