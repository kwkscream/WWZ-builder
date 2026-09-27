<script setup>
import DragDrop from "../components/DragDrop.vue";

import { store } from "../store";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { 
	getBuildShareUrl, 
	getBuildFromUrl,
	decodeBuildFromFragment
} from "@/utils/buildEncoder";

import dronemaster from "@/data/skills/Dronemaster.json";
import exterminator from "@/data/skills/Exterminator.json";
import fixer from "@/data/skills/Fixer.json";
import medic from "@/data/skills/Medic.json";
import slasher from "@/data/skills/Slasher.json";
import hellraiser from "@/data/skills/Hellraiser.json";
import vanguard from "@/data/skills/Vanguard.json";
import gunslinger from "@/data/skills/Gunslinger.json";

const { t } = useI18n();

const Classes = {
	Dronemaster: dronemaster,
	Gunslinger: gunslinger,
	Exterminator: exterminator,
	Fixer: fixer,
	Medic: medic,
	Slasher: slasher,
	Hellraiser: hellraiser,
	Vanguard: vanguard,
};

const isPrestige = ref(false);
const hoveredSkill = ref(null);
const focusedSkill = ref(null);
const showShareModal = ref(false);
const shareUrl = ref('');
const displayUrl = ref('');
const copySuccess = ref(false);

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
			selectedSkills.value.passive = [
				...selectedSkills.value.passive,
				skill,
			];
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
		className: store.selectedClass.name,
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

const shareBuild = () => {
	try {
		showShareModal.value = true;
		copySuccess.value = false;

		const buildData = {
			...selectedSkills.value,
			className: store.selectedClass.name,
		};

		// Generate compact share URL with fragment
		shareUrl.value = getBuildShareUrl(buildData, store.selectedClass.name);
		
		// Extract just the fragment part for display
		displayUrl.value = shareUrl.value;
	} catch (error) {
		console.error('Failed to generate share URL:', error);
		shareUrl.value = '';
		displayUrl.value = '';
		alert(t('share_error'));
	}
};

const copyShareUrl = async () => {
	try {
		await navigator.clipboard.writeText(shareUrl.value);
		copySuccess.value = true;
		
		// Reset success message after 2 seconds
		setTimeout(() => {
			copySuccess.value = false;
		}, 2000);
	} catch (error) {
		console.error('Failed to copy URL:', error);
		alert('Failed to copy URL to clipboard');
	}
};

const closeShareModal = () => {
	showShareModal.value = false;
	shareUrl.value = '';
	displayUrl.value = '';
};

const loadBuildFromUrl = () => {
	const buildData = getBuildFromUrl();
	
	if (buildData) {
		try {
			importFromJson(buildData);
			console.log("Build loaded from URL fragment:", buildData);
		} catch (error) {
			console.error('Failed to load build from URL:', error);
			alert(t('invalid_build'));
		}
	}
};

