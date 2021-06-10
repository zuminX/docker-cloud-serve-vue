<template>
  <LeftLabeledField :label="label">
    <input :name="name" :type="type" :value="data" :placeholder="placeholder" @input="$emit('update:data', $event.target.value)">
  </LeftLabeledField>
</template>

<script>
import LeftLabeledField from '@/components/Form/field/LeftLabeledField'

export default {
  name: 'LeftLabeledInputField',
  components: { LeftLabeledField },
  props: {
    label: {
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
