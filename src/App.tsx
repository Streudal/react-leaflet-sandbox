import React from 'react';
import Map from './Map';
import Table from './Table';

interface AppState {
  title: string;
}
interface AppProps { }

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: 'App Title'
    }
  }

  updateTitle = (text: string) => {
    console.log(text)
    this.setState({ title: text });
  }

  render() {
    const { title } = this.state;

    return (
      <div className="App">
        <h1>{title}</h1>
        <Map setTitle={this.updateTitle} />
        <Table />
      </div>
    );
  }
}
