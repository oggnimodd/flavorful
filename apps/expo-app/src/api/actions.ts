import { Category, CategoryResponse, Meal, MealResponse } from "@/models";
import api from "./axios";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<CategoryResponse>("categories.php");
  return response.data.categories;
};

export const getRecipes = async (category = "Beef"): Promise<Meal[]> => {
  const response = await api.get<MealResponse>("filter.php", {
    params: {
      c: category,
    },
  });
  return response.data.meals;
};
