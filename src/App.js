import React from 'react';
// import { hot } from 'react-hot-loader';
import './App.css';
import { useEffect } from 'react';
import Header from './Header/Header.js';
import Container from '@mui/material/Container';
import SearchBar from './SearchBar/SearchBar.js';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage.js';
import AllData from './pages/allData/AllData.js';
import RecipeDetails from './pages/details/RecipeDetails';
import CategoriesSort from './pages/sorting/CategoriesSort';
import IngredientsSort from './pages/sorting/IngredientsSort';
import { fetchRecipes } from './store/dataRecipesSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.dataRecipes);

  useEffect(() => {
    dispatch(fetchRecipes());
    console.log('fetchRecipes');
  }, []);


  return (
    <div className="App">
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          height: 200,
          backgroundColor: '#7c808e',
          display: { md: 'flex' },
          pt: '88px',
          justifyContent: 'center',
        }}
      >
        <SearchBar />
      </Container>
      {status === 'loading' && <h1>Loading...</h1>}
      {error && <h2>Error {error}</h2>}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/all" element={<AllData />} />
        <Route path="/id=:id" element={<RecipeDetails />} />
        <Route path="/categories/:category" element={<CategoriesSort />} />
        <Route path="/ingredients/:ingredient" element={<IngredientsSort />} />
      </Routes>
    </div>
  );
}

// export default hot(module)(App);
export default App;
