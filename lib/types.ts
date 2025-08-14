export interface Restaurant {
  id: string
  name: string
  image: string
  cuisine: string
  neighborhood: string
  averagePrice: number
  rating: number
  reviewCount: number
  deliveryTime: string
  deliveryFee: number
  menu: MenuItem[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface Review {
  id: string
  restaurantId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  restaurantId: string
}
