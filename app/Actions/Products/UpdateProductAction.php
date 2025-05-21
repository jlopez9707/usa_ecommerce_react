<?php

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UpdateProductAction
{
    /**
     * Update an existing product in the database.
     *
     * @param Product $product
     * @param array $data
     * @return Product
     */
    public function execute(Product $product, array $data): Product
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $path = $data['image']->store('products', 'public');
            $data['image'] = $path;
        } else {
            unset($data['image']);
        }

        $categoryIds = $data['category_ids'] ?? [];
        unset($data['category_ids']);

        $product->update($data);

        $product->categories()->sync($categoryIds);

        $product = $product->fresh();

        if ($product->image) {
            $product->image_url = Storage::url($product->image);
        }

        return $product;
    }
}
