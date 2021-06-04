<template>
  <BasicField>
    <div class="ui left icon input">
      <i class="icon" :class="icon" />
      <slot />
    </div>
  </BasicField>
</template>

<script>
import BasicField from '@/components/Form/field/BasicField'

export default {
  name: 'LeftIconField',
  components: { BasicField },
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>
