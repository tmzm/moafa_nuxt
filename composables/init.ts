export const initProduct = (): Product =>
  ({
    name: '',
    brand_id: 0,
    description: '',
    expiration: new Date(),
    id: 0,
    is_offer: false,
    is_quantity: false,
    meta_description: '',
    meta_subtitle: '',
    meta_title: '',
    offer: 0,
    price: 0,
    quantity: 0,
    rate: 0,
    status: true
  } as Product)

export const initBrand = (): Brand =>
  ({
    id: 0,
    name: '',
    status: true
  } as Brand)

export const initCategory = (): Category =>
  ({
    id: 0,
    name: '',
    status: true
  } as Category)

export const initOrder = (): Order => ({
  id: 0,
  accepted_by_user: true,
  coupon: {} as Coupon,
  coupon_id: 0,
  is_prescription: false,
  is_time: false,
  location: {} as Location,
  location_id: 0,
  name: '',
  order_items: [],
  payment_status: false,
  status: 'PREPARING',
  time: '',
  user: {} as User,
  user_id: 0,
  prescription: {} as Prescription,
  created_at: new Date(),
  updated_at: new Date(),
  total_price: 0
})

export const initCoupon = (): Coupon =>
  ({
    id: 0,
    code: '',
    discount: 0,
    discount_type: 'PERCENTAGE',
    user_id: 0,
    status: true
  } as Coupon)
