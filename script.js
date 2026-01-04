fetch("gallery.json")
  .then(res => res.json())
  .then(data => {
    const gallery = document.querySelector(".gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = lightbox.querySelector("img");

    data.forEach(item => {
      const img = document.createElement("img");
      img.src = item.preview;
      img.alt = item.title;
      img.loading = "lazy";

      // fade-in (your existing logic)
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });

      // enlarge
      img.onclick = () => {
        lightboxImg.src = item.preview;
        lightbox.style.display = "flex";
      };

      // download on right-click optional
      img.oncontextmenu = e => {
        e.preventDefault();
        window.open(item.download, "_blank");
      };

      // download button (simple)
      const link = document.createElement("a");
      link.href = item.download;
      link.download = "";
      link.textContent = "Download";
      link.style.display = "none";

      gallery.appendChild(img);
    });

    // close lightbox
    lightbox.onclick = e => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    };
  });
