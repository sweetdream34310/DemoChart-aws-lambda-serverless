<template>
  <!-- <div class="product_card_tag"> -->
    <div class="product_tag">  <p>{{text}}</p> </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "ProductTag",
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.product_tag {
  text-align: center;
  padding: 0 10px 0 10px;
  align-items: center;
  justify-content: center;
}

.product_tag > p {
  font-size: 12px;
  color: rgb(180, 180, 180);
  border: solid 1px rgb(39, 39, 39);
  border-radius: 100px;
  margin-top: 10px;
  padding: 5px 7px 5px 7px;
  width: 100%;
  text-align: center;
  align-self: center;
}

@media (max-width: 1800px) {
.product_tag > p {
  font-family: 'font2';
  font-size: 11px;
}
}

</style>