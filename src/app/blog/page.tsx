'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { ConsistentBackground } from '@/components/sections/HeroSection';
import { posts } from '@/data/blog-posts';

const categories = [
  { name: 'Toate', slug: 'all' },
  { name: 'Tehnologie', slug: 'tech' },
  { name: 'Internet', slug: 'internet' },
  { name: 'TV Digital', slug: 'tv' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'Noutăți', slug: 'news' },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter(post => post.featured);

  return (
    <main className="relative overflow-hidden">
      {/* Consistent Background */}
      <ConsistentBackground />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] -mt-24 pt-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              <span className="block mb-2">Blog</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-primary">
                ALTNET
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Noutăți, sfaturi și informații din lumea tehnologiei
            </p>
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* Featured Posts */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="block h-full">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg shadow-gray-200/20 h-full flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <div className="aspect-[16/9] relative w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
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
                    <div className="flex flex-col flex-grow">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-600">{post.author}</span>
                      <div className="inline-flex items-center gap-1 text-primary font-medium group-hover:underline">
                        Citește mai mult
                        <span className="transform transition-transform group-hover:translate-x-0.5">→</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/50" />
      </section>

      {/* Blog Content */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Categories */}
          <div className="mb-12 space-y-8">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Caută articole..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white/60 backdrop-blur-sm rounded-xl
                           border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20
                           transition-all duration-200"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${selectedCategory === category.slug
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-primary/10'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post, index) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg shadow-gray-200/20 h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[16/9] relative w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-600">{post.author}</span>
                      <span className="inline-flex items-center gap-1 text-primary font-medium">
                        Citește mai mult
                        <span className="transform transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
