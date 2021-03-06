import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as renderer from 'react-test-renderer';
import { Customizer } from '../../Utilities';
import { createTheme } from '../../Styling';

import { Link } from './Link';

describe('Link', () => {
  it('renders Link correctly', () => {
    const component = renderer.create(<Link href="#">I'm a link</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders disabled Link correctly', () => {
    const component = renderer.create(
      <Link href="#" disabled={true}>
        I'm a disabled link
      </Link>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Link with no href as a button', () => {
    const component = renderer.create(<Link>I'm a link as a button</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders disabled Link with no href as a button correctly', () => {
    const component = renderer.create(<Link disabled={true}>I'm a link as a button</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Link with a custom class name', () => {
    const component = renderer.create(
      <Link href="#" className="customClassName">
        I'm a link
      </Link>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Link with "as=div" a div element', () => {
    const component = renderer.create(
      <Link as="div" className="customClassName">
        I'm a div
      </Link>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('supports non button/anchor html attributes when "as=" is used', () => {
    const component = renderer.create(
      <Link as="blockquote" cite={'hi'} className="customClassName">
        I'm a blockquote
      </Link>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Link with "as=Route" a Route element', () => {
    class Route extends React.Component {
      public render() {
        return null;
      }
    }

    const component = renderer.create(
      <Link as={Route} className="customClassName">
        I'm a Route
      </Link>
    );
    const testInstance = component.root;
    expect(() => testInstance.findByType(Route)).not.toThrow();
  });
  it('can have the global styles for Link component be disabled', () => {
    const NoClassNamesTheme = createTheme({ disableGlobalClassNames: true });

    expect(
      /ms-Link($| )/.test(
        ReactDOM.renderToStaticMarkup(
          <Customizer settings={{ theme: NoClassNamesTheme }}>
            <Link href="helloworld.html">My Link</Link>
          </Customizer>
        )
      )
    ).toBe(false);
  });
});
