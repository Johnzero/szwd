import { BasicLayout,MapLayout } from '@/layouts'

export const asyncRouterMap = [
    {
        path: '/',
        name: 'home',
        component: BasicLayout,
        meta: { title: '数字文都' },
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/views/Home')
            }
        ]
    },
    {
        path: '/wdzb',
        name: 'wdzb',
        component: MapLayout,
        meta: { title: '文都坐标' },
        redirect: '/wdzb',
        children: [
            {
                path: '/wdzb',
                name: 'wdzb',
                component: () => import('@/views/Wdzb')
            }
        ]
    }
]

export const constantRouterMap = [
    {
        path: '/screen',
        // component: () => import('@/views/screen/Workplace')
    }
]
