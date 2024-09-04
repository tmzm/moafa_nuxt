<template>
  <v-card class="mt-6">
    <v-card-text>
      <div class="flex justify-between mb-6">
        <div>
          <div class="text-2xl text-dark">أعضاء المجموعة</div>
          <div class="text-slate">
            <template v-if="hasMembers">
              {{ group.members?.length }} أعضاء حالياً في المجموعة
            </template>

            <template v-else> لا يوجد أعضاء في المجموع بعد </template>
          </div>
        </div>
      </div>

      <v-row v-if="hasMembers">
        <v-col v-for="member in group.members" cols="12" md="6" lg="4">
          <group-member @kick="setMemberId" :member="member" />
        </v-col>
      </v-row>

      <layout-empty-placeholder v-else>
        <template #title> لا يوجد أي أعضاء في المجموعة </template>

        <template #subtitle>
          يمكنك دعوة إعضاء جديدة للمجموعة من خلال نسخ رابط المجموعة الموجود في
          أعلى الصفحة وإرساله إليهم
        </template>
      </layout-empty-placeholder>
    </v-card-text>
  </v-card>

  <base-alert-dialog
    :title="$t('kick_dialog.text')"
    :action="$t('actions.yes_kick')"
    v-model="kickDialog"
    @close="kickDialog = false"
    :item="userKickName"
    @action="kick"
  />
</template>

<script setup lang="ts">
const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)

const kickDialog = ref(false)
const userKickId = ref(0)
const userKickName = ref('')
const loading = ref(false)

const setMemberId = (args: { id: number; name: string }) => {
  kickDialog.value = true

  userKickId.value = args.id
  userKickName.value = args.name
}

const kick = async (callback: any) => {
  loading.value = true

  try {
    groupStore.kickMember(group.value.id as number, userKickId.value)
    // re-get group information
    await groupStore.get(group.value.id as number)
  } finally {
    callback()
    loading.value = false
    kickDialog.value = false
  }
}

const hasMembers = computed(() => group.value.members?.length)
</script>
