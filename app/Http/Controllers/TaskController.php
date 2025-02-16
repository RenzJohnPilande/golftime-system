<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Tasks', [
            'tasks' => Task::with('user')->get(),
            'success' => session('success'), 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $events = Events::all();
        return view('tasks.create', compact('events'));
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $validated = $request->validate([
            'task_name' => 'required|string|max:255',
            'deadline' => 'required|date',
            'type' => 'required|string',
            'event_id' => 'required|exists:events,id',
        ]);
    
        $task = Task::create($validated);
    
        return back()->with('success', 'Task created successfully!');
    }

    /**
     * Display the specified resource.
     */

    public function show($eventId)
    {
        $tasks = Task::where('event_id', $eventId)->with('user')->get();
        
        if ($tasks->isEmpty()) {
            return response()->json(['message' => 'No tasks found for this event.'], 404);
        }
    
        return response()->json($tasks);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $events = Events::all();
        return view('tasks.edit', compact('task', 'events'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'task_name' => 'required|string|max:255',
            'deadline' => 'required|date',
            'type' => 'required|in:project,miscellaneous,admin',  
            'event_id' => 'required|exists:events,id',
        ]);

        // Update the task with the validated data
        $task->update($validated);

        // Return the updated task
        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return back()->with('success', 'Task deleted successfully!');
    }
    
}
