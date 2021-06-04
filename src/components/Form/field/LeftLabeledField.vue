<template>
  <BasicField>
    <div class="ui left labeled input">
      <div class="ui label">
        {{ label }}
      </div>
      <slot />
    </div>
  </BasicField>
</template>

<script>
import BasicField from '@/components/Form/field/BasicField'

export default {
  name: 'LeftLabeledField',
  components: { BasicField },
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
