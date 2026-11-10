import { Link } from "react-router-dom";
import { posts } from "@/data/content";

export function BlogPage() {
  const [lead, ...rest] = posts;
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-rose">Tulisan</p>
      <h1 className="mt-2 font-display text-5xl">Catatan dari studio</h1>
      <Link to={`/blog/${lead.slug}`} className="mt-10 grid items-center gap-6 md:grid-cols-2">
        <img src={lead.image} alt="" className="aspect-[4/3] w-full object-cover object-top" />
        <div>
          <p className="text-xs text-rose">{lead.date}</p>
          <h2 className="mt-2 font-display text-4xl">{lead.title}</h2>
          <p className="mt-3 text-muted">{lead.excerpt}</p>
        </div>
      </Link>
      <ul className="mt-12 divide-y divide-rose/30 border-y border-rose/30">
        {rest.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between">
              <span className="font-display text-2xl">{post.title}</span>
              <span className="text-sm text-muted">{post.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
