    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');

    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      // ubah ikon
      if (menu.classList.contains('active')) {
        icon.textContent = "✖"; // X icon
      } else {
        icon.textContent = "☰"; // menu icon
      }
    });



    const kontenList = [
     
    ];

    const container = document.getElementById("konten-container");

    if (kontenList.length > 0) {
      // buat grid container
      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 md:grid-cols-3 gap-6";

      // loop data
      kontenList.forEach(item => {
        const card = document.createElement("div");
        card.className = "p-4 border rounded-lg shadow hover:shadow-lg transition bg-white";

        card.innerHTML = `
          <img src="${item.img}" alt="${item.title}" class="rounded-md mb-3 w-full h-auto">
          <h3 class="font-semibold">${item.title}</h3>
          <p class="text-sm text-gray-600">${item.desc}</p>
        `;

        grid.appendChild(card);
      });

      container.appendChild(grid);

    } else {
      // kalau kosong tampilkan "coming soon"
      container.innerHTML = `
        <div class="text-center py-12 bg-gray-50 border rounded-lg">
          <p class="text-gray-600">📌 Konten belum tersedia</p>
          <p class="font-semibold text-yellow-600 mt-2">Coming Soon...</p>
        </div>
      `;
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

    const produkList = [
    ];

    const containerProduk = document.getElementById("produk-container");

    if (produkList.length > 0) {
      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 md:grid-cols-3 gap-6";

      produkList.forEach(item => {
        const card = document.createElement("div");
        card.className = "p-4 border rounded-lg shadow hover:shadow-lg transition bg-white";

        card.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="rounded-md mb-3 w-full h-auto">
          <h3 class="font-semibold">${item.name}</h3>
          <p class="text-sm text-gray-600">${item.desc}</p>
        `;

        grid.appendChild(card);
      });

      containerProduk.appendChild(grid);
    } else {
      containerProduk.innerHTML = `
        <div class="text-center py-12 bg-gray-50 border rounded-lg">
          <p class="text-gray-600">📦 Produk belum tersedia</p>
          <p class="font-semibold text-yellow-600 mt-2">Coming Soon...</p>
        </div>
      `;
    }

  const year = new Date().getFullYear();
  document.getElementById("footer-text").textContent = `© ${year} Joko Prasetio`;


