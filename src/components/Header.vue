<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const menuOpen = ref(false);
const menuRef = ref(null);

const closeMenu = (event) => {
	if (menuRef.value && !menuRef.value.contains(event.target)) {
		menuOpen.value = false;
	}
};

onMounted(() => {
	document.addEventListener("click", closeMenu);
});

onUnmounted(() => {
	document.removeEventListener("click", closeMenu);
});
</script>

<template>
	<header class="border-b border-red-900 w-full relative">
		<div ref="menuRef">
			<button
				@click="menuOpen = !menuOpen"
				class="p-2 text-3xl text-white burger-menu transition-transform duration-300 active:scale-90"
			>
				<span
					:class="menuOpen ? 'rotate-90 scale-125' : ''"
					class="transition-transform duration-300"
				>
					☰
				</span>
			</button>

			<transition
				enter-active-class="transform transition duration-300 ease-out"
				enter-from-class="-translate-y-full opacity-0"
				enter-to-class="translate-y-0 opacity-100"
				leave-active-class="transform transition duration-300 ease-in"
				leave-from-class="translate-y-0 opacity-100"
				leave-to-class="-translate-y-full opacity-0"
			>
				<nav
					v-if="menuOpen"
					class="absolute top-10 left-0 w-full bg-black text-white flex flex-col p-4 shadow-lg"
				>
					<RouterLink to="/" class="p-2 hover:bg-gray-700 transition">
						WWZ Build Planner
					</RouterLink>
					<RouterLink
						to="/source-code"
						class="p-2 hover:bg-gray-700 transition"
					>
						Source Code
					</RouterLink>
				</nav>
			</transition>
		</div>
		<div class="max-w-[1500px] w-full mx-auto main-container">
			<nav class="flex justify-between p-6 nav-bar">
				<div class="flex items-center justify-center">
					<RouterLink
						to="/"
						class="text-lg font-bold text-white font-xs w-48"
						>WWZ Build Planner</RouterLink
					>
				</div>
				<div class="flex items-center justify-center">
					<RouterLink to="/"
						><img
							src="../assets/wwz-logo.png"
							class="w-[140px] h-[60px] logo"
					/></RouterLink>
				</div>
				<div class="flex items-center">
					<RouterLink
						to="/source-code"
						class="text-sm font-medium text-gray-400 hover:text-white transition-colors w-48 text-end"
					>
						Source Code</RouterLink
					>
				</div>
			</nav>
		</div>
	</header>
</template>

<style scoped>
@media (max-width: 768px) {
	.logo {
		display: none;
	}
}

@media (max-width: 412px) {
	.logo {
		display: none;
	}
	.nav-bar {
		display: none;
	}
}

@media (min-width: 413px) {
	.burger-menu {
		display: none !important;
	}
}
</style>
