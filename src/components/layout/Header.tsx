'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Servicii',
    href: '/servicii',
    submenu: [
      {
        name: 'Internet Fibră',
        href: '/servicii/internet',
        description: 'Viteză de până la 1Gbps'
      },
      {
        name: 'TV Digital',
        href: '/servicii/tv',
        description: 'Peste 200 canale HD'
      },
      {
        name: 'Telefonie',
        href: '/servicii/telefonie',
        description: 'Apeluri nelimitate'
      },
    ]
  },
  { name: 'Prețuri', href: '/preturi' },
  { name: 'Acoperire', href: '/acoperire' },
  { name: 'Contact', href: '/contact' },
];

const MobileMenuItem = ({
  item,
  isActive,
  onClose,
}: {
  item: any;
  isActive: boolean;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSubItemClick = async (href: string) => {
    onClose(); // Close menu first
    // Small delay for smooth transition
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  return (
    <motion.div
      initial={false}
      className="rounded-xl overflow-hidden"
    >
      {item.submenu ? (
        <div>
          <button
            onClick={handleSubmenuClick}
            className={`w-full flex items-center justify-between p-4
                     text-base font-medium transition-colors
                     ${isActive ? 'text-primary' : 'text-gray-600'}`}
          >
            <span>{item.name}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="w-5 h-5" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-50/50 rounded-xl mx-4 mb-4"
                onClick={(e) => e.stopPropagation()}
              >
                {item.submenu.map((subitem: any) => (
                  <div
                    key={subitem.name}
                    onClick={() => handleSubItemClick(subitem.href)}
                    className={`flex flex-col p-4 rounded-xl cursor-pointer
                             ${pathname === subitem.href ? 'text-primary bg-primary/5' : 'text-gray-600'}
                             hover:bg-white/50 transition-colors`}
                  >
                    <span className="font-medium">{subitem.name}</span>
                    <span className="text-sm text-gray-500 mt-1">
                      {subitem.description}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div
          onClick={() => handleSubItemClick(item.href)}
          className={`block p-4 text-base font-medium transition-colors cursor-pointer
                   ${isActive ? 'text-primary' : 'text-gray-600'}`}
        >
          {item.name}
        </div>
      )}
    </motion.div>
  );
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY.current || currentScrollY < 50);
      setIsScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close submenu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={false}
        animate={{
          y: isVisible ? 0 : -100,
          transition: { duration: 0.2 }
        }}
        className={`fixed w-full z-40 transition-all duration-200
                  ${isScrolled
                    ? 'py-3 bg-white/90 backdrop-blur-xl shadow-lg shadow-gray-200/20'
                    : 'py-4 bg-transparent'}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark
                            flex items-center justify-center">
                <BoltIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">Altnet</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                        className={`flex items-center gap-1 text-base font-medium transition-colors
                                ${isActiveLink(item.href) ? 'text-primary' : 'text-gray-600'}`}
                      >
                        {item.name}
                        <motion.div
                          animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-72 rounded-2xl
                                     bg-white shadow-xl shadow-gray-200/20
                                     border border-gray-100"
                          >
                            <div className="p-3">
                              {item.submenu.map((subitem) => (
                                <Link
                                  key={subitem.name}
                                  href={subitem.href}
                                  onClick={() => setActiveSubmenu(null)}
                                  className={`flex items-start gap-4 p-3 rounded-xl
                                          ${isActiveLink(subitem.href)
                                            ? 'text-primary bg-primary/5'
                                            : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}
                                >
                                  <div>
                                    <div className="font-medium">{subitem.name}</div>
                                    <div className="text-sm text-gray-500">
                                      {subitem.description}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-base font-medium transition-colors
                              ${isActiveLink(item.href) ? 'text-primary' : 'text-gray-600'}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[320px] bg-white z-50 lg:hidden
                       shadow-2xl shadow-gray-200/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark
                                  flex items-center justify-center">
                      <BoltIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">Altnet</span>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Menu Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-2">
                    {navigation.map((item) => (
                      <MobileMenuItem
                        key={item.name}
                        item={item}
                        isActive={pathname.startsWith(item.href)}
                        onClose={() => setIsMobileMenuOpen(false)}
                      />
                    ))}
                  </div>

                  {/* Contact Buttons */}
                  <div className="p-4 space-y-3 border-t border-gray-100">
                    <Link
                      href="tel:0800800800"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-4 rounded-xl
                               text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10
                                    flex items-center justify-center">
                        <PhoneIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Sună-ne acum</div>
                        <div className="text-sm text-gray-500">0800 800 800</div>
                      </div>
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Contactează-ne
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
