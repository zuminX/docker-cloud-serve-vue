<template>
  <LeftIconField :icon="icon">
    <input :value="data" :name="name" :type="type" :placeholder="placeholder" @input="$emit('update:data', $event.target.value)">
  </LeftIconField>
</template>

<script>
import LeftIconField from '@/components/Form/field/LeftIconField'

export default {
  name: 'LeftIconInputField',
  components: { LeftIconField },
  props: {
    icon: {
      type: String,
      required: true
    },
    data: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>
