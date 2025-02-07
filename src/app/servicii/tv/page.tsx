"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { AnimatedButton, ArrowIcon } from "@/components/ui/button-variants";
import { Search, Tv } from "lucide-react";

const channelCategories = [
  {
    name: "Generale",
    channels: [
      "Moldova 1",
      "Prime",
      "PRO TV",
      "TVR Moldova",
      "Jurnal TV",
      "TV8",
      "Canal 2",
      "Canal 3",
      "Publika TV",
      "N4",
      "TV6",
      "Accent TV",
      "NTV Moldova",
      "TVC21",
    ],
  },
  {
    name: "Sport",
    channels: [
      "Eurosport 1",
      "Eurosport 2",
      "Sport.ro",
      "Look Sport",
      "Look Sport+",
      "Look Sport 2",
      "Look Sport 3",
      "Digi Sport 1",
      "Digi Sport 2",
      "Digi Sport 3",
      "Setanta Sports",
      "Setanta Sports+",
    ],
  },
  {
    name: "Filme și Seriale",
    channels: [
      "HBO",
      "HBO 2",
      "HBO 3",
      "Film Now",
      "AXN",
      "TV1000",
      "Epic Drama",
      "AMC",
      "TNT",
      "Comedy Central",
      "Film Cafe",
      "Diva",
      "TeenNick",
      "Bollywood TV",
      "Cinema Est",
      "Film Box",
      "Film Box Extra",
      "Film Box Premium",
    ],
  },
  {
    name: "Documentare",
    channels: [
      "Discovery Channel",
      "National Geographic",
      "History Channel",
      "Animal Planet",
      "Discovery Science",
      "Nat Geo Wild",
      "Viasat History",
      "Viasat Nature",
      "Viasat Explorer",
      "Discovery ID",
      "Crime+ Investigation",
      "DTX",
    ],
  },
  {
    name: "Copii",
    channels: [
      "Cartoon Network",
      "Disney Channel",
      "Nickelodeon",
      "Minimax",
      "Boomerang",
      "Disney Junior",
      "Nick Jr.",
      "Duck TV",
      "JimJam",
      "Davinci Learning",
    ],
  },
  {
    name: "Muzică",
    channels: [
      "MTV Europe",
      "MTV Hits",
      "MTV 80s",
      "MTV 90s",
      "MTV 00s",
      "VH1",
      "VH1 Classic",
      "Kiss TV",
      "UTV",
      "Music Channel",
      "Hit Music Channel",
      "Mezzo",
      "Mezzo Live HD",
    ],
  },
  {
    name: "Știri",
    channels: [
      "Euronews",
      "CNN",
      "BBC World News",
      "France 24",
      "DW",
      "Bloomberg TV",
      "Al Jazeera",
      "CNBC",
      "Sky News",
      "TV5MONDE",
    ],
  },
  {
    name: "Lifestyle",
    channels: [
      "TLC",
      "E! Entertainment",
      "Fashion TV",
      "Food Network",
      "Travel Channel",
      "CBS Reality",
      "Fine Living",
      "BBC Lifestyle",
      "HGTV",
    ],
  },
];

// Add these animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function TVPage() {
  const [selectedCategory, setSelectedCategory] = useState("Generale");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const channelsPerPage = 20; // Increased for list view

  // Filter channels based on search query
  const filteredChannels =
    channelCategories
      .find((cat) => cat.name === selectedCategory)
      ?.channels.filter((channel) =>
        channel.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredChannels.length / channelsPerPage);
  const currentChannels = filteredChannels.slice(
    (currentPage - 1) * channelsPerPage,
    currentPage * channelsPerPage
  );

  return (
    <main className="min-h-screen relative">
      {/* Header Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-32 h-32 mb-6 relative"
              >
                <img
                  src="/ALTNET-LOGO.svg"
                  alt="ALTNET Logo"
                  className="w-full h-full object-contain"
                />
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Canale TV <span className="text-primary">Premium</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Bucură-te de o selecție vastă de canale TV de înaltă calitate,
                cu conținut pentru toată familia
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Navigation with Search */}
          <div className="mb-12 space-y-6">
            <motion.div
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {channelCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setCurrentPage(1);
                    setSearchQuery("");
                  }}
                  className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all
                    ${
                      selectedCategory === category.name
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">
                    ({category.channels.length})
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-md mx-auto"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Caută canal..."
                className="w-full px-6 py-4 pl-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50
                         focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none
                         transition-all"
              />
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </motion.div>
          </div>

          {/* Results Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 mb-6"
          >
            {filteredChannels.length} canale găsite
          </motion.div>

          {/* Channels List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
          >
            <div className="divide-y divide-gray-200/50">
              {currentChannels.map((channel) => (
                <motion.div
                  key={channel}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Tv className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-base font-medium text-gray-900">
                      {channel}
                    </h3>
                    <p className="text-sm text-gray-500">HD Quality</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      HD
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex justify-center gap-2"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white/60 backdrop-blur-sm text-gray-600
                         disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/80
                         border border-gray-200/50 transition-all"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentPage === page
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-white/80 border border-gray-200/50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white/60 backdrop-blur-sm text-gray-600
                         disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/80
                         border border-gray-200/50 transition-all"
              >
                Următor
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-6">
              Alătură-te miilor de abonați mulțumiți și bucură-te de cea mai
              bună experiență TV
            </p>
            <Link href="/preturi">
              <AnimatedButton variant="primary">
                Abonează-te Acum
                <ArrowIcon direction="forward" />
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
