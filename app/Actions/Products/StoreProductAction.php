<?php

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class StoreProductAction
{
    /**
     * Store a new product in the database.
     *
     * @param array $data
     * @return Product
     */
    public function execute(array $data): Product
    {
        // Handle image upload if there's an image
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $path = $data['image']->store('products', 'public');
            $data['image'] = $path;
        }

        // Handle categories
        $categoryIds = $data['category_ids'] ?? [];
        unset($data['category_ids']);

        // Create the product
        $product = Product::create($data);

        // Attach categories
        if (!empty($categoryIds)) {
            $product->categories()->attach($categoryIds);
        }

        // Add image URL for frontend
        if ($product->image) {
            $product->image_url = Storage::url($product->image);
        }

        return $product;
    }
}
