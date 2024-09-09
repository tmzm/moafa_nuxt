<template>
  <v-text-field v-model="value" :error-messages="errorMessage" >
    <template v-if="$slots.append" #append>
      <slot name="append"/>
    </template>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend"/>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{ name: string }>();

const { value, errorMessage } = useField(props.name);
</script>
