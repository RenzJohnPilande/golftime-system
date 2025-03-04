<?php

namespace App\Helpers;

use App\Models\Log;
use Illuminate\Support\Facades\Auth;

class LogHelper
{
    public static function logAction($action, $details = '')
    {
        Log::create([
            'action' => $action,
            'action_by' => Auth::id() ?? null,
            'details' => is_array($details) ? implode(', ', $details) : (string) $details,
        ]);
    }
}
