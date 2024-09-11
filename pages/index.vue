<template>
  <div>
    <div
      class="relative h-[86vh] w-full bg-[url(/02.6143e946.jpg)] bg-center bg-cover"
    >
      <v-container class="px-12 py-32 h-full">
        <div class="flex justify-between items-center h-full">
          <div>
            <div class="text-red font-semibold flex items-center gap-2">
              <div class="w-8 h-1 bg-red"></div>
              <div>NEW FORMELA</div>
            </div>
            <div class="text-7xl font-bold">Lab Hand Santiviter</div>
            <div class="text-xl text-gray">
              Lab Hand Sanitizer: A vital tool for maintaining hygiene in
              laboratories. Our specialized formula
            </div>
            <div class="flex gap-2 mt-4">
              <v-btn append-icon="mdi-plus" color="red" size="x-large" rounded
                >SHOP NOW</v-btn
              >
              <v-btn append-icon="mdi-plus" size="x-large" rounded
                >BY NOW</v-btn
              >
            </div>
          </div>

          <v-img max-width="200" src="/02.webp">
            <div
              class="w-24 flex items-center justify-center aspect-square bg-red rounded-full shadow-lg border-8"
            >
              <div class="text-xl">8832 SP</div>
            </div>
          </v-img>
        </div>
      </v-container>

      <div
        class="absolute top-0 left-0 flex justify-between items-center h-full w-full p-8"
      >
        <v-btn
          :rounded="false"
          size="x-large"
          variant="outlined"
          icon="mdi-arrow-left"
        ></v-btn>
        <v-btn
          :rounded="false"
          size="x-large"
          variant="outlined"
          icon="mdi-arrow-right"
        ></v-btn>
      </div>
    </div>

    <v-container>
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
              :scr="$config.public.baseUrl + category.image"
            />
            <div class="text-2xl font-bold">{{ category.name }}</div>
            <v-icon class="text-gray">mdi-arrow-right</v-icon>
          </div>
        </div>
      </div>
    </v-container>

    <div class="p-8 bg-light">
      <v-container>
        <div class="text-center my-12">
          <div class="text-3xl font-bold">Features Products</div>
          <div class="text-xl text-gray">
            Explore cutting-edge Features in our medical equipment
          </div>
        </div>

        <div class="text-center">
          <div class="flex gap-3 items-center justify-center mb-8 mt-6">
            <v-btn size="large" color="primary" :rounded="false">
              Show All
            </v-btn>
            <v-btn size="large" color="gray" :rounded="false"> Medicine </v-btn>
            <v-btn size="large" color="gray" :rounded="false">
              Sanitizer
            </v-btn>
            <v-btn size="large" color="gray" :rounded="false">
              Thermometer
            </v-btn>
            <v-btn size="large" color="gray" :rounded="false">
              Accessories
            </v-btn>
          </div>

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
    </div>

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
            :src="$config.public.baseUrl + productStore.products[1].image"
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

<style></style>
