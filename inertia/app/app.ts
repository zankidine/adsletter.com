/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css';

import { createInertiaApp, type ResolvedComponent } from '@inertiajs/svelte'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { hydrate, mount } from 'svelte'

createInertiaApp({
  progress: { color: '#5468FF' },

  resolve: (name) => {
    return resolvePageComponent<ResolvedComponent>(
      `../pages/${name}.svelte`,
      import.meta.glob<ResolvedComponent>('../pages/**/*.svelte'),
    )
  },

  setup({ el, App, props }) {
    if (!el) throw new Error('Missing root element. Make sure to add a div#app to your page')

    if (el.dataset.serverRendered === 'true') {
      hydrate(App, { target: el, props })
    } else {
      mount(App, { target: el, props })
    }
  },
})