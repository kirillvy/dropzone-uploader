/**
 * imports of namespaces, interfaces & types
 */

/**
 * imports of packages
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * imports of components
 */
import Uploader from '..';

describe('<Uploader />', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Uploader />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
}
)
