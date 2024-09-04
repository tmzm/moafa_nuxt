<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <base-status-card
            :title="$t('groups')"
            :number="14"
            icon="mdi-account-group-outline"
            color="primary"
          />
        </v-col>
        <v-col cols="12">
          <base-status-card
            :title="$t('habits')"
            :number="253"
            icon="mdi-link-variant"
            color="blue"
          />
        </v-col>
      </v-row>

      <v-row class="mt-8" dense>
        <v-col v-for="link in links" cols="12" xl="6">
          <layout-sidebar-link :link="link" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const links = [
  {
    key: 'links.home',
    icon: 'mdi-home-outline',
    to: '/'
  },
  {
    key: 'links.groups',
    icon: 'mdi-account-group-outline',
    to: '/groups'
  }
]
</script>

<style>
.v-navigation-drawer--right {
  border-left: none !important;
}
</style>
