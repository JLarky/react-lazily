import React, { Suspense } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { lazily } from '../src/index'

it('Shows loading for some random component', async () => {
  const f = jest.fn()
  const { Component } = lazily(() => new Promise((r) => f(r)))

  const App: React.FC = () => {
    const [open, setOpen] = React.useReducer(() => true, false)
    return (
      <>
        {open ? (
          <Suspense fallback={<>Loading...</>}>
            <Component />
          </Suspense>
        ) : (
          <button onClick={setOpen}>Load</button>
        )}
      </>
    )
  }

  const { findByText, getByText } = render(<App />)

  fireEvent.click(getByText('Load'))
  await findByText('Loading...')

  expect(f).toBeCalledTimes(1)
})
