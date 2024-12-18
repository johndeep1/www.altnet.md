'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ArrowLeftIcon,
  ShareIcon,
  UserCircleIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { ConsistentBackground } from '@/components/sections/HeroSection';
import { posts } from '@/data/blog-posts';

// Example article content (you can replace this with actual content)
const articleContent = {
  sections: [
    {
      title: 'Introducere',
      content: `În era digitală în care trăim, conectivitatea la internet a devenit o necesitate fundamentală.
      Fie că lucrezi de acasă, ești pasionat de gaming sau doar îți place să urmărești conținut online,
      alegerea pachetului potrivit de internet poate face diferența între o experiență digitală frustrantă
      și una perfectă.`
    },
    {
      title: 'De ce este important să alegi pachetul potrivit?',
      content: `Alegerea pachetului potrivit de internet nu înseamnă doar să optezi pentru cea mai mare viteză
      disponibilă. Trebuie să iei în considerare mai mulți factori:

      • Tipul de activități online pe care le desfășori
      • Numărul de dispozitive conectate simultan
      • Bugetul disponibil
      • Necesitățile specifice (gaming, streaming, work from home)

      Un pachet potrivit îți va oferi nu doar viteza necesară, ci și stabilitatea și performanța de care
      ai nevoie pentru activitățile tale zilnice.`
    },
    {
      title: 'Cum să evaluezi nevoile tale de internet',
      content: `Pentru a alege pachetul potrivit, trebuie să-ți evaluezi nevoile. Iată câteva întrebări cheie:

      1. Câte persoane folosesc internetul simultan?
      2. Ce tip de activități online desfășori cel mai des?
      3. Ai nevoie de viteză mare de upload pentru videoconferințe?
      4. Ești pasionat de gaming online sau streaming în calitate înaltă?

      Răspunsurile la aceste întrebări te vor ajuta să determini ce viteză și ce tip de conexiune
      sunt potrivite pentru tine.`
    },
    {
      title: 'Factori de luat în considerare',
      content: `Când alegi un pachet de internet, ia în considerare următorii factori:

      • Viteza de download și upload
      • Stabilitatea conexiunii
      • Latența (ping-ul)
      • Limitările de trafic (dacă există)
      • Serviciile adiționale incluse
      • Suportul tehnic oferit
      • Costurile de instalare și echipamente

      Fiecare dintre acești factori poate influența semnificativ experiența ta online.`
    },
    {
      title: 'Recomandări pentru diferite profiluri de utilizatori',
      content: `În funcție de profilul tău de utilizator, iată ce îți recomandăm:

      🎮 Pentru Gameri:
      • Viteză minimă: 100 Mbps
      • Latență scăzută
      • Conexiune stabilă

      💼 Pentru Work from Home:
      • Viteză simetrică (upload = download)
      • Stabilitate ridicată
      • Backup 4G pentru situații de urgență

      🎬 Pentru Streaming și Entertainment:
      • Viteză mare de download
      • Fără limitări de trafic
      • Router performant pentru streaming wireless`
    },
    {
      title: 'Concluzie',
      content: `Alegerea pachetului potrivit de internet este o decizie importantă care îți va influența
      experiența digitală zilnică. Nu te grăbi să alegi doar în funcție de preț sau doar în funcție de
      viteza promisă. Analizează-ți nevoile, compară opțiunile disponibile și alege pachetul care îți
      oferă cel mai bun raport calitate-preț pentru cerințele tale specifice.`
    }
  ]
};

export default function BlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params.id);
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return (
      <main className="min-h-screen pt-32">
        <ConsistentBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Articol negăsit</h1>
            <p className="text-gray-600 mb-8">Articolul pe care îl cauți nu există sau a fost mutat.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Înapoi la blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Find related posts (same category, excluding current post)
  const relatedPosts = posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <main className="relative min-h-screen pt-32 pb-16">
      {/* Consistent Background */}
      {/* <ConsistentBackground /> */}

      <article className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-600 mb-8"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Acasă
            </Link>
            <ChevronRightIcon className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRightIcon className="w-4 h-4" />
            <span className="text-gray-900">{post.title}</span>
          </motion.nav>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
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
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="w-10 h-10 text-gray-400" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{post.author}</div>
                    <div className="text-sm text-gray-600">Author</div>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Share article"
                >
                  <ShareIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-[21/9] w-full max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </motion.div>

          {/* Article Content */}
          <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="prose prose-lg max-w-none">
                <p className="lead text-xl text-gray-600 mb-8">
                  {post.excerpt}
                </p>

                {articleContent.sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                      {section.title}
                    </h2>
                    <div className="whitespace-pre-line text-gray-600">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {['Internet', 'Tehnologie', 'Ghid', 'Tips & Tricks'].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-1 space-y-8"
            >
              {/* Author Card */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-200/20">
                <div className="flex items-center gap-4 mb-4">
                  <UserCircleIcon className="w-16 h-16 text-gray-400" />
                  <div>
                    <h3 className="font-bold text-gray-900">{post.author}</h3>
                    <p className="text-sm text-gray-600">Technical Writer</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Expert în tehnologie și comunicații, cu peste 10 ani de experiență în domeniu.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-200/20">
                <h3 className="font-bold text-gray-900 mb-4">Cuprins</h3>
                <nav className="space-y-2">
                  {articleContent.sections.map((section, index) => (
                    <a
                      key={section.title}
                      href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      {index + 1}. {section.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-gray-200/20">
                <h3 className="font-bold text-gray-900 mb-4">Abonează-te la newsletter</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Primește cele mai noi articole și actualizări direct în inbox.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Adresa ta de email"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Abonează-te
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="relative mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Articole Similare
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg shadow-gray-200/20 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="aspect-[16/9] relative w-full">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {relatedPost.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
