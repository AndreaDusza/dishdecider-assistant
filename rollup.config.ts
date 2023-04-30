import typescript from '@rollup/plugin-typescript';
import {RollupOptions} from "rollup";

export default {
  input: 'src/index.ts',
  external: 'jquery',
  output: {
    dir: 'dist',
    format: 'iife',
    globals: {
      jquery: '$',
      uikit: 'UIkit',
    },
    interop: dep => {
      switch (dep) {
        case 'jquery':
          return 'esModule';
        default:
          return 'compat';
      }
    },
  },
  plugins: [typescript()],
} satisfies RollupOptions;
