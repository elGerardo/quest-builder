<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\AnswersController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::group(["prefix" => "test"], function (){
    Route::get("/find", [TestController::class, "find"])->name("test.find");
    Route::post("/store", [TestController::class, "store"])->name("test.store");
});

Route::group(["prefix" => "answer"], function () {
    Route::post("/store", [AnswersController::class, "store"])->name("answer.store");
});