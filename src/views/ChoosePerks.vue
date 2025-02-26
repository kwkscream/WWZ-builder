<script setup>
import { store } from "../store";
import { ref } from "vue";
import { gunslinger } from "../data/skills/gunslinger";

const isPrestige = ref(false);
const hoveredSkill = ref(null);

const toggleSelection = (colIndex, skillIndex) => {
	selectedSkills.value[colIndex] =
		selectedSkills.value[colIndex] === skillIndex ? null : skillIndex;
};

// СВЯТА ЗМІННА
const blabla = ref([]);

const selectedSkills = ref({
	passive: [],
	active: {},
});

const doubleSelect = (skill, i) => {
	if (skill.isPassive) {
		if(selectedSkills.value.passive.indexOf(skill) != -1){
			selectedSkills.value.passive = selectedSkills.value.passive.filter(f => f.name !== skill.name);
		}
		else{
			selectedSkills.value.passive = [...selectedSkills.value.passive, skill]
		}
		
	}
	else{
		if(selectedSkills.value.active[i]?.name === skill.name){
			selectedSkills.value.active[i] = null;
		}
		else{
			selectedSkills.value.active[i] = skill;
		}
	}

	console.log(selectedSkills.value);


	// if (blabla.value.indexOf(skill) != -1) {
	// 	blabla.value = blabla.value.filter((a) => a != skill);
	// } else {
	// 	blabla.value = [...blabla.value, skill];
	// }
};
</script>

<template>
	<!-- інфа шо за клас пікнули -->

	<div class="flex justify-center items-center gap-2 pt-5 pb-5">
		<h2 class="text-4xl font-bold mb-4 text-white text-center">
			Обраний клас -
			<span class="text-red-600">{{ store.selectedClass.name }}</span>
		</h2>
		<img width="63" height="57" :src="store.selectedClass.image" />
	</div>
	<div class="flex justify-center">
		<input type="checkbox" name="" id="" v-model="isPrestige" />
		<div class="flex gap-2">
			<div v-for="(col, i) in gunslinger" class="flex gap-2 flex-col">
				<label
					v-for="(skill, skillIndex) in col"
					:class="[
						'w-19 h-19 rounded-full border-3 transition flex items-center justify-center',
						'hover:border-white',
						'bg-gray-800',
						skill.isPrestige && !isPrestige ? '!bg-gray-400' : '',
						skill.isPassive ? 'bg-red-600' : '',
					]"
					class="border-gray-500 has-checked:border-green-500 relative cursor-pointer"
					@mouseenter="hoveredSkill = skill"
					@mouseleave="hoveredSkill = null"
				>
					<input
						type="radio"
						:name="skill.isPassive ? skill.name : i"
						:disabled="
							skill.isPrestige && !isPrestige ? true : false
						"
						@click="doubleSelect(skill, i)"
						:checked="skill.isPassive ? selectedSkills.passive.indexOf(skill) != 1 ?
						false : true : selectedSkills.active[i]?.name === skill.name ? true : false"
						class="sr-only"
					/>
				</label>
			</div>
		</div>
	</div>
	<div
		v-if="hoveredSkill"
		class="text-center mx-auto w-[250px] mt-[30px] p-2 border border-gray-200 bg-gray-800 text-white rounded"
	>
		<h3 class="font-bold">{{ hoveredSkill.name }}</h3>
		<p>{{ hoveredSkill.description }}</p>
	</div>
</template>

<style scoped>
/*label div {
	background: radial-gradient(
		circle,
		rgba(255, 255, 255, 0.2) 0%,
		rgba(0, 0, 0, 0.7) 100%
	);
}*/
</style>
