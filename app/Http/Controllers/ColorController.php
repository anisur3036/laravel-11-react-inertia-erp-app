<?php

namespace App\Http\Controllers;

use App\Http\Resources\ColorResource;
use App\Models\Color;
use App\Http\Requests\StoreColorRequest;
use App\Http\Requests\UpdateColorRequest;

class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $colors = Color::query()
                ->with('user')
                ->when(request('name'), fn($query) => $query->where('name', 'like', '%'. request('name') .'%'))
                ->orderBy(request('sort_field', 'created_at'), request('direction', 'desc'))
                ->paginate(10)->onEachSide(1)->withQueryString();

        return inertia('Color/Index', [
            'colors' => ColorResource::collection($colors),
            'queryParams' => request()->query() ?: null,
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreColorRequest $request)
    {
        auth()->user()->colors()->create($request->validated());
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateColorRequest $request, Color $color)
    {
        $color->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Color $color)
    {
        $color->delete();
    }
}
