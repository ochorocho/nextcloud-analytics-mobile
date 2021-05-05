<template>
  <Page>
    <ActionBar>
      <StackLayout orientation="horizontal">
        <label text="ActionBar Title" fontSize="24" verticalAlignment="center"/>
      </StackLayout>
    </ActionBar>

    <GridLayout>
      <Button text="Button" @tap="goToSettings" />
      <Label class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; "/>
          <Span :text="message"/>
        </FormattedString>
      </Label>
    </GridLayout>
  </Page>
</template>

<script>
import Settings from './Settings'

export default {
  computed: {
    message () {
      return 'My Bloody Element'
    }
  },
  methods: {
    goToSettings() {
      console.log("Clicked!");
      this.$navigateTo(Settings)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@nativescript/theme/scss/variables/blue';

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
