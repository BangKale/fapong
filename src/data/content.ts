export const nav = [
  { to: "/", label: "Beranda" },
  { to: "/gallery", label: "Galeri" },
  { to: "/catalog", label: "Katalog" },
  { to: "/about", label: "Tentang" },
  { to: "/contact", label: "Kontak" },
] as const;

export const rate = "Tarif mulai dari Rp 75,000 - Rp 80,000 / Set";

export const costumes = [
  { src: "/imagine_images/catalog/c01.jpg", name: "Pink Bunga", note: "Grup, hiasan bunga kuning dan merah." },
  { src: "/imagine_images/catalog/c02.jpg", name: "Turquoise Magenta", note: "Duo, celana lebar magenta." },
  { src: "/imagine_images/catalog/c03.jpg", name: "Batik Hitam Emas", note: "Kain bunga, sabuk magenta." },
  { src: "/imagine_images/catalog/c04.jpg", name: "Pink Hijau", note: "Kebaya pink, kain hijau bermotif." },
  { src: "/imagine_images/catalog/c05.jpg", name: "Orange Lace", note: "Kebaya orange, selendang biru." },
  { src: "/imagine_images/catalog/c06.jpg", name: "Pink Ungu", note: "Atasan pink, kain ungu dan biru." },
  { src: "/imagine_images/catalog/c07.jpg", name: "Putih Emas", note: "Gaun putih dengan korset emas." },
  { src: "/imagine_images/catalog/c08.jpg", name: "Biru Selendang", note: "Celana biru, selendang pink." },
  { src: "/imagine_images/catalog/c09.jpg", name: "Silver Pink", note: "Kebaya silver, kain pink." },
  { src: "/imagine_images/catalog/c10.jpg", name: "Kuning Biru", note: "Rok kuning dengan panel biru." },
  { src: "/imagine_images/catalog/c11.jpg", name: "Kuning Hitam", note: "Celana kuning, atasan hitam-merah." },
  { src: "/imagine_images/catalog/c12.jpg", name: "Hijau Putih", note: "Atasan hijau, rok putih." },
  { src: "/imagine_images/catalog/c13.jpg", name: "Ungu Kuning", note: "Selendang ungu di atas rok kuning." },
  { src: "/imagine_images/catalog/c14.jpg", name: "Hijau Teal", note: "Celana teal, renda hijau." },
  { src: "/imagine_images/catalog/c15.jpg", name: "Magenta Floral", note: "Rok magenta, ikat emas." },
  { src: "/imagine_images/catalog/c16.jpg", name: "Merah Lace", note: "Kebaya merah renda, kain batik." },
  { src: "/imagine_images/catalog/c17.jpg", name: "Pink Biru", note: "Atasan sequin, panel biru." },
  { src: "/imagine_images/catalog/c18.jpg", name: "Biru Hijau", note: "Grup kebaya biru, kain hijau." },
  { src: "/imagine_images/catalog/c19.jpg", name: "Coklat Ungu", note: "Atasan ungu, busana coklat." },
  { src: "/imagine_images/catalog/c20.jpg", name: "Topi Warna", note: "Grup dengan topi dan busana warna." },
  { src: "/imagine_images/catalog/c21.jpg", name: "Ungu Biru", note: "Kebaya ungu lace, rok biru." },
  { src: "/imagine_images/catalog/c22.jpg", name: "Kuning Turquoise", note: "Rok kuning, panel magenta." },
  { src: "/imagine_images/catalog/c23.jpg", name: "Merah Emas", note: "Rompi merah emas, celana hitam." },
  { src: "/imagine_images/catalog/c24.jpg", name: "Orange Hijau", note: "Kebaya orange, selendang hijau." },
  { src: "/imagine_images/catalog/c25.jpg", name: "Merah Kuning", note: "Celana kuning, rompi merah." },
] as const;

export const featured = [costumes[0], costumes[6], costumes[15], costumes[22]];

export type GalleryTag = "panggung" | "tradisi" | "potret" | "budaya";

export const galleryFilters: { id: "semua" | GalleryTag; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "panggung", label: "Panggung" },
  { id: "tradisi", label: "Tradisi" },
  { id: "potret", label: "Potret" },
  { id: "budaya", label: "Budaya" },
];