onMounted(() => {
	// Load build from URL if present
	loadBuildFromUrl();

	// Handle JSON file drops
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
	<div class="flex flex-col items-center justify-center main-content">
		<div class="flex flex-wrap justify-center items-center gap-2 class-heading">
			<h2 class="text-4xl font-bold mb-4 text-white text-center selected_class">
				{{ $t("selected_class") }} -
				<span class="text-red-600 selected_class_name">{{ store.selectedClass.name }}</span>
			</h2>
			<img width="63" height="57" class="selected_img" :src="store.selectedClass.image" />
		</div>
		<div class="flex items-center justify-center mt-2 mb-5 flex-col">
			<div class="flex gap-2 mb-4">
				<button
					@click="exportToJson"
					class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
				>
					{{ $t("save_build") }}
				</button>
				<button
					@click="shareBuild"
					class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-blue-600 rounded-full border border-blue-600 hover:bg-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
				>
					{{ $t("share_build") }}
				</button>
			</div>
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
					>{{ $t("prestige") }}</label
				>
			</div>
		</div>
		<div
			v-if="focusedSkill"
			class="block md:hidden text-center p-3 border border-gray-200 bg-gray-800 text-white rounded skill-detail mobile-skill-detail"
		>
			<h3 class="font-bold">{{ focusedSkill.name }}</h3>
			<p>{{ focusedSkill.description }}</p>
		</div>
		<div class="flex justify-center w-full">
			<div class="xl:flex xl:flex-row xl:gap-2 flex flex-col gap-2 perk-board">
				<template v-for="(col, i) in Classes[store.selectedClass.name]">
					<div class="flex flex-row xl:flex-col gap-2 perk-column">
						<label
							v-for="skill in col"
							:key="skill.name"
							:class="[
								'perk-option rounded-full border-3 transition flex items-center justify-center',
								'hover:border-white',
								'bg-gray-500',
								'border-gray-500',
								'has-checked:border-green-500',
								'relative cursor-pointer',
								skill.isPrestige && !isPrestige
									? '!border-gray-600 brightness-30'
									: '',
								skill.isPassive ? 'border-red-600' : '',
							]"
							:aria-label="`${skill.name}: ${skill.description}`"
							@mouseenter="hoveredSkill = skill"
							@mouseleave="hoveredSkill = null"
							@click="focusedSkill = skill"
						>
							<img
								:src="
									'/nodes-icons/' +
									store.selectedClass.name +
									'/' +
									skill.image +
									'.webp'
								"
								alt=" "
								class="rounded-[1000px] w-full h-full object-cover"
							/>
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
										: selectedSkills.active[i]?.name ===
											skill.name
								"
								class="sr-only"
							/>
						</label>
					</div>
				</template>
			</div>
		</div>
		<div
			v-if="hoveredSkill || focusedSkill"
			class="hidden md:block text-center mx-auto mt-[20px] p-3 border border-gray-200 bg-gray-800 text-white rounded skill-detail"
		>
			<h3 class="font-bold">{{ (hoveredSkill || focusedSkill).name }}</h3>
			<p>{{ (hoveredSkill || focusedSkill).description }}</p>
		</div>
	</div>

	<!-- Share Modal -->
	<transition
		enter-active-class="transition duration-300 ease-out"
		enter-from-class="opacity-0 scale-95"
		enter-to-class="opacity-100 scale-100"
		leave-active-class="transition duration-200 ease-in"
		leave-from-class="opacity-100 scale-100"
		leave-to-class="opacity-0 scale-95"
	>
		<div
			v-if="showShareModal"
			class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
			@click="closeShareModal"
		>
			<div
				class="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-600 transform transition-all"
				@click.stop
			>
				<h3 class="text-xl font-bold text-white mb-4">{{ $t("share_build") }}</h3>

				<div class="space-y-4">
					<!-- Share URL Display (compact fragment) -->
					<div class="bg-gray-700 rounded p-3 break-all">
						<p class="text-sm text-gray-300 mb-2">{{ $t("build") }}:</p>
						<p class="text-blue-400 font-mono text-sm cursor-pointer hover:text-blue-300 transition">
							{{ displayUrl }}
						</p>
						<p class="text-xs text-gray-400 mt-2">✓ Компактне, працює везде</p>
					</div>

					<!-- Copy Button -->
					<button
						@click="copyShareUrl"
						:class="[
							'w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 transform',
							copySuccess
								? 'bg-green-600 text-white scale-105'
								: 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105',
						]"
					>
						{{
							copySuccess
								? $t("copy_to_clipboard")
								: $t("copy_link_btn")
						}}
					</button>

					<!-- Close Button -->
					<button
						@click="closeShareModal"
						class="w-full py-2 px-4 rounded-lg font-medium bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all duration-300"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<style scoped>
.perk-option {
	width: 80px;
	height: 80px;
	flex: 0 0 80px;
}

.main-content {
	width: 100%;
}

.skill-detail {
	width: min(100%, 600px);
	overflow-wrap: anywhere;
}

@media (max-width: 767px) {
	.perk-board {
		align-items: center;
		width: 100%;
	}

	.perk-column {
		justify-content: center;
		flex-wrap: wrap;
		width: 100%;
		max-width: 360px;
	}

	.perk-option {
		--perk-size: min(64px, calc((100% - 24px) / 4));
		width: var(--perk-size);
		height: auto;
		aspect-ratio: 1;
		flex: 0 0 var(--perk-size);
		touch-action: manipulation;
	}

	.class-heading {
		width: 100%;
	}

	.class-heading h2 {
		max-width: calc(100% - 56px);
		font-size: 1.5rem;
		overflow-wrap: anywhere;
	}

	.selected_img {
		width: 48px;
		height: 44px;
	}

	.skill-detail {
		margin-top: 1rem;
	}
}
</style>
