# PT. Teknologi Nyaman Sentosa (TNS) — Company Profile

Website profil perusahaan TNS: *Make Your Dream Comfort*.

Dibangun dengan React 18, Vite, Tailwind CSS, framer-motion, dan lucide-react.

## Menjalankan

```bash
npm install
npm run dev      # development di http://localhost:5173
npm run build    # hasil produksi di dist/
npm run preview  # cek hasil build
```

Butuh Node.js 18 atau lebih baru.

## Struktur

```
public/images/        logo TNS (transparan), foto Chairman, foto produk Breeze
src/data/content.js   semua teks, tim, nilai, kontak (ubah konten di sini)
src/components/
  Navbar.jsx          navbar melayang, scroll-spy, menu mobile
  Hero.jsx            headline, CTA, statistik
  CircuitNetwork.jsx  grafis jaringan sirkuit beranimasi (motif logo TNS)
  About.jsx           brand story, Chairman, tim, core values
  VisionMission.jsx   tab interaktif Vision / Mission
  Products.jsx        Breeze Hydration dan Breeze Bag
  BottleWidget.jsx    simulasi botol: suhu target, mode pengisian, baterai
  BagWidget.jsx       simulasi tas: toggle Magnetic Levitation + slider beban
  Contact.jsx         form kontak (validasi, loading, sukses) + info kontak
  Footer.jsx          quick links, media sosial, copyright
```

## Catatan

- Form kontak hanya simulasi. Tidak ada pesan yang dikirim. Sambungkan ke layanan
  seperti Formspree atau API sendiri di fungsi `onSubmit` pada `Contact.jsx`.
- Tautan media sosial di `src/data/content.js` (`SOCIALS`) masih placeholder.
- Alamat kantor belum ada. Kartu lokasi di `Contact.jsx` menampilkan "Indonesia".
- Angka di widget produk (offset levitasi 95%, laju pendinginan, dll.) adalah nilai
  ilustrasi untuk demo, bukan spesifikasi produk.
- Animasi mengikuti pengaturan *reduced motion* sistem operasi.
- `vite.config.js` memakai `base: './'`, jadi hasil build bisa dipasang di sub-path
  seperti GitHub Pages.
