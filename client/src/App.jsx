import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import Footer from './pages/Footer';
import AuthService from './utils/auth';  // Ensure proper casing
import './index.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const userToken = AuthService.getToken();
  console.log("Retrieved Token:", userToken); // Keep only one console log
  const authorization = userToken ? `Bearer ${userToken}` : '';
  return {
    headers: {
      ...headers,
      authorization,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),  // Combine authLink with httpLink
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
      <Footer />
    </ApolloProvider>
  );
}

export default App;

