'use client'

import { createTheme } from "@mui/material"
import { Alike } from "next/font/google"

const alike = Alike({
  weight: "400",
  style: "normal",
  subsets: ["latin"]
})

const theme = createTheme({
  typography: {
    fontFamily: alike.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: ${alike.style.fontFamily};
          font-style: ${alike.style.fontStyle};
          font-display: swap;
          font-weight: ${alike.style.fontWeight};
        }
      `
    }
  }
})

export default theme