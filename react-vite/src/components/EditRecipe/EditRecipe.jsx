import './EditRecipe.css'
import CreateRecipe from '../CreateRecipe'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { thunkGetSelectedRecipe } from '../../redux/recipe'

export default function EditRecipe() {
    const dispatch = useDispatch()
    const {recipeId} = useParams()
    const recipes = useSelector(state => state.recipes)
    const recipe = recipes[recipeId]

    const newIngredients = {}

    for (let key in recipe?.ingredients) {
        const ingredient = recipe.ingredients[key]
        newIngredients[ingredient.ingredient] = ingredient
    }

    const prevForm = {
        id: recipe?.id,
        owner_id: recipe?.owner_id,
        title: recipe?.title,
        description: recipe?.description,
        servings: recipe?.servings,
        category: recipe?.category_id,
        prepTime: recipe?.prep_time,
        cookTime: recipe?.cook_time,
        previewImage: recipe?.preview_image,
        ingredients: newIngredients,
        steps: recipe?.steps
    }

    useEffect(() => {
        dispatch(thunkGetSelectedRecipe(recipeId))
    }, [dispatch, recipeId])

    if (!recipe || !prevForm.steps || !prevForm.ingredients) return
    return (
        <CreateRecipe prevForm={prevForm} update={true}/>
    )
}
