"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RestaurantCard } from "@/components/restaurant-card"
import { SearchFilters } from "@/components/search-filters"
import { AppHeader } from "@/components/app-header"
import { getRestaurants } from "@/lib/api"
import type { Restaurant } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const loadRestaurants = async (filters?: {
    search?: string
    cuisine?: string
    neighborhood?: string
    minRating?: number
    maxPrice?: number
  }) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getRestaurants(filters)
      setRestaurants(data)
    } catch (err) {
      setError("Erro ao carregar restaurantes. Tente novamente.")
      console.error("Error loading restaurants:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRestaurants()
  }, [])

  const handleFiltersChange = (filters: {
    search: string
    cuisine: string
    neighborhood: string
    minRating: number
    maxPrice: number
  }) => {
    const cleanFilters = {
      ...(filters.search && { search: filters.search }),
      ...(filters.cuisine && { cuisine: filters.cuisine }),
      ...(filters.neighborhood && { neighborhood: filters.neighborhood }),
      ...(filters.minRating > 0 && { minRating: filters.minRating }),
      ...(filters.maxPrice < 100 && { maxPrice: filters.maxPrice }),
    }

    loadRestaurants(cleanFilters)
  }

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* App Header */}
      <AppHeader />

      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className="font-serif font-bold text-4xl text-primary mb-2">FoodieGV</h1>
            <p className="text-muted-foreground text-lg">Descubra os melhores sabores da sua região</p>
          </div>

          <SearchFilters onFiltersChange={handleFiltersChange} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Carregando restaurantes...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive text-lg mb-4">{error}</p>
            <button onClick={() => loadRestaurants()} className="text-primary hover:underline">
              Tentar novamente
            </button>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhum restaurante encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif font-semibold text-2xl text-foreground">Restaurantes Disponíveis</h2>
              <span className="text-muted-foreground">
                {restaurants.length} {restaurants.length === 1 ? "restaurante encontrado" : "restaurantes encontrados"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => handleRestaurantClick(restaurant.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
