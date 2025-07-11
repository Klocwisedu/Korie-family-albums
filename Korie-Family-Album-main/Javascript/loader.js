
  window.addEventListener("load", function () {
    setTimeout(() => {
      const loader = document.getElementById("loader-container");
      if (loader) {
        loader.classList.add("hidden"); // triggers the fade
        setTimeout(() => {
          loader.style.display = "none"; // completely removes it after fade
        }, 500); // match the CSS transition duration
      }
    }, 2500); // Loader stays for 2.5 seconds before fade starts
  });

