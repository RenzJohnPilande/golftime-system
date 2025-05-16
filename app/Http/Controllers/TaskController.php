<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\LogHelper;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();
        $query = Task::with('user');

        if (!$user->hasPermission('admin') && !$user->hasPermission('view_all_tasks')) {
            $query->where('assigned_to', $user->id);
        }


        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('task_name', 'like', "%{$search}%");
            });
        }

        $query->orderByRaw("FIELD(status, 'pending', 'ongoing', 'complete')");

        $tasks = $query->latest()->paginate(8)->withQueryString();

        return Inertia::render('Tasks', [
            'tasks' => $tasks,
            'employees' => Employee::all(),
            'events' => Events::all(),
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
            'task_name'   => 'required|string|max:255',
            'task_description'   => 'required|string|max:255',
            'deadline'    => 'required|date',
            'type'        => 'required|string|in:event,individual',
            'status'      => 'required|string|in:pending,ongoing,complete',
            'event_id'    => 'required_if:type,event|nullable|exists:events,id',
            'assigned_to' => 'required|exists:users,id',
        ]);

        $task = Task::create($validated);

        if ($task->type === 'event') {
            LogHelper::logAction('Event Task Created', "Task ID: {$task->id}, Name: {$task->task_name}, Event ID: {$task->event_id}");
        } else {
            LogHelper::logAction('Individual Task Created', "Task ID: {$task->id}, Name: {$task->task_name}, Assigned To: {$task->assigned_to}");
        }


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

    public function show_task($id)
    {
        $tasks = Task::where('id', $id)->with('user')->get();

        if ($tasks->isEmpty()) {
            return response()->json(['message' => 'Task not found.'], 404);
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

        $validated = $request->validate([
            'task_name'   => 'required|string|max:255',
            'task_description'   => 'required|string|max:255',
            'deadline'    => 'required|date',
            'type'        => 'required|string|in:event,individual',
            'status'      => 'required|string|in:pending,ongoing,complete',
            'event_id'    => 'nullable|exists:events,id',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $task->update($validated);

        if ($task->type === 'event') {
            LogHelper::logAction('Task Updated', "Task ID: {$task->id}, Name: {$task->task_name}, Event ID: {$task->event_id}, Status: {$task->status}");
        } else {
            LogHelper::logAction('Task Updated', "Task ID: {$task->id}, Name: {$task->task_name}, Assigned To: {$task->assigned_to}, Status: {$task->status}");
        }


        return back()->with('success', 'Task deleted successfully!');
    }

    public function complete(Request $request, $id)
    {
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
