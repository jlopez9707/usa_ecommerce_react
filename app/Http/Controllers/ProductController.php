<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Actions\Products\StoreProductAction;
use App\Actions\Products\UpdateProductAction;
use App\Actions\Products\DeleteProductAction;
use App\Actions\Products\GetProductsAction;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    protected StoreProductAction $storeProductAction;
    protected UpdateProductAction $updateProductAction;
    protected DeleteProductAction $deleteProductAction;
    protected GetProductsAction $getProductsAction;

    public function __construct(
        StoreProductAction $storeProductAction,
        UpdateProductAction $updateProductAction,
        DeleteProductAction $deleteProductAction,
        GetProductsAction $getProductsAction
    ) {
        $this->storeProductAction = $storeProductAction;
        $this->updateProductAction = $updateProductAction;
        $this->deleteProductAction = $deleteProductAction;
        $this->getProductsAction = $getProductsAction;
    }

    public function index(Request $request)
    {
        $filters = $request->only([
            'category',
            'search',
            'min_price',
            'max_price',
            'sort_field',
            'sort_direction',
            'page',
            'per_page'
        ]);

        return Inertia::render('products/list', [
            'products' => $this->getProductsAction->execute($filters),
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('products/create', [
            'categories' => $categories
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $this->storeProductAction->execute($request->validated());

        return redirect()->route('products.index')
            ->with('success', 'Producto creado exitosamente');
    }

    public function show(Product $product)
    {
        $product->load(['categories', 'images']);

        return Inertia::render('products/show', [
            'product' => $product
        ]);
    }

    public function edit(Product $product)
    {
        $product->load(['categories', 'images']);
        $categories = Category::all();

        return Inertia::render('products/edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        // Depuración de los datos recibidos
        Log::info('Datos recibidos en el controlador para actualizar producto', [
            'tiene_imagenes' => $request->hasFile('newImages'),
            'archivos' => $request->allFiles(),
            'todos_los_datos' => $request->all(),
        ]);

        $this->updateProductAction->execute($product, $request->validated());

        return redirect()->route('products.index')
            ->with('success', 'Producto actualizado exitosamente');
    }

    public function destroy(Product $product)
    {
        $this->deleteProductAction->execute($product);

        return redirect()->route('products.index')
            ->with('success', 'Producto eliminado exitosamente');
    }
}
