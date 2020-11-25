export default {
    path: '/admin',
    component: () => import('@/views/Admin'),
    children: [
        { path: 'movie', component: () => import('@/views/Admin/movie.vue') },
        { path: 'users', component: () => import('@/views/Admin/users.vue') },
        { path: 'cinema', component: () => import('@/views/Admin/cinema.vue') },
        { path: '/admin', redirect: 'users' },

    ]
}