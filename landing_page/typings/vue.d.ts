// vue.d.ts
/**
 * Extends interfaces in Vue.js
 */

import Vue, { ComponentOptions } from "vue";

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    // This adds the `validations` property to the existing `vue/types/options/ComponentOptions` type
    validations?: any;
  }
}