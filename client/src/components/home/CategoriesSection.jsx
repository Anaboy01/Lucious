import { useEffect, useRef } from "react";
import CategoryCard from "../ui/CategoryCard";

const CategoriesSection = () => {
  const scrollRef = useRef(null);

  const categories = [
    { name: "Bras", desc: "Perfect fit, ultimate comfort", bg: "from-pink-200 to-red-200", image: "/bracat.png", link: "/category/bras" },
    { name: "Panties", desc: "Everyday essentials", bg: "from-red-200 to-pink-200", image: "/pantcat.png", link: "/category/panties" },
    { name: "Sets", desc: "Complete collections", bg: "from-pink-300 to-red-300", image: "/setCat.png", link: "/category/sets" },
    { name: "Short", desc: "Sexy & comfortable", bg: "from-red-100 to-pink-200", image: "/shortCat.png", link: "/category/shorts" },
    { name: "Loungewear", desc: "Relax in style", bg: "from-pink-100 to-red-100", image: "/loungeCat.png", link: "/category/loungewear" },
    { name: "Brallete", desc: "Finish your look", bg: "from-red-50 to-pink-50", image: "/bralleteCat.png", link: "/category/brallete" },
    { name: "Gym Wears", desc: "Bring the fitness out", bg: "from-red-50 to-pink-50", image: "/gymCat.png", link: "/category/gymwear" },
    { name: "Lingirie", desc: "Just sexy", bg: "from-red-50 to-pink-50", image: "/lingerieCat.png", link: "/category/lingerie" },
  ];


  const duplicatedCategories = [...categories, ...categories, ...categories]; 

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollStep = 1;
    const intervalDelay = 10; 

  
    const initialScrollPosition = container.scrollWidth / 3; 
    container.scrollLeft = initialScrollPosition;

    const scrollInterval = setInterval(() => {
      container.scrollLeft += scrollStep; 

   
      if (container.scrollLeft >= (container.scrollWidth / 3) * 2) { 
        container.scrollLeft = container.scrollWidth / 3; 
      }
    }, intervalDelay);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="py-16 px-4 bg-white/50 animate-fadeInUp relative" style={{ animationDelay: "2s" }}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
            Shop by Category
          </h3>
        </div>


        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />

        
          <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 min-w-full px-1 snap-x snap-mandatory scroll-smooth">
              {duplicatedCategories.map((category, index) => (
                <div
                  key={index} 
                             
                  className="snap-start shrink-0 w-[80%] sm:w-[60%] md:w-[32.5%] transition-transform"
                >
                  <CategoryCard category={category} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;