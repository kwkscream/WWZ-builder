<script setup>
import {store} from "../store"

</script>

<template>
	<div class="flex justify-center items-center gap-2 pt-5 pb-5">
		<h2 class="text-4xl font-bold mb-4 text-white text-center">
			Обраний клас - <span class="text-red-600">{{store.selectedClass.name}}</span>
		</h2>
		<img :src="store.selectedClass.image">
	</div>
</template>
