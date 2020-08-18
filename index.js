/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import * as React from 'react';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {name as appName} from './app.json';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  name: `react-native-${Platform.OS}`,
  version: '1.0.0',
});

const RegisterApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => RegisterApp);
