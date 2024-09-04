<template>
  <v-img max-height="300" src="/images/empty-placeholder.png" />

  <div class="text-3xl text-dark text-center">
    <slot name="title" />
  </div>

  <div class="text-lg text-slate text-center mb-16">
    <slot name="subtitle" />
  </div>
</template>
