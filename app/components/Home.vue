<template>
  <Page androidStatusBarBackground="#21a5ee" backgroundSpanUnderStatusBar="#ff0000">
    <ActionBar class="action-bar">
      <StackLayout orientation="horizontal">
        <Label class="action-label" text="Analytics" fontSize="24"/>
      </StackLayout>
      <ActionItem
          @tap="goToSettings"
          ios.position="right"
          android.position="right"
          icon.decode="font://&#xf085;"
          class="fas action-bar-item" />
    </ActionBar>
    <ScrollView orientation="vertical" height="100%">
      <StackLayout orientation="vertical" height="100%">
        <ActivityIndicator :visibility="activityState" class="loading" busy="true"/>
        <ListView for="item in datasets" @itemTap="goReportDetails($event)">
          <v-template if="item.name">
            <Label class="list-item" :text="item.name"/>
          </v-template>
        </ListView>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Settings from './Settings'
import ReportDetails from './ReportDetails'
import { apiRequest } from '~/modules/apiRequest'
import { isOnline } from '~/modules/utils'

export default {
  data () {
    return {
      datasets: {},
      activityState: 'visible'
    }
  },
  beforeMount () {
    this.getReports()
  },
  methods: {
    getReports () {
      if(!isOnline()) {
        alert('Seems you are offline');
        return;
      }
      let api = new apiRequest('/apps/analytics/api/3.0/datasets')
      api.get().then((response) => {
        this.datasets = response.content.toJSON();
        this.activityState = 'collapsed';
      }).catch((e) => {
        alert('Please check credentials');
        this.goToSettings()
      });
    },
    goToSettings () {
      this.$navigateTo(Settings)
    },
    goReportDetails (event) {
      this.$navigateTo(ReportDetails, {
        props: {
          report: this.datasets[event.index],
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
