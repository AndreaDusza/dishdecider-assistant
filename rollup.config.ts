import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { RollupOptions } from 'rollup';

export default {
  input: 'src/index.ts',
  external: 'jquery',
  output: {
    dir: 'dist',
    format: 'iife',
    globals: {
      jquery: 'CUSTOM_GLOBAL_DISABLED', // please use libs from provided.ts instead
      uikit: 'CUSTOM_GLOBAL_DISABLED', // please use libs from provided.ts instead
    },
    //interop: dep => {
    //  switch (dep) {
    //    case 'jquery':
    //      return 'default';
    //    default:
    //      return 'compat';
    //  }
    //},
  },
  plugins: [
    typescript(),
    nodeResolve({
      resolveOnly: ["rxjs"],
    }),
  ],
} satisfies RollupOptions;
