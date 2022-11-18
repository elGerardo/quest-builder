<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    protected $table = "questions";
    protected $hidden = ["test_id"];
    protected $keyType = "string";
    public $timestamps = false;

    public function options()
    {
        return $this->hasMany(Options::class, "question_id", "id");
    }
}
