// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  external: 'jquery',
  output: {
    dir: 'dist',
    format: 'iife',
    globals: {
      'jquery': '$',
      'uikit': 'UIkit',
    },
  },
  plugins: [typescript()],
};
