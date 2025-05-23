<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            'newImages' => 'sometimes|array',
            'newImages.*' => 'sometimes|image|max:2048',
            'deleteImageIds' => 'sometimes|array',
            'deleteImageIds.*' => 'numeric|exists:images,id',
            'stock' => 'sometimes|required|integer|min:0',
            'category_ids' => 'sometimes|required|array|min:1',
            'category_ids.*' => 'exists:categories,id',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        // Deja que Laravel maneje la validación de forma estándar
        // Esto permitirá que Inertia.js muestre los errores correctamente
        parent::failedValidation($validator);
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del producto es obligatorio',
            'description.required' => 'La descripción del producto es obligatoria',
            'price.required' => 'El precio es obligatorio',
            'price.numeric' => 'El precio debe ser un número',
            'price.min' => 'El precio no puede ser negativo',
            'newImages.*.image' => 'Los archivos deben ser imágenes',
            'stock.required' => 'El stock es obligatorio',
            'stock.integer' => 'El stock debe ser un número entero',
            'stock.min' => 'El stock no puede ser negativo',
            'category_ids.required' => 'Debe seleccionar al menos una categoría',
            'category_ids.min' => 'Debe seleccionar al menos una categoría',
        ];
    }
}
