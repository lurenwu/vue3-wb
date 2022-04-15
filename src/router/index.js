import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/echart',
      name: 'echart',
      component: () => import(/* webpackChunkName: "echart" */ '@/views/echart.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/info',
      name: 'info',
      component: () => import(/* webpackChunkName: "info" */ '@/views/info.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "info" */ '@/views/search.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import(/* webpackChunkName: "publish" */ '@/views/publish.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/infoList',
      name: 'infoList',
      component: () => import(/* webpackChunkName: "infoList" */ '@/views/infoList.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/brand',
      name: 'brand',
      component: () => import(/* webpackChunkName: "brand" */ '@/views/brand.vue'),
      meta: {
        index: 1
      }
    },
  
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/logList',
      name: 'logList',
      component: () => import(/* webpackChunkName: "logList" */ '@/views/logList.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/readList',
      name: 'readList',
      component: () => import(/* webpackChunkName: "readList" */ '@/views/readList.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      meta: {
        index: 1
      }
    },
   
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/category',
      name: 'category',
      component: () => import(/* webpackChunkName: "category" */ '@/views/Category.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/product-list',
      name: 'product-list',
      component: () => import(/* webpackChunkName: "product-list" */ '@/views/ProductList.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import(/* webpackChunkName: "product" */ '@/views/ProductDetail.vue'),
      meta: {
        index: 3
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "cart" */ '@/views/Cart.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/create-order',
      name: 'create-order',
      component: () => import(/* webpackChunkName: "create-order" */ '@/views/CreateOrder.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "order" */ '@/views/Order.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: () => import(/* webpackChunkName: "order-detail" */ '@/views/OrderDetail.vue'),
      meta: {
        index: 3
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ '@/views/User.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import(/* webpackChunkName: "setting" */ '@/views/Setting.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/address',
      name: 'address',
      component: () => import(/* webpackChunkName: "address" */ '@/views/Address.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/address-edit',
      name: 'address-edit',
      component: () => import(/* webpackChunkName: "address-edit" */ '@/views/AddressEdit.vue'),
      meta: {
        index: 3
      }
    },
  ]
})

export default router