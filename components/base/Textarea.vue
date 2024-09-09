<template>
  <v-textarea v-model="value" :error-messages="errorMessage" />
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{ name: string }>();

const { value, errorMessage } = useField(props.name);
</script>
