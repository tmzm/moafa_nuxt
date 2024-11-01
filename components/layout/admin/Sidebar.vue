<template>
  <v-navigation-drawer
    :rail
    rail-width="76"
    :class="{
      'hide-scrollbar': rail
    }"
    class="!border-none"
    width="300"
    :expand-on-hover="rail"
    :model-value="themeStore.sideOpen || !$vuetify.display.smAndDown"
  >
    <template #prepend>
      <v-list-item title="Moafa Dashboard" class="px-6 pb-4 pt-8">
        
      </v-list-item>
    </template>

    <v-list
      :class="{
        '!p-3': rail
      }"
      nav
      color="primary"
    >
      <template v-for="item in navigationItems">
        <v-list-item
          :class="(!item.icon && !item.link) ? '!text-sm !text-gray !font-bold' : ''"
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
            v-for="child in item.children"
            :to="child.link"
            :title="child.text"
          >
            <template #prepend>
              <v-icon class="ms-3" size="24">mdi-circle-small</v-icon>
            </template>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const themeStore = useThemeStore()

const { rail } = storeToRefs(themeStore)
</script>

<style></style>
