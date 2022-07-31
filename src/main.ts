import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin, components } from 'aws-amplify-vue'

Vue.config.productionTip = false

const awsmobile: any = {
  "aws_project_region": process.env.VUE_APP_MYVIDEOCHATAPP_AWS_PROJECT_REGION,
  "aws_cognito_identity_pool_id": process.env.VUE_APP_MYVIDEOCHATAPP_AWS_COGNITO_IDENTITY_POOL_ID,
  "aws_cognito_region": process.env.VUE_APP_MYVIDEOCHATAPP_AWS_COGNITO_REGION,
  "aws_user_pools_id": process.env.VUE_APP_MYVIDEOCHATAPP_AWS_USER_POOLS_ID,
  "aws_user_pools_web_client_id": process.env.VUE_APP_MYVIDEOCHATAPP_AWS_USER_POOLS_WEB_CLIENT_ID,
  "oauth": {},
  "aws_appsync_graphqlEndpoint": process.env.VUE_APP_MYVIDEOCHATAPP_AWS_APPSYNC_GRAPHQLENDPOINT,
  "aws_appsync_region": process.env.VUE_APP_MYVIDEOCHATAPP_AWS_APPSYNC_REGION,
  "aws_appsync_authenticationType": process.env.VUE_APP_MYVIDEOCHATAPP_AWS_APPSYNC_AUTHENTICATIONTYPE
}

Amplify.configure(awsmobile)

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
