<?php

namespace App\Actions\Categories;

use App\Models\Category;

class StoreCategoryAction
{
    /**
     * Store a new category in the database.
     *
     * @param array $data
     * @return Category
     */
    public function execute(array $data): Category
    {
        // Create and return the category
        return Category::create($data);
    }
}
