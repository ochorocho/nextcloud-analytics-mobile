import Vue from 'nativescript-vue'
import Home from './components/Home'
// import CollectionView from '@nativescript-community/ui-collectionview/vue';
// Vue.use(CollectionView);
// import CanvasSVG from '@nativescript-community/ui-svg/vue';
// Vue.use(CanvasSVG);
// import Canvas from '@nativescript-community/ui-canvas/vue';
// Vue.use(Canvas);

Vue.config.silent = false;

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()

