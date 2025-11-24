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

    async function loadYoutubeContent(){
      const container = document.getElementById("konten-container");
        container.innerHTML = `
          <div class="text-center py-6 text-gray-500 text-sm">
            Memuat konten YouTube...
          </div>
        `;
      try {
        const res = await fetch('/api/youtube.php')
        if(!res.ok){
          throw new Error('HTTP status ' + res.status)
        }
        const data = await res.json()
        const items = Array.isArray(data.items) ? data.items : [];
        if(items.length === 0){
          container.innerHTML = `
            <div class="text-center py-12 bg-gray-50 border rounded-lg">
              <p class="text-gray-600">📌 Konten belum tersedia</p>
              <p class="font-semibold text-yellow-600 mt-2">Coming Soon...</p>
            </div>
          `;
          return
        }
        const grid = document.createElement("div");
        grid.className = "grid grid-cols-1 md:grid-cols-3 gap-6";

        // loop tiap video
        items.forEach(item => {
          const snippet = item.snippet || {};
          const title = snippet.title || 'Tanpa judul';
          const descRaw = snippet.description || '';
          const desc = descRaw.length > 80 ? descRaw.substring(0, 80) + '...' : descRaw;

          const thumbs = snippet.thumbnails || {};
          const img =
            (thumbs.high && thumbs.high.url) ||
            (thumbs.medium && thumbs.medium.url) ||
            (thumbs.default && thumbs.default.url) ||
            '';

          const videoId = item.id && item.id.videoId ? item.id.videoId : null;

          const card = document.createElement("div");
          card.className = "p-4 border rounded-lg shadow hover:shadow-lg transition bg-white";

          card.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">
              <img src="${img}" alt="${title}" class="rounded-md mb-3 w-full h-auto">
              <h3 class="font-semibold mb-1 line-clamp-2">${title}</h3>
              <p class="text-sm text-gray-600 line-clamp-3">${desc}</p>
            </a>
          `;

          grid.appendChild(card);
        });

        // replace konten lama dengan grid baru
        container.innerHTML = '';
        container.appendChild(grid);

      } catch (error) {
        container.innerHTML = `
           <div class="text-center py-12 bg-gray-50 border rounded-lg">
              <p class="text-gray-600">📌 Gagal memuat konten</p>
              <p class="font-semibold text-yellow-600 mt-2">${error.message}</p>
            </div>
        `;
      }
    }
    loadYoutubeContent()

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
      {
        name: 'Dashboard',
        desc: 'Modul pusat kontrol yang menampilkan ringkasan data dari berbagai layanan seperti poli, pemeriksaan, dan transaksi. Dibangun dengan Laravel + Vue untuk tampilan dinamis tanpa reload halaman.',
        link: 'https://www.dashboard.rumahjooocode.com',
        img: 'assets/dashboard.png'
      }
    ];

    const containerProduk = document.getElementById("produk-container");

    if (produkList.length > 0) {
      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 md:grid-cols-3 gap-6";

      produkList.forEach(item => {
        const card = document.createElement("div");
        card.className = "p-3 border rounded-lg shadow hover:shadow-lg transition bg-white";

        card.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="rounded-md mb-3 w-full h-auto">
          <h3 class="font-semibold">${item.name}</h3>
          <p class="text-sm text-gray-600 mb-4">${item.desc}</p>
          <a href="${item.link}" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded mb-2" target="_blank">Kunjungin Halaman</a>
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


