import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Similarity/i);
  expect(linkElement).toBeInTheDocument();
});
