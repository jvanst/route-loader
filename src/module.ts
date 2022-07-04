import { resolve } from 'path'
import { fileURLToPath } from 'url'
import glob from 'glob'
import { defineNuxtModule, addPlugin, addServerHandler, addComponent, addComponentsDir, addAutoImport, addAutoImportDir } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'route-loader',
    configKey: 'myModule'
  },
  defaults: {},
  async setup(options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))

    addComponentsDir({
      path: resolve(runtimeDir, 'components'),
      pathPrefix: false,
      prefix: '',
      level: 999,
      global: true
    })

    addAutoImportDir(resolve(runtimeDir, 'composables'))

    const { srcDir } = nuxt.options;
    const actionPaths = glob.sync("**\/*.action.{js,ts}", { cwd: srcDir });
    const loaderPaths = glob.sync("**\/*.loader.{js,ts}", { cwd: srcDir });

    for (const path of actionPaths) {
      const route =
        path
          .replace(/pages/g, "")
          .replace(/.action.ts/g, "")
          .replace(/\/index/g, "");

      addServerHandler({
        route: `/api/action${route}`,
        method: 'post',
        handler: resolve(srcDir, path),
      })
    }

    for (const path of loaderPaths) {
      const route =
        path
          .replace(/pages/g, "")
          .replace(/.loader.ts/g, "")
          .replace(/\/index/g, "");

      addServerHandler({
        route: `/api/loader${route}`,
        method: 'get',
        handler: resolve(srcDir, path),
      })
    }
  }
})
