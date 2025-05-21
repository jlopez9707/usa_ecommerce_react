<?php

namespace App\Actions\Categories;

use App\Models\Category;

class UpdateCategoryAction
{
    /**
     * Update an existing category in the database.
     *
     * @param Category $category
     * @param array $data
     * @return Category
     */
    public function execute(Category $category, array $data): Category
    {
        // Update the category
        $category->update($data);

        return $category->fresh();
    }
}
