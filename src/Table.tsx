import React from 'react';

interface TableState { }
interface TableProps { }

export default class App extends React.Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="table-component">
        Table
      </div>
    );
  }
}

