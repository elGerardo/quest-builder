<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Options extends Model
{
    protected $table = "options";
    protected $hidden = ["id", "question_id"];
    public $timestamps = false;
}
