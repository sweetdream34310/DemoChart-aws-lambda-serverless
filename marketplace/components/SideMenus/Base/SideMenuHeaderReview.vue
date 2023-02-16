<template>

  <div class="flex justify-center items-center gap-2 mt-2">
    <star-icon />
    <p class="font-bold">
      5.0
      <span class="font-normal text-demo-gray">
        (174 Reviews)
      </span>
    </p>
  </div>
</template>

<script>
import StarIcon from "~/components/Icons/StarIcon";
export default {
  name: "SideMenuHeaderReview",
  components: {StarIcon}
}
</script>

<style scoped>

</style>