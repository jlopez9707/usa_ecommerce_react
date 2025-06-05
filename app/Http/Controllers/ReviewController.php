<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Actions\Reviews\GetReviewsAction;

class ReviewController extends Controller
{
    protected GetReviewsAction $getReviewsAction;

    public function __construct(
        GetReviewsAction $getReviewsAction
    )
    {
        $this->getReviewsAction = $getReviewsAction;
    }

    public function index(Request $request){
        $filters = $request->only([
            'status',
            'rating',
            'search',
            'sort_field',
            'sort_direction',
            'page',
            'per_page'
        ]);

        return Inertia::render('admin/reviews/list', [
            'reviews' => $this->getReviewsAction->execute($filters),
            'filters' => $filters
        ]);
    }
}
