<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'images' => 'required|array|min:1',
            'images.*' => 'image|max:2048',
            'stock' => 'required|integer|min:0',
            'category_ids' => 'required|array|min:1',
            'category_ids.*' => 'exists:categories,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'category_ids.required' => 'Debe seleccionar al menos una categoría',
            'category_ids.min' => 'Debe seleccionar al menos una categoría',
            'images.required' => 'Debe subir al menos una imagen',
            'images.min' => 'Debe subir al menos una imagen',
        ];
    }
}
