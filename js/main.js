
document.addEventListener("DOMContentLoaded", () => {
  /*************************
   * 1. DOM REFERENCES
   *************************/
  const hamburger = document.querySelector(".hamburger-button");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector(".primary-header");
  const navLinksItems = document.querySelectorAll(".nav-link");
  const cartBtn = document.querySelector(".cart-btn");
  const cartBadge = document.querySelector(".cart-badge");
  const shopNowBtn = document.querySelector(".btn-primary");
  const productSection = document.getElementById("product");
  const searchInput = document.querySelector(".search-input");
  const clearBtn = document.querySelector(".clear-btn");
  const drawerHeader = document.querySelector(".drawer-header");
  const signInLink = document.querySelector(".signin-link");
  const navRight = document.querySelector(".nav-right");


  /*************************
  * SEARCH FEATURE
   *************************/
if (searchInput && clearBtn) {

  function toggleClearBtn() {
    clearBtn.hidden = searchInput.value.trim() === "";
  }

  // Listen for typing, paste, autofill, etc.
  searchInput.addEventListener("input", toggleClearBtn);

  // Clear input on button click
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    clearBtn.hidden = true;
  });
}


  /*************************
   * 4. DATA
   *************************/
  const products = [
    { name: "Shoes", price: 1200 },
    { name: "Shirts", price: 800 },
    { name: "Jeans", price: 1500 },
    { name: "Watches", price: 2500 },
    { name: "Bags", price: 2000 },
    { name: "Sunglasses", price: 1800 }
  ];


  /*************************
   * 6. HELPERS
   *************************/
  function openMenu() {
    hamburger.classList.add('is-active');
    navLinks.classList.add('is-active');
    header.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }

function closeMenu() {
    hamburger.classList.remove('is-active');
    navLinks.classList.remove('is-active');
    header.classList.remove('menu-open');
    document.body.style.overflow = '';
  }


// Clone the existing Sign-In link and place it inside the mobile drawer header (only once)
if (drawerHeader && signInLink && !drawerHeader.querySelector(".drawer-signin")) {
  const clonedSignIn = signInLink.cloneNode(true); // deep clone
  clonedSignIn.classList.add("drawer-signin");     // optional hook
  drawerHeader.appendChild(clonedSignIn);
}


  /*************************
   * 7. EVENT LISTENERS
   *************************/
   hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.contains('is-active') ? closeMenu() : openMenu();
  });

  navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
  })
  // Close when clicking a nav link
  navLinksItems.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside menu
  document.addEventListener('click', (e) => {
    if (
      header.classList.contains('menu-open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });





  // Show blue focus ring on first tap
  hamburger.addEventListener("click", () => {
    hamburger.classList.add("has-focus");
  });
// Remove focus ring when tapping outside (backdrop)
window.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target)) {
    hamburger.classList.remove("has-focus");
  }
});





  // Smart reset: auto-close the mobile menu when screen grows to desktop size (>768px)
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });




  // <div class="cart-container"></div>
  if (cartBtn && cartBadge) {
    cartBtn.addEventListener("click", () => {
    let currentCount = parseInt(cartBadge.textContent, 10) || 0;
    cartBadge.textContent = currentCount + 1;
  });
}


/************************************
  HEADER HERO SHOP NOW BUTTON SCROLL
 ************************************/
if (shopNowBtn && productSection) {
    shopNowBtn.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default jump
      productSection.scrollIntoView({
        behavior: "smooth", // smooth scroll
        block: "start"      // align to top
      });
    });
  }



}); // ← end DOMContentLoaded