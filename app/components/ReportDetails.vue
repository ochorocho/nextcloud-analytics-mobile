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
      <StackLayout orientation="vertical" height="100%">
        <ActivityIndicator :visibility="activityState" class="loading" busy="true"/>
        <ListView for="item in data">
          <v-template>
            <GridLayout rows="auto" columns="*">
              <Label horizontalAlignment="left" class="list-item" :text="item[0]" />
              <Label horizontalAlignment="center" class="list-item" :text="item[1]" />
              <Label horizontalAlignment="right" class="list-item" :text="item[2]" />
            </GridLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Home from '~/components/Home'
import { apiRequest } from '~/modules/apiRequest'
import { isOnline } from '~/modules/utils'

export default {
  props: ['report'],
  data() {
    return {
      data: {},
      activityState: 'visible'
    }
  },
  beforeMount(){
    this.getData();
  },

  methods: {
    getData() {
      if(!isOnline()) {
        return;
      }

      let api = new apiRequest(`/apps/analytics/api/3.0/data/${this.report.id}`)
      api.get().then((response) => {
        this.data = response.content.toJSON();
        this.activityState = 'collapsed';
      });
    },
    goToHome() {
      this.$navigateTo(Home)
    },
    goToSettings () {
      // this.$navigateTo(Settings)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
