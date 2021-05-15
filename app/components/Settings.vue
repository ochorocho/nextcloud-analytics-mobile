<template>
  <Page>
    <ActionBar class="action-bar">
      <NavigationButton
          @tap="goToHome"
          icon.decode="font://&#xf053;"
          class="fas action-bar-item"
      />
      <StackLayout orientation="horizontal">
        <Label class="action-label" text="Settings" fontSize="24" verticalAlignment="center"/>
      </StackLayout>
      <ActionItem
          @tap="saveSettings"
          icon.decode="font://&#xf0c7;"
          class="fas action-bar-item"
          ios.position="right"
          android.position="right"
      />
    </ActionBar>

    <StackLayout class="content">
      <TextField autocapitalizationType="none" ref="url" v-model="credentials.url" class="input" hint="https://example.com/" fontSize="18" />
      <TextField autocapitalizationType="none" ref="username" v-model="credentials.username" class="input" hint="Username" fontSize="18" />
      <TextField ref="password" v-model="credentials.password" class="input" hint="Password" secure="true" fontSize="18" />
    </StackLayout>
  </Page>
</template>

<script>
import Home from './Home'
const SecureStorage = require("@nativescript/secure-storage").SecureStorage;
const secureStorage = new SecureStorage();

export default {
  computed: {
    credentials() {
      return {
        url: secureStorage.getSync({ key: "url" }),
        username: secureStorage.getSync({ key: "username" }),
        password: secureStorage.getSync({ key: "password" })
      }
    }
  },
  methods: {
    goToHome() {
      this.$navigateTo(Home)
    },
    saveSettings() {
      secureStorage.setSync({
        key: "url",
        value: this.credentials.url
      });

      secureStorage.setSync({
        key: "username",
        value: this.credentials.username
      });

      secureStorage.setSync({
        key: "password",
        value: this.credentials.password
      });
    }
  }
}
</script>

<style scoped lang="scss">
//@import '@nativescript/theme/scss/variables/blue';

</style>
