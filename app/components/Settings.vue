<template>
  <Page>
    <ActionBar>
      <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goToHome" />
      <StackLayout orientation="horizontal">
        <Label text="Settings" fontSize="24" verticalAlignment="center"/>
      </StackLayout>
    </ActionBar>

    <StackLayout class="page">
      <TextField ref="url" class="input" hint="https://example.com/" secure="false" fontSize="18" />
      <TextField ref="username" class="input" hint="Username" secure="true" fontSize="18" />
      <TextField ref="password" class="input" hint="Password" secure="true" fontSize="18" />
      <Button text="save" @tap="saveSettings" />
    </StackLayout>
  </Page>
</template>

<script>
import Home from './Home'
let SecureStorage = require("nativescript-secure-storage").SecureStorage;
let secureStorage = new SecureStorage();

export default {
  data: {
    huhu: 'asdasdsa'
  },
  computed: {
    message () {
      return 'My Bloody Element'
    }
  },
  methods: {
    goToHome() {
      this.$navigateTo(Home)
    },
    saveSettings() {
      //let prefs = new Preferences();
      let success = secureStorage.setSync({
        key: "foo",
        value: "I was set at " + new Date()
      });

      // Set value
      // Preferences.setValue("name_preference", "some new text");;
      secureStorage.getSync({key: "foo"})
      // Get existing value
      // console.log(Preferences.getValue("name_preference"));
      console.log('savasdadse...');
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
