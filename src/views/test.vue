<script setup>
import { ref } from "vue";
const nodes = [
  [
    {
      n: "1",
      d: "1",
      isPassive: true,
    },
    {
      n: "1",
      d: "1",
      isPassive: true,
      onlyPrestige: true,
    },
  ],
  [
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
  ],
  [
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
  ],
  [
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
  ],
  [
    {
      n: "1",
      d: "1",
      isPassive: true,
    },
    {
      n: "1",
      d: "1",
      isPassive: true,
      onlyPrestige: true,
    },
  ],
  [
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
  ],
  [
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
  ],
  [
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
  ],
  [
    {
      n: "1",
      d: "1",
      isPassive: true,
    },
    {
      n: "1",
      d: "1",
      isPassive: true,
      onlyPrestige: true,
    },
  ],
  [
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
  ],
  [
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
  ],
  [
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
    {
      n: "1",
      d: "1",
    },
  ],
  [
    {
      n: "1",
      d: "1",
      isPassive: true,
    },
    {
      n: "1",
      d: "1",
      isPassive: true,
      onlyPrestige: true,
    },
  ],
];

const isPrestige = ref(false);
</script>

<template>
  <input type="checkbox" name="" id="" v-model="isPrestige" />
  <div class="flex">
    <div v-for="(s, i) in nodes">
      <label
        v-for="(m, i2) in s"
        class="h-12 w-12 border-2 rounded-full m-2 block"
        :class="{ 'bg-red-200': m.isPassive, '!bg-gray-200': m.onlyPrestige }"
      >
        <input
          type="radio"
          :name="i"
          :disabled="m.onlyPrestige && !isPrestige ? true : false"
        />
        {{ m.n }}
      </label>
    </div>
  </div>
</template>

<style scoped>
label {
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
}
</style>


<style scoped>
label {
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
}
</style>