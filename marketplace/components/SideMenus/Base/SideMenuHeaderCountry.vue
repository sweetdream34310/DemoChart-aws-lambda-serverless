<template>
  <div>
    <p class="mt-2">
      <span v-if="(seller?.user !== undefined)">
          {{ getCountry(seller.user.countryID) }}
      </span>
      <span v-else-if="(user?.countryID !== undefined && !seller)">
        {{ getCountry(user?.countryID) }}
      </span>
      <span v-else>
        Platzhalterland
      </span>
    </p>
  </div>
</template>

<script>

import getCountry from '~~/utils/getCountry'

export default {
  name: "SideMenuHeaderCountry",
  props: {
    seller: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  setup() {

    return {
      getCountry,
    }
  }
}
</script>

<style scoped>

</style>