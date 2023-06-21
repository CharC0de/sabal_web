<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomDetails extends Model
{
    protected $table = 'room_details';

    protected $primaryKey = 'room_no';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'room_no',
        'room_type',
        'status',
        'chrge_per_day'
    ];
}
