<script setup>
import { ref } from "vue";
import { defineProps } from "vue";


const {skillCols, passiveSkill} = defineProps({
	skillCols: Array,
});


const hoveredSkill = ref(null);
const selectedSkills = ref(Array(skillCols.length).fill(null));

const toggleSelection = (colIndex, skillIndex) => {
	selectedSkills.value[colIndex] =
		selectedSkills.value[colIndex] === skillIndex ? null : skillIndex;
};


</script>

<template>

	<!-- ЬЕЬЕЬЕЬ -->

	<div class="flex flex-col items-center p-4">
		<!-- контейнер додатковий -->
		<div class="flex flex-row items-start gap-3">
			<!-- Пасивка -->

			<PassiveNode :passiveSkill="passiveSkill" />
			<!-- Основне дерево -->
			<div
				class="relative w-64 flex flex-row items-center justify-center gap-3"
			>
				<div
					v-for="(col, colIndex) in skillCols"
					:key="colIndex"
					class="relative flex flex-col items-center space-y-4"
				>
					<label
						v-for="(skill, skillIndex) in col"
						:key="skillIndex"
						class="relative cursor-pointer"
					>
						<input
							type="radio"
							:name="`skill-col-${colIndex}`"
							:value="skillIndex"
							class="hidden"
							@click="toggleSelection(colIndex, skillIndex)"
						/>
						<div
							:class="[
								'w-19 h-19 rounded-full border-3 transition flex items-center justify-center',
								selectedSkills[colIndex] === skillIndex
									? 'border-green-500'
									: 'border-gray-500',
								'hover:border-white',
								'bg-gray-800',
							]"
							@mouseenter="hoveredSkill = skill"
							@mouseleave="hoveredSkill = null"
						></div>
					</label>
				</div>
			</div>
		</div>

		<div
			v-if="hoveredSkill"
			class="mt-4 p-2 border border-white bg-gray-800 text-white rounded"
		>
			<h3 class="font-bold">{{ hoveredSkill.name }}</h3>
			<p>{{ hoveredSkill.description }}</p>
		</div>
	</div>
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
