<script setup>
import { defineProps } from "vue";
import {ref} from "vue"


const { passiveSkill } = defineProps({
	passiveSkill: Object,
});

const isPassiveSkillSelected = ref(false);

const togglePassiveSkill = () => {
	isPassiveSkillSelected.value = !isPassiveSkillSelected.value;
};
</script>

<template>
		<label class="relative cursor-pointer">
			<input type="checkbox" class="hidden" @click="togglePassiveSkill" />
			<div
				:class="[
					'w-19 h-19 rounded-full border-4 transition flex items-center justify-center',
					isPassiveSkillSelected
						? 'border-red-500 bg-red-700'
						: 'border-gray-500 bg-gray-800',
					'hover:border-white',
				]"
				@mouseenter="hoveredSkill = passiveSkill"
				@mouseleave="hoveredSkill = null"
			></div>
		</label>
</template>

<style scoped>
label div {
	background: radial-gradient(
		circle,
		rgba(255, 255, 255, 0.2) 0%,
		rgba(0, 0, 0, 0.7) 100%
	);
}
</style>
