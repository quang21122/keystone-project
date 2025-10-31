import React, { useEffect, useState } from 'react';
import { DocumentRenderer } from '@keystone-6/document-renderer';

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          {
            posts {
              id
              title
              content {
                document
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => setPosts(result.data.posts))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Blog</h1>
          <nav className="space-x-6 text-gray-600">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">About</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="\px-6 py-10">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Bài viết mới nhất</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.length === 0 ? (
            <p className="text-gray-500">Không có bài viết nào.</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <div className="prose prose-gray max-w-none line-clamp-5">
                  <DocumentRenderer document={post.content.document} />
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
