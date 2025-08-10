// Tailwind + Vanilla JS app shell for Taxation Module
document.addEventListener('DOMContentLoaded', () => {
  function setMainHeight() {
    const main = document.querySelector('.main-content');
    if (!main) return;

    // Where does the main wrapper start on the page?
    const mainTop = main.getBoundingClientRect().top + window.scrollY;

    // Try common footer selectors. If your footer has a different selector, include it here.
    const footerEl =
      document.querySelector('footer, .footer, #footer, [data-role="footer"]');
    const footerH = footerEl ? footerEl.offsetHeight : 0;

    const height = window.innerHeight - mainTop - footerH;
    if (height > 0) {
      main.style.height = `${height}px`;
    }
  }

  setMainHeight();
  window.addEventListener('resize', setMainHeight);

  // If your header has collapse/restore buttons, re-measure after they animate.
  document.getElementById('headerToggleBtn')?.addEventListener('click', () =>
    setTimeout(setMainHeight, 200)
  );
  document.getElementById('restoreToggleBtn')?.addEventListener('click', () =>
    setTimeout(setMainHeight, 200)
  );

  const itBtn = document.getElementById('toggleIt');
  const gstBtn = document.getElementById('toggleGst');
  const itWorkspace = document.getElementById('itWorkspace');
  const gstBanner = document.getElementById('gstBanner');

  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const content = document.getElementById('content');
  const sidebarList = document.getElementById('sidebarList');

  const panels = {
    dashboard: document.getElementById('panel-dashboard'),
    form24q: document.getElementById('panel-form24q'),
    form26q: document.getElementById('panel-form26q'),
    form24g: document.getElementById('panel-form24g'),
    recon: document.getElementById('panel-recon'),
    bin: document.getElementById('panel-bin'),
    acks: document.getElementById('panel-acks'),
    export: document.getElementById('panel-export'),
    alerts: document.getElementById('panel-alerts'),
    circulars: document.getElementById('panel-circulars'),
    help: document.getElementById('panel-help'),
  };

  // Debug: Log which panels were found
  console.log('Panels found:', Object.entries(panels).map(([k, v]) => `${k}: ${v ? 'found' : 'missing'}`));

  function setActiveSidebarItem(targetKey) {
    if (!sidebarList) return;
    const items = sidebarList.querySelectorAll('.sidebar-item');
    items.forEach((li) => {
      if (li.dataset.target === targetKey) {
        li.classList.add('bg-blue-100');
      } else {
        li.classList.remove('bg-blue-100');
      }
    });
  }

  function showPanel(key) {
    Object.entries(panels).forEach(([k, el]) => {
      if (!el) return;
      if (k === key) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
    setActiveSidebarItem(key);
  }

  // Initialize accordions to show first item by default
  function initializeAccordions() {
    console.log('Initializing accordions...');
    document.querySelectorAll('.accordion').forEach((acc, index) => {
      // Reset any previously active items to avoid multiple open sections
      acc
        .querySelectorAll('.accordion-item.active')
        .forEach((item) => item.classList.remove('active'));

      // Find the first accordion item and make it active
      const firstItem = acc.querySelector('.accordion-item');
      if (firstItem) {
        firstItem.classList.add('active');
        console.log(`Accordion ${index}: Set first item as active`);
      } else {
        console.log(`Accordion ${index}: No accordion items found`);
      }
    });
  }

  // Default: IT workspace visible, Dashboard panel
  itBtn?.classList.add('bg-blue-600', 'text-white');
  gstBtn?.classList.remove('bg-blue-600', 'text-white');
  if (itWorkspace) itWorkspace.classList.remove('hidden');
  if (gstBanner) gstBanner.classList.add('hidden');
  showPanel('dashboard');
  
  // Initialize accordions after showing dashboard
  setTimeout(initializeAccordions, 100);

  // Toggle IT/GST
  itBtn?.addEventListener('click', () => {
    itBtn.classList.add('bg-blue-600', 'text-white');
    gstBtn.classList.remove('bg-blue-600', 'text-white');
    itWorkspace.classList.remove('hidden');
    gstBanner.classList.add('hidden');
  });
  gstBtn?.addEventListener('click', () => {
    gstBtn.classList.add('bg-blue-600', 'text-white');
    itBtn.classList.remove('bg-blue-600', 'text-white');
    itWorkspace.classList.add('hidden');
    gstBanner.classList.remove('hidden');
  });

  // Sidebar collapse/expand
  let isCollapsed = false;
  sidebarToggle?.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    if (isCollapsed) {
      sidebar.style.width = '56px';
      content.style.left = '56px';
      sidebar.querySelectorAll('.label').forEach((el) => (el.style.display = 'none'));
      sidebarToggle.innerHTML = '<i class="fa-solid fa-angles-right text-xl"></i>';
      sidebarToggle.title = 'Expand';
    } else {
      sidebar.style.width = '14rem'; // 56 => w-56
      content.style.left = '14rem';
      sidebar.querySelectorAll('.label').forEach((el) => (el.style.display = 'inline'));
      sidebarToggle.innerHTML = '<i class="fa-solid fa-angles-left text-xl"></i>';
      sidebarToggle.title = 'Collapse';
    }
  });

  // Sidebar item click handling
  sidebarList?.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-target]');
    if (!li) return;
    const key = li.dataset.target;
    showPanel(key);
    
    // Re-initialize accordions for the new panel
    setTimeout(initializeAccordions, 100);
  });

  // Accordion behavior: one open per accordion container
  document.querySelectorAll('.accordion').forEach((acc) => {
    acc.addEventListener('click', (e) => {
      const header = e.target.closest('.accordion-header');
      if (!header) return;
      const item = header.parentElement;
      // close others in same accordion
      acc.querySelectorAll('.accordion-item').forEach((it) => {
        if (it !== item) it.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });

  // Declaration modal controls
  const modal = document.getElementById('declarationModal');
  const openBtns = [document.getElementById('openDeclaration'), document.getElementById('openDeclaration2')].filter(Boolean);
  const cancelBtn = document.getElementById('cancelDecl');
  const confirmBtn = document.getElementById('confirmDecl');
  const agree = document.getElementById('agreeDecl');

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  openBtns.forEach((b) => b.addEventListener('click', openModal));
  cancelBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  agree?.addEventListener('change', () => {
    confirmBtn.disabled = !agree.checked;
  });
});


