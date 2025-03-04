<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\LogHelper;

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
            'status' => 'required|string|max:255',
            'event_id' => 'required|exists:events,id',
        ]);
    
        $task = Task::create($validated);
        LogHelper::logAction('Task Created', "Task ID: {$task->id}, Name: {$task->task_name}, Event ID: {$task->event_id}");

    
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
    public function update(Request $request, $id)
    {
        
        $task = Task::findOrFail($id);

        // Validate input data
        $validated = $request->validate([
            'task_name' => 'required|string|max:255',
            'deadline' => 'required|date',
            'type' => 'required|in:project,miscellaneous,admin',
            'status' => 'required|string|max:255',
        ]);
        $task->update($validated);
        LogHelper::logAction('Task Updated', "Task ID: {$task->id}, Name: {$task->task_name}, Status: {$task->status}");


        return back()->with('success', 'Task deleted successfully!');
    }

    public function complete(Request $request, $id){
        $task = Task::findOrFail($id);
        $validated = $request->validate([
            'status' => 'required|string|max:255',
        ]);
        
        $task->update($validated);
        LogHelper::logAction('Task Completed', "Task ID: {$task->id}, Name: {$task->task_name}, Status: {$task->status}");


        return back()->with('success', 'Task deleted successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $taskName = $task->task_name;
        $task->delete();

        LogHelper::logAction('Task Deleted', "Task ID: {$id}, Name: {$taskName}");

        return back()->with('success', 'Task deleted successfully!');
    }
    
}
