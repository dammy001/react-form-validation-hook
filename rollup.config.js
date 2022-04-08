/* eslint-disable array-callback-return */
/* eslint-disable import/no-anonymous-default-export */
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from '@rollup/plugin-commonjs';

var MODE = [
 {
  format: 'cjs',
 },
 {
  format: 'esm',
 },
 {
  format: 'umd',
 },
];

let config = [];

MODE.map((m) => {
 const conf = {
  input: 'src/index.ts',
  output: {
   name: 'react-form-validation',
   file: `dist/index.${m.format}.js`,
   format: m.format,
   exports: 'auto',
  },
  // this externalizes react to prevent rollup from compiling it
  external: ['react', /@babel\/runtime/],
  plugins: [
   typescript({ useTsconfigDeclarationDir: true }),
   babel({
    exclude: 'node_modules/**',
    plugins: ['@babel/transform-runtime'],
    babelHelpers: 'runtime',
   }),
   terser({
    module: true,
    output: {
     comments: 'all',
    },
   }),
   commonjs(),
   sourcemaps(),
  ],
 };
 config.push(conf);
});

export default [...config];
