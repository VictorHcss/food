"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

interface SearchFiltersProps {
  onFiltersChange: (filters: {
    search: string
    cuisine: string
    neighborhood: string
    minRating: number
    maxPrice: number
  }) => void
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [search, setSearch] = useState("")
  const [cuisine, setCuisine] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100)

  const cuisines = ["Italiana", "Hambúrgueres", "Japonesa", "Mexicana", "Brasileira", "Pizza"]
  const neighborhoods = ["Centro", "Jardins", "Vila Madalena", "Pinheiros", "Moema", "Itaim"]

  const handleFiltersChange = () => {
    onFiltersChange({
      search,
      cuisine,
      neighborhood,
      minRating,
      maxPrice,
    })
  }

  const clearFilters = () => {
    setSearch("")
    setCuisine("")
    setNeighborhood("")
    setMinRating(0)
    setMaxPrice(100)
    onFiltersChange({
      search: "",
      cuisine: "",
      neighborhood: "",
      minRating: 0,
      maxPrice: 100,
    })
  }

  const activeFiltersCount = [cuisine, neighborhood, minRating > 0, maxPrice < 100].filter(Boolean).length

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Busque por restaurantes, pratos ou bairros..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setTimeout(handleFiltersChange, 300)
          }}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={cuisine}
          onValueChange={(value) => {
            setCuisine(value)
            setTimeout(handleFiltersChange, 100)
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Cozinha" />
          </SelectTrigger>
          <SelectContent>
            {cuisines.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={neighborhood}
          onValueChange={(value) => {
            setNeighborhood(value)
            setTimeout(handleFiltersChange, 100)
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Bairro" />
          </SelectTrigger>
          <SelectContent>
            {neighborhoods.map((n) => (
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Avaliação mínima</label>
                <div className="mt-2">
                  <Slider
                    value={[minRating]}
                    onValueChange={(value) => {
                      setMinRating(value[0])
                      setTimeout(handleFiltersChange, 100)
                    }}
                    max={5}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span className="font-medium">{minRating} estrelas</span>
                    <span>5</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Preço máximo</label>
                <div className="mt-2">
                  <Slider
                    value={[maxPrice]}
                    onValueChange={(value) => {
                      setMaxPrice(value[0])
                      setTimeout(handleFiltersChange, 100)
                    }}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>R$ 10</span>
                    <span className="font-medium">R$ {maxPrice}</span>
                    <span>R$ 100</span>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Limpar filtros
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {(cuisine || neighborhood || minRating > 0 || maxPrice < 100) && (
        <div className="flex flex-wrap gap-2">
          {cuisine && (
            <Badge variant="secondary" className="gap-1">
              {cuisine}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setCuisine("")
                  setTimeout(handleFiltersChange, 100)
                }}
              />
            </Badge>
          )}
          {neighborhood && (
            <Badge variant="secondary" className="gap-1">
              {neighborhood}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setNeighborhood("")
                  setTimeout(handleFiltersChange, 100)
                }}
              />
            </Badge>
          )}
          {minRating > 0 && (
            <Badge variant="secondary" className="gap-1">
              {minRating}+ estrelas
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setMinRating(0)
                  setTimeout(handleFiltersChange, 100)
                }}
              />
            </Badge>
          )}
          {maxPrice < 100 && (
            <Badge variant="secondary" className="gap-1">
              Até R$ {maxPrice}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setMaxPrice(100)
                  setTimeout(handleFiltersChange, 100)
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
