<script setup>
import { store, classes } from "../store";
</script>

<template>
	<div class="flex-col items-center justify-center">
		<div class="max-w-[1500px] w-full mx-auto main-content">
			<h1 class="text-4xl font-bold mb-4 text-white text-center title">
				{{ $t("title") }}
				<span class="text-red-600">{{ $t("build") }}</span>
			</h1>
			<p
				class="text-gray-400 max-w-xl mx-auto text-center mb-[35px] break-words"
			>
				{{ $t("sub_title") }}
			</p>

			<div class="max-w-md mx-auto mt-10 p-6">
				<h2 class="text-4xl font-bold mb-10 text-white text-center">
					{{ $t("choose_class") }}
				</h2>
				<div class="flex gap-3">
					<img
						width="63"
						height="57"
						:src="store.selectedClass.image"
					/>
					<select
						class="bg-black border border-red-600 text-red-500 text-base rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-black dark:border-red-600 dark:placeholder-red-400 dark:text-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 w-full tracking-wide leading-none"
						v-model="store.selectedClass"
					>
						<option
							v-for="class_ in classes"
							:key="class_"
							:value="class_"
							class="tracking-wide text-base"
						>
							{{ class_.name }}
						</option>
					</select>
				</div>

				<!-- Блок з інформацією стартового екіпу класу  -->

				<div class="mt-6" v-if="store.selectedClass">
					<h3 class="text-2xl font-bold text-red-500 mb-2">
						{{ $t("weapons") }}
					</h3>
					<div
						class="bg-red-900 p-3 rounded-lg flex items-center justify-center"
					>
						<span class="text-white">{{
							store.selectedClass.startingWeapon
						}}</span>
					</div>

					<!-- екіп -->

					<div class="mt-6" v-if="store.selectedClass">
						<h3 class="text-2xl font-bold text-red-500 mb-2">
							{{ $t("equipment") }}
						</h3>
						<div
							class="bg-gray-800 p-3 rounded-lg flex items-center justify-center"
						>
							<span class="text-white">{{
								store.selectedClass.equipment
							}}</span>
						</div>
						<router-link
							:to="{ name: 'choosePerks' }"
							class="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full text-center"
						>
							{{ $t("to_build") }}
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@media (max-width: 768px) {
	.main-content {
		width: 90%;
		max-width: 600px;
		margin: 0 auto;
	}
	body {
		overflow-x: hidden;
		box-sizing: border-box;
	}
	.subtitle {
		word-wrap: break-word; /* Перенесення довгих слів */
		overflow-wrap: break-word;
	}
	@media (max-width: 639px) {
		
	}
}
</style>
