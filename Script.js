// Smooth scroll to contact section
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Modal open/close
function openModal(id) {
  document.getElementById(id).style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
window.onclick = function (event) {
  document.querySelectorAll(".modal").forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

// Form and select handling
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.toggle("show");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const makeSelect = document.getElementById("car-make");
  const modelSelect = document.getElementById("car-model");

  const carData = {
    Toyota: ["Corolla", "Camry", "RAV4", "Highlander"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot"],
    Ford: ["F-150", "Escape", "Explorer", "Mustang"],
    Chevrolet: ["Silverado", "Equinox", "Malibu", "Tahoe"],
    BMW: ["3 Series", "5 Series", "X3", "X5"],
    Mercedes: ["C-Class", "E-Class", "GLC", "GLE"],
    Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe"],
    Nissan: ["Altima", "Sentra", "Rogue", "Pathfinder"],
    Kia: ["Forte", "Optima", "Sportage", "Sorento"],
    Jeep: ["Wrangler", "Grand Cherokee", "Compass", "Renegade"]
  };

  for (let make in carData) {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeSelect.appendChild(option);
  }

  makeSelect.addEventListener("change", () => {
    const selectedMake = makeSelect.value;
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    modelSelect.disabled = !selectedMake;
    if (carData[selectedMake]) {
      carData[selectedMake].forEach(model => {
        const option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
      });
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const scriptURL = "https://script.google.com/macros/s/AKfycbzsVCpnmmHTnydOizXJnMValc3fyKEIjIXLQb89A2L2CvSj0iKU9hhhL6Z7OFl5p2nP/exec";
    const formData = new FormData(form);
    fetch(scriptURL, {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) {
        alert("Thank you! Your appointment has been submitted.");
        form.reset();
        modelSelect.disabled = true;
      } else {
        alert("Something went wrong. Please try again later.");
      }
    })
    .catch(error => {
      console.error("Error!", error.message);
      alert("Failed to submit. Please try again.");
    });
  });

  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
      });
    });
  }

});
