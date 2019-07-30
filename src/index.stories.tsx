import * as React from 'react';
import { withReadme } from 'storybook-readme';
import { storiesOf } from '@storybook/react';
import Readme from './README.md';
/**
 * imports of README file
 */
// const Readme = require('./README.md');
// const Readme = '';

/**
 * imports of component
 */
import Uploader from '.';

const stories = storiesOf('Features', module);

stories.add(
  'Uploader component',
  withReadme(Readme, () => (
    <Uploader />
  )),
);
