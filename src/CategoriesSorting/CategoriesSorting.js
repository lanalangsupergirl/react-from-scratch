import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import RecipeItem from '../RecipeItem/RecipeItem'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showFullRecipe, currentRecipeId } from '../store/fullRecipeSlice';
import { useParams } from 'react-router-dom'

export default function CategoriesSorting() {
    const {category} = useParams();
    const dataRecipes = useSelector((state) => state.dataRecipes.dataRecipes);

    let filteredCategories =[];

      dataRecipes.forEach((recipe) => {
        let cat = recipe.categories;
        for (let i = 0; i < cat.length; i++) {
          if (cat[i] === category) {
            filteredCategories.push(recipe);
          }
        }
      });

      const dispatch = useDispatch();

      const handleOnItemClick = React.useCallback(
        (id) => {
          dispatch(showFullRecipe(true));
          dispatch(currentRecipeId(id));
        },
        [currentRecipeId, showFullRecipe],
      );

    return (
      <Container disableGutters maxWidth="100%">
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredCategories.map((recipe, index) => (
            <Link
              to={`/${recipe.title}`}
              style={{ color: 'inherit', textDecoration: 'inherit' }}
              key={'item' + recipe.id}
            >
              <RecipeItem
                index={index}
                title={recipe.title}
                src={recipe.images}
                subheader={recipe['macros-info']}
                alt={recipe.title}
                description={recipe.description}
                text={recipe.text}
                onItemClick={handleOnItemClick}
                id={recipe.id}
              />
            </Link>
          ))}
        </Box>
      </Container>
    );
}