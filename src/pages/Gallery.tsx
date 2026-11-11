const stories = [
  {
    title: "Panggung",
    text: "Kostum putih emas, lalu formasi di lampu biru.",
    images: [
      { src: "/imagine_images/gallery/g02.jpg", alt: "Grup di panggung dengan kostum putih emas" },
      { src: "/imagine_images/gallery/g10.jpg", alt: "Formasi tari di panggung lampu biru" },
    ],
  },
  {
    title: "Resinda",
    text: "Jaipong Ambassador di Resinda Park Mall.",
    images: [{ src: "/imagine_images/gallery/g03.jpg", alt: "Penari di panggung Resinda Park Mall" }],
  },
  {
    title: "Juara umum",
    text: "Satu foto setelah pengumuman.",
    images: [{ src: "/imagine_images/gallery/g05.jpg", alt: "Foto bersama juara umum" }],
  },
  {
    title: "SM Festival",
    text: "Vol. 2. Piala di panggung, lalu yang menemani di belakang.",
    images: [
      { src: "/imagine_images/gallery/g01.jpg", alt: "Penari memegang papan juara SM Festival" },
      { src: "/imagine_images/gallery/g06.jpg", alt: "Tim di belakang SM Festival Vol. 2" },
    ],
  },
  {
    title: "Malam itu",
    text: "Piala dibawa pulang.",
    images: [{ src: "/imagine_images/gallery/g08.jpg", alt: "Penari dan piala di malam hari" }],
  },
  {
    title: "Sanggar",
    text: "Evaluasi Sanggar Tari Ringkang Gumilang.",
    images: [
      { src: "/imagine_images/gallery/g04.jpg", alt: "Foto evaluasi sanggar" },
      { src: "/imagine_images/gallery/g07.jpg", alt: "Foto evaluasi sanggar, pose kedua" },
    ],
  },
  {
    title: "Satu ruangan",
    text: "Sebelum bubar.",
    images: [{ src: "/imagine_images/gallery/g09.jpg", alt: "Foto bersama di dalam ruangan" }],
  },
];

export function GalleryPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-rose">Galeri</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight">
        <span className="block text-sm font-sans font-normal uppercase tracking-widest text-rose">Modern & Minimalist</span>
        <span className="mt-2 block">Our Moments, Our Stories</span>
      </h1>
      <div className="mt-14 space-y-16">
        {stories.map((story, index) => (
          <section key={story.title} className="border-t border-rose/30 pt-8">
            <div className="mb-6 flex items-baseline justify-between gap-6">
              <div>
                <p className="text-xs tracking-widest text-rose">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-1 font-display text-3xl">{story.title}</h2>
              </div>
              <p className="max-w-xs text-right text-sm text-muted">{story.text}</p>
            </div>
            <div className={story.images.length > 1 ? "grid items-start gap-4 md:grid-cols-2" : ""}>
              {story.images.map((image) => (
                <img key={image.src} src={image.src} alt={image.alt} className="h-auto w-full" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
