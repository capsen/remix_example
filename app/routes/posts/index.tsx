import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";
import { useAdminUser } from "~/utils";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

type Post = {
  slug: string;
  title: string;
};

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();

  const adminUser = useAdminUser();
  return (
    <main>
      {adminUser ? (
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      ) : null}
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              prefetch="intent"
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
