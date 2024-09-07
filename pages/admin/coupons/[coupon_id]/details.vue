<template>
  <div>
    <base-page-header
      title="User Details"
      :breadcrumbs="[
        {
          title: 'Home',
          to: '/admin'
        },
        {
          title: 'Coupons',
          to: '/admin/coupons'
        },
        {
          title: 'Coupon Details',
          disabled: true
        }
      ]"
    >
      <template #actions>
        <base-action-button
          @click="deleteDialog = true"
          color="error"
          icon="mdi-delete"
          >Delete Coupon</base-action-button
        >
      </template>
    </base-page-header>

    <div v-if="!pending">
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title> #{{ coupon.code }} </v-card-title>

            <v-divider />

            <v-card-text>
              <div class="text-xl font-bold">Details</div>

              <v-list>
                <v-list-item nav prepend-icon="mdi-calendar" title="Created At">
                  <template #subtitle>
                    <p>
                      {{
                        dayjs(coupon.created_at).format('DD MMM YYYY, h:mm a')
                      }}
                    </p>
                  </template>
                </v-list-item>
                <v-list-item prepend-icon="mdi-tag" title="Discount Type">
                  <template #subtitle>
                    <v-chip>{{ coupon.discount_type }}</v-chip>
                  </template>
                </v-list-item>

                <v-list-item prepend-icon="mdi-tag-search" title="Discount">
                  <template #subtitle>
                    <p>{{ coupon.discount }}</p>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <order-table
            title="Orders that used this coupon"
            :hide="['coupon']"
            :coupon-id="Number(couponId)"
          />
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <v-row>
        <v-col cols="12" md="4">
          <v-skeleton-loader
            type="avatar, list-item-two-line"
            :loading="true"
            :height="500"
          />
        </v-col>

        <v-col cols="12" md="8">
          <v-skeleton-loader
            type="	table-heading, table-thead, table-tbody, table-tfoot"
            loading
            :height="400"
          />
        </v-col>
      </v-row>
    </div>
  </div>

  <base-alert-dialog
    :title="$t('delete_dialog.text')"
    :action="$t('actions.yes_delete')"
    v-model="deleteDialog"
    @close="deleteDialog = false"
    :item="$t('Coupon')"
    @action="remove"
  />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

definePageMeta({
  layout: 'admin'
})

const deleteDialog = ref(false)

const couponStore = useCouponStore()

const { coupon } = storeToRefs(couponStore)

const couponId = useRoute().params.coupon_id

const { pending } = await useLazyAsyncData(() =>
  couponStore.get(Number(couponId))
)

const goBack = () => navigateTo('/admin/coupons')

const remove = async (callback: any) => {
  try {
    await couponStore.remove(Number(couponId))

    // re-get groups information
    await couponStore.list()
  } finally {
    callback()
    goBack()
  }
}
</script>

<style></style>
