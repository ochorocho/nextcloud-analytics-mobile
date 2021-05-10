<template>
  <Page>
    <ActionBar class="action-bar">
      <NavigationButton text="Go back" android.systemIcon="ic_menu_edit" @tap="goToSettings" />
      <StackLayout orientation="horizontal">
        <label class="action-label" text="Analytics" fontSize="24"/>
      </StackLayout>
    </ActionBar>

    <ScrollView orientation="vertical">
      <ListView for="item in data" @itemTap="goReportDetails($event)">
        <v-template>
          <Label class="list-item" :text="item.name" />
        </v-template>
      </ListView>
    </ScrollView>
  </Page>
</template>

<script>
import Settings from './Settings'
import ReportDetails from './ReportDetails'
const base64 = require('base-64');
const SecureStorage = require("@nativescript/secure-storage").SecureStorage;
const secureStorage = new SecureStorage();

export default {
  data() {
    return {
      data: {}
    }
  },
  beforeMount(){
    this.getReports();
  },
  methods: {
    async getReports(){
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
      const res = await fetch(`${url}/apps/analytics/api/2.0/dataset/list`, requestOptions);
      this.data = await res.json();
    },
    goToSettings () {
      this.$navigateTo(Settings)
    },
    goReportDetails (event) {
      this.$navigateTo(ReportDetails, {
        props: {
          report: this.data[event.index],
        }
      });
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
