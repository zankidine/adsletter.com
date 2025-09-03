import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import adonisjs from '@adonisjs/vite/client'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    inertia({ ssr: { enabled: true, entrypoint: 'resources/ts/ssr.ts' } }), 
    svelte(), 
    adonisjs({ entrypoints: ['resources/ts/app.ts'], reload: ['resources/views/**/*.{edge,svelte}'] }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/resources/`,
      '~/lib/': `${getDirname(import.meta.url)}/resources/lib/`,
    },
  },
})
