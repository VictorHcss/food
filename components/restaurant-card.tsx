"use client"

import Image from "next/image"
import { Star, Clock, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Restaurant } from "@/lib/types"

interface RestaurantCardProps {
  restaurant: Restaurant
  onClick: () => void
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {restaurant.cuisine}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-card-foreground line-clamp-1">{restaurant.name}</h3>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{restaurant.rating}</span>
              <span>({restaurant.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>R$ {restaurant.averagePrice}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>

            <span className="text-muted-foreground">Entrega: R$ {restaurant.deliveryFee.toFixed(2)}</span>
          </div>

          <div className="pt-2">
            <Badge variant="outline" className="text-xs">
              {restaurant.neighborhood}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
