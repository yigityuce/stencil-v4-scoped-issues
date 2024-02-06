import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-starter-project-name',
  autoprefixCss: true,
  taskQueue: 'congestionAsync',
  extras: {
    tagNameTransform: true,
    experimentalSlotFixes: true,
    scopedSlotTextContentFix: true,
    enableImportInjection: true,
    experimentalImportInjection: true,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
};
