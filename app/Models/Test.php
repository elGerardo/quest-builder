<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Test extends Model
{
    protected $table = "test";
    protected $hidden = ["user_id", "is_local"];
    protected $keyType = "string";
    public $timestamps = false;

    public static function store($request)
    {
        try{
            DB::beginTransaction();
            $uuid = (string) Str::uuid();
            $test = new Test;
            $test->id = $uuid;
            if($request->login != null) $test->user_id = $request->login->user_id;
            $test->title = $request->input("test")["title"];
            $test->category = $request->input("test")["category"];
            $test->save();

            // store questions
            $order = 0;
            foreach( $request->input("test")["items"] as $item)
            {

                $uuidQuestion = (string) Str::uuid();
                $question = new Questions;
                $question->id = $uuidQuestion;
                $question->test_id = $uuid;
                $question->sort = $order;
                $question->title = $item["title"];
                $question->type = $item["type"];
                $question->save();

                if( !empty($item["options"]) )
                {
                    foreach( $item["options"] as $item )
                    {
                        $uuidOption = (string) Str::uuid();
                        $option = new Options;
                        $option->id = $uuidOption;
                        $option->question_id = $uuidQuestion;
                        $option->option = $item["option"];
                        $option->value = $item["value"];
                        $option->save();
                    }
                }

                $order += 1;
            }

            DB::commit();

            return $uuid;

        }catch(Exception $e)
        {
            DB::rollback();
            return $e->getMessage();
        }
    }

    public function questions()
    {
        return $this->hasMany(Questions::class, "test_id", "id");
    }

    public function answers()
    {
        return $this->hasMany(Answers::class, "test_id", "id");
    }
}
