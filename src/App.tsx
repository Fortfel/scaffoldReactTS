import { Component, type ReactNode } from 'react'

// Define an interface for your state
type AppState = {
  name: {
    firstName: string
    lastName: string
  }
  company: string
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props)
    this.state = {
      name: {
        firstName: 'John',
        lastName: 'Doe',
      },
      company: 'Acme Inc',
    }
  }

  render(): ReactNode {
    return (
      <div>
        <p className={'line-clamp-4 text-shadow-md'}>
          Hi {this.state.name.firstName} {this.state.name.lastName} from {this.state.company}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, consectetur consequatur culpa deserunt
          ducimus earum est et mollitia neque nulla odio saepe ut veritatis? Architecto asperiores assumenda culpa cum
          delectus ducimus ea eligendi eos harum illum iste maiores minus nisi nobis, obcaecati odio placeat quis
          recusandae rem repellat repellendus voluptate?
        </p>
        <button
          type="button"
          onClick={() => this.setState((state) => ({ name: { ...state.name, firstName: 'Piotr' } }))}
        >
          Click me
        </button>
      </div>
    )
  }
}

export { App }
