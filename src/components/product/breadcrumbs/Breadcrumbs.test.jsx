import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
import useBreadcrumbs from './useBreadcrumbs'

jest.mock('./useBreadcrumbs')

describe('Breadcrumbs component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('shows loading state ', () => {
    useBreadcrumbs.mockReturnValue({ breadcrumbs: [], loading: true, error: null })

    render(
      <MemoryRouter>
        <Breadcrumbs categoryId={1} productName="Яблуко" />
      </MemoryRouter>
    )

    expect(screen.getByText(/Завантаження.../i)).toBeInTheDocument()
  })

  test('shows error message', () => {
    useBreadcrumbs.mockReturnValue({ breadcrumbs: [], loading: false, error: 'Network error' })

    render(
      <MemoryRouter>
        <Breadcrumbs categoryId={2} productName="Яблуко" />
      </MemoryRouter>
    )

    expect(
      screen.getByText(/Не вдалось завантажити навігацію по каталогу -/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/Network error/)).toBeInTheDocument()
  })

  test('renders breadcrumbs ', () => {
    const breadcrumbs = [
      { id: '10', name: 'Фрукти' },
      { id: '12', name: 'Цитрусові' }
    ]

    useBreadcrumbs.mockReturnValue({ breadcrumbs: breadcrumbs, loading: false, error: null })

    render(
      <MemoryRouter>
        <Breadcrumbs categoryId={10} productName="Лимон" />
      </MemoryRouter>
    )

    
    const catalogLink = screen.getByRole('link', { name: 'catalog icon' })
    expect(catalogLink).toBeInTheDocument()
    expect(screen.getByText('Фрукти')).toBeInTheDocument()
    expect(screen.getByText('Цитрусові')).toBeInTheDocument()
    expect(screen.getByText('Лимон')).toBeInTheDocument()
  })
})
