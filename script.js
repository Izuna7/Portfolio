fetch("gallery.json")
  .then(res => res.json())
  .then(data => {
    const gallery = document.querySelector(".gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = lightbox.querySelector("img");
    const downloadBtn = document.getElementById("downloadBtn");
    const downloadSfx = new Audio("sfx/click.mp3");
    downloadSfx.volume = 0.6;

    data.forEach(item => {
      const img = document.createElement("img");
      img.src = item.preview;
      img.alt = item.title;
      img.loading = "lazy";

      // fade-in
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });

      // enlarge + prep download
      img.onclick = e => {
        e.stopPropagation();
        lightboxImg.src = item.preview;
        downloadBtn.href = item.download;
        downloadBtn.setAttribute("download", "");
        // lightbox.style.display = "flex";
        lightbox.classList.add("active");
      };

      gallery.appendChild(img); // ✅ keep ONE append

      // right-click download
      img.oncontextmenu = e => {
        e.preventDefault();
        window.open(item.download, "_blank");
      };

      // hidden download link (now actually wired)
      const link = document.createElement("a");
      link.href = item.download;
      link.download = "";
      link.textContent = "Download";
      link.style.display = "none";

      // 🔹 ADD: keep reference for safety/debug
      img._downloadLink = link;
    });

    // close lightbox
    lightbox.onclick = e => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
      }
    };

    // 🔹 ADD: prevent bubbling killing download
    downloadBtn.addEventListener("click", e => {
      e.stopPropagation();

      downloadSfx.currentTime = 0; // rewind if clicked fast
      downloadSfx.play();
    });

    // 🔹 ADD: prevent bubbling on image itself
    lightboxImg.addEventListener("click", e => {
      e.stopPropagation();
    });
  });

/* ---- hover logic stays untouched ---- */
const gallery = document.querySelector(".gallery");

gallery.addEventListener("mouseover", e => {
  if (e.target.tagName === "IMG") {
    gallery.classList.add("img-hovering");
    e.target.classList.add("is-hovered");
  }
});

gallery.addEventListener("mouseout", e => {
  if (e.target.tagName === "IMG") {
    gallery.classList.remove("img-hovering");
    e.target.classList.remove("is-hovered");
  }
});
