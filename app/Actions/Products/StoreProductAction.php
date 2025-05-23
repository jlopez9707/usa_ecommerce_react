<?php

namespace App\Actions\Products;

use App\Models\Product;
use App\Models\Image;
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
        // Extract image and category data
        $images = $data['images'] ?? [];
        $categoryIds = $data['category_ids'] ?? [];

        // Remove them from the data array
        unset($data['images'], $data['category_ids']);

        // Create the product
        $product = Product::create($data);

        // Process and store images
        if (!empty($images)) {
            foreach ($images as $image) {
                if ($image instanceof UploadedFile) {
                    $path = $image->store('products', 'public');

                    // Create image record with polymorphic relation
                    $product->images()->create([
                        'url' => $path
                    ]);
                }
            }
        }

        // Attach categories
        if (!empty($categoryIds)) {
            $product->categories()->attach($categoryIds);
        }

        // Load the images relation
        $product->load('images');

        return $product;
    }
}
