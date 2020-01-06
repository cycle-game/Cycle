import { withInfo } from '@storybook/addon-info';
import { addDecorator, configure } from '@storybook/react';

addDecorator(withInfo());

function loadStories() {
    const req = require.context('../src', true, /\.stories\.tsx$/);
    req.keys().forEach(filename => req(filename));
}

// Load app global scss
import '../src/app/App.scss';

configure(loadStories, module);
