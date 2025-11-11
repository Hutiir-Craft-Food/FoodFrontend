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

  test('shows loading state', () => {
    useBreadcrumbs.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    })

    render(<Breadcrumbs categoryId={1} productName="Яблуко" />)

    expect(screen.getByText(/Завантаження.../i)).toBeInTheDocument()
  })

  test('shows error message', () => {
    useBreadcrumbs.mockReturnValue({
      data: null,
      loading: false,
      error: 'Network error',
    })

    render(<Breadcrumbs categoryId={2} productName="Яблуко" />)

    expect(
      screen.getByText(/Не вдалось завантажити навігацію по каталогу -/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/Network error/i)).toBeInTheDocument()
  })

  test('renders breadcrumbs', () => {
    const breadcrumbs = {
      id: 10,
      name: 'Фрукти',
      children: [{ id: 12, name: 'Цитрусові', children: [] }],
    }

    useBreadcrumbs.mockReturnValue({
      data: breadcrumbs,
      loading: false,
      error: null,
    })

    render(
      <MemoryRouter>
        <Breadcrumbs categoryId={12} productName="Лимон" />
      </MemoryRouter>
    )

    // TODO: fix this test:
    // expect(screen.getByRole('nav')).toBeInTheDocument()

    expect(screen.getByText('Фрукти')).toBeInTheDocument()
    expect(screen.getByText('Цитрусові')).toBeInTheDocument()
    expect(screen.getByText('Лимон')).toBeInTheDocument()
  })
})
