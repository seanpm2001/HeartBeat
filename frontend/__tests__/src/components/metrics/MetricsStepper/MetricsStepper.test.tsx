import { fireEvent, render } from '@testing-library/react'
import MetricsStepper from '@src/components/Metrics/MetricsStepper'
import { Provider } from 'react-redux'
import { NEXT, BACK, STEPS, EXPORT_BOARD_DATA } from '../../../fixtures'
import { setupStore } from '../../../utils/setupStoreUtil'

describe('MetricsStepper', () => {
  let store = setupStore()
  beforeEach(() => {
    store = setupStore()
  })

  const setup = () =>
    render(
      <Provider store={store}>
        <MetricsStepper />
      </Provider>
    )

  it('should show Metrics stepper', () => {
    const { getByText } = setup()

    STEPS.map((label) => {
      expect(getByText(label)).toBeInTheDocument()
    })
    expect(getByText(NEXT)).toBeInTheDocument()
    expect(getByText(BACK)).toBeInTheDocument()
  })

  it('should show Metrics config step when click back button given config step ', () => {
    const { getByText } = setup()

    fireEvent.click(getByText(BACK))

    expect(getByText('Project Name')).toBeInTheDocument()
  })

  it('should show Metrics Metrics step when click next button given config step', async () => {
    const { getByText } = setup()

    fireEvent.click(getByText(NEXT))

    expect(getByText('Project Name')).toBeInTheDocument()
  })

  it('should show Metrics config step when click back button given Metrics step', async () => {
    const { getByText } = setup()

    fireEvent.click(getByText(NEXT))
    fireEvent.click(getByText(BACK))
    expect(getByText('Project Name')).toBeInTheDocument()
  })

  it('should show Metrics export step when click next button given export step', async () => {
    const { getByText } = setup()

    fireEvent.click(getByText(NEXT))
    fireEvent.click(getByText(NEXT))

    fireEvent.click(getByText(EXPORT_BOARD_DATA))
    expect(getByText('Project Name')).toBeInTheDocument()
  })
})
