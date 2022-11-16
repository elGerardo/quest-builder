<?php

namespace App\Http\Controllers;
use App\Models\Test;
use App\Http\Requests\StoreTestRequest;
use App\Http\Requests\FindTestRequest;
use Illuminate\Http\Request;


class TestController extends Controller
{
    //
    public static function store(StoreTestRequest $request)
    {
        $result = Test::store($request);
        return response()->json(['message' => 'success', 'uuid_reply' => $result], 200);
    }   

    public static function find(FindTestRequest $request)
    {
        $id = $request->id;
        $data = Test::with('questions')->find($id);
        return response()->json(['message' => 'success', 'data' => $data], 200);
    }
}

