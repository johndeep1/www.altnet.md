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
      "PRO TV",
      "PRO TV SD",
      "TVR Moldova HD",
      "Jurnal HD",
      "TV8 HD",
      "Canal 5",
      "DIM TV",
      "National 4",
      "TVC 21",
      "ONE TV HD",
      "R-live HD",
      "Star TV HD",
      "7TV HD",
      "Quantum HD",
      "Global 24HD",
      "1+1 int.",
      "Inter+HD",
      "Next HD",
      "CANAL DHD",
      "Premiera HD",
      "Autentic TV",
      "Studio",
      "TNT",
      "TNT 4",
      "STS",
      "Домашний",
      "Перец",
      "Пятница",
      "Ren TV",
      "Job TV",
    ],
  },
  {
    name: "Stiri",
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
      "Prima News",
      "Profit News HD",
    ],
  },
  {
    name: "Regionale",
    channels: [
      "GRT HD",
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
      "Axial",
      "Espresso",
      "Drochia",
      "STV RO",
      "Media TV",
    ],
  },
  {
    name: "Sport",
    channels: [
      "Eurosport 1 HD (ru ro)",
      "Eurosport 2 HD (ro,ru)",
      "XSport HD",
      "We sport HD",
      "Мфтч!Планета",
      "Viju+sport HD",
      "Живи активно HD",
      "Extreme sports",
    ],
  },
  {
    name: "Filme HD",
    channels: [
      "Cinema 1 HD",
      "Acasa",
      "Acasa Gold",
      "Viju TV 1000 HD",
      "Viju TV 1000 Action HD",
      "Viju+ serial HD",
      "Viju+megahit HD",
      "Viju+premiere HD",
      "Viju+comedy HD",
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
      "детский кино",
    ],
  },
  {
    name: "Filme Internationale",
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
      "Индия HD",
    ],
  },
  {
    name: "Documentare Natura",
    channels: [
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
    name: "Documentare Stiinta",
    channels: [
      "Discovery channel HD",
      "Viju Explore HD",
      "Viju History HD",
      "ID Xtra HD",
      "Stiinta 2.0 HD",
      "Galaxy HD",
      "Perpetuum mobile HD",
      "A7 TV HD",
      "Quadro 4K",
      "HD Media",
      "HD-Life",
      "Prima Word",
    ],
  },
  {
    name: "Lifestyle si Hobby",
    channels: [
      "TLC HD",
      "HGTV HD",
      "Food Network HD",
      "RTG int.",
      "Travel mix HD",
      "Глазами туриста HD",
      "Глазами туриста 4К",
      "загародная",
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
      "Мама тв",
    ],
  },
  {
    name: "Copii",
    channels: [
      "Nickelodeon jr.(ro/ru/engl)",
      "Nickelodeon (ro,ru)",
      "Nicktoons (ro)",
      "Cartoon network HD Ro",
      "Cartoonito",
      "Carton Clasic",
      "Jimjam",
      "Смайлик Тв",
      "Мульт HD",
      "Tralala HD",
      "Уникум HD",
      "Детский мир HD",
      "Gurinel TV HD",
      "CTC Kids",
    ],
  },
  {
    name: "Muzică",
    channels: [
      "Bridge TV classic",
      "Bridge TV",
      "Bridge Hits HD",
      "Bridge TV Ru hit",
      "Bridge Deluxe HD",
      "Noroc Tv HD",
      "Busuioc TV",
      "Simfonica",
      "Шансон",
      "Disco mix HD",
      "Etno HD",
      "Party Mix HD",
      "Zona M",
      "Atomic HD",
      "Atomic academy HD",
      "Tezaur Folc",
      "Popas TV",
      "Emi TV HD",
      "Taraf HD",
      "Orizont TV Ro",
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
      "Credo",
      "Alfa Omega",
      "Nasul TV",
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
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      // PDF styling
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 10;

      // ALTNET Website Colors - Emerald Theme
      const primaryColor = [30, 177, 75]; // ALTNET Green - #1EB14B
      const emeraldLight = [16, 185, 129]; // emerald-500 - #10b981
      const emeraldDark = [6, 78, 59]; // emerald-900 - #064e3b
      const lightGreen = [240, 250, 245]; // Very light green for alternating rows
      const textColor = [50, 50, 50]; // Dark gray for text

      // Use default fonts - don't try to add custom fonts
      doc.setFont("helvetica");

      // Function to transliterate Cyrillic text to avoid encoding issues
      const transliterate = (text: string): string => {
        // Return text as is if it doesn't contain Cyrillic or Romanian special characters
        if (!/[а-яА-Я]/.test(text) && !/[ăâîșțĂÂÎȘȚ]/.test(text)) return text;

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
          'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
          // Romanian special characters
          'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
          'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T'
        };

        // Transliterate
        return text.split('').map(char => cyrillicToLatin[char] || char).join('');
      };

      // Create ultra smooth gradient background from emerald-500 to emerald-900
      const steps = 500; // Even more steps for a perfectly seamless gradient
      const stepWidth = pageWidth / steps;

      for (let i = 0; i < steps; i++) {
        // Calculate gradient color for this step using smoother easing
        const ratio = i / steps;
        // Use quadratic easing for smoother transition
        const easedRatio = ratio * ratio;

        const r = Math.round(emeraldLight[0] + easedRatio * (emeraldDark[0] - emeraldLight[0]));
        const g = Math.round(emeraldLight[1] + easedRatio * (emeraldDark[1] - emeraldLight[1]));
        const b = Math.round(emeraldLight[2] + easedRatio * (emeraldDark[2] - emeraldLight[2]));

        doc.setFillColor(r, g, b);
        doc.rect(i * stepWidth, 0, stepWidth + 0.1, pageHeight, 'F'); // Smaller overlap to avoid lines
      }

      // Add ALTNET and title text directly on the gradient
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");


      doc.setFontSize(20);
      doc.text("ALTNET Grila de canale TV Interactiv", pageWidth / 2, margin + 10, { align: "center" });

      // Content area setup
      const contentMargin = margin + 5;
      const contentTop = margin + 25;
      const contentWidth = pageWidth - 2 * contentMargin;
      const contentHeight = pageHeight - contentTop - 20;

      // Create grid of white category boxes
      const columns = 5; // 5 columns of categories
      const colWidth = contentWidth / columns;
      const categoryHeight = contentHeight / 3; // 3 rows of categories
      const headerHeight = 8; // Height of category headers
      const boxCornerRadius = 3; // Radius for category boxes

      // Set initial positions
      let currentCol = 0;
      let currentRow = 0;

      // Helper function to draw rounded rectangle with only top corners rounded
      const drawTopRoundedRect = (x: number, y: number, width: number, height: number, radius: number, fillColor: number[]) => {
        doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);

        // Main rectangle
        doc.rect(x, y + radius, width, height - radius, 'F');

        // Top left corner
        doc.circle(x + radius, y + radius, radius, 'F');

        // Top right corner
        doc.circle(x + width - radius, y + radius, radius, 'F');

        // Fill the top rectangle
        doc.rect(x + radius, y, width - 2 * radius, radius, 'F');
      };

      // Draw the category boxes
      for (let i = 0; i < channelCategories.length; i++) {
        const category = channelCategories[i];

        // Calculate positions
        const x = contentMargin + (currentCol * colWidth) + 3;
        const y = contentTop + (currentRow * categoryHeight) + 3;
        const boxWidth = colWidth - 6; // Spacing between boxes

        // Draw category box with white background
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(x, y, boxWidth, categoryHeight - 4, boxCornerRadius, boxCornerRadius, 'F');

        // Draw category header with green background and only top rounded corners
        drawTopRoundedRect(x, y, boxWidth, headerHeight, boxCornerRadius, primaryColor);

        // Add category name
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.text(category.name, x + boxWidth / 2, y + 5, { align: "center" });

        // Draw channels list
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFontSize(5.5);
        doc.setFont("helvetica", "normal");

        let channelY = y + headerHeight + 3;

        // Loop through channels
        for (let j = 0; j < Math.min(category.channels.length, 32); j++) {
          // Draw alternating row background
          if (j % 2 === 0) {
            doc.setFillColor(lightGreen[0], lightGreen[1], lightGreen[2]);
            doc.roundedRect(x + 1, channelY - 2.3, boxWidth - 2, 2.8, 0.8, 0.8, 'F');
          }

          // Channel number
          doc.setFont("helvetica", "bold");
          doc.setFontSize(4.5);
          doc.setTextColor(80, 80, 80);
          doc.text(`${j+1}`, x + 2.5, channelY);

          // Channel name
          doc.setFont("helvetica", "normal");
          doc.setFontSize(5.5);
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          const transliteratedChannel = transliterate(category.channels[j]);
          doc.text(transliteratedChannel, x + 6, channelY, {
            maxWidth: boxWidth - 12
          });

          // Package indicators (small dots)
          const dotSize = 0.5;
          const dotSpacing = 1.5;
          const dotsX = x + boxWidth - 6;

          // START package (cyan)
          doc.setFillColor(68, 187, 221);
          doc.circle(dotsX, channelY - 0.8, dotSize, 'F');

          // OPTIM package (orange)
          doc.setFillColor(242, 173, 73);
          doc.circle(dotsX + dotSpacing, channelY - 0.8, dotSize, 'F');

          // ULTRA package (red)
          doc.setFillColor(237, 28, 36);
          doc.circle(dotsX + 2 * dotSpacing, channelY - 0.8, dotSize, 'F');

          // Increase Y for next channel
          channelY += 2.8;

          // Stop if running out of space
          if (channelY > y + categoryHeight - 7) {
            break;
          }
        }

        // Move to next column or row
        currentCol++;
        if (currentCol >= columns) {
          currentCol = 0;
          currentRow++;
        }
      }

      // Add footer text in white (directly on gradient)
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(4.5);
      doc.setFont("helvetica", "normal");
      doc.text("ALTNET Moldova are dreptul de a modifica lista de canale TV, în functie de oferta de pe piata a programelor audiovizuale, cerințele legislației în vigoare,", margin, pageHeight - 8);
      doc.text("negocierile cu furnizorii de continut media audiovizual, audiența programelor retransmise si alti factori relevanti.", margin, pageHeight - 6);

      // Interactive services note
      doc.text("Canal TV cu servicii interactive (Catch-Up, Arhiva TV, Pauză/Reluare (Pause/Play), Reluare de la început (Start-Over), Navigare prin program (Time-Shift).", margin, pageHeight - 3);

      // Copyright
      doc.setFont("helvetica", "italic");
      doc.setFontSize(4);
      doc.text("© ALTNET " + new Date().getFullYear() + " | www.altnet.md", pageWidth - margin, pageHeight - 3, { align: "right" });

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
