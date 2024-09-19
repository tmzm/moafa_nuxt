export const navigationItems = [
  {
    text: 'Home',
    icon: 'mdi-view-dashboard-outline',
    link: '/admin'
  },
  {
    text: 'Catalog'
  },
  {
    text: 'Products',
    icon: 'mdi-cart-outline',
    link: '/admin/products',
    children: [
      {
        text: 'Products list',
        link: '/admin/products'
      },
      {
        text: 'Rates',
        link: '/admin/rates'
      }
    ]
  },
  {
    text: 'Categories',
    icon: 'mdi-file-tree-outline',
    link: '/admin/categories'
  },
  {
    text: 'Brands',
    icon: 'mdi-check-decagram-outline',
    link: '/admin/brands'
  },
  {
    text: 'Coupons',
    icon: 'mdi-tag-off-outline',
    children: [
      {
        text: 'Coupons List',
        link: '/admin/coupons'
      },
      {
        text: 'Coupons Purchases',
        link: '/admin/coupon-purchases'
      }
    ]
  },
  {
    text: 'Sales'
  },
  {
    text: 'Orders',
    icon: 'mdi-shopping-outline',
    link: '/admin/orders'
  },
  {
    text: 'Prescriptions',
    icon: 'mdi-prescription',
    link: '/admin/prescriptions'
  },
  {
    text: 'Customers'
  },
  {
    text: 'Customer Support',
    icon: 'mdi-account-tie',
    link: '/admin/customer-support'
  },
  {
    text: 'Points Transfers',
    icon: 'mdi-bank-transfer',
    link: '/admin/points'
  },
  {
    text: 'Management'
  },
  {
    text: 'User Management',
    icon: 'mdi-account-cog-outline',
    children: [
      {
        text: 'Users',
        link: '/admin/users'
      },
      {
        text: 'Account Sittings',
        link: '/admin/my-account'
      },
      {
        text: 'Website Sittings'
      }
    ]
  }
]

export const productHeaders = [
  {
    title: 'Product',
    key: 'image'
  },
  {
    title: 'Rate',
    key: 'rate'
  },
  {
    title: 'Brand',
    key: 'brand'
  },
  {
    title: 'Quantity',
    key: 'is_quantity'
  },
  {
    title: 'offer',
    key: 'is_offer'
  },
  {
    title: 'Expiration',
    key: 'expiration'
  },
  {
    title: 'Categories',
    key: 'category_products'
  },
  {
    title: 'Actions',
    key: 'actions'
  }
]

export const orderHeaders = [
  {
    title: 'Customer',
    key: 'user'
  },
  {
    title: 'Coupon',
    key: 'coupon'
  },
  {
    title: 'Type',
    key: 'is_prescription'
  },
  {
    title: 'Status',
    key: 'status'
  },
  {
    title: 'Payment Status',
    key: 'payment_status'
  },
  {
    title: 'Time',
    key: 'is_time'
  },
  {
    title: 'Total Price',
    key: 'total_price'
  },
  {
    title: 'Ordered At',
    key: 'created_at'
  },
  {
    title: 'Products count',
    key: 'order_items_count'
  },
  {
    title: 'Actions',
    key: 'actions'
  }
]

export const rateHeaders = [
  {
    title: 'Customer',
    key: 'user'
  },
  {
    title: 'Product',
    key: 'product'
  },
  {
    title: 'Rate',
    key: 'number'
  },
  {
    title: 'Comment',
    key: 'comment'
  },
  {
    title: 'Rated At',
    key: 'created_at'
  }
]

export const couponHeaders = [
  {
    title: 'Code',
    key: 'code'
  },
  {
    title: 'Discount type',
    key: 'discount_type'
  },
  {
    title: 'Discount',
    key: 'discount'
  },
  {
    title: 'Price',
    key: 'price'
  },
  {
    title: 'User',
    key: 'user'
  },
  {
    title: 'Created At',
    key: 'created_at'
  },
  {
    title: 'Actions',
    key: 'actions'
  }
]

export const couponPurchasesHeaders = [
  {
    title: 'User',
    key: 'user_id'
  },
  {
    title: 'Coupon',
    key: 'coupon_id'
  },
  {
    title: 'Purchased At',
    key: 'created_at'
  },
  {
    title: 'Actions',
    key: 'actions'
  }
]

export const prescriptionHeaders = [
  {
    title: 'Customer',
    key: 'user'
  },
  {
    title: 'Image',
    key: 'image'
  },
  {
    title: 'Description',
    key: 'description'
  },
  {
    title: 'Order status',
    key: 'order'
  },
  {
    title: 'Added At',
    key: 'created_at'
  },
  {
    title: 'Actions',
    key: 'actions'
  }
]

export const userHeaders = [
  {
    title: 'User',
    key: 'name'
  },
  {
    title: 'Role',
    key: 'role'
  },
  {
    title: 'Status',
    key: 'verified'
  },
  {
    title: 'Joined At',
    key: 'created_at'
  },
  {
    title: 'Actions',
    key: 'actions'
  }
]

export const pointsTransfersHeaders = [
  {
    title: 'User',
    key: 'user_id'
  },
  {
    title: 'Amount',
    key: 'amount'
  },
  {
    title: 'Type',
    key: 'type'
  },
  {
    title: 'Reason',
    key: 'reason'
  },
  {
    title: 'Transferred At',
    key: 'created_at'
  }
]
