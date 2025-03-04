<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Logs', [
            'logs' => Log::with('user')->orderBy('created_at', 'desc')->get(),
            'success' => session('success'), 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'action' => 'required|string|max:255',
            'action_by' => 'required|exists:users,id',
            'details' => 'nullable|string|max:500',
        ]);

        Log::create([
            'action' => $request->action,
            'action_by' => $request->action_by,
            'details' => $request->details,
        ]);

        return response()->json(['message' => 'Log entry created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Log $log)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Log $log)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Log $log)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Log $log)
    {
        //
    }
}
