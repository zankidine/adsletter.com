
import { createInertiaApp, type ResolvedComponent } from '@inertiajs/svelte'
import { render as svelteRender } from 'svelte/server'

export default function render(page: any) {
  return createInertiaApp({
    page,
    resolve: (name) => {
      const pages = import.meta.glob<ResolvedComponent>('../views/**/*.svelte', { eager: true })
      return pages[`../views/${name}.svelte`]
    },
    setup({ App, props }) {
      return svelteRender(App, { props })
    },
  })
}