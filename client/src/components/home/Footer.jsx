import { Link } from "react-router-dom";


const Footer = () => {
const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "New Arrivals", href: "#" },
        { name: "Bras", href: "/category/bras" },
        { name: "Panties", href: "#" },
        { name: "Sets", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Size Guide", href: "#" },
        { name: "Returns", href: "#" },
        { name: "Shipping", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "Instagram", href: "#" },
        { name: "Facebook", href: "#" },
        { name: "Pinterest", href: "#" },
        { name: "Newsletter", href: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 animate-fadeInUp" style={{ animationDelay: "3.6s" }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="Luscious Lingerie Logo"
                width={150}
                height={75}
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400">Celebrating femininity with premium lingerie designed for the modern woman.</p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h5 className="font-semibold mb-4">{section.title}</h5>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-pink-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Luscious Lingerie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )

}

export default Footer