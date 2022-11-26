<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Answers extends Model
{
    protected $table = "answers";
    protected $keyType = "string";

    public static function store($request)
    {
        try{
            DB::beginTransaction();
            
            $uuidAnswer = (string) Str::uuid();
            $answer = new Answers();
            $answer->id = (string)$uuidAnswer;
            $answer->test_id = $request->input("test_id");
            if($request->input("username") != null) $answer->username = $request->input("username");
            $answer->save();
            foreach($request->input("answers") as $answer)
            {
                if(is_array($answer["value"]))
                {
                    foreach($answer["value"] as $value)
                    {
                        $uuidItem = (string) Str::uuid();
                        $item = new AnswerItems();
                        $item->id = (string)$uuidItem;
                        $item->answer_id = $uuidAnswer;
                        $item->question = $answer["question"];
                        $item->value = $value;
                        $item->save();
                    }
                }else{
                    $uuidItem = (string) Str::uuid();
                    $item = new AnswerItems();
                    $item->id = (string)$uuidItem;
                    $item->answer_id = $uuidAnswer;
                    $item->question = $answer["question"];
                    $item->value = $answer["value"];
                    $item->save();
                }
                
            }

            DB::commit();
            return true;
        }catch(Exception $e)
        {
            DB::rollback();
            return $e->getMessage();
        }

    }

    public function items()
    {
        return $this->hasMany(AnswerItems::class, 'answer_id', 'id');
    } 
}
