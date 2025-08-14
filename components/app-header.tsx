"use client"

import Link from "next/link"
import { CartButton } from "./cart-button"
import { CartDrawer } from "./cart-drawer"

export function AppHeader() {
  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-2xl text-primary">FoodieGV</h1>
            </Link>

            <CartButton />
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  )
}
