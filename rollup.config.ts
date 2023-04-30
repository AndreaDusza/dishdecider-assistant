import typescript from '@rollup/plugin-typescript';
import { RollupOptions } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

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
  plugins: [
    typescript(),
    nodeResolve(),
  ],
} satisfies RollupOptions;
