import { createRouter, createWebHistory } from "vue-router";

import MainPage from "./views/MainPage.vue";
import ChoosePerks from "./views/ChoosePerks.vue";

const routes = [
	{ path: "/", component: MainPage },
	{
		path: "/build-planner",
		name: "choosePerks",
		component: ChoosePerks,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
