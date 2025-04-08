"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { AnimatedButton, ArrowIcon } from "@/components/ui/button-variants";
import { Search, Tv, FileDown } from "lucide-react";
import { jsPDF } from "jspdf";

const channelCategories = [
  {
    name: "Generale",
    channels: [
      "Moldova 1 HD",
      "Moldova 2",
      "Prime",
      "PRO TV",
      "TVR Moldova HD",
      "Jurnal HD",
      "TV8 HD",
      "Canal 5 HD",
      "DIM TV",
      "National 4",
      "TVC 21",
      "Mega TV",
      "ONE TV HD",
      "R-live HD",
      "Star TV HD",
      "7TV HD",
      "Quantum HD",
      "Global 24HD",
      "1+1 int.",
      "Inter+HD",
    ],
  },
  {
    name: "Știri",
    channels: [
      "Exclusiv HD",
      "Cotidianul HD",
      "Vocea Basarabiei HD",
      "Linkpress HD",
      "Freedom HD",
      "Euronws Romania HD",
      "Digi 24",
      "France 24 HD engl.",
      "France 24 HD fr.",
      "CNN int.",
      "TV-5 Monde HD",
      "Прямой HD",
      "Realitatea plus HD",
      "Realitatea Star HD",
      "Realitatea sportiva HD",
      "Privesc.eu HD",
      "InfoTVRomania HD",
      "Current time HD",
      "B1 Romania HD",
      "DW Russia",
      "ch-info",
      "Profi 24",
      "N24 plus",
    ],
  },
  {
    name: "Regionale",
    channels: [
      "GRT HD",
      "Free",
      "OstWest",
      "Canal Regional TV",
      "Inedit TV",
      "Elita TV (Rezina)",
      "NTS (Taraclia)",
      "ATV (Gagauzia)",
      "Soroca TV",
      "TV-9 HD",
      "Kapital TV",
      "Alba Carolina (Alba Iulia)",
      "Muscel TV HD",
      "Super TV HD (Arges)",
      "M9 TV HD (Tirgu-Mures)",
      "Apollonia HD (Iasi)",
      "Columna TH HD (Tirgoviste)",
      "AS-TV",
      "Telestar 1",
      "Tele Moldova+ HD",
      "Sens HD/Ida",
      "Vaslui TV",
      "Valea Prahovei HD",
      "National TV",
      "Espresso",
    ],
  },
  {
    name: "Sport",
    channels: [
      // Romanian Sports
      "Eurosport 1 HD (ru ro)",
      "Eurosport 2 HD (ro,ru)",
      "XSport HD",
      "We sport HD",

      // Russian Sports
      "Мфтч!Планета",
      "Viju+sport HD",
      "Живи активно HD",
      "Extreme sports",
    ],
  },
  {
    name: "Filme HD",
    channels: [
      // Romanian Movies
      "Cinema 1 HD",
      "Acasa",
      "Acasa Gold",

      // Viju Movies
      "Viju TV 1000 HD",
      "Viju TV 1000 Action HD",
      "Viju+ serial HD",
      "Viju+megahit HD",
      "Viju+premiere HD",
      "Viju+comedy HD",

      // Russian Movies HD
      "Киносемья HD",
      "Star family HD",
      "Кинопремьера HD",
      "Киномикс HD",
      "Star cinema HD",
      "Киносвидание HD",
      "Кинокомедия HD",
      "Мужское кино HD",
      "Кино тв HD",
      "Кинохит HD",
      "Киносерия HD",
      "Феникс + Кино HD",
    ],
  },
  {
    name: "Filme Internaționale",
    channels: [
      "Kinoliving",
      "Sapphire HD",
      "Индийское кино",
      "TV XXI",
      "Just Tv",
      "Film UA Drama HD",
      "Bolt HD",
      "Любимое кино HD",
      "Еврокино HD",
      "Илюзион + HD",
      "Fenix + Kino",
      "Индия HD",
    ],
  },
  {
    name: "Documentare Natură",
    channels: [
      "Love nature HD",
      "Animal Planet HD",
      "Viju nature HD",
      "Viju+Planet HD",
      "Живая планета",
      "Моя планета HD",
      "Океан HD",
      "Домашние животные",
      "Зоопарк",
      "Big planet HD",
      "Unknown planet HD",
      "Terra incognita",
    ],
  },
  {
    name: "Documentare Știință",
    channels: [
      "Discovery channel HD",
      "Viju Explore HD",
      "Viju History HD",
      "ID Xtra HD",
      "Наука 2.0 HD",
      "Galaxy HD",
      "Perpetuum mobile HD",
      "A7 TV HD",
      "Quadro 4K",
      "HD Media",
      "HD-Life",
    ],
  },
  {
    name: "Lifestyle și Hobby",
    channels: [
      "TLC HD",
      "HGTV HD",
      "Food Network HD",
      "RTG int.",
      "Travel channel HD",
      "Travel mix HD",
      "Глазами туриста HD",
      "Глазами туриста 4К",
      "Загородная жизнь",
      "Кухня ТВ НD",
      "Здоровое Тв",
      "Психология 21",
      "Мужской",
      "Усадьба HD",
      "Joy cook",
      "Agro TV Moldova HD",
      "Драйв",
      "Авто плюс HD",
      "Авто 24 HD",
      "Точка отрыва HD",
      "Диалоги о рыбалке",
      "Охота и рыбалка HD",
      "8 TV Ru",
    ],
  },
  {
    name: "Copii 0-6 ani",
    channels: [
      "Nickelodeon jr.(ro/ru/engl)",
      "Cartoon network HD Ro",
      "Cartoonito",
      "Jimjam",
      "Смайлик Тв",
      "CTC Kids",
    ],
  },
  {
    name: "Copii 7-14 ani",
    channels: [
      "Nickelodeon (ro,ru)",
      "Nicktoons (ro)",
      "Cartoon network (ru)",
      "Мульт HD",
      "Tralala HD",
      "Уникум HD",
      "Детский мир HD",
      "Мультимания",
      "Gurinel TV HD",
      "Мультсезон",
      "Da Vinci",
    ],
  },
  {
    name: "Muzică Românească",
    channels: [
      "Noroc Tv HD",
      "Busuioc TV",
      "Etno HD",
      "Favorit Tv",
      "Melos HD",
      "Tezaur Folc",
      "Popas TV",
      "Emi TV HD",
      "Taraf HD",
      "Orizont TV Ro",
    ],
  },
  {
    name: "Muzică Internațională",
    channels: [
      "Bridge TV classic",
      "Bridge TV",
      "Bridge Hits HD",
      "Bridge TV Ru hit",
      "Bridge Deluxe HD",
      "TNT music HD",
      "Шансон",
      "Disco mix HD",
      "Party Mix HD",
      "Zona M",
      "Atomic HD",
      "Atomic academy HD",
    ],
  },
  {
    name: "Divertisment",
    channels: [
      "Kvartal TV",
      "Cарафан",
      "Анекдот ТВ",
      "КВН ТВ",
      "Zoom HD",
      "Вопросы и ответы",
    ],
  },
  {
    name: "Religie",
    channels: [
      "Trinitas TV HD",
      "ТБН Ru",
      "CNL",
      "Speranta",
    ],
  },
  {
    name: "Teleshopping",
    channels: [
      "Shop ON TV HD",
      "24 Mix Teleshop HD",
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
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
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

  // Function to generate PDF
  const generatePDF = () => {
    setIsPdfGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // PDF styling
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 8;
      const columns = 4; // Increase to 4 columns for more compactness
      const colWidth = (pageWidth - (2 * margin)) / columns;

      // ALTNET Website Colors - Green Theme
      const primaryColor = [25, 168, 82]; // Green
      const secondaryColor = [18, 126, 61]; // Darker green
      const lightGreen = [235, 248, 240]; // Very light green for alternating rows
      const darkGreen = [12, 84, 41]; // Dark green for text

      // Function to transliterate Cyrillic text to avoid encoding issues
      const transliterate = (text: string): string => {
        // Return text as is if it doesn't contain Cyrillic
        if (!/[а-яА-Я]/.test(text)) return text;

        // Simple transliteration map
        const cyrillicToLatin: Record<string, string> = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
          'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
          'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
          'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
          'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
          'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '',
          'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
        };

        // Transliterate
        return text.split('').map(char => cyrillicToLatin[char] || char).join('');
      };

      // Create page background
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Add decorative elements - subtle green accent in corner
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2], 0.1);
      doc.rect(0, 0, 50, 20, 'F');
      doc.rect(pageWidth-10, pageHeight-10, 10, 10, 'F');

      // Add modern header with gradient
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(margin, margin, pageWidth - (2 * margin), 10, 'F');

      // Add logo effect in header
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.3);
      doc.circle(margin + 5, margin + 5, 3, 'S');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("A", margin + 4, margin + 7);

      // Add title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("ALTNET TV - LISTA COMPLETĂ DE CANALE", margin + 15, margin + 6);

      // Add subtitle
      doc.setFontSize(6);
      doc.setFont("helvetica", "italic");
      doc.text("Peste 300 de canale în pachete TV, Internet și Telefonie", pageWidth - margin - 5, margin + 6, { align: "right" });

      // Initial position for content
      let startY = margin + 14;
      let currentY = startY;
      let currentColumn = 0;

      // Calculate categories per column for even distribution
      const totalCategories = channelCategories.length;
      const categoriesPerColumn = Math.ceil(totalCategories / columns);

      // Draw table with channels
      for (let i = 0; i < totalCategories; i++) {
        const category = channelCategories[i];

        // Check if we need to move to a new column
        if (i > 0 && i % categoriesPerColumn === 0) {
          currentColumn++;
          currentY = startY;
        }

        const x = margin + (currentColumn * colWidth);

        // Draw category header
        doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.rect(x, currentY, colWidth - 1, 5, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        // Fix category name spacing
        const categoryName = category.name.toUpperCase().split('').join(' ');
        doc.text(category.name.toUpperCase(), x + 1, currentY + 3.5);

        currentY += 5.5;

        // Draw channels
        doc.setFontSize(5.5);
        doc.setFont("helvetica", "normal");

        const channelsPerRow = 2;
        const channelWidth = (colWidth - 1) / channelsPerRow;

        for (let j = 0; j < category.channels.length; j += channelsPerRow) {
          // Alternating row background
          if (j % (channelsPerRow * 2) === 0) {
            doc.setFillColor(lightGreen[0], lightGreen[1], lightGreen[2]);
            doc.rect(x, currentY - 0.3, colWidth - 1, 3, 'F');
          }

          // First channel in row
          if (j < category.channels.length) {
            doc.setTextColor(0, 0, 0);
            // Transliterate any Cyrillic characters to avoid encoding issues
            const channelText = `${j+1}.${transliterate(category.channels[j])}`;
            doc.text(channelText, x + 0.7, currentY + 1.5, {
              maxWidth: channelWidth - 1.5
            });
          }

          // Second channel in row
          if (j + 1 < category.channels.length) {
            // Transliterate any Cyrillic characters to avoid encoding issues
            const channelText = `${j+2}.${transliterate(category.channels[j+1])}`;
            doc.text(channelText, x + channelWidth, currentY + 1.5, {
              maxWidth: channelWidth - 1.5
            });
          }

          currentY += 3;

          // Check if we're approaching page bottom and need to reduce channels
          if (currentY > pageHeight - 15) {
            break;
          }
        }

        currentY += 2; // Add spacing between categories

        // Safety margin check - stop adding categories if we're running out of space
        if (currentY > pageHeight - 15) {
          currentColumn++;
          currentY = startY;
          i--; // Retry the same category in the next column
          continue;
        }
      }

      // Add footer
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 7, pageWidth - margin, pageHeight - 7);

      // Add footer content
      doc.setFontSize(6);
      doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
      doc.setFont("helvetica", "italic");
      doc.text("© ALTNET - Lista oficială de canale TV", pageWidth / 2, pageHeight - 4, { align: "center" });

      // Add contact info and date
      doc.setFont("helvetica", "normal");
      doc.text(`www.altnet.md | Telefon: 022-123-456`, margin, pageHeight - 4);
      doc.text(`Generat la ${new Date().toLocaleDateString()}`, pageWidth - margin, pageHeight - 4, { align: "right" });

      // Save the PDF
      doc.save("altnet-lista-canale-tv.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsPdfGenerating(false);
    }
  };

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

              {/* PDF Download Button */}
              <button
                onClick={generatePDF}
                disabled={isPdfGenerating}
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPdfGenerating ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                    Generare PDF...
                  </>
                ) : (
                  <>
                    <FileDown className="w-5 h-5 mr-2" />
                    Descarcă Lista Completă (PDF)
                  </>
                )}
              </button>
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
