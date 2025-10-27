const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('sidebarToggleOpen');
const closeBtn = document.getElementById('sidebarToggleClose');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const allImages = document.querySelectorAll('img');
const sections = document.querySelectorAll('section');

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('#sidebar ul li a');

  if (navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');

      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`#sidebar a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    observer.observe(section);
  });
});

function isMobile() {
  return window.innerWidth <= 768;
}

function openSidebar() {
  if (isMobile()) {
    sidebar.classList.add('show');
    overlay.style.display = 'block';
    openBtn.style.display = 'none';
    closeBtn.style.display = 'inline-block';
    document.body.style.overflow = 'hidden';
  }
}

function closeSidebar() {
  if (isMobile()) {
    sidebar.classList.remove('show');
    overlay.style.display = 'none';
    openBtn.style.display = 'inline-block';
    closeBtn.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

openBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', () => {
  closeSidebar();
});

overlay.addEventListener('click', closeSidebar);

allImages.forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

modal.addEventListener('click', closeModal);