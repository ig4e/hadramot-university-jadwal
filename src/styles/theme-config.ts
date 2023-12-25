"use client";

import { createTheme, LoadingOverlay, Modal } from "@mantine/core";
import colors from "tailwindcss/colors";

export const theme = createTheme({
  primaryColor: "blue",
  primaryShade: { light: 6, dark: 7 },
  colors: {
    green: Object.values(colors.emerald).slice(1, -1) as any,
    red: Object.values(colors.red).slice(1, -1) as any,
    blue: Object.values(colors.blue).slice(1, -1) as any,
    gray: Object.values(colors.slate).slice(1, -1) as any,
    dark: Object.values(colors.zinc).slice(2, -1) as any,
  },
  defaultRadius: "md",
  components: {
    Modal: Modal.extend({
      defaultProps: {
        overlayProps: {
          blur: 3,
        },
      },
    }),

    LoadingOverlay: LoadingOverlay.extend({
      styles(theme, props, ctx) {
        return {
          overlay: {
            borderRadius: theme.radius.md,
          },
        };
      },
      defaultProps: {
        overlayProps: {
          blur: 3,
        },
      },
    }),
  },
});
