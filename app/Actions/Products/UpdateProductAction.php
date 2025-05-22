<?php

namespace App\Actions\Products;

use App\Models\Product;
use App\Models\Image;
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
        // Extract data for special handling
        $newImages = $data['newImages'] ?? [];
        $deleteImageIds = $data['deleteImageIds'] ?? [];
        $categoryIds = $data['category_ids'] ?? [];

        // Remove them from data array
        unset($data['newImages'], $data['deleteImageIds'], $data['category_ids']);

        // Update product basic information
        $product->update($data);

        // Process and store new images
        if (!empty($newImages)) {
            foreach ($newImages as $image) {
                if ($image instanceof UploadedFile) {
                    $path = $image->store('products', 'public');

                    // Create new image record
                    $product->images()->create([
                        'url' => $path
                    ]);
                }
            }
        }

        // Delete images if requested
        if (!empty($deleteImageIds)) {
            // Get images to delete
            $imagesToDelete = $product->images()->whereIn('id', $deleteImageIds)->get();

            // Delete each image file and record
            foreach ($imagesToDelete as $image) {
                // Delete the file from storage
                if (Storage::disk('public')->exists($image->url)) {
                    Storage::disk('public')->delete($image->url);
                }

                // Delete the record
                $image->delete();
            }
        }

        // Update categories
        $product->categories()->sync($categoryIds);

        // Refresh product with relations
        $product = $product->fresh(['images', 'categories']);

        return $product;
    }
}
