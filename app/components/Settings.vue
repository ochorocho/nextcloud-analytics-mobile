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
      <TextField autocapitalizationType="none" ref="url" v-model="$data.url" class="input" hint="https://example.com/" fontSize="18" />
      <TextField autocapitalizationType="none" ref="username" v-model="$data.username" class="input" hint="Username" fontSize="18" />
      <TextField ref="password" v-model="$data.password" class="input" hint="Password" secure="true" fontSize="18" />
      <Button @tap="barcode" verticalAlignment="middle" horizontalAlignment="center">
        <Span class="fas" text.decode="&#xf029;"></Span>
        <Span>Scan</Span>
      </Button>
    </StackLayout>
  </Page>
</template>

<script>
import Home from './Home'
const SecureStorage = require("@nativescript/secure-storage").SecureStorage;
const secureStorage = new SecureStorage();
const BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;

export default {
  props: {
    url: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      url: secureStorage.getSync({ key: "url" }),
      username: secureStorage.getSync({ key: "username" }),
      password: secureStorage.getSync({ key: "password" })
    }
  },
  // computed: {
  //   url: secureStorage.getSync({ key: "url" }),
  //   username: secureStorage.getSync({ key: "username" }),
  //   password: secureStorage.getSync({ key: "password" })
  // },
  // watch: {
  //     url: secureStorage.getSync({ key: "url" }),
  //     username: secureStorage.getSync({ key: "username" }),
  //     password: secureStorage.getSync({ key: "password" })
  // },
  methods: {
    barcode() {
      let barcodescanner = new BarcodeScanner();
      barcodescanner
          .scan({})
          .then(
              result => {
                const array = [...result.text.substr(11).matchAll(/([a-z]:)(.*?)(&|$)/g)];

                this.$data.url = array[2][2]
                this.$data.username = array[0][2]
                this.$data.password = array[1][2]
                this.saveSettings();
                // this.credentials
              }
          )
    },
    goToHome() {
      this.$navigateTo(Home)
    },
    saveSettings() {
      secureStorage.setSync({
        key: "url",
        value: this.$data.url
      });

      secureStorage.setSync({
        key: "username",
        value: this.$data.username
      });

      secureStorage.setSync({
        key: "password",
        value: this.$data.password
      });
    }
  }
}
</script>

<style scoped lang="scss">
//@import '@nativescript/theme/scss/variables/blue';

</style>
