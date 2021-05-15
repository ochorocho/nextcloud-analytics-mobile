<template>
  <Page>
    <ActionBar class="action-bar">
      <NavigationButton
          @tap="goToHome"
          icon.decode="font://&#xf053;"
          class="fas action-bar-item"
      />
      <StackLayout orientation="horizontal">
        <Label class="action-label" :text="this.report.name" fontSize="24"/>
      </StackLayout>
      <ActionItem
          @tap="saveSettings"
          icon.decode="font://&#xf067;"
          class="fas action-bar-item"
          ios.position="right"
          android.position="right"
      />
    </ActionBar>

    <ScrollView orientation="vertical">
      <ListView for="item in data">
        <v-template>
          <GridLayout rows="auto" columns="*">
            <Label horizontalAlignment="left" class="list-item" :text="item[0]" />
            <Label horizontalAlignment="center" class="list-item" :text="item[1]" />
            <Label horizontalAlignment="right" class="list-item" :text="item[2]" />
          </GridLayout>
        </v-template>
      </ListView>
    </ScrollView>
  </Page>
</template>

<script>
import Home from '~/components/Home'
const base64 = require('base-64');
const SecureStorage = require("@nativescript/secure-storage").SecureStorage;
const secureStorage = new SecureStorage();

export default {
  props: ['report'],
  data() {
    return {
      data: {}
    }
  },
  beforeMount(){
    this.getData();
  },

  methods: {
    async getData() {
      const credentials = base64.encode(secureStorage.getSync({ key: "username" }) + ':' + secureStorage.getSync({ key: "password" }));
      const headers = new Headers();
      headers.append("OCS-APIRequest", "true");
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Basic " + credentials);

      let raw = "";
      let requestOptions = {
        method: 'GET',
        headers: headers,
        body: raw
      };

      const url = secureStorage.getSync({ key: "url" });
      const res = await fetch(`${url}/apps/analytics/api/2.0/dataset/${this.report.id}/data`, requestOptions);
      this.data = await res.json();
    },
    goToHome() {
      this.$navigateTo(Home)
    },
    // async getReports(){
    //   const credentials = base64.encode(secureStorage.getSync({ key: "username" }) + ':' + secureStorage.getSync({ key: "password" }));
    //   const headers = new Headers();
    //   headers.append("OCS-APIRequest", "true");
    //   headers.append("Content-Type", "application/json");
    //   headers.append("Authorization", "Basic " + credentials);
    //
    //   let raw = "";
    //   let requestOptions = {
    //     method: 'GET',
    //     headers: headers,
    //     body: raw
    //   };
    //
    //   const url = secureStorage.getSync({ key: "url" });
    //   const res = await fetch(`${url}/apps/analytics/api/2.0/dataset/list`, requestOptions);
    //   this.data = await res.json();
    // },
    goToSettings () {
      // this.$navigateTo(Settings)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
