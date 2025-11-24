    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    function getItemsPerPage() {
      const w = window.innerWidth;
      if (w < 640) return 1;      // mobile
      if (w < 1024) return 2;     // tablet
      return 3;                   // desktop
    }
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      // ubah ikon
      if (menu.classList.contains('active')) {
        icon.textContent = "X"; // X icon
      } else {
        icon.textContent = "☰"; // menu icon
      }
    });

    const KONTEN_PER_PAGE = 3;
    let kontenPages = [];
    let kontenCurrentPage = 0;

    async function loadYoutubeContent() {
      const container = document.getElementById("konten-container");
      const indicator = document.getElementById("konten-indicator");
      const btnPrev = document.getElementById("konten-prev");
      const btnNext = document.getElementById("konten-next");

      container.innerHTML = `
        <div class="text-center py-6 text-gray-500 text-sm">
          Memuat konten YouTube...
        </div>
      `;

      try {
        const res = await fetch("/api/youtube.php");
        if (!res.ok) throw new Error("HTTP status " + res.status);

        const data = await res.json();
        const items = Array.isArray(data.items) ? data.items : [];

        if (!items.length) {
          container.innerHTML = `
            <div class="text-center py-12 bg-gray-50 border rounded-lg">
              <p class="text-gray-600">📌 Konten belum tersedia</p>
              <p class="font-semibold text-yellow-600 mt-2">Coming Soon...</p>
            </div>
          `;
          return;
        }

        // buat halaman (3 per halaman)
        const perPage = getItemsPerPage();
        kontenPages = [];
        for (let i = 0; i < items.length; i += perPage) {
          kontenPages.push(items.slice(i, i + perPage));
        }
        kontenCurrentPage = 0;

        renderKontenPage();

        btnPrev.onclick = () => {
          if (kontenCurrentPage > 0) {
            kontenCurrentPage--;
            renderKontenPage();
          }
        };

        btnNext.onclick = () => {
          if (kontenCurrentPage < kontenPages.length - 1) {
            kontenCurrentPage++;
            renderKontenPage();
          }
        };

      } catch (error) {
        container.innerHTML = `
          <div class="text-center py-12 bg-gray-50 border rounded-lg">
            <p class="text-red-600 font-semibold mb-2">Gagal memuat konten YouTube</p>
            <p class="text-gray-600 text-sm">${error.message}</p>
          </div>
        `;
      }

      function renderKontenPage() {
        const pageItems = kontenPages[kontenCurrentPage];
        const totalPages = kontenPages.length;

        const grid = document.createElement("div");
        grid.className =
          "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 duration-300";

        pageItems.forEach((item) => {
          const s = item.snippet;
          const title = s.title;
          const img = s.thumbnails.high.url;
          const desc = s.description.length > 80 ? s.description.substring(0, 80) + "..." : s.description;
          const videoId = item.id.videoId;

          const card = document.createElement("article");
          card.className =
            "bg-white/80 border border-slate-200 rounded-2xl shadow-sm " +
            "overflow-hidden hover:-translate-y-1 hover:shadow-xl";

          card.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="group flex flex-col h-full">
              <div class="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img src="${img}" class="w-full h-full object-cover group-hover:scale-105 duration-300" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div class="px-4 py-3">
                <h3 class="font-semibold text-sm line-clamp-2">${title}</h3>
                <p class="text-xs text-slate-500 mt-1 line-clamp-2">${desc}</p>
              </div>
            </a>
          `;

          grid.appendChild(card);
        });

        container.innerHTML = "";
        container.appendChild(grid);

        indicator.innerHTML = `Halaman ${kontenCurrentPage + 1} / ${totalPages}`;

        btnPrev.disabled = kontenCurrentPage === 0;
        btnNext.disabled = kontenCurrentPage === totalPages - 1;
      }
    }



    document.querySelectorAll('.job button').forEach(btn => {
      btn.addEventListener('click', () => {
        const job = btn.parentElement;
        const details = job.querySelector('.details');
        const arrow = job.querySelector('.arrow');

        // toggle open
        if (details.classList.contains('max-h-0')) {
          details.classList.remove('max-h-0', 'opacity-0');
          details.classList.add('max-h-[12000px]', 'opacity-100');
          arrow.classList.add('rotate-180');
        } else {
          details.classList.add('max-h-0', 'opacity-0');
          details.classList.remove('max-h-[12000px]', 'opacity-100');
          arrow.classList.remove('rotate-180');
        }
      });
    });

  let produkPages = [];
  let produkCurrentPage = 0;

  const produkList = [
    {
      name: "Dashboard",
      desc: "Modul pusat kontrol yang menampilkan ringkasan data dari berbagai layanan.",
      link: "https://dashboard.rumahjooocode.com",
      img: "assets/dashboard.png",
    },
    {
      name: "Dashboard",
      desc: "Modul pusat kontrol yang menampilkan ringkasan data dari berbagai layanan.",
      link: "https://dashboard.rumahjooocode.com",
      img: "assets/dashboard.png",
    },
  ];

  function loadProdukCarousel() {
    const container = document.getElementById("produk-container");
    const indicator = document.getElementById("produk-indicator");
    const btnPrev = document.getElementById("produk-prev");
    const btnNext = document.getElementById("produk-next");

    if (!produkList.length) {
      container.innerHTML = `
        <div class="text-center py-12 bg-gray-50 border rounded-lg">Produk belum tersedia</div>
      `;
      return;
    }

    // buat halaman 3 produk per halaman
    const perPage = getItemsPerPage();
    produkPages = [];
    for (let i = 0; i < produkList.length; i += perPage) {
      produkPages.push(produkList.slice(i, i + perPage));
    }
    produkCurrentPage = 0;

    renderProdukPage();

    btnPrev.onclick = () => {
      if (produkCurrentPage > 0) {
        produkCurrentPage--;
        renderProdukPage();
      }
    };

    btnNext.onclick = () => {
      if (produkCurrentPage < produkPages.length - 1) {
        produkCurrentPage++;
        renderProdukPage();
      }
    };

    function renderProdukPage() {
      const pageItems = produkPages[produkCurrentPage];
      const totalPages = produkPages.length;

      const grid = document.createElement("div");
      grid.className = "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

      pageItems.forEach((item) => {
        const card = document.createElement("article");
        card.className =
          "bg-white/80 border rounded-2xl shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl transition";

        card.innerHTML = `
          <a href="${item.link}" target="_blank" class="group flex flex-col h-full">
            <div class="relative aspect-[16/10] overflow-hidden bg-slate-200">
              <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-105 duration-300" />
              <div class="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                Produk
              </div>
            </div>

            <div class="p-4 flex-1 flex flex-col">
              <h3 class="text-sm font-semibold mb-1 line-clamp-2">${item.name}</h3>
              <p class="text-xs text-slate-600 line-clamp-3">${item.desc}</p>

              <div class="mt-3">
                <span class="inline-flex items-center justify-center gap-1 bg-blue-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-blue-700 transition">
                  Kunjungi Halaman →
                </span>
              </div>
            </div>
          </a>
        `;

        grid.appendChild(card);
      });

      container.innerHTML = "";
      container.appendChild(grid);

      indicator.innerHTML = `Halaman ${produkCurrentPage + 1} / ${totalPages}`;

      btnPrev.disabled = produkCurrentPage === 0;
      btnNext.disabled = produkCurrentPage === totalPages - 1;
    }
  }

  const year = new Date().getFullYear();
  document.getElementById("footer-text").textContent = `© ${year} Joko Prasetio`;

  document.addEventListener("DOMContentLoaded", () => {
    loadYoutubeContent();
    loadProdukCarousel();
  });


  