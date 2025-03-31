import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'uk',
  messages: {
    en: {
    title:"Create your own or import a pre-built",
    build:"build",
    sub_title: `Create your own unique and invincible class with our class builder.
                Choose a class and customize its skills for yourself, everything is in your hands!`,
    choose_class: "Select class",
    weapons: "Weapons",
    equipment: "Equipment",
    to_build: "Go to the build",
    selected_class: "Selected class",
    save_build: "Save build",
    prestige: "Prestige",
    drag_drop: "Drop the JSON file",
    },
    uk: {
    	title:"Створи власну або імпортуй вже готову",
    	build:"збірку",
    	sub_title: `Створи свій унікальний та непереможний клас завдяки нашому білдеру класів.
					Обирай клас та кастомізуй його навички під себе, все в твоїх руках!`,
		choose_class: "Обрати клас",
		weapons: "Зброя",
		equipment: "Спорядження",
		to_build:"Перейти до білду",
		selected_class: "Обраний клас",
		save_build: "Зберегти білд",
		prestige: "Престиж",
		drag_drop: "Відпустіть JSON-файл для завантаження",
    }
  }
})

const browserLang = navigator.language || navigator.userLanguage
if (browserLang.toLowerCase().startsWith('uk')) {
  i18n.global.locale = 'uk'
}