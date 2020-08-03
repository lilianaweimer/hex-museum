import React from 'react';
import Footer from './Footer';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Footer', () => {

  it('should render', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(getByText('all art is from the')).toBeInTheDocument();
    expect(getByText('harvard art museum')).toBeInTheDocument();
  });

});