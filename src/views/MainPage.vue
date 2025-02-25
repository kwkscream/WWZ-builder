<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { store, classes } from "../store";
</script>

<template>
	<div class="flex justify-center items-center flex-col pt-5 pb-5">
		<div class="w-[1500px] my-0 mx-auto">
			<h1 class="text-4xl font-bold mb-4 text-white text-center">
				Створи власну або обери вже готову
				<span class="text-red-600">збірку</span>
			</h1>
			<p class="text-gray-400 max-w-2xl mx-auto text-center mb-[35px]">
				Створи свій унікальний та непереможний клас завдяки нашому
				білдеру класів. <br />
				Обирай клас та кастомізуй його навички під себе, все в твоїх
				руках!
			</p>

			<div class="max-w-md mx-auto mt-10 p-6">
				<h2 class="text-4xl font-bold mb-10 text-white text-center">
					Обрати клас
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
						Озброєння
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
							Екіпіровка
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
							Перейти до білду
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
