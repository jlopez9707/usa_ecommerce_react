<?php

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class DeleteProductAction
{
    /**
     * Delete a product from the database.
     *
     * @param Product $product
     * @return bool
     */
    public function execute(Product $product): bool
    {
        // Delete the product image if it exists
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        // Delete the product
        return $product->delete();
    }
}
