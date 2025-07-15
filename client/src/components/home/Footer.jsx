import { Link } from "react-router-dom";
import { Phone,  } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "New Arrivals", href: "/category/newArrivals" },
        { name: "Bras", href: "/category/bras" },
        { name: "Panties", href: "/category/panties" },
        { name: "Sets", href: "/category/sets" },
      ],
    }
    // {
    //   title: "Support",
    //   links: [
    //     { name: "Size Guide", href: "#" },
    //     { name: "Returns", href: "#" },
    //     { name: "Shipping", href: "#" },
    //   ],
    // },
    // {
    //   title: "Connect",
    //   links: [
    //     {
    //       name: "Instagram",
    //       href: "https://www.instagram.com/_lusciouslingeries.ng",
    //     },
    //   ],
    // },
  ];

  return (
    <footer
      className="bg-gray-900 text-white py-12 px-4 animate-fadeInUp"
      style={{ animationDelay: "3.6s" }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="mb-4">
              <img
                src="/logo.png"
                alt="Luscious Lingerie Logo"
                width={150}
                height={75}
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400">
              Celebrating femininity with premium lingerie designed for the
              modern woman.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h5 className="font-semibold mb-4">{section.title}</h5>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="hover:text-pink-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h5 className="font-semibold mb-4">Connect</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="https://www.instagram.com/_lusciouslingeries.ng"
                   target="_blank"
                  className="hover:text-pink-400 transition-colors"
                >
                  Instagram
                </a>
                </li>
             
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Contact us</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="https://wa.me/2348146783388"
                   target="_blank"
                  className="hover:text-pink-400 transition-colors"
                >
                  WhatsApp
                </a>
                </li>
               <li>
                 <a
                  href="tel:+2348123456789"
                  target="_blank"
                  className="flex items-center gap-2 text-green-600 hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  <span>+234 814 678 3388</span>
                </a>
               </li>
             
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Luscious Lingerie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
