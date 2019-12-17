import { IBundleOptions } from 'father-build';

const options: IBundleOptions = {
  entry: 'src/index.ts',
  esm: 'babel',
  cjs: 'babel',
  // umd: {
  //   name: 'useapi',
  //   globals: {
  //     'react': 'React',
  //   }
  // },
  disableTypeCheck: true,
  preCommit: {
    eslint: true,
    prettier: true,
  }
};

export default options;
