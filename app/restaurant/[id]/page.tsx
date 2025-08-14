"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RestaurantHeader } from "@/components/restaurant-header"
import { MenuSection } from "@/components/menu-section"
import { ReviewsSection } from "@/components/reviews-section"
import { AppHeader } from "@/components/app-header"
import { useCart } from "@/contexts/cart-context"
import { getRestaurant } from "@/lib/api"
import type { Restaurant, MenuItem } from "@/lib/types"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { addItem, openCart } = useCart()

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getRestaurant(params.id)
        setRestaurant(data)
      } catch (err) {
        setError("Restaurante não encontrado")
        console.error("Error loading restaurant:", err)
      } finally {
        setLoading(false)
      }
    }

    loadRestaurant()
  }, [params.id])

  const handleAddToCart = (item: MenuItem) => {
    if (!restaurant) return

    addItem(item, restaurant.id)
    toast({
      title: "Item adicionado!",
      description: `${item.name} foi adicionado ao seu carrinho.`,
      action: {
        altText: "Ver carrinho",
        onClick: openCart,
      },
    })
  }

  const handleBack = () => {
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-muted-foreground">Carregando restaurante...</span>
        </div>
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive text-lg">{error}</p>
          <button onClick={handleBack} className="text-primary hover:underline">
            Voltar para a página inicial
          </button>
        </div>
      </div>
    )
  }

  const menuByCategory = restaurant.menu.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, MenuItem[]>,
  )

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <RestaurantHeader restaurant={restaurant} onBack={handleBack} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="font-serif font-bold text-3xl text-foreground mb-2">Menu</h1>
              <p className="text-muted-foreground">Escolha seus pratos favoritos e adicione ao carrinho</p>
            </div>

            {Object.entries(menuByCategory).map(([category, items]) => (
              <MenuSection key={category} title={category} items={items} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Restaurant Info Card */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h3 className="font-serif font-semibold text-xl text-card-foreground">Informações do Restaurante</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tempo de entrega:</span>
                  <span className="font-medium">{restaurant.deliveryTime}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa de entrega:</span>
                  <span className="font-medium">R$ {restaurant.deliveryFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preço médio:</span>
                  <span className="font-medium">R$ {restaurant.averagePrice}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bairro:</span>
                  <span className="font-medium">{restaurant.neighborhood}</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <ReviewsSection restaurantId={restaurant.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
