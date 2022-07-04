<template>
  <form @submit.prevent="handle">
    <slot></slot>
  </form>
</template>

<script setup>
import { useRoute } from "#imports";

const route = useRoute();

async function handle(e) {
  const response = await $fetch(`/api/action${route.path}`, {
    method: "POST",
    body: new URLSearchParams(new FormData(e.target)),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
  console.log(response);
}
</script>
