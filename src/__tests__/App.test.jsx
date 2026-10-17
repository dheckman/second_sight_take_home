import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.jsx';

const pharmacyNames = ['Walgreens', 'Walmart', 'Rite Aid'];

function mockPharmacyResponse(pharmacies = pharmacyNames) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({ pharmacies }),
  }));
}

describe('pharmacy network', () => {
  beforeEach(() => {
    mockPharmacyResponse();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('loads available pharmacies from the API and starts with no contracted pharmacies', async () => {
    let resolveFetch;
    fetch.mockImplementation(() => new Promise((resolve) => {
      resolveFetch = resolve;
    }));

    render(<App />);

    expect(fetch).toHaveBeenCalledWith('/api/pharmacies');
    expect(screen.getByRole('status')).toHaveTextContent('Loading pharmacies');

    const availableList = screen.getByRole('list', { name: 'Available Pharmacies' });
    const contractedList = screen.getByRole('list', { name: 'Contracted Pharmacies' });
    expect(within(contractedList).queryByRole('button')).not.toBeInTheDocument();

    await act(async () => {
      resolveFetch({
        ok: true,
        json: async () => ({ pharmacies: pharmacyNames }),
      });
    });

    expect(await within(availableList).findByRole('button', { name: 'Walgreens' }))
      .toBeInTheDocument();
  });

  it('moves a selected pharmacy to contracted and back to available', async () => {
    render(<App />);

    const availableList = screen.getByRole('list', { name: 'Available Pharmacies' });
    const contractedList = screen.getByRole('list', { name: 'Contracted Pharmacies' });

    const walgreens = await within(availableList).findByRole('button', { name: 'Walgreens' });
    fireEvent.click(walgreens);
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(within(contractedList).getByRole('button', { name: 'Walgreens' }))
      .toBeInTheDocument();
    expect(within(availableList).queryByRole('button', { name: 'Walgreens' }))
      .not.toBeInTheDocument();

    fireEvent.click(within(contractedList).getByRole('button', { name: 'Walgreens' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

    expect(within(availableList).getByRole('button', { name: 'Walgreens' }))
      .toBeInTheDocument();
    expect(within(contractedList).queryByRole('button', { name: 'Walgreens' }))
      .not.toBeInTheDocument();
  });

  it('shows an API error and prevents adding pharmacies when loading fails', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    render(<App />);

    expect(await screen.findByRole('alert'))
      .toHaveTextContent('The API returned HTTP 500.');
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
  });
});
