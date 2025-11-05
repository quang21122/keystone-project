import React, { useEffect, useState } from 'react';
import { DocumentRenderer, type DocumentRendererProps } from '@keystone-6/document-renderer';

interface Post {
  id: string;
  title: string;
  content: {
    document: DocumentRendererProps['document'];
  };
  author: {
    name: string;
  };
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);

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
              author {
                name
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
                <div className='text-black'>
                  <DocumentRenderer document={post.content.document} />
                </div>
                <div className="text-black">
                  {post.author.name}
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
