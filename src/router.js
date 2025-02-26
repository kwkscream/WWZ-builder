import { createRouter, createWebHistory } from "vue-router";

import MainPage from "./views/MainPage.vue";
import ChoosePerks from "./views/ChoosePerks.vue";
import PublicCode from "./views/PublicCode.vue"

const routes = [
	{ path: "/", component: MainPage },
	{
		path: "/build-planner",
		name: "choosePerks",
		component: ChoosePerks,
	},
	{ path: "/source-code", component: PublicCode},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
