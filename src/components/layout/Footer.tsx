"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
  noHover?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const mainNavigation: FooterSection[] = [
  {
    title: "Companie",
    links: [
      { name: "Despre Noi", href: "/despre" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Servicii",
    links: [
      { name: "Internet", href: "/servicii/internet" },
      { name: "TV Digital", href: "/servicii/internet" },
      { name: "Prețuri", href: "/preturi" },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        name: "+373 268 85 555",
        href: "tel:+37326885555",
        icon: <Phone className="h-4 w-4" />,
      },
      {
        name: "sales@altnet.md",
        href: "mailto:sales@altnet.md",
        icon: <Mail className="h-4 w-4" />,
      },
      {
        name: "str. Alexandru cel Bun 57, Ialoveni, Moldova",
        href: "#",
        icon: <MapPin className="h-4 w-4" />,
        noHover: true,
      },
    ],
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/altnet.md/",
    icon: <Facebook className="h-5 w-5" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/altnet.md/",
    icon: <Instagram className="h-5 w-5" />,
  },
];

export default function Footer() {
  const navigation = mainNavigation;
  const description =
    "Furnizor local de servicii de internet și televiziune digitală, oferind conectivitate de înaltă viteză și divertisment de calitate.";

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="block">
                <Image
                  src="/ALTNET-LOGO.svg"
                  alt="ALTNET"
                  width={150}
                  height={60}
                  className="mb-4"
                />
              </Link>
              <p className="text-gray-600 max-w-sm">{description}</p>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-900 font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={!link.noHover ? { x: 2 } : {}}
                  >
                    {link.icon ? (
                      <div className="flex items-start gap-2">
                        {link.icon}
                        {link.noHover ? (
                          <span className="text-gray-600">{link.name}</span>
                        ) : (
                          <a
                            href={link.href}
                            className="text-gray-600 hover:text-primary transition-colors"
                          >
                            {link.name}
                          </a>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ALTNET. Toate drepturile rezervate.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/termeni"
                className="text-gray-500 hover:text-primary text-sm"
              >
                Termeni și Condiții
              </Link>
              <Link
                href="/confidentialitate"
                className="text-gray-500 hover:text-primary text-sm"
              >
                Politica de Confidențialitate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
