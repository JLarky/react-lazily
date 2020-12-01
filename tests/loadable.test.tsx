import React, { Suspense } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { loadable } from '../src/loadable'

it('Shows loading for some random component', async () => {
  const f = jest.fn()
  const { Component } = loadable(() => new Promise((r) => f(r)), {
    fallback: 'Loading...',
  })

  const App: React.FC = () => {
    const [open, setOpen] = React.useReducer(() => true, false)
    return <>{open ? <Component /> : <button onClick={setOpen}>Load</button>}</>
  }

  const { findByText, getByText } = render(<App />)

  fireEvent.click(getByText('Load'))
  await findByText('Loading...')

  expect(f).toBeCalledTimes(1)
})
