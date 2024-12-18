'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, PhoneIcon } from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Servicii',
    href: '/servicii',
    submenu: [
      {
        name: 'Internet',
        href: '/servicii/internet',
        description: 'Internet prin fibră optică'
      },
      {
        name: 'Televiziune',
        href: '/servicii/tv',
        description: 'Televiziune digitală HD'
      }
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

  return (
    <div className="py-1">
      {item.submenu ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl
                     flex items-center justify-between
                     transition-colors ${isActive ? 'text-primary' : 'text-gray-600'}`}
          >
            <span>{item.name}</span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pl-4"
              >
                {item.submenu.map((subitem: any) => (
                  <Link
                    key={subitem.name}
                    href={subitem.href}
                    onClick={onClose}
                    className="block px-4 py-3 text-sm text-gray-600 hover:text-primary
                             rounded-xl transition-colors"
                  >
                    <span className="font-medium">{subitem.name}</span>
                    <span className="block text-xs text-gray-500 mt-0.5">
                      {subitem.description}
                    </span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link
          href={item.href}
          onClick={onClose}
          className={`block px-4 py-3 text-base font-medium rounded-xl
                   transition-colors ${isActive ? 'text-primary' : 'text-gray-600'}`}
        >
          {item.name}
        </Link>
      )}
    </div>
  );
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed w-full z-40 transition-all duration-200
                  ${isScrolled
                    ? 'py-3 bg-white/90 backdrop-blur-xl shadow-lg shadow-gray-200/20'
                    : 'py-4 bg-transparent'}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">ALTNET</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <>
                      <button
                        className={`flex items-center gap-1 text-base font-medium transition-colors
                                ${isActiveLink(item.href) ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                      >
                        {item.name}
                        <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                      </button>

                      {/* Submenu */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none
                                  group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                        <div className="w-64 bg-white rounded-2xl shadow-xl shadow-gray-200/20 border border-gray-100
                                    overflow-hidden p-2">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className={`flex flex-col p-3 rounded-xl transition-colors
                                      ${isActiveLink(subitem.href)
                                  ? 'text-primary bg-primary/5'
                                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}
                            >
                              <span className="font-medium">{subitem.name}</span>
                              <span className="text-sm text-gray-500 mt-0.5">
                                {subitem.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-base font-medium transition-colors
                              ${isActiveLink(item.href)
                          ? 'text-primary'
                          : 'text-gray-600 hover:text-primary'}`}
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
      </header>

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
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold text-primary">ALTNET</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  {navigation.map((item) => (
                    <MobileMenuItem
                      key={item.name}
                      item={item}
                      isActive={isActiveLink(item.href)}
                      onClose={() => setIsMobileMenuOpen(false)}
                    />
                  ))}
                </div>

                {/* Contact Section */}
                <div className="p-4 border-t border-gray-100">
                  <div className="space-y-4">
                    {/* Phone */}
                    <Link
                      href="tel:+37369123456"
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50
                               hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <PhoneIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Sună Acum</div>
                        <div className="text-sm text-gray-500">+373 69 123 456</div>
                      </div>
                    </Link>

                    {/* Contact Button */}
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium
                               text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors"
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
