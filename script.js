// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle")
    const navMenu = document.getElementById("nav-menu")
    const navbar = document.getElementById("navbar")
    const navLinks = document.querySelectorAll(".nav-link")
  
    // Mobile menu toggle
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })
  
    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      })
    })
  
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Smooth scrolling for navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  })
  
  // Scroll to section function
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }
  
  // Portfolio filter functionality
  document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn")
    const portfolioItems = document.querySelectorAll(".portfolio-item")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")
  
        const filterValue = this.getAttribute("data-filter")
  
        portfolioItems.forEach((item) => {
          if (filterValue === "all") {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 10)
          } else {
            const itemCategory = item.getAttribute("data-category")
            if (itemCategory === filterValue) {
              item.style.display = "block"
              setTimeout(() => {
                item.style.opacity = "1"
                item.style.transform = "scale(1)"
              }, 10)
            } else {
              item.style.opacity = "0"
              item.style.transform = "scale(0.8)"
              setTimeout(() => {
                item.style.display = "none"
              }, 300)
            }
          }
        })
      })
    })
  })
  
  // Contact form functionality
  document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm")
  
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()
  
      // Get form data
      const formData = new FormData(this)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")
  
      // Basic validation
      if (!name || !email || !subject || !message) {
        showNotification("Please fill in all fields", "error")
        return
      }
  
      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error")
        return
      }
  
      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML
  
      submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'
      submitButton.disabled = true
  
      // Simulate API call
      setTimeout(() => {
        showNotification("Message sent successfully! We'll get back to you soon.", "success")
        contactForm.reset()
        submitButton.innerHTML = originalText
        submitButton.disabled = false
      }, 2000)
    })
  })
  
  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  // Notification system
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification")
    existingNotifications.forEach((notification) => notification.remove())
  
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
          <div class="notification-content">
              <span class="notification-message">${message}</span>
              <button class="notification-close">&times;</button>
          </div>
      `
  
    // Add styles
    notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"};
          color: white;
          padding: 16px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10000;
          max-width: 400px;
          animation: slideInRight 0.3s ease;
      `
  
    // Add animation keyframes
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style")
      style.id = "notification-styles"
      style.textContent = `
              @keyframes slideInRight {
                  from { transform: translateX(100%); opacity: 0; }
                  to { transform: translateX(0); opacity: 1; }
              }
              @keyframes slideOutRight {
                  from { transform: translateX(0); opacity: 1; }
                  to { transform: translateX(100%); opacity: 0; }
              }
              .notification-content {
                  display:
                  to { transform: translateX(100%); opacity: 0; }
              }
              .notification-content {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 12px;
              }
              .notification-close {
                  background: none;
                  border: none;
                  color: white;
                  font-size: 18px;
                  cursor: pointer;
                  padding: 0;
                  width: 20px;
                  height: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
              }
          `
      document.head.appendChild(style)
    }
  
    // Add to document
    document.body.appendChild(notification)
  
    // Close button functionality
    const closeButton = notification.querySelector(".notification-close")
    closeButton.addEventListener("click", () => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    })
  
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOutRight 0.3s ease"
        setTimeout(() => notification.remove(), 300)
      }
    }, 5000)
  }
  
  // Scroll animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)
  
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(".service-card, .portfolio-item, .feature-item, .team-card")
    animatedElements.forEach((el) => {
      el.classList.add("fade-in")
      observer.observe(el)
    })
  }
  
  // Initialize scroll animations when DOM is loaded
  document.addEventListener("DOMContentLoaded", initScrollAnimations)
  
  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-background")
    const shapes = document.querySelectorAll(".shape")
  
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  
    shapes.forEach((shape, index) => {
      const speed = 0.2 + index * 0.1
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
    })
  })
  
  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  
    // Animate hero elements
    const heroElements = document.querySelectorAll(
      ".hero-badge, .hero-title, .hero-description, .hero-buttons, .hero-stats",
    )
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 200)
    })
  })
  
  // Initialize everything when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    // Add initial styles for animations
    const style = document.createElement("style")
    style.textContent = `
          .hero-badge, .hero-title, .hero-description, .hero-buttons, .hero-stats {
              opacity: 0;
              transform: translateY(30px);
              transition: all 0.8s ease;
          }
          
          body.loaded .hero-badge, 
          body.loaded .hero-title, 
          body.loaded .hero-description, 
          body.loaded .hero-buttons, 
          body.loaded .hero-stats {
              opacity: 1;
              transform: translateY(0);
          }
          
          .fade-in {
              opacity: 0;
              transform: translateY(30px);
              transition: all 0.6s ease;
          }
          
          .fade-in.visible {
              opacity: 1;
              transform: translateY(0);
          }
          
          .portfolio-item {
              transition: all 0.3s ease;
          }
      `
    document.head.appendChild(style)
  })
  
  // Add smooth hover effects for interactive elements
  document.addEventListener("DOMContentLoaded", () => {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll(".btn, .filter-btn, .social-link")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)"
      })
  
      button.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
      })
    })
  
    // Add click ripple effect
    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const ripple = document.createElement("span")
        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
  
        ripple.style.cssText = `
                  position: absolute;
                  width: ${size}px;
                  height: ${size}px;
                  left: ${x}px;
                  top: ${y}px;
                  background: rgba(255, 255, 255, 0.3);
                  border-radius: 50%;
                  transform: scale(0);
                  animation: ripple 0.6s linear;
                  pointer-events: none;
              `
  
        this.style.position = "relative"
        this.style.overflow = "hidden"
        this.appendChild(ripple)
  
        setTimeout(() => ripple.remove(), 600)
      })
    })
  
    // Add ripple animation
    const rippleStyle = document.createElement("style")
    rippleStyle.textContent = `
          @keyframes ripple {
              to {
                  transform: scale(4);
                  opacity: 0;
              }
          }
      `
    document.head.appendChild(rippleStyle)
  })
  
  // Performance optimization: Throttle scroll events
  function throttle(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  // Apply throttling to scroll events
  const throttledScrollHandler = throttle(() => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-background")
    const shapes = document.querySelectorAll(".shape")
  
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  
    shapes.forEach((shape, index) => {
      const speed = 0.2 + index * 0.1
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
    })
  }, 16) // ~60fps
  
  window.addEventListener("scroll", throttledScrollHandler)
  