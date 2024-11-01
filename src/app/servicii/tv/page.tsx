'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const channelCategories = [
  {
    name: 'Generale',
    channels: [
      'Moldova 1', 'Prime', 'PRO TV', 'TVR Moldova', 'Jurnal TV', 'TV8', 'Canal 2',
      'Canal 3', 'Publika TV', 'N4', 'TV6', 'Accent TV', 'NTV Moldova', 'TVC21'
    ]
  },
  {
    name: 'Sport',
    channels: [
      'Eurosport 1', 'Eurosport 2', 'Sport.ro', 'Look Sport', 'Look Sport+',
      'Look Sport 2', 'Look Sport 3', 'Digi Sport 1', 'Digi Sport 2', 'Digi Sport 3',
      'Setanta Sports', 'Setanta Sports+'
    ]
  },
  {
    name: 'Filme și Seriale',
    channels: [
      'HBO', 'HBO 2', 'HBO 3', 'Film Now', 'AXN', 'TV1000', 'Epic Drama', 'AMC',
      'TNT', 'Comedy Central', 'Film Cafe', 'Diva', 'TeenNick', 'Bollywood TV',
      'Cinema Est', 'Film Box', 'Film Box Extra', 'Film Box Premium'
    ]
  },
  {
    name: 'Documentare',
    channels: [
      'Discovery Channel', 'National Geographic', 'History Channel', 'Animal Planet',
      'Discovery Science', 'Nat Geo Wild', 'Viasat History', 'Viasat Nature',
      'Viasat Explorer', 'Discovery ID', 'Crime+ Investigation', 'DTX'
    ]
  },
  {
    name: 'Copii',
    channels: [
      'Cartoon Network', 'Disney Channel', 'Nickelodeon', 'Minimax', 'Boomerang',
      'Disney Junior', 'Nick Jr.', 'Duck TV', 'JimJam', 'Davinci Learning'
    ]
  },
  {
    name: 'Muzică',
    channels: [
      'MTV Europe', 'MTV Hits', 'MTV 80s', 'MTV 90s', 'MTV 00s', 'VH1', 'VH1 Classic',
      'Kiss TV', 'UTV', 'Music Channel', 'Hit Music Channel', 'Mezzo', 'Mezzo Live HD'
    ]
  },
  {
    name: 'Știri',
    channels: [
      'Euronews', 'CNN', 'BBC World News', 'France 24', 'DW', 'Bloomberg TV',
      'Al Jazeera', 'CNBC', 'Sky News', 'TV5MONDE'
    ]
  },
  {
    name: 'Lifestyle',
    channels: [
      'TLC', 'E! Entertainment', 'Fashion TV', 'Food Network', 'Travel Channel',
      'CBS Reality', 'Fine Living', 'BBC Lifestyle', 'HGTV'
    ]
  }
];

// Add these animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function TVPage() {
  const [selectedCategory, setSelectedCategory] = useState('Generale');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const channelsPerPage = 16;

  // Filter channels based on search query
  const filteredChannels = channelCategories
    .find(cat => cat.name === selectedCategory)
    ?.channels.filter(channel =>
      channel.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredChannels.length / channelsPerPage);
  const currentChannels = filteredChannels.slice(
    (currentPage - 1) * channelsPerPage,
    currentPage * channelsPerPage
  );

  return (
    <main className="pt-32 pb-16 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Canale TV <span className="text-primary">Premium</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bucură-te de o selecție vastă de canale TV de înaltă calitate,
            cu conținut pentru toată familia
          </p>
        </motion.div>

        {/* Enhanced Category Navigation with Search */}
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
                  setSearchQuery('');
                }}
                className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${selectedCategory === category.name
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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
              className="w-full px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200
                       focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none
                       transition-all"
            />
            <svg
              className="w-5 h-5 absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
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

        {/* Channels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {currentChannels.map((channel, index) => (
            <motion.div
              key={channel}
              variants={itemVariants}
              className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl
                       border border-gray-100 transition-all duration-300
                       hover:scale-105 hover:border-primary/20 overflow-hidden"
            >
              {/* Enhanced Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent
                            rounded-full -translate-y-16 translate-x-16 group-hover:translate-y-0
                            group-hover:translate-x-0 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent
                            rounded-full translate-y-16 -translate-x-16 group-hover:translate-y-0
                            group-hover:translate-x-0 transition-transform duration-500" />

              {/* Enhanced Channel Content */}
              <div className="relative">
                {/* Channel Icon/Logo */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-500/20
                              rounded-2xl mb-4 flex items-center justify-center transform
                              group-hover:rotate-6 transition-transform duration-300">
                  <span className="text-2xl font-bold bg-clip-text text-transparent
                                bg-gradient-to-br from-primary to-blue-500">
                    {channel.charAt(0)}
                  </span>
                </div>

                {/* Channel Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3
                               group-hover:text-primary transition-colors">
                  {channel}
                </h3>

                {/* Enhanced Features */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-gray-500">HD Quality</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Digital Sound</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>EPG Support</span>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-500/5
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Interactive Corner Decoration */}
              <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-500/20
                            rounded-tl-2xl transform rotate-12 group-hover:rotate-45 transition-transform duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center gap-2"
          >
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600
                       disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600
                       disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
            >
              Următor
            </button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Alătură-te miilor de abonați mulțumiți și bucură-te de cea mai bună experiență TV
          </p>
          <button className="px-8 py-4 bg-primary text-white rounded-xl font-medium
                           shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors">
            Abonează-te Acum
          </button>
        </motion.div>
      </div>
    </main>
  );
}
