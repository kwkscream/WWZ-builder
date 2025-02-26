<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
	<header class="border-b border-red-900">
		<div class="w-[1500px] my-0 mx-auto">
			<nav class="flex justify-between p-6">
				<div class="flex items-center justify-center">
					<RouterLink
						to="/"
						class="text-lg font-bold text-white font-xs w-48"
						>WWZ Build Planner</RouterLink
					>
				</div>
				<div class="flex items-center justify-center">
					<RouterLink to="/"
						><img src="../assets/wwz-logo.png" class="w-35 h-15"
					/></RouterLink>
				</div>
				<div class="flex items-center">
					<RouterLink
						to="/source-code"
						class="text-sm font-medium text-gray-400 hover:text-white transition-colors w-48 text-end"
					>
						Open Source</RouterLink
					>
				</div>
			</nav>
		</div>
	</header>
</template>
