<script setup>
const props = defineProps({
  multiple: Boolean,
});
</script>

<template>
  <div
    class="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/4"
    aria-hidden="true"
  >
    <img
      class="max-w-none"
      src="../../../images/page-illustration.svg"
      width="846"
      height="594"
      alt="Page illustration"
    />
  </div>
  <div
    v-if="props.multiple"
    class="pointer-events-none absolute left-1/2 top-[400px] -z-10 -mt-20 -translate-x-full opacity-50"
    aria-hidden="true"
  >
    <img
      class="max-w-none"
      src="../../../images/blurred-shape-gray.svg"
      width="760"
      height="668"
      alt="Blurred shape"
    />
  </div>
  <div
    v-if="props.multiple"
    class="pointer-events-none absolute left-1/2 top-[440px] -z-10 -translate-x-1/3"
    aria-hidden="true"
  >
    <img
      class="max-w-none"
      src="../../../images/blurred-shape.svg"
      width="760"
      height="668"
      alt="Blurred shape"
    />
  </div>
</template>
