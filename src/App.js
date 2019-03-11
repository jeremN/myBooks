import React, { Component } from 'react';

import Layout from './containers/Layout/Layout';
import Input from './components/UI/Input/Input';
import Button from './components/UI/Button/Button';
import Card from './components/UI/Card/Card';
import Table from './components/UI/Table/Table';

class App extends Component {
  state = {

  }

  render() {
    return (
      <div>
        <Layout>
          <Card>
            <Input />
            <Button btnType={ "Button--blue" }>Search</Button>
          </Card>
          <div>
            <Table />
          </div>
        </Layout>
      </div>
    );
  }
}

export default App;
