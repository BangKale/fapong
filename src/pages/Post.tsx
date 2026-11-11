import { Link, useParams } from "react-router-dom";
import { posts } from "@/data/content";

export function PostPage() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);
  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <p>Tulisan tidak ditemukan.</p>
        <Link to="/blog" className="mt-4 inline-block text-sm underline decoration-rose underline-offset-4">Semua tulisan</Link>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/blog" className="text-sm text-muted underline decoration-rose underline-offset-4">
        Semua tulisan
      </Link>
      <p className="mt-6 text-xs text-rose">{post.date}</p>
      <h1 className="mt-2 font-display text-5xl">{post.title}</h1>
      <img src={post.image} alt="" className="mt-8 h-auto w-full" />
      <div className="mt-8 space-y-4 text-base">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
