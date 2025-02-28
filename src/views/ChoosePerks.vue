<script setup>
import DragDrop from "../components/DragDrop.vue";

import { store } from "../store";
import { ref, onMounted } from "vue";
import { dronemaster } from "@/data/skills/Dronemaster.js";
import { gunslinger } from "@/data/skills/Gunslinger.js";
import { exterminator } from "@/data/skills/Exterminator.js";
import { fixer } from "@/data/skills/Fixer.js";
import { medic } from "@/data/skills/Medic.js";
import { slasher } from "@/data/skills/Slasher.js";
import { hellraiser } from "@/data/skills/Hellraiser.js";
import { vanguard } from "@/data/skills/Vanguard.js";



const Classes = {	
	"Dronemaster": dronemaster,
	"Gunslinger" : gunslinger,
	"Exterminator": exterminator,
	"Fixer": fixer,
	"Medic": medic,
	"Slasher": slasher,
	"Hellraiser": hellraiser,
	"Vanguard" : vanguard,
}

const isPrestige = ref(false);
const hoveredSkill = ref(null);

const selectedSkills = ref({
	passive: [],
	active: {},
});

const doubleSelect = (skill, i) => {
	if (skill.isPassive) {

		const exists = selectedSkills.value.passive.some(
			(f) => f.name === skill.name,
		);

		if (exists) {
			selectedSkills.value.passive = selectedSkills.value.passive.filter(
				(f) => f.name !== skill.name,
			);
		} else {
			selectedSkills.value.passive = [...selectedSkills.value.passive, skill];
		}
	} else {

		const updatedActive = { ...selectedSkills.value.active };

		if (updatedActive[i]?.name === skill.name) {
			updatedActive[i] = null;
		} else {
			updatedActive[i] = skill;
		}

		selectedSkills.value.active = updatedActive;
	}

	console.log(selectedSkills.value);
};

const exportToJson = () => {
	const dataToExport = { 
		...selectedSkills.value, 
		className: store.selectedClass.name 
	};

	const dataStr = JSON.stringify(dataToExport, null, 2); 
	const blob = new Blob([dataStr], { type: "application/json" });
	const url = URL.createObjectURL(blob); 

	const a = document.createElement("a");
	a.href = url;
	a.download = "my_build.json";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};


const importFromJson = (event) => {
	isPrestige.value = event.passive.some((skill) => skill.isPrestige);
	store.selectedClass.name = event.className;

	console.log("Отримані дані з JSON:", event);
	selectedSkills.value = event;
};

const renderKey = ref(0);

const forceRerender = () => {
	renderKey.value += 1;
};

onMounted(() => {
	window.addEventListener("json-loaded", (event) => {
		const jsonData = event.detail?.data;
		if (jsonData) {
			importFromJson(jsonData);
		}
	});
});
</script>

<template>
	<DragDrop />
	<!-- інфа шо за клас пікнули -->

	<div class="flex justify-center items-center gap-2">
		<h2 class="text-4xl font-bold mb-4 text-white text-center">
			Обраний клас -
			<span class="text-red-600">{{ store.selectedClass.name }}</span>
		</h2>
		<img width="63" height="57" :src="store.selectedClass.image" />
	</div>
	<div class="flex items-center justify-center mt-2 mb-5 flex-col">
		<button
			@click="exportToJson"
			class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
		>
			Зберегти білд
		</button>
		<div class="flex items-center justify-center">
			<input
				v-model="isPrestige"
				id="default-checkbox"
				type="checkbox"
				value=""
				class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			/>
			<label
				for="default-checkbox"
				class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>Престиж</label
			>
		</div>
	</div>
	<div class="flex justify-center">
		<div class="flex gap-2">
			<div v-for="(col, i) in Classes[store.selectedClass.name]" class="flex gap-2 flex-col">
				<label
					v-for="(skill, skillIndex) in col"
					:key="skill.name + renderKey"
					:class="[
						'w-22 h-22 rounded-full border-3 transition flex items-center justify-center',
						'hover:border-white',
						'bg-gray-500',
						'border-gray-500',
						'has-checked:border-green-500',
						'relative cursor-pointer',
						skill.isPrestige && !isPrestige ? '!border-gray-600 brightness-30' : '',
						skill.isPassive ? 'border-red-600' : '',
					]"
					@mouseenter="hoveredSkill = skill"
					@mouseleave="hoveredSkill = null"
				>
				<img :src="'/nodes-icons/' + store.selectedClass.name + '/' + skill.image + '.webp'" alt="Skill Image" class="rounded-[1000px]">
					<input
						type="radio"
						:name="skill.isPassive ? skill.name : i"
						:disabled="skill.isPrestige && !isPrestige"
						@click="doubleSelect(skill, i)"
						:checked="
							skill.isPassive
								? selectedSkills.passive.some((s) => s.name === skill.name)
								: selectedSkills.active[i]?.name === skill.name
						"
						class="sr-only"
					/>
				</label>
			</div>
		</div>
	</div>
	<div
		v-if="hoveredSkill"
		class="text-center mx-auto w-[600px] mt-[20px] p-2 border border-gray-200 bg-gray-800 text-white rounded"
	>
		<h3 class="font-bold">{{ hoveredSkill.name }}</h3>
		<p>{{ hoveredSkill.description }}</p>
	</div>
</template>

<style scoped></style>
