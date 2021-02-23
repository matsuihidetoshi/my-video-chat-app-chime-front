import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';
import { VuetifyPreset } from 'vuetify/types/services/presets';
import ja from 'vuetify/src/locale/ja'

const options: VuetifyPreset = {
  lang: {
    current: 'ja',
    locales: { ja },
    t: undefined as any,
  },
  theme: {
    dark: false,
    default: 'dark',
    disable: false,
    options: {},
    themes: {
      light: {
        primary: '#eb559f',
        accent: colors.grey.lighten3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      },
      dark: {
        primary: '#eb559f',
        accent: colors.grey.lighten3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      }
    }
  },
  customProperties: true,
  breakpoint: {
    mobileBreakpoint: "sm",
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
  },
  icons: {
    iconfont: 'mdiSvg',
    values: {}
  }
};

Vue.use(Vuetify);

export default new Vuetify( options );
