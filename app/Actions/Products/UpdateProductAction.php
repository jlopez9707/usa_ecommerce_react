<?php

namespace App\Actions\Products;

use App\Models\Product;
use App\Models\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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

        // Registro de datos recibidos
        Log::info('Datos recibidos para actualizar producto', [
            'product_id' => $product->id,
            'tiene_nuevas_imagenes' => !empty($newImages),
            'cantidad_imagenes_nuevas' => count($newImages),
            'ids_imagenes_a_eliminar' => $deleteImageIds,
            'category_ids' => $categoryIds,
        ]);

        // Remove them from data array
        unset($data['newImages'], $data['deleteImageIds'], $data['category_ids']);

        // Update product basic information
        $product->update($data);
        Log::info('Información básica del producto actualizada');

        // Process and store new images
        if (!empty($newImages)) {
            Log::info('Procesando nuevas imágenes', ['cantidad' => count($newImages)]);
            foreach ($newImages as $image) {
                if ($image instanceof UploadedFile) {
                    $path = $image->store('products', 'public');
                    Log::info('Nueva imagen guardada', ['path' => $path]);

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

            Log::info('Imágenes a eliminar', ['ids' => $deleteImageIds, 'encontradas' => $imagesToDelete->count()]);

            // Delete each image file and record
            foreach ($imagesToDelete as $image) {
                // Delete the file from storage
                if (Storage::disk('public')->exists($image->url)) {
                    Log::info('Eliminando archivo de imagen', ['url' => $image->url]);
                    Storage::disk('public')->delete($image->url);
                } else {
                    Log::warning('Archivo de imagen no encontrado', ['url' => $image->url]);
                }

                // Delete the record
                $image->delete();
                Log::info('Registro de imagen eliminado', ['id' => $image->id]);
            }
        }

        // Update categories - verificar si están vacías
        if (empty($categoryIds)) {
            Log::warning('No se recibieron categorías para el producto', ['product_id' => $product->id]);
            // No hacer nada con las categorías si no se enviaron
        } else {
            Log::info('Actualizando categorías', [
                'product_id' => $product->id,
                'category_ids' => $categoryIds,
                'categorias_recibidas' => count($categoryIds)
            ]);

            $product->categories()->sync($categoryIds);
        }

        // Refresh product with relations
        $product = $product->fresh(['images', 'categories']);
        Log::info('Producto actualizado completamente', [
            'product_id' => $product->id,
            'imagenes_actuales' => $product->images->count(),
            'categorias_actuales' => $product->categories->count()
        ]);

        return $product;
    }
}
