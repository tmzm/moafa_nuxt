export const navigationItems = [
  {
    text: 'Home',
    icon: 'mdi-view-dashboard',
    link: '/admin'
  },
  {
    text: 'Products',
    icon: 'mdi-cart',
    link: '/admin/products',
    children: [
      {
        text: 'Products list',
        link: '/admin/products'
      },
      {
        text: 'Rates',
        link: '/admin/rates'
      },
      {
        text: 'Add product',
        link: '/admin/products/create'
      }
    ]
  },
  {
    text: 'Categories',
    icon: 'mdi-file-tree',
    link: '/admin/categories'
  },
  {
    text: 'Brands',
    icon: 'mdi-check-decagram',
    link: '/admin/brands'
  },
  {
    text: 'Coupons',
    icon: 'mdi-tag-off',
    link: '/admin/coupons'
  },
  {
    text: 'Orders',
    icon: 'mdi-shopping',
    link: '/admin/orders'
  },
  {
    text: 'Prescriptions',
    icon: 'mdi-prescription',
    link: '/admin/prescriptions'
  },
  {
    text: 'User Management',
    icon: 'mdi-account-cog',
    children: [
      {
        text: 'Users',
        link: '/admin/users'
      },
      {
        text: 'Add Admin',
        link: '/admin/users/create'
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
    title: '',
    key: 'image'
  },
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Rate',
    key: 'rate'
  },
  {
    title: 'Price',
    key: 'price'
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
