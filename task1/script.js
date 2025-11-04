// Function to show modal message
function showModalMessage(title) {
  const modal = document.getElementById("customModal");
  const modalTitle = document.getElementById("modalTitle");

  modalTitle.textContent = title;

  modal.style.display = "flex"; // إظهار المودال

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // زر الإغلاق
  document.getElementById("closeModal").onclick = function () {
    modal.style.display = "none";
  };

  setTimeout(() => {
    modal.style.display = "none";
  }, 5000);
}

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const topNav = document.querySelector(".top-nav");
  const navLinks = document.querySelectorAll(".nav-links > li > a ");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const dropdown = this.nextElementSibling;

      // إذا يوجد قائمة منسدلة
      if (dropdown && dropdown.classList.contains("dropdown")) {
        e.preventDefault(); // منع الرابط الافتراضي
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      }
    });
  });
  document.addEventListener("click", function (e) {
    const isClickInside = e.target.closest(".top-nav");
    if (!isClickInside) {
      document.querySelectorAll(".top-nav .dropdown").forEach((drop) => {
        drop.style.display = "none";
      });
    }
  });

  // Toggle mobile menu
  navToggle.addEventListener("click", function () {
    topNav.classList.toggle("active");

    // Animate hamburger icon
    const icon = this.querySelector("i");
    if (topNav.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times"); // addeding the X ICON AND REMOVING it
      icon.classList.add("fa-bars");
    }
  });
  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 1024 && topNav.classList.contains("active")) {
        topNav.classList.remove("active");
        const icon = navToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }, 250);
  });
});

// Form validation and file upload handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("Form");
  const fileInput = document.getElementById("cv");
  const fileLabel = document.querySelector(".file-upload-label");
  const fileText = document.querySelector(".file-upload-text");

  // Handle file upload display
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const fileName = this.files[0].name;
        fileText.textContent = fileName;
      } else {
        fileText.textContent = "الرجاء إرفاق السيرة الذاتية";
      }
    });
  }

  // Form submission
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const phoneNumber = document.getElementById("phoneNumber").value.trim();
      const location = document.getElementById("location").value;
      const experience = document.getElementById("experience").value;
      const cv = fileInput.files[0];

      // Basic validation
      if (!fullName || !phoneNumber || !location || !experience || !cv) {
        showModalMessage("الرجاء تعبئة جميع الحقول المطلوبة", "#5f329a");

        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("FullName", fullName);
      formData.append("PhoneNumber", phoneNumber);
      formData.append("PlaceId", location);
      formData.append("YearOfExperince", experience);
      formData.append("File", cv);

      try {
        const response = await fetch(
          "http://213.6.16.34:4685/Gateway/MotorsApiV2/api/v1/Test",
          {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Accept-Language": "en",
              SourceId: "0",
            },
            body: formData,
          }
        );
        let data = null;
        try {
          data = await response.json();
        } catch {
          // If response isn't JSON (e.g. empty 200 OK)
          data = {};
        }

        if (!response.ok) {
          showModalMessage(data.message || "حدث خطأ أثناء معالجة الطلب.");
          return;
        }

        showModalMessage("تم إرسال طلبك بنجاح!");
        console.log("Response:", data);

        // Reset form
        form.reset();
        fileText.textContent = "الرجاء إرفاق السيرة الذاتية";
      } catch (error) {
        console.error("Error:", error);
        showModalMessage(
          "حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى."
        );
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const locationSelect = document.getElementById("location");

  try {
    const response = await fetch(
      "http://213.6.16.34:4685/Gateway/MotorsApiV2/api/v1/Test/Places",
      {
        method: "GET",
        headers: {
          accept: "*/*",
          "Accept-Language": "en",
          SourceId: "0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.data[0]);
    data.data.forEach((place) => {
      const option = document.createElement("option");
      option.value = place.id || place.name;
      option.textContent = place.name || place.PlaceName;
      locationSelect.appendChild(option);
    });
  } catch (error) {
    showMessage("خطا في تحميل البيانات", "#ff4b4b");
  }
});
//Add animation on scroll for form elements
const groups = document.querySelectorAll(".form-group-section");

groups.forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

groups.forEach((el) => observer.observe(el));
