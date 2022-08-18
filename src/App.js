import { QueryClient, QueryClientProvider } from "react-query";

import NavBar from "components/NavBar";
import GridContainer from "components/GridContainer";
import CharactersFilter from "components/CharactersFilter";
import { SearchProvider } from "contexts/SearchContext";

import "App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <SearchProvider>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <header>
            <NavBar />
          </header>
          <main>
            <CharactersFilter />
            <GridContainer />
          </main>
          <footer>Marver Comics browser by Ashish Padalkar</footer>
        </div>
      </QueryClientProvider>
    </SearchProvider>
  );
}

export default App;
