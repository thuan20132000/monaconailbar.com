/**
 * Wire types for GET /api/gift-card-catalog/?business_id=:uuid
 * The endpoint wraps the catalog as { results, success, status_code }.
 */

export interface GiftCardCatalogDesign {
  id: number
  name: string
  image: string
  sort_order: number
}

export interface GiftCardCatalogTheme {
  id: number
  name: string
  description?: string | null
  image: string
  sort_order: number
  designs: GiftCardCatalogDesign[]
}

export interface GiftCardCatalog {
  themes: GiftCardCatalogTheme[]
}

export interface GiftCardCatalogResponse {
  results?: GiftCardCatalog
  success?: boolean
  status_code?: number
}
