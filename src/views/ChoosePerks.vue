<script setup>
import Nodes from "../components/Nodes.vue";
import PassiveNode from "../components/PassiveNode.vue"
import { store } from "../store";


const skillCols = [
	[
		{ name: "Skill 1A", description: "Description for Skill 1A" },
		{ name: "Skill 2A", description: "Description for Skill 2A" },
		{ name: "Skill 3A", description: "Description for Skill 3A" },
		{ name: "Skill 3A", description: "Description for Skill 3A" },
	],
	[
		{ name: "Skill 1B", description: "Description for Skill 1B" },
		{ name: "Skill 2B", description: "Description for Skill 2B" },
		{ name: "Skill 3B", description: "Description for Skill 3B" },
		{ name: "Skill 3B", description: "Description for Skill 3B" },
	],
	[
		{ name: "Skill 1B", description: "Description for Skill 1B" },
		{ name: "Skill 2B", description: "Description for Skill 2B" },
		{ name: "Skill 3B", description: "Description for Skill 3B" },
		{ name: "Skill 3B", description: "Description for Skill 3B" },
	],
];

const passiveSkill = {
	name: "Passive Skill",
	description: "Description for Passive Skill",
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
	<div class="flex justify-center meow">
		<PassiveNode :passiveSkill="passiveSkill"/>
		<Nodes :skillCols="skillCols" />
		<PassiveNode :passiveSkill="passiveSkill"/>
		<Nodes :skillCols="skillCols" />
		<PassiveNode :passiveSkill="passiveSkill"/>
		<Nodes :skillCols="skillCols" />
		<PassiveNode :passiveSkill="passiveSkill"/>
	</div>
</template>
