<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Actions\Categories\StoreCategoryAction;
use App\Actions\Categories\UpdateCategoryAction;
use App\Actions\Categories\DeleteCategoryAction;
use App\Actions\Categories\GetCategoriesAction;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected StoreCategoryAction $storeCategoryAction;
    protected UpdateCategoryAction $updateCategoryAction;
    protected DeleteCategoryAction $deleteCategoryAction;
    protected GetCategoriesAction $getCategoriesAction;

    public function __construct(
        StoreCategoryAction $storeCategoryAction,
        UpdateCategoryAction $updateCategoryAction,
        DeleteCategoryAction $deleteCategoryAction,
        GetCategoriesAction $getCategoriesAction
    ) {
        $this->storeCategoryAction = $storeCategoryAction;
        $this->updateCategoryAction = $updateCategoryAction;
        $this->deleteCategoryAction = $deleteCategoryAction;
        $this->getCategoriesAction = $getCategoriesAction;
    }

    public function index(Request $request)
    {
        $filters = $request->only([
            'search',
            'sort_field',
            'sort_direction',
            'page',
            'per_page'
        ]);

        return Inertia::render('categories/list', [
            'categories' => $this->getCategoriesAction->execute($filters),
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        return Inertia::render('categories/create');
    }

    public function store(StoreCategoryRequest $request)
    {
        $this->storeCategoryAction->execute($request->validated());

        return redirect()->route('categories.index')
            ->with('success', 'Categoría creada exitosamente');
    }

    public function show(Category $category)
    {
        return Inertia::render('categories/show', [
            'category' => $category
        ]);
    }

    public function edit(Category $category)
    {
        return Inertia::render('categories/edit', [
            'category' => $category
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->updateCategoryAction->execute($category, $request->validated());

        return redirect()->route('categories.index')
            ->with('success', 'Categoría actualizada exitosamente');
    }

    public function destroy(Category $category)
    {
        $this->deleteCategoryAction->execute($category);

        return redirect()->route('categories.index')
            ->with('success', 'Categoría eliminada exitosamente');
    }
}
