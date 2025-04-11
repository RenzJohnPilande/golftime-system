<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Response;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     */
    public function render($request, Throwable $exception): Response
    {
        // If the request expects JSON, return the default Laravel error response
        if ($request->expectsJson() || $request->is('api/*')) {
            return parent::render($request, $exception);
        }

        // Handle 404 errors with a custom Inertia page
        if ($exception instanceof NotFoundHttpException) {
            return Inertia::render('Errors/ErrorPage', [
                'status' => 404,
                'message' => 'Page Not Found',
            ])->toResponse($request)->setStatusCode(404);
        }

        // Handle other errors (e.g., 500 Internal Server Error)
        return Inertia::render('Errors/ErrorPage', [
            'status' => 500,
            'message' => 'Something went wrong. Please try again later.',
        ])->toResponse($request)->setStatusCode(500);
    }
}
