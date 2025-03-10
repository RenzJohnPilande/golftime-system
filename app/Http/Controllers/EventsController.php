<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Http\Requests\StoreEventsRequest;
use App\Http\Requests\UpdateEventsRequest;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\LogHelper;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if ($user->role === 'employee') {
            $events = Events::with('user')->where('assigned_to', $user->id)->get();
        } else {
            $events = Events::with('user')->get();
        }
    
        return Inertia::render('Events', [
            'events' => $events,
            'employees' => Employee::all(),
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
    public function store(StoreEventsRequest $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|string|in:pending,preparation,in-progress,post-event,completed,cancelled',
            'personnel' => 'nullable|array',
            'assigned_to' => 'required|exists:users,id',
            'notification_sent' => 'required|boolean',
            'notes' => 'nullable|string',
        ]);

        $validated['personnel'] = json_encode($validated['personnel']);

        $event = Events::create($validated);

        LogHelper::logAction('Event Created', "Event ID: {$event->id}, Name: {$event->name}");

        return redirect()->route('events.index')->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $event = Events::findOrFail($id);
        $event->personnel = json_decode($event->personnel) ?? [];
        return response()->json(['event' => $event]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Events $events)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventsRequest $request, $id)
    {
        $event = Events::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|string|max:255',
            'personnel' => 'nullable|array',
            'assigned_to' => 'required|exists:users,id',
            'notification_sent' => 'required|boolean',
            'notes' => 'nullable|string',
        ]);

        $validated['personnel'] = json_encode($validated['personnel']);
        $event->update($validated);

        LogHelper::logAction('Event Updated', "Event ID: {$event->id}, Name: {$event->name}");

        return redirect()->route('events.index')->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $event = Events::findOrFail($id);
        $event->delete();

        LogHelper::logAction('Event Deleted', "Event ID: {$id}");
        return redirect()->route('events.index')->with('success', 'Event deleted successfully.');
    }
}
