import { NextResponse } from "next/server"
import reviewsData from "@/data/reviews.json"
import type { Review } from "@/lib/types"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const reviews: Review[] = reviewsData as Review[]
  const restaurantReviews = reviews.filter((r) => r.restaurantId === params.id)

  return NextResponse.json(restaurantReviews)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { userName, rating, comment } = body

    // Validate input
    if (!userName || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid review data" }, { status: 400 })
    }

    // Create new review
    const newReview: Review = {
      id: Date.now().toString(),
      restaurantId: params.id,
      userName,
      rating,
      comment: comment || "",
      date: new Date().toISOString().split("T")[0],
    }

    // In a real app, this would save to a database
    // For now, we'll just return the new review
    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