export const gallery = [
  { src: "/imagine_images/hero_stage.jpg", alt: "Penari di panggung", tag: "panggung" as const },
  { src: "/imagine_images/group_stage.jpg", alt: "Grup di panggung", tag: "panggung" as const },
  { src: "/imagine_images/catalog/c01.jpg", alt: "Kostum pink bunga", tag: "tradisi" as const },
  { src: "/imagine_images/real1.jpg", alt: "Potret penari", tag: "potret" as const },
  { src: "/imagine_images/catalog/c07.jpg", alt: "Kostum putih emas", tag: "tradisi" as const },
  { src: "/imagine_images/real3.jpg", alt: "Detail gerak tangan", tag: "budaya" as const },
  { src: "/imagine_images/catalog/c16.jpg", alt: "Kostum merah renda", tag: "potret" as const },
  { src: "/imagine_images/H6rAS.jpg", alt: "Latihan di luar ruangan", tag: "budaya" as const },
  { src: "/imagine_images/catalog/c23.jpg", alt: "Kostum merah emas", tag: "panggung" as const },
  { src: "/imagine_images/real6.jpg", alt: "Penari tunggal", tag: "potret" as const },
  { src: "/imagine_images/catalog/c09.jpg", alt: "Grup silver pink", tag: "tradisi" as const },
  { src: "/imagine_images/0jq2I.jpg", alt: "Formasi grup", tag: "panggung" as const },
];

export const posts = [
  {
    slug: "gerak-jaipong",
    date: "18 Okt 2026",
    title: "Apa yang dibaca dari gerak Jaipong",
    excerpt: "Bukan sekadar hentakan. Setiap bukaan tangan dan putaran pinggul punya tempat di musik.",
    image: "/imagine_images/catalog/c11.jpg",
    body: [
      "Jaipong hidup dari ketukan. Penonton sering ingat kilau kostum lebih dulu, padahal yang menahan perhatian adalah jeda: tangan yang berhenti sebentar sebelum gendang masuk lagi.",
      "Di Fapong, kostum dipilih supaya gerak itu tetap kebaca. Renda yang terlalu kaku, atau selendang yang terlalu panjang, justru menutup garis lengan. Itu sebabnya setiap set dicoba gerak, bukan hanya dicoba berdiri.",
      "Kalau Anda menyewa untuk panggung sekolah atau hajatan, sebutkan durasi dan jumlah penari. Kami sesuaikan jumlah set yang senada, bukan sekadar warna yang kebetulan tersisa.",
    ],
  },
  {
    slug: "busana-jawa-barat",
    date: "12 Okt 2026",
    title: "Busana Jaipong bukan satu pola",
    excerpt: "Dari kebaya renda sampai rompi emas, variasinya mengikuti lagu dan jumlah penari.",
    image: "/imagine_images/catalog/c04.jpg",
    body: [
      "Ada yang mengira kostum Jaipong selalu merah dan emas. Di lapangan, grup sering campur pink, hijau, kuning, atau putih, asal siluetnya masih terbaca dari jauh.",
      "Koleksi Fapong disusun dari set yang benar-benar pernah dipakai: grup, duo, dan solo. Foto di katalog adalah busana yang sama, bukan ilustrasi.",
      "Ukuran kami sesuaikan per penari. Kirim tinggi badan dan lingkar saat menghubungi, supaya fitting tidak makan waktu latihan.",
    ],
  },
  {
    slug: "merawat-kostum",
    date: "5 Okt 2026",
    title: "Setelah acara, kostum tidak langsung disimpan",
    excerpt: "Payet, renda, dan kain batik butuh urutan cuci yang berbeda.",
    image: "/imagine_images/catalog/c25.jpg",
    body: [
      "Kostum sewaan cepat rusak kalau dilipat basah. Payet lepas, renda melar, dan warna batik luntur ke kain sebelahnya.",
      "Set yang kembali ke studio dicek satu per satu: kancing, hiasan kepala, dan sepatu kalau ikut disewa. Yang perlu jahit tidak langsung diedarkan lagi.",
      "Karena itu jadwal sewa kami tidak ditumpuk di hari yang sama untuk set yang sama. Kalau tanggal Anda mepet, kami katakan terus terang set mana yang siap.",
    ],
  },
] as const;

export const events = [
  { month: "Nov", day: "14", title: "Pentas Jaipong", place: "Gedung Budaya Bandung" },
  { month: "Des", day: "06", title: "Lokakarya gerak", place: "Studio Fapong" },
  { month: "Des", day: "20", title: "Festival budaya Jawa Barat", place: "Bandung" },
];
