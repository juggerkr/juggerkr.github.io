document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile navbar toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // --- Copy button functionality ---
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;
      try {
        await navigator.clipboard.writeText(input.value || input.innerText);
        showToast('Copied!');
      } catch {
        alert('Copy failed — select and copy manually.');
      }
      // Deselect
      window.getSelection().removeAllRanges();
    });
  });

  // --- Toast popup function ---
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // --- Table sort functionality ---
  const table = document.querySelector('table');
  if (table) {
    const headers = table.querySelectorAll('th');
    let sortDir = {};
    headers.forEach((header, idx) => {
      header.addEventListener('click', () => {
        const colIndex = idx;
        const rows = Array.from(table.querySelector('tbody').rows);
        rows.sort((a, b) => {
          let valA = a.cells[colIndex].innerText.trim().toLowerCase();
          let valB = b.cells[colIndex].innerText.trim().toLowerCase();
          if (!isNaN(valA) && !isNaN(valB)) {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
          }
          if (valA < valB) return sortDir[colIndex] === 'asc' ? -1 : 1;
          if (valA > valB) return sortDir[colIndex] === 'asc' ? 1 : -1;
          return 0;
        });
        rows.forEach(r => table.querySelector('tbody').appendChild(r));
        headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
        sortDir[colIndex] = sortDir[colIndex] === 'asc' ? 'desc' : 'asc';
        header.classList.add(sortDir[colIndex] === 'asc' ? 'sort-asc' : 'sort-desc');
      });
    });
  }

  // --- Search filter ---
  const filterInput = document.getElementById('filterInput');
  if (filterInput && table) {
    filterInput.addEventListener('input', () => {
      const q = filterInput.value.trim().toLowerCase();
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(r => {
        const name = r.cells[0].innerText.toLowerCase();
        const weapon = r.cells[1].innerText.toLowerCase();
        r.style.display = name.includes(q) || weapon.includes(q) ? '' : 'none';
      });
    });
  }

  // --- Keyboard shortcut for search ---
  if (filterInput) {
    window.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== filterInput) {
        e.preventDefault();
        filterInput.focus();
      }
    });
  }

});
