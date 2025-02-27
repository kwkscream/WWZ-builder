<script setup>
 import DragDrop from "../components/DragDrop.vue";

import { store } from "../store";
import { ref, computed, onMounted } from "vue";
import { gunslinger } from "../data/skills/gunslinger";


const isPrestige = ref(false);
const hoveredSkill = ref(null);

const blabla = ref([]);

const selectedSkills = ref({
	passive: [],
	active: {},
});

const selectedNodes = computed(() => [
	...selectedSkills.value.passive,
	...Object.values(selectedSkills.value.active).filter(
		(skill) => skill !== null,
	),
]);

const doubleSelect = (skill, i) => {
	if (skill.isPassive) {
		// Перевіряємо, чи навичка вже є в списку
		const exists = selectedSkills.value.passive.some(
			(f) => f.name === skill.name,
		);

		if (exists) {
			selectedSkills.value.passive = selectedSkills.value.passive.filter(
				(f) => f.name !== skill.name,
			);
		} else {
			selectedSkills.value.passive = [
				...selectedSkills.value.passive,
				skill,
			];
		}
	} else {
		// Оновлюємо `active` правильно, щоб Vue реагував
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
	const dataStr = JSON.stringify(selectedSkills.value, null, 2); // Форматуємо JSON з відступами
	const blob = new Blob([dataStr], { type: "application/json" }); // Створюємо Blob-об'єкт
	const url = URL.createObjectURL(blob); // Створюємо посилання на файл

	const a = document.createElement("a");
	a.href = url;
	a.download = "my_build.json"; // Ім'я файлу
	document.body.appendChild(a);
	a.click(); // Автоматичний клік для завантаження
	document.body.removeChild(a);
};

const importFromJson = (event) => {
	isPrestige.value = event.passive.some(skill => skill.isPrestige);

	console.log("Отримані дані з JSON:", event);
	selectedSkills.value = event;
};

const renderKey = ref(0);

const forceRerender = () => {
  renderKey.value += 1; // Міняємо key, що змушує Vue оновити DOM
};


onMounted(() => {
  window.addEventListener("json-loaded", (event) => {
    const jsonData = event.detail?.data; // Безпечне отримання JSON
    if (jsonData) {
      importFromJson(jsonData); // Передаємо дані у функцію
    }
  });
});


</script>

<template>

	<DragDrop/>
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
					:key="skill.name + renderKey"
					:class="[
						'w-19 h-19 rounded-full border-3 transition flex items-center justify-center',
						'hover:border-white',
						'bg-gray-800',
						'border-gray-500',
						'has-checked:border-green-500',
						'relative cursor-pointer',
						skill.isPrestige && !isPrestige ? '!bg-gray-400' : '',
						skill.isPassive ? 'bg-red-600' : '',
					]"
					@mouseenter="hoveredSkill = skill"
					@mouseleave="hoveredSkill = null"
				>

					<input
						type="radio"
						:name="skill.isPassive ? skill.name : i"
						:disabled="skill.isPrestige && !isPrestige"
						@click="doubleSelect(skill, i)"
						:checked="
							skill.isPassive
								? selectedSkills.passive.some(
										(s) => s.name === skill.name,
									)
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
		class="text-center mx-auto w-[250px] mt-[30px] p-2 border border-gray-200 bg-gray-800 text-white rounded"
	>
		<h3 class="font-bold">{{ hoveredSkill.name }}</h3>
		<p>{{ hoveredSkill.description }}</p>
	</div>

	<h3 class="text-4xl font-bold mb-4 text-white text-center">
		Обрані навички - {{ selectedNodes }}
	</h3>
	<button
		@click="exportToJson"
		class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
	>
		Зберегти вибрані навички
	</button>

	<label
		class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		for="file_input"
		>Upload file</label
	>
	<input
		class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
		id="file_input"
		type="file"
		@change="importFromJson"
		accept="application/json">
	/>
</template>

<style scoped></style>
