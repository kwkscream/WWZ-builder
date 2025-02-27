<template>
  <div 
    v-if="isDragging"
    class="drop-overlay"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
  >
    <p>Відпустіть JSON-файл для завантаження</p>
  </div>

  <input type="file" accept=".json" @change="handleFileUpload" hidden ref="fileInput" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const isDragging = ref(false);
const fileInput = ref(null);

const onDragOver = (event) => {
  event.preventDefault();
  isDragging.value = true;
};

const onDragLeave = () => {
  isDragging.value = false;
};

const onDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file && file.type === "application/json") {
    readFile(file);
  } else {
    alert("Будь ласка, завантажте JSON-файл");
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) readFile(file);
};

const readFile = (file) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target?.result); // Перевірка на існування result
      console.log("Завантажений JSON:", data);
      window.dispatchEvent(new CustomEvent("json-loaded", { detail: { data } })); // Виправлено detail
      await nextTick();
    } catch (error) {
      console.error("Помилка завантаження JSON:", error);
    }
  };
  reader.readAsText(file);
};

onMounted(() => {
  document.addEventListener("dragover", onDragOver);
});

onUnmounted(() => {
  document.removeEventListener("dragover", onDragOver);
});
</script>

<style scoped>
.drop-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: 0.3s;
  z-index: 1000;
}
</style>
