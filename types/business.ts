import type { BusinessGalleryImage } from '@/types/gallery'
import type { CurrencyType } from '@/types/payment'

/**
 * Wire types for GET /api/business-booking/business-info/?business_slug=:slug
 * The endpoint wraps the record as { results, success, status_code }.
 */

export interface OperatingHour {
  id: number
  business: string
  day_of_week: number // 0 = Monday, 6 = Sunday
  day_name: string
  is_open: boolean
  open_time: string | null // "09:00:00", or null when closed
  close_time: string | null
  is_break_time: boolean
  break_start_time: string | null
  break_end_time: string | null
}

export interface BusinessSettings {
  id: number
  timezone: string
  advance_booking_days: number
  min_advance_booking_hours: number
  max_advance_booking_days: number
  time_slot_interval: number
  buffer_time_minutes: number
  send_reminder_emails: boolean
  send_reminder_sms: boolean
  reminder_hours_before: number
  send_confirmation_sms: boolean
  send_confirmation_email: boolean
  send_cancellation_sms: boolean
  send_cancellation_email: boolean
  preferred_language: string
  currency: CurrencyType
  tax_rate: string
  require_payment_advance: boolean
  allow_online_booking: boolean
  require_client_phone: boolean
  require_client_email: boolean
  auto_confirm_appointments: boolean
  allow_online_gift_cards: boolean
  gift_card_processing_fee_enabled?: boolean
  tax_with_cash_enabled?: boolean
  half_turn_threshold?: string
  allow_google_login?: boolean
  allow_facebook_login?: boolean
}

export interface BusinessOnlineBooking {
  id: number
  business: string
  name: string
  slug: string
  logo: string | null
  description: string
  policy: string
  interval_minutes: number
  buffer_time_minutes: number
  is_active: boolean
  shareable_link: string
}

export interface BusinessBanner {
  id: number
  type: 'promotion' | 'info' | 'alert'
  title: string
  message: string
  cta_text?: string | null
  cta_url?: string | null
  start_at?: string | null
  end_at?: string | null
  dismissible: boolean
  background_color?: string | null
  text_color?: string | null
  image?: string | null
  is_active: boolean
  is_visible: boolean
  created_at: string
  updated_at: string
}

export interface BusinessInfo {
  id: string
  name: string
  phone_number: string | null
  email: string | null
  website: string | null
  address: string | null
  city: string | null
  state_province: string | null
  postal_code: string | null
  country: string | null
  description: string | null
  logo: string | null
  google_review_url: string | null
  google_review_qr_code: string | null
  currency: CurrencyType
  cost_per_minute: string
  status: string
  operating_hours: OperatingHour[]
  settings: BusinessSettings
  online_booking: BusinessOnlineBooking | null
  active_banner?: BusinessBanner | null
  gallery_images: BusinessGalleryImage[]
}

export interface BusinessInfoResponse {
  results?: BusinessInfo
  success?: boolean
  status_code?: number
}
