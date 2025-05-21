<?php

namespace App\Actions\Categories;

use App\Models\Category;

class DeleteCategoryAction
{
    /**
     * Delete a category from the database.
     *
     * @param Category $category
     * @return bool|null
     */
    public function execute(Category $category): ?bool
    {
        return $category->delete();
    }
}
