import React from 'react';
import { Counter } from './features/counter/Couner';
import { User } from './features/users/Users';
import { Text } from './features/text/Text';

function App() {
  return (
  <>
    <Counter by={10}/>
    <Text/>
    <User/>
  </>
  );
}

export default App;
