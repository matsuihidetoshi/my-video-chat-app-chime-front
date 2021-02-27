import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import { components } from 'aws-amplify-vue'

Vue.config.productionTip = false

const awsmobile: any = {
  "aws_project_region": process.env.VUE_APP_SHRIMPHOUSE_AWS_PROJECT_REGION,// "ap-northeast-1",
  "aws_cognito_identity_pool_id": process.env.VUE_APP_SHRIMPHOUSE_AWS_COGNITO_IDENTITY_POOL_ID,// "ap-northeast-1:fd7b99b7-23db-412e-87ba-b755ecf20941",
  "aws_cognito_region": process.env.VUE_APP_SHRIMPHOUSE_AWS_COGNITO_REGION,// "ap-northeast-1",
  "aws_user_pools_id": process.env.VUE_APP_SHRIMPHOUSE_AWS_USER_POOLS_ID,//"ap-northeast-1_bThIAXc2j",
  "aws_user_pools_web_client_id": process.env.VUE_APP_SHRIMPHOUSE_AWS_USER_POOLS_WEB_CLIENT_ID,//"3omdrkqr6aj7upt8gd5kdff4m8",
  "oauth": {},
  "aws_appsync_graphqlEndpoint": process.env.VUE_APP_SHRIMPHOUSE_AWS_APPSYNC_GRAPHQLENDPOINT,//"https://h2ncb73ukvfilhx6piojgd5cpm.appsync-api.ap-northeast-1.amazonaws.com/graphql",
  "aws_appsync_region": process.env.VUE_APP_SHRIMPHOUSE_AWS_APPSYNC_REGION,//"ap-northeast-1",
  "aws_appsync_authenticationType": process.env.VUE_APP_SHRIMPHOUSE_AWS_APPSYNC_AUTHENTICATIONTYPE//"AMAZON_COGNITO_USER_POOLS"
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
