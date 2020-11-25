export default {
    path : '/mime',
    component : ()=> import('@/views/Mime'),
    children: [
        {
            path:'center', // 二级路由不需要加/
            component: ()=>import('@/views/Mime/center')
        },
        {
            path:'login', // 二级路由不需要加/
            component: ()=>import('@/components/Login')
        },
        {
            path:'register', // 二级路由不需要加/
            component: ()=>import('@/components/Register')
        },
        {
            path:'findPassword', // 二级路由不需要加/
            component: ()=>import('@/components/FindPassword')
        },
        {
            path:'/mime', // 重定向/
            redirect: 'center'
        }
    ]
}