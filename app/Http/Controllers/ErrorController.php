<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ErrorController extends Controller
{
    public function show($code)
    {
        $validCodes = [403, 404, 500];

        if (!in_array($code, $validCodes)) {
            $code = 404;
        }

        return Inertia::render('Errors/ErrorPage', [
            'status' => $code,
            'message' => $this->getErrorMessage($code),
        ]);
    }

    private function getErrorMessage($code)
    {
        $messages = [
            403 => "You don't have permission to access this page.",
            404 => 'The page you are looking for does not exist.',
            500 => 'Something went wrong on our end.',
        ];

        return $messages[$code] ?? 'An unknown error occurred.';
    }
}
