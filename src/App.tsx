import React from 'react';
import './App.css';
import Layout from './app/components/Layout';
import JSONInputForm from './app/components/InputForm';

const App = () => {
  return (
    <Layout home>
      <h1>Manage Your JSONs</h1>
      <JSONInputForm />
    </Layout>
  );
}

export default App;
