import React from 'react';
import * as renderer from 'react-test-renderer';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/reducers/main';
import { BrowserRouter as Router } from 'react-router-dom';


// test('renders learn react link', () => {
//   const { getByText } = render(<Provider store={store}>
//     <Router>
//       <App />
//       </Router>
//       </Provider>);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
it("App renders correctly", () => {
  // const props = {
  //   className: "test", value: true, onSelectChanged: (value: boolean) => {return;} };
    const tree = renderer
    .create(<Provider store={store}><Router><App/></Router></Provider>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});