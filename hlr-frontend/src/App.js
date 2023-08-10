import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
function App() {

  return (
    <>
      <div >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
