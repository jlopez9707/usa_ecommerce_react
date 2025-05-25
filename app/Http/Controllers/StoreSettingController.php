<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StoreSetting;
use Inertia\Inertia;

class StoreSettingController extends Controller
{
    public function index()
    {
        $storeSettings = StoreSetting::all();
        return Inertia::render('admin/storeSettings/index', compact('storeSettings'));
    }

    public function update(Request $request, StoreSetting $storeSetting)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        return redirect()->route('admin.storeSettings.index')->with('success', 'Configuraciones de la tienda actualizadas exitosamente');
    }
}
