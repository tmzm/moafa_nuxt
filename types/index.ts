export default {}

declare global {
  export interface User {
    created_at: Date
    updated_at: Date
    id: number
    phone_number: string
    name: string
    device_key?: string
    role: string
    password?: string
    verified: boolean
  }

  export interface Brand {
    created_at: Date
    updated_at: Date
    id: number
    name: string
    image: string
    products_count: number
  }

  export interface Product {
    created_at: Date
    updated_at: Date
    name: string
    id: number
    brand_id: number
    brand: Brand
    price: number
    expiration: Date
    offer: number
    is_offer: boolean
    quantity: number
    rate: number
    rates: Rate[]
    is_quantity: boolean
    category_products: CategoryProduct[]
    description: string
    image: string
    slug: string
    meta_description: string
    meta_title: string
    meta_subtitle: string
  }

  export interface CategoryProduct {
    created_at: Date
    updated_at: Date
    id: number
    category: Category
    product: Product
  }

  export interface Category {
    created_at: Date
    updated_at: Date
    id: number
    name: string
    image: string
    category_products_count: number
  }

  export interface Order {
    created_at: Date
    updated_at: Date
    id: number
    name: string
    status: string
    payment_status: boolean
    user_id: number
    location_id: number
    location: Location
    user: User
    total_price: number
    prescription?: Prescription
    time: any
    is_time: boolean
    coupon_id: number
    coupon: Coupon
    order_items: OrderItem[]
    is_prescription: boolean
    accepted_by_user: boolean
  }

  export interface OrderItem {
    created_at: Date
    updated_at: Date
    id: number
    product_id: number
    product: Product
    order_id: number
    quantity: number
  }

  export interface Prescription {
    created_at: Date
    updated_at: Date
    id: number
    order: Order
    order_id: number
    user_id: number
    user: User
    image: string
    description: string
  }

  export interface Location {
    created_at: Date
    updated_at: Date
    id: number
    user_id: number
    user: User
    name: string
    type: string
    address: string
  }

  export interface Favorite {
    created_at: Date
    updated_at: Date
    id: number
    user_id: number
    user: User
    product_id: number
    product: Product
  }

  export interface Notify {
    created_at: Date
    updated_at: Date
    id: number
    user_id: number
    title: string
    body: string
    is_read: boolean
  }

  export interface Rate {
    created_at: Date
    updated_at: Date
    id: number
    user_id: number
    product_id: number
    product?: Product
    user?: User
    comment: string
    number: number
  }

  export interface Coupon {
    created_at: Date
    updated_at: Date
    id: number
    user_id?: number
    price?: number
    user?: User
    code: string
    discount: number
    discount_type: 'percentage' | 'fixed'
  }

  export interface Message {
    created_at: Date
    updated_at: Date
    id: number
    sender: User
    receiver: User
    sender_id: number
    receiver_id: number
    content: string
  }

  export interface CouponPurchase {
    created_at: Date
    updated_at: Date
    id: number
    user_id: number
    user?: User
    coupon_id: number
    coupon?: Coupon
  }

  export interface PointsTransfer {
    created_at: Date
    updated_at: Date
    id: number
    user_id: number
    user?: User
    amount: number
    reason: string
    type: 'deposit' | 'withdrawal'
  }
}
