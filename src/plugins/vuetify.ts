/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import defaultTheme from "@/themes/defaultTheme";
const theme = localStorage.getItem("theme");

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes : defaultTheme,
    defaultTheme: theme ?? 'dark',
  },
})
