<template>
  <Page>
    <ActionBar class="action-bar">
      <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goToHome" />
      <StackLayout orientation="horizontal">
        <Label class="action-label" text="Settings" fontSize="24" verticalAlignment="center"/>
      </StackLayout>
      <ActionItem
          @tap="saveSettings"
          ios.systemIcon="9"
          ios.position="right"
          android.systemIcon="ic_menu_save"
          android.position="actionBar"
      />
    </ActionBar>

    <StackLayout>
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
@import '@nativescript/theme/scss/variables/blue';

</style>
