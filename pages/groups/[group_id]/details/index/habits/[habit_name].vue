<template>
  <base-dialog
    max-width="800"
    :title="$t('habits_dialog.title')"
    :model-value="true"
    :loading="pending"
    @close="goBack()"
  >
    <Form v-slot="{ errors }" @submit="submit">
      <v-row>
        <v-col cols="12" class="pb-0">
          <base-label icon="mdi-alphabetical">{{
            $t('habit_name.label')
          }}</base-label>

          <div class="flex gap-2">
            <Field
              v-model="habit.name"
              rules="required"
              name="habit_name"
              v-slot="{ field }"
            >
              <v-text-field
                v-bind="field"
                :placeholder="$t('habit_name.placeholder')"
                :error-messages="errors.habit_name"
              />
            </Field>

            <v-btn
              icon
              rounded="lg"
              size="large"
              class="w-fit"
              @click="iconSelectDialog = true"
            >
              <v-icon><v-img :src="`/icons/${habit.icon}.svg`" /></v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" class="mb-2">
          <base-label icon="mdi-timelapse">
            {{ $t('interval.label') }}
          </base-label>

          <v-item-group
            selected-class="!border-dark"
            mandatory
            v-model="habit.interval"
          >
            <v-row>
              <v-col v-for="i in intervals" cols="6" md="3">
                <v-item
                  :value="i"
                  v-slot="{ isSelected, toggle, selectedClass }"
                  j
                  ><v-card
                    @click="toggle"
                    :color="isSelected ? 'blue-lighten-3' : 'blue-lighten-5'"
                    class="!border-blue !border-1 !border-dashed"
                    :class="selectedClass"
                    ><v-card-text class="py-2"
                      ><v-radio
                        :label="$t(`interval.${i}`)"
                        :model-value="isSelected" /></v-card-text></v-card
                ></v-item>
              </v-col>
            </v-row>
          </v-item-group>

          <transition>
            <base-days-select
              v-if="habit.interval == 'DAILY'"
              v-model="habit.days"
            />
          </transition>
        </v-col>

        <v-col cols="6">
          <base-label tooltip="عدد الأيام الكلية لتحقيق الهدف">
            الهدف
          </base-label>

          <v-text-field
            v-model.number="habit.goal"
            type="number"
            hide-details
          />
        </v-col>

        <v-col cols="4">
          <base-label tooltip="كمية تنفيذ هذه العادة خلال الفترة"
            >الكمية</base-label
          >

          <v-text-field
            v-model.number="habit.amount"
            type="number"
            hide-details
          >
          </v-text-field>
        </v-col>

        <v-col cols="2">
          <base-label>الواحدة</base-label>
          <v-text-field type="text" hide-details v-model="habit.unit" />
        </v-col>

        <transition>
          <v-col v-if="habit.interval != 'ANY'" cols="12">
            <base-status-input
              v-model="habit.consecutive"
              item="الهدف مستمر"
              class="my-4"
            >
              <template #subtitle>
                يتم إعادة احتساب الهدف في كل مرة يتم تفويت العادة فيها
              </template>
            </base-status-input>
          </v-col>
        </transition>

        <v-col cols="12">
          <base-label icon="mdi-clock-alert-outline">
            {{ $t('penalty_note.label') }}
          </base-label>

          <div class="text-xs text-slate">
            {{ $t('penalty_note.details') }}
          </div>

          <v-textarea
            type="text"
            :placeholder="$t('penalty_note.placeholder')"
            v-model="habit.penalty_note"
          />
        </v-col>

        <v-col cols="12">
          <base-label icon="mdi-calendar">{{ $t('date.label') }}</base-label>

          <base-date-picker v-model="habit.start_date"></base-date-picker>
        </v-col>
      </v-row>

      <div class="flex justify-between">
        <base-action-button
          v-if="editMode"
          color="error"
          variant="tonal"
          icon="mdi-trash-can-outline"
          @click="deleteDialog = true"
        >
          حذف العادة
        </base-action-button>

        <v-spacer />

        <div class="flex gap-2">
          <v-btn variant="text" @click="goBack">إلغاء</v-btn>

          <base-action-button type="submit" :loading>{{
            $t('actions.save')
          }}</base-action-button>
        </div>
      </div>
    </Form>
  </base-dialog>

  <base-icon-dialog
    v-model="iconSelectDialog"
    :icon="habit.icon"
    @select="habit.icon = $event"
  ></base-icon-dialog>

  <base-alert-dialog
    :title="$t('delete_dialog.text')"
    :action="$t('actions.yes_delete')"
    v-model="deleteDialog"
    @close="deleteDialog = false"
    :item="$t('habit')"
    @action="remove"
  />
</template>

<script lang="ts" setup>
const habitStore = useHabitStore()
const groupStore = useGroupStore()

const { habit, intervals } = storeToRefs(habitStore)

const loading = ref(false)
const deleteDialog = ref(false)
const iconSelectDialog = ref(false)

const route = useRoute()

const groupId = Number(route.params.group_id)
const habitName = route.params.habit_name as string

const editMode = habitName != 'create'

const { pending } = useLazyAsyncData<Habit>(() => {
  // reset
  habitStore.reset()

  if (editMode) return habitStore.get(groupId, habitName)

  return Promise.resolve({} as Habit)
})

const remove = async (callback: any) => {
  try {
    await habitStore.remove(groupId, habitName)

    // re-get group information
    await groupStore.get(groupId)
  } finally {
    callback()
    goBack()
  }
}

const submit = async () => {
  loading.value = true

  try {
    editMode
      ? await habitStore.update(groupId, habitName)
      : await habitStore.create(groupId)

    // re-get group information
    await groupStore.get(groupId)

    goBack()
  } finally {
    loading.value = false
  }
}

watch(habit.value, () => {
  // prevent habit amount from being less than 1
  if (!habit.value.amount || habit.value.amount <= 0) {
    habit.value.amount = 1
  }

  // prevent habit unit from being empty string
  if (!habit.value.unit.length) {
    habit.value.unit = 'مرة'
  }

  // prevent habit goal from being less than 1
  if (!habit.value.goal || habit.value.goal == 0) {
    habit.value.goal = 1
  }
})

const goBack = () => {
  navigateTo(`/groups/${groupId}/details/habits`)
}
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
