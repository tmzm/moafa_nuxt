<template>
  <VContainer>
    <div class="text-h6 font-weight-bold mb-2">Fast links</div>
    <v-row :dense="false">
      <v-col cols="12" md="6" lg="3">
        <v-card
          color="primary"
          variant="outlined"
          class="border-dashed elevation-0"
          to="/admin/products/create"
        >
          <v-card-text class="bg-white text-pink font-weight-bold">
            Add Product
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card
          color="secondary"
          variant="outlined"
          class="border-dashed elevation-0"
          to="/admin/categories/create"
        >
          <v-card-text class="bg-white text-teal font-weight-bold">
            Add Category
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card
          color="blue"
          variant="outlined"
          class="border-dashed elevation-0"
          to="/admin/brands/create"
        >
          <v-card-text class="bg-white text-blue font-weight-bold">
            Add Brand
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <v-card
          color="cyan"
          variant="outlined"
          class="border-dashed elevation-0"
          to="/admin/users/create"
        >
          <v-card-text class="bg-white text-cyan font-weight-bold">
            Add Admin
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </VContainer>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})
</script>

<style></style>
