<template>
  <v-navigation-drawer
    :rail="rail"
    rail-width="76"
    width="300"
    :expand-on-hover="rail"
    :model-value="themeStore.sideOpen || !smAndDown"
  >
    <v-list
      :class="{
        '!p-3': rail
      }"
      active-class="bg-white text-secondary"
      color="secondary"
      nav
    >
      <v-list-item>
        <v-img
          :class="{
            'mt-4 w-44': !rail
          }"
          class="min-w-26 mb-12 mx-1 my-2"
          src="/logo.png"
        />
      </v-list-item>

      <template v-for="item in navigationItems">
        <v-list-item
          v-if="!item.children"
          :prepend-icon="item.icon"
          :title="item.text"
          :to="item.link"
        />

        <v-list-group fluid v-else no-action>
          <template #activator="{ props }">
            <v-list-item
              :active="false"
              v-bind="props"
              :title="item.text"
              :prepend-icon="item.icon"
            />
          </template>

          <v-list-item
            active-class="bg-white text-secondary"
            v-for="child in item.children"
            :to="child.link"
            :title="child.text"
          >
            <template #prepend>
              <v-icon class="ms-4" size="24">mdi-circle-small</v-icon>
            </template>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const themeStore = useThemeStore()
const { smAndDown } = useDisplay()

const { rail } = storeToRefs(themeStore)
</script>

<style></style>
