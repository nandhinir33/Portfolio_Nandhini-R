function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

const sections = document.querySelectorAll('section');

const revealSection = () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealSection);
window.addEventListener('load', revealSection);


particlesJS("particles-js", {
  particles: {
    number: {
      value: 60,
      density: { enable: true, value_area: 800 }
    },
    color: { value: "#ff69b4" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ff69b4",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      }
    }
  },
  retina_detect: true
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("form-status");

  if (!name || !email || !message) {
    status.innerText = "Please fill in all fields.";
    status.style.color = "red";
    return;
  }

  fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === "Message received") {
      status.innerText = "Message sent successfully!";
      status.style.color = "green";
      document.getElementById("contactForm").reset();
    } else {
      status.innerText = "Something went wrong. Please try again.";
      status.style.color = "red";
    }
  })
  .catch(err => {
    console.error(err);
    status.innerText = "Server error. Please try later.";
    status.style.color = "red";
  });
});
