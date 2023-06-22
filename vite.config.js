import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { ElementPlusResolver as elementPlusResolver } from 'unplugin-vue-components/resolvers'
import icons from 'unplugin-icons/vite'
import iconsResolver from 'unplugin-icons/resolver'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    // 项目部署在主域名的子文件使用,例如http://localhost:3000/myvite/。不填默认就是/
    base: env.VITE_BASE_PATH || '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@api': resolve(__dirname, 'src/api'),
        '@components': resolve(__dirname, 'src/components')
      },
      extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    define: {
      'process.env': { ...env } // 将加载的环境变量注入到 Vite 的构建过程中
    },
    plugins: [
      vue(),
      icons({
        autoInstall: true,
        compiler: 'vue3'
      }),
      autoImport({
        imports: ['vue'],
        resolvers: [
          elementPlusResolver(),
          iconsResolver() // 自动导入图标组件
        ]
      }),
      components({
        resolvers: [
          elementPlusResolver(),
          // 自动注册图标组件
          iconsResolver({
            enabledCollections: ['ep']
          })
        ]
      }),
      createStyleImportPlugin({
        libs: [
          {
            libraryName: 'element-plus',
            resolveStyle: (name) => `element-plus/lib/theme-chalk/${name}.css`
          }
        ]
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons/svg')], // 指定需要缓存的图标文件夹 SVG 图标文件夹路径
        symbolId: 'icon-[dir]-[name]' // 指定symbolId格式 图标组件的名称格式
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE // 将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
          }
        }
      })
    ],
    // 自定义端口号，默认为3000
    server: {
      host: '127.0.0.1',
      port: Number(env.VITE_PORT),
      // 是否开启 https
      https: false,
      // 在开发服务器启动时自动在浏览器中打开应用程序
      open: env.VITE_OPEN,
      base: env.VITE_AXIOS_BASE_URL,
      // 代理配置
      proxy: {
        '^/dev-api/.*': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, '')
        }
      }
    },
    // 打包配置
    build: {
      // 文件夹名称
      outDir: env.VITE_OUT_DIR || 'dist',
      assetsDir: 'assets',
      // 去掉console语句
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
})
