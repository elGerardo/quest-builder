<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreAnswerRequest;
use App\Http\Requests\FindAnswersRequest;
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

    public static function find(FindAnswersRequest $request)
    {   
        $data = Answers::where('id',$request->test_id)->with(['items' => function($item){
            $item->orderBy("question");
        }])->first();
        return response()->json(['message' => 'success', 'data' => $data], 200);
    }
}
