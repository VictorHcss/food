import { NextResponse } from "next/server"
import restaurantsData from "@/data/restaurants.json"
import type { Restaurant } from "@/lib/types"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const restaurants: Restaurant[] = restaurantsData as Restaurant[]
  const restaurant = restaurants.find((r) => r.id === params.id)

  if (!restaurant) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
  }

  return NextResponse.json(restaurant)
}
