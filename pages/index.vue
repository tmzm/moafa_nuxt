<template>
  <div>
    <div
      style="clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%)"
      class="relative h-screen w-full bg-[url(/images/curved-2.jpg)] bg-center bg-cover home-area"
    >
      <v-container class="px-12 py-32 h-full">
        <div class="flex justify-center items-center h-full">
          <div class="flex flex-col items-center justify-center gap-4">
            <div class="text-7xl font-bold text-white">Lab Hand Santiviter</div>
            <div class="text-xl text-white">
              Lab Hand Sanitizer: A vital tool for maintaining hygiene in
              laboratories. Our specialized formula
            </div>
            <div class="flex gap-2 mt-4">
              <v-btn
                append-icon="mdi-plus"
                color="red"
                size="x-large"
                variant="flat"
                rounded
                >SHOP NOW</v-btn
              >
              <v-btn
                append-icon="mdi-plus"
                size="x-large"
                rounded
                variant="flat"
                >BY NOW</v-btn
              >
            </div>
          </div>
        </div>
      </v-container>
    </div>

    <v-container>
      <div class="grid grid-cols-2 gap-6 mt-6">
        <div
          class="flex justify-between items-stretch h-74 rounded-lg bg-[#D7E2F2] p-10"
        >
          <div class="flex flex-col justify-between">
            <div class="text-xl">Home Medical Supplies</div>
            <div class="text-3xl font-bold">Medicine Product</div>
            <div class="text-2xl text-red font-semibold">$1.00 – $55.00</div>
            <v-btn
              append-icon="mdi-plus"
              color="red"
              class="w-fit"
              size="large"
              variant="flat"
              rounded
              >SHOP NOW</v-btn
            >
          </div>
        </div>

        <div
          class="flex justify-between items-stretch h-74 rounded-lg bg-[#DEF2F4] p-10"
        >
          <div class="flex flex-col justify-between">
            <div class="text-xl">Home Medical Supplies</div>
            <div class="text-3xl font-bold">Medicine Product</div>
            <div class="text-2xl text-red font-semibold">$1.00 – $55.00</div>
            <v-btn
              append-icon="mdi-plus"
              color="red"
              class="w-fit"
              size="large"
              variant="flat"
              rounded
              >SHOP NOW</v-btn
            >
          </div>
        </div>
      </div>
    </v-container>

    <!-- <v-container>
      <div class="text-center my-16">
        <div class="text-3xl font-bold">Category Products</div>
        <div class="text-xl text-gray">
          Explore our diverse range of Category Products in medical equipment,
          carefully curated to meet
        </div>
      </div>

      <div class="text-center mb-32">
        <div class="flex justify-center gap-12">
          <div v-for="category in categoryStore.categories.slice(0, 4)">
            <v-img
              width="150"
              class="mx-auto"
              lazy-src="/images/empty-placeholder.png"
              :scr="loadImage(category.image)"
            />
            <div class="text-2xl font-bold">{{ category.name }}</div>
            <v-icon class="text-gray">mdi-arrow-right</v-icon>
          </div>
        </div>
      </div>
    </v-container> -->

    <v-container>
      <div class="my-12 flex justify-between">
        <div class="text-4xl font-bold">Features Products</div>

        <v-tabs fixed-tabs>
          <v-tab>
            All
          </v-tab>
          <v-tab>
            All
          </v-tab>
          <v-tab>
            All
          </v-tab>
          <v-tab>
            All
          </v-tab>
        </v-tabs>
      </div>

      <div class="text-center">
        <v-row class="!w-fit mx-auto">
          <v-col
            v-for="product in [
              ...productStore.products,
              ...productStore.products
            ]"
          >
            <product-card :product />
          </v-col>
        </v-row>
      </div>
    </v-container>

    <v-container>
      <v-card :rounded="false" elevation="0" class="mt-12">
        <v-card-text>
          <div class="flex items-center justify-between">
            <v-list-item
              density="comfortable"
              title="Free Shipping"
              subtitle="On All Order Over $599"
            >
              <template #prepend>
                <v-icon size="50">mdi-moped-electric-outline</v-icon>
              </template>
            </v-list-item>

            <v-list-item
              density="comfortable"
              title="Free Shipping"
              subtitle="On All Order Over $599"
            >
              <template #prepend>
                <v-icon size="50">mdi-moped-electric-outline</v-icon>
              </template>
            </v-list-item>

            <v-list-item
              density="comfortable"
              title="Free Shipping"
              subtitle="On All Order Over $599"
            >
              <template #prepend>
                <v-icon size="50">mdi-moped-electric-outline</v-icon>
              </template>
            </v-list-item>

            <v-list-item
              density="comfortable"
              title="Free Shipping"
              subtitle="On All Order Over $599"
            >
              <template #prepend>
                <v-icon size="50">mdi-moped-electric-outline</v-icon>
              </template>
            </v-list-item>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>

  <base-dialog
    :title="productStore.products[1].name"
    v-model="model"
    @close="model = false"
    width="800"
  >
    <v-row>
      <v-col>
        <div class="flex justify-center items-center aspect-square bg-light">
          <v-img
            max-width="100"
            :src="loadImage(productStore.products[1].image)"
          ></v-img>
        </div>
      </v-col>
      <v-col>
        <div>
          Typi non habent claritatem insitam, est usus legentis in iis qui facit
          eorum claritatem. Investigationes demonstraverunt
        </div>
        <div class="my-2"><strong>Availability </strong> IN STOCK</div>

        <v-rating disabled size="small" density="compact" color="secondary" />
        <div>{{ productStore.products[1].price }} SP, 1 Review</div>

        <div class="flex gap-4 items-center my-4">
          <div
            class="flex items-center border border-gray rounded-lg overflow-hidden"
          >
            <v-btn :rounded="false" icon="mdi-minus"></v-btn>
            <div class="w-11 aspect-square flex items-center justify-center">
              <div>0</div>
            </div>
            <v-btn :rounded="false" icon="mdi-plus"></v-btn>
          </div>

          <v-btn size="x-large">ADD TO Product</v-btn>
        </div>

        <v-btn
          variant="outlined"
          class="me-2"
          size="small"
          color="gray"
          icon="mdi-heart-outline"
        ></v-btn>
        <v-btn
          variant="outlined"
          class="me-2"
          size="small"
          color="gray"
          icon="mdi-compare"
        ></v-btn>
        <v-btn
          variant="outlined"
          size="small"
          color="gray"
          icon="mdi-share-outline"
        ></v-btn>
      </v-col>
    </v-row>
  </base-dialog>
</template>

<script lang="ts" setup>
const model = ref(true)
const productStore = useProductStore()
const categoryStore = useCategoryStore()

defineProps<{
  home?: boolean
}>()

await useAsyncData(() => productStore.getTopProductSellers())

const { pending } = await useAsyncData(() => categoryStore.list())
</script>

<style>
.v-main {
  padding-top: 0 !important;
}

.home-area::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    110deg,
    #1e6f5c 16%,
    rgba(255, 255, 255, 0) 64%
  );
  opacity: 0.91;
  z-index: -1;
}

.home-area::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to left,
    #1e6f5c 16%,
    rgba(255, 255, 255, 0) 64%
  );
  opacity: 0.91;
  z-index: -1;
}
</style>
