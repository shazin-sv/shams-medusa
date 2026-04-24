"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Filter, X } from "lucide-react"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

interface SearchSuggestion {
  id: string
  title: string
  category: string
  price?: number
  image?: string
}

interface EnhancedSearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export default function EnhancedSearch({ 
  placeholder = "Search products, brands, or categories...", 
  onSearch,
  className = ""
}: EnhancedSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Mock search API (in real app, this would call your search endpoint)
  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const mockSuggestions: SearchSuggestion[] = [
        {
          id: "1",
          title: "20V MAX Drill Kit",
          category: "Power Tools",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=100&q=80"
        },
        {
          id: "2", 
          title: "18V Circular Saw",
          category: "Power Tools",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=100&q=80"
        },
        {
          id: "3",
          title: "Framing Hammer 22oz",
          category: "Hand Tools", 
          price: 34.99,
          image: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=100&q=80"
        }
      ].filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setSuggestions(mockSuggestions.slice(0, 5))
      setIsLoading(false)
    }, 300)
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetchSuggestions(query)
      } else {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
      
      onSearch?.(searchQuery)
      setIsOpen(false)
      setQuery(searchQuery)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="relative flex items-center bg-white border border-neutral-300 rounded-full focus-within:border-orange-500 focus-within:shadow-lg transition-all duration-300">
          <Search 
            size={20} 
            className="absolute left-4 text-neutral-400 z-10"
          />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-12 pr-24 py-3 bg-transparent border-0 focus:outline-none text-neutral-900 placeholder-neutral-400"
          />
          
          {/* Action Buttons */}
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                onClick={() => {
                  setQuery("")
                  setSuggestions([])
                  inputRef.current?.focus()
                }}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
              >
                <X size={16} className="text-neutral-400" />
              </button>
            )}
            
            <button
              onClick={() => handleSearch(query)}
              className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Search Dropdown */}
      {isOpen && (query || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-50">
          {/* Loading State */}
          {isLoading && (
            <div className="p-6 text-center">
              <div className="inline-flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-neutral-600">Searching...</span>
              </div>
            </div>
          )}

          {/* Search Suggestions */}
          {!isLoading && suggestions.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              <div className="p-2 border-b border-neutral-100">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Products</p>
              </div>
              {suggestions.map((suggestion) => (
                <LocalizedClientLink
                  key={suggestion.id}
                  href={`/products/${suggestion.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-neutral-50 transition-colors duration-200"
                  onClick={() => {
                    handleSearch(suggestion.title)
                    setIsOpen(false)
                  }}
                >
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                    {suggestion.image && (
                      <img
                        src={suggestion.image}
                        alt={suggestion.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 text-sm truncate">{suggestion.title}</p>
                    <p className="text-xs text-neutral-500">{suggestion.category}</p>
                  </div>
                  {suggestion.price && (
                    <p className="font-semibold text-orange-600 text-sm">SAR {suggestion.price}</p>
                  )}
                </LocalizedClientLink>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!isLoading && suggestions.length === 0 && recentSearches.length > 0 && (
            <div className="max-h-64 overflow-y-auto">
              <div className="p-2 border-b border-neutral-100 flex items-center justify-between">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Recent</p>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-orange-600 hover:text-orange-700 transition-colors duration-200"
                >
                  Clear all
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search)
                    handleSearch(search)
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-neutral-50 transition-colors duration-200 text-left"
                >
                  <Search size={16} className="text-neutral-400" />
                  <span className="text-sm text-neutral-700">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && suggestions.length === 0 && recentSearches.length === 0 && query.length >= 2 && (
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-neutral-600 font-medium">No products found</p>
              <p className="text-sm text-neutral-500 mt-1">Try different keywords or browse categories</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
