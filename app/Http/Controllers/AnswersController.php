<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreAnswerRequest;
use App\Models\Answers;

class AnswersController extends Controller
{
    //
    public static function store(StoreAnswerRequest $request)
    {
        try{
            Answers::store($request);
            return response()->json(['message' => 'success'], 200);
        }catch(Exception $e)
        {
            return response()->json(['message' => 'error'], 200);
        }
    }
}
