import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import AwsExports from './aws-exports'
import { components } from 'aws-amplify-vue'

Vue.config.productionTip = false

Amplify.configure(AwsExports)

Vue.use(AmplifyPlugin, AmplifyModules)

new Vue({
  router,
  store,
  vuetify,
  components: { 
    App,
    ...components
  },
  render: h => h(App)
}).$mount('#app')
