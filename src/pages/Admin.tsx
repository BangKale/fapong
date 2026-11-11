import { LogOut, Trash2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { costumes as staticCostumes } from "@/data/content";
import { useSite } from "@/data/site";
import { mediaBucket, supabase } from "@/lib/supabase";

type CostumeRow = {
  id: string;
  sort: number;
  label: string;
  name: string;
  note: string;
  image_url: string;
  featured: boolean;
};

type GalleryRow = { id: string; sort: number; image_url: string };

async function upload(file: File, folder: string) {
  if (!supabase) throw new Error("Supabase belum diatur.");
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(mediaBucket).upload(path, file, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from(mediaBucket).getPublicUrl(path).data.publicUrl;
}

export function AdminPage() {
  const { refresh } = useSite();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(false);
  const [tab, setTab] = useState<"katalog" | "galeri" | "hero">("katalog");
  const [rows, setRows] = useState<CostumeRow[]>([]);
  const [photos, setPhotos] = useState<GalleryRow[]>([]);
  const [hero, setHero] = useState("");
  const [label, setLabel] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(Boolean(next)));
    return () => data.subscription.unsubscribe();
  }, []);

  async function load() {
    if (!supabase) return;
    const [costumesRes, galleryRes, heroRes] = await Promise.all([
      supabase.from("costumes").select("*").order("sort"),
      supabase.from("gallery_photos").select("*").order("sort"),
      supabase.from("site_settings").select("value").eq("key", "hero").maybeSingle(),
    ]);
    if (costumesRes.error) throw costumesRes.error;
    if (galleryRes.error) throw galleryRes.error;
    setRows((costumesRes.data ?? []) as CostumeRow[]);
    setPhotos((galleryRes.data ?? []) as GalleryRow[]);
    setHero(heroRes.data?.value ?? "");
  }

  useEffect(() => {
    if (!session) return;
    load().catch((error: Error) => setMessage(error.message));
  }, [session]);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    setMessage(error ? error.message : "");
  }

  async function addCostume(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    const file = new FormData(event.currentTarget).get("file");
    if (!(file instanceof File) || file.size === 0) {
      setMessage("Pilih fotonya dulu.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const image_url = await upload(file, "catalog");
      const sort = rows.length ? Math.max(...rows.map((row) => row.sort)) + 1 : 1;
      const { error } = await supabase.from("costumes").insert({
        sort,
        label: label || "Tanpa keterangan",
        name: "",
        note: "",
        image_url,
        featured: false,
      });
      if (error) throw error;
      setLabel("");
      event.currentTarget.reset();
      await load();
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal menyimpan.");
    } finally {
      setBusy(false);
    }
  }

  async function saveLabel(row: CostumeRow, next: string) {
    if (!supabase) return;
    const { error } = await supabase.from("costumes").update({ label: next }).eq("id", row.id);
    if (error) setMessage(error.message);
    else {
      setRows((current) => current.map((item) => (item.id === row.id ? { ...item, label: next } : item)));
      await refresh();
    }
  }

  async function toggleFeatured(row: CostumeRow) {
    if (!supabase) return;
    const { error } = await supabase.from("costumes").update({ featured: !row.featured }).eq("id", row.id);
    if (error) setMessage(error.message);
    else {
      await load();
      await refresh();
    }
  }

  async function replacePhoto(row: CostumeRow, file: File) {
    if (!supabase) return;
    setBusy(true);
    try {
      const image_url = await upload(file, "catalog");
      const { error } = await supabase.from("costumes").update({ image_url }).eq("id", row.id);
      if (error) throw error;
      await load();
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal mengganti foto.");
    } finally {
      setBusy(false);
    }
  }

  async function removeCostume(row: CostumeRow) {
    if (!supabase || !confirm("Hapus set ini dari katalog?")) return;
    const { error } = await supabase.from("costumes").delete().eq("id", row.id);
    if (error) setMessage(error.message);
    else {
      await load();
      await refresh();
    }
  }

  async function seedCatalog() {
    if (!supabase || !confirm("Salin katalog yang sekarang tampil di situs ke Supabase?")) return;
    setBusy(true);
    const payload = staticCostumes.map((item, index) => ({
      sort: index + 1,
      label: item.label,
      name: item.name,
      note: item.note,
      image_url: item.src,
      featured: [11, 20, 1, 23].includes(index),
    }));
    const { error } = await supabase.from("costumes").insert(payload);
    setBusy(false);
    if (error) setMessage(error.message);
    else {
      await load();
      await refresh();
    }
  }

  async function addGallery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    const list = new FormData(event.currentTarget).getAll("files").filter((file) => file instanceof File && file.size > 0) as File[];
    if (!list.length) return;
    setBusy(true);
    try {
      let sort = photos.length ? Math.max(...photos.map((row) => row.sort)) + 1 : 1;
      for (const file of list) {
        const image_url = await upload(file, "gallery");
        const { error } = await supabase.from("gallery_photos").insert({ sort, image_url });
        if (error) throw error;
        sort += 1;
      }
      event.currentTarget.reset();
      await load();
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal mengunggah galeri.");
    } finally {
      setBusy(false);
    }
  }

  async function removePhoto(row: GalleryRow) {
    if (!supabase) return;
    const { error } = await supabase.from("gallery_photos").delete().eq("id", row.id);
    if (error) setMessage(error.message);
    else {
      await load();
      await refresh();
    }
  }

  async function replaceHero(file: File) {
    if (!supabase) return;
    setBusy(true);
    try {
      const value = await upload(file, "hero");
      const { error } = await supabase.from("site_settings").upsert({ key: "hero", value });
      if (error) throw error;
      setHero(value);
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal mengganti hero.");
    } finally {
      setBusy(false);
    }
  }

  if (!supabase) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <p className="text-xs uppercase tracking-widest text-rose">Back office</p>
        <h1 className="mt-3 font-display text-4xl">Supabase belum dihubungkan</h1>
        <p className="mt-4 text-sm text-muted">
          Isi <code>VITE_SUPABASE_URL</code> dan <code>VITE_SUPABASE_ANON_KEY</code> di Vercel, lalu jalankan file{" "}
          <code>supabase/schema.sql</code> di SQL Editor. Buat satu user di Authentication, tanpa signup publik.
        </p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <p className="text-xs uppercase tracking-widest text-rose">Back office</p>
        <h1 className="mt-3 font-display text-4xl">Masuk</h1>
        <form onSubmit={signIn} className="mt-8 space-y-4">
          <label className="block text-sm">
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="mt-1 w-full border border-rose/40 bg-paper px-3 py-2" />
          </label>
          <label className="block text-sm">
            Kata sandi
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="mt-1 w-full border border-rose/40 bg-paper px-3 py-2" />
          </label>
          <button type="submit" disabled={busy} className="bg-ink px-5 py-3 text-sm text-cream">
            Masuk
          </button>
          {message ? <p className="text-sm text-rose">{message}</p> : null}
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-rose">Back office</p>
          <h1 className="mt-2 font-display text-4xl">Kelola foto</h1>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm"
          onClick={() => void supabase?.auth.signOut()}
        >
          <LogOut size={16} /> Keluar
        </button>
      </div>
      <div className="mt-8 flex gap-2 text-sm">
        {(["katalog", "galeri", "hero"] as const).map((item) => (
          <button key={item} type="button" onClick={() => setTab(item)} className={tab === item ? "bg-ink px-4 py-2 text-cream" : "border border-rose/40 px-4 py-2"}>
            {item === "katalog" ? "Katalog" : item === "galeri" ? "Galeri" : "Landing"}
          </button>
        ))}
      </div>
      {message ? <p className="mt-4 text-sm text-rose">{message}</p> : null}

      {tab === "katalog" ? (
        <section className="mt-8">
          {rows.length === 0 ? (
            <button type="button" onClick={seedCatalog} disabled={busy} className="border border-ink px-4 py-2 text-sm">
              Salin katalog yang ada sekarang
            </button>
          ) : null}
          <form onSubmit={addCostume} className="mt-6 grid gap-3 border border-rose/30 p-4 md:grid-cols-[1fr_1fr_auto]">
            <input value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Keterangan, misalnya Tunggal 1 pcs" className="border border-rose/40 bg-paper px-3 py-2 text-sm" />
            <input name="file" type="file" accept="image/*" className="text-sm" />
            <button type="submit" disabled={busy} className="bg-ink px-4 py-2 text-sm text-cream">
              Tambah
            </button>
          </form>
          <ul className="mt-6 divide-y divide-rose/20">
            {rows.map((row, index) => (
              <li key={row.id} className="grid items-center gap-3 py-3 md:grid-cols-[72px_1fr_auto]">
                <img src={row.image_url} alt="" className="h-16 w-16 object-contain" />
                <div>
                  <p className="text-xs tracking-widest text-rose">{String(index + 1).padStart(2, "0")}</p>
                  <input
                    defaultValue={row.label}
                    onBlur={(event) => {
                      if (event.target.value !== row.label) void saveLabel(row, event.target.value);
                    }}
                    className="mt-1 w-full border border-transparent bg-transparent text-sm focus:border-rose/40 focus:bg-paper focus:px-2"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button type="button" onClick={() => toggleFeatured(row)} className={row.featured ? "bg-rose/20 px-2 py-1" : "border border-rose/40 px-2 py-1"}>
                    {row.featured ? "Best seller" : "Jadikan best seller"}
                  </button>
                  <label className="cursor-pointer border border-rose/40 px-2 py-1">
                    Ganti foto
                    <input type="file" accept="image/*" className="hidden" onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void replacePhoto(row, file);
                    }} />
                  </label>
                  <button type="button" onClick={() => removeCostume(row)} aria-label="Hapus" className="p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "galeri" ? (
        <section className="mt-8">
          <form onSubmit={addGallery} className="flex flex-wrap items-center gap-3">
            <input name="files" type="file" accept="image/*" multiple className="text-sm" />
            <button type="submit" disabled={busy} className="bg-ink px-4 py-2 text-sm text-cream">Unggah</button>
          </form>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {photos.map((row) => (
              <li key={row.id} className="relative">
                <img src={row.image_url} alt="" className="aspect-[3/4] w-full object-cover" />
                <button type="button" onClick={() => removePhoto(row)} className="absolute right-2 top-2 bg-cream p-1" aria-label="Hapus">
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "hero" ? (
        <section className="mt-8">
          {hero ? <img src={hero} alt="" className="max-h-80 w-auto" /> : <p className="text-sm text-muted">Masih memakai foto landing bawaan.</p>}
          <label className="mt-4 inline-block cursor-pointer bg-ink px-4 py-2 text-sm text-cream">
            Ganti foto landing
            <input type="file" accept="image/*" className="hidden" onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void replaceHero(file);
            }} />
          </label>
        </section>
      ) : null}
    </main>
  );
}
