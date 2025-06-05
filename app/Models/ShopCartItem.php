<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopCartItem extends Model
{
    /** @use HasFactory<\Database\Factories\ShopCartItemFactory> */
    use HasFactory;

    protected $fillable = [
        'quantity',
        'user_id',
        'session_id',
        'product_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
