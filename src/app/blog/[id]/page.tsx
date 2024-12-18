'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ArrowLeftIcon,
  ShareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { ConsistentBackground } from '@/components/sections/HeroSection';

// Import posts data from the main blog page
import { posts } from '../page';

export default function BlogPostPage() {
  const params = useParams();
  const postId = Number(params.id);
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <main className="relative min-h-screen">
        <ConsistentBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Articol negăsit</h1>
            <p className="mt-4 text-gray-600">Articolul pe care îl cauți nu există.</p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Înapoi la blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <main className="relative overflow-hidden">
      <ConsistentBackground />

      {/* Hero Section with Featured Image */}
      <section className="relative -mt-24 pt-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Back to Blog Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Înapoi la blog
            </Link>
          </motion.div>

          {/* Post Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <TagIcon className="w-4 h-4" />
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <UserCircleIcon className="w-10 h-10 text-gray-400" />
              <div className="text-left">
                <div className="font-medium text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-600">Author</div>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* Article Content */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 prose prose-lg max-w-none"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-gray-200/20">
                <p className="lead text-xl text-gray-600 mb-8">
                  {post.excerpt}
                </p>

                {/* Example content - you should replace this with actual content */}
                <h2>Introducere</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2>Secțiunea Principală</h2>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <ul>
                  <li>Primul punct important despre subiect</li>
                  <li>Al doilea punct cu detalii relevante</li>
                  <li>Al treilea aspect de luat în considerare</li>
                </ul>

                <h2>Concluzie</h2>
                <p>
                  În concluzie, acest articol a prezentat aspectele principale ale subiectului și
                  cum acestea pot fi aplicate în practică. Sperăm că informațiile prezentate vă vor
                  fi de folos în deciziile viitoare.
                </p>

                {/* Share Section */}
                <div className="border-t border-gray-200 mt-8 pt-8">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">Distribuie:</span>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <ShareIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              {/* Related Posts */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-200/20">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Articole Similare</h3>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.id}`}
                      className="group block"
                    >
                      <div className="aspect-video relative rounded-xl overflow-hidden mb-3">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <div className="text-sm text-gray-600 mt-2">
                        {relatedPost.date}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-200/20">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Categorii</h3>
                <div className="space-y-2">
                  {['tech', 'internet', 'tv', 'gaming', 'news'].map((category) => (
                    <Link
                      key={category}
                      href={`/blog?category=${category}`}
                      className="block py-2 px-4 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
