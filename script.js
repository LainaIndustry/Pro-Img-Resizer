// script.js

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {

  // Get all upload areas
  const uploadAreas = document.querySelectorAll(".upload-area");

  uploadAreas.forEach(area => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    area.appendChild(fileInput);

    // Click to open file selector
    area.addEventListener("click", () => {
      fileInput.click();
    });

    // Drag over styling
    area.addEventListener("dragover", (e) => {
      e.preventDefault();
      area.classList.add("border-blue-500", "bg-gray-100");
    });

    area.addEventListener("dragleave", () => {
      area.classList.remove("border-blue-500", "bg-gray-100");
    });

    // Handle drop
    area.addEventListener("drop", (e) => {
      e.preventDefault();
      area.classList.remove("border-blue-500", "bg-gray-100");
      const files = e.dataTransfer.files;
      handleFiles(files, area);
    });

    // Handle file selection via input
    fileInput.addEventListener("change", (e) => {
      const files = e.target.files;
      handleFiles(files, area);
    });
  });

  // Function to handle files
  function handleFiles(files, area) {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Display preview
    let preview = area.querySelector("img");
    if (!preview) {
      preview = document.createElement("img");
      preview.classList.add("mt-4", "mx-auto", "rounded", "shadow");
      preview.style.maxWidth = "100%";
      preview.style.maxHeight = "300px";
      area.appendChild(preview);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

});
