import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Principal",

        component: () =>
            import ("../views/Principal.vue"),
    },
    
    {
        path: "/Login",
        name: "Login",

        component: () =>
            import ("../views/Login.vue"),
    },
    {
        path: "/Registro",
        name: "Registro",

        component: () =>
            import ("../views/Registro.vue"),
    },
    {
        path: "/Anuncio",
        name: "Anuncio",

        component: () =>
            import ("../views/Anuncio.vue"),
    },
    {
        path: "/Todos",
        name: "Todos",

        component: () =>
            import ("../views/Todos.vue"),
    },
    {
        path: "/VehPopu",
        name: "VehPopu",

        component: () =>
            import ("../views/VehPopu.vue"),
    },
    {
        path: "/VehUrb",
        name: "VehUrb",

        component: () =>
            import ("../views/VehUrb.vue"),
    },
    {
        path: "/VehViajar",
        name: "VehViajar",

        component: () =>
            import ("../views/VehViajar.vue"),
    },
    {
        path: "/MiPerfil",
        name: "MiPerfil",

        component: () =>
            import ("../views/MiPerfil.vue"),
    },
    {
        path: "/FColab",
        name: "FColab",

        component: () =>
            import ("../views/FColab.vue"),
    }



    
];

const router = new VueRouter({
    routes,
});

export default router;