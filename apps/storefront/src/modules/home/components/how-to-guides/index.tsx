import { Container } from "@medusajs/ui"
import { Clock, Users, BookOpen, ArrowRight } from "lucide-react"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Image from "next/image"

const HOW_TO_GUIDES = [
  {
    id: 1,
    title: "How to Frame a Wall",
    level: "Beginner",
    duration: "22 min",
    steps: 8,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=75",
    description: "Lay out, cut, and nail a stud wall from scratch.",
    category: "Construction"
  },
  {
    id: 2,
    title: "Fix a Leaky Pipe",
    level: "Beginner", 
    duration: "14 min",
    steps: 5,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=75",
    description: "Identify, gather parts, and seal a leak permanently.",
    category: "Plumbing"
  },
  {
    id: 3,
    title: "Install Recessed Lighting",
    level: "Intermediate",
    duration: "35 min", 
    steps: 12,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=75",
    description: "Wire and mount recessed cans in an existing ceiling.",
    category: "Electrical"
  },
  {
    id: 4,
    title: "Use a Circular Saw Safely",
    level: "Beginner",
    duration: "10 min",
    steps: 4,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=75", 
    description: "Blade guards, cutting technique, kickback prevention.",
    category: "Safety"
  },
  {
    id: 5,
    title: "Tile a Bathroom Floor",
    level: "Intermediate",
    duration: "45 min",
    steps: 11,
    image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&q=75",
    description: "Layout, mortar, grout, and seal step by step.",
    category: "Finishing"
  },
  {
    id: 6,
    title: "Build a Deck – Post & Beam",
    level: "Advanced",
    duration: "2h 00m",
    steps: 20,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75",
    description: "Dig footings, set posts, and frame your deck.",
    category: "Construction"
  }
]

const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "beginner":
      return "bg-green-100 text-green-800"
    case "intermediate":
      return "bg-orange-100 text-orange-800"
    case "advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function HowToGuides() {
  return (
    <section className="py-16 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            How-To Guides
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto text-lg">
            Learn essential skills with step-by-step tutorials from professional contractors and DIY experts
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOW_TO_GUIDES.map((guide) => (
            <LocalizedClientLink
              key={guide.id}
              href={`/guides/${guide.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay with duration */}
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Clock size={12} className="text-white" />
                    <span className="text-white text-xs font-medium">
                      {guide.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Category and Level */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">
                      {guide.category}
                    </span>
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${getLevelColor(guide.level)}
                    `}>
                      {guide.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-neutral-900 text-lg group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                    {guide.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 text-sm line-clamp-2">
                    {guide.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        <span>{guide.steps} steps</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>2.5k views</span>
                      </div>
                    </div>
                    
                    <ArrowRight 
                      size={16} 
                      className="text-orange-600 group-hover:translate-x-1 transition-transform duration-300" 
                    />
                  </div>
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <LocalizedClientLink href="/guides">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-300 inline-flex items-center gap-2">
              View All Guides
              <ArrowRight size={18} />
            </button>
          </LocalizedClientLink>
        </div>
      </Container>
    </section>
  )
}
