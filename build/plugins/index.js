import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import jumpCode from 'vite-plugin-vue-inspector'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImportApi from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
export const plugins = [
  VueRouter({
    routesFolder: 'src/views',
    exclude: ['**/components/**/*.(vue|jsx)'],
    extensions: ['.vue', '.jsx'],
  }),
  vue(),
  vueJsx(),
  Components({
    resolvers: [
      TDesignResolver({
        library: 'vue-next',
        resolveIcons: true,
      }),
    ],
    include: [/\.vue$/, /\.vue\?vue/, /\.(jsx)$/],
  }),
  AutoImportApi({
    resolvers: [TDesignResolver({
      library: 'vue-next',
    })],
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    imports: ['vue', 'vue-router'],
    eslintrc: {
      enabled: true,
      filepath: './eslintrc-auto-import.json',
      globalsPropValue: 'readonly',
    },
  }),
  jumpCode({
    toggleComboKey: 'control',
  }),
]
