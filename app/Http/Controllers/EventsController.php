<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Http\Requests\StoreEventsRequest;
use App\Http\Requests\UpdateEventsRequest;
use Inertia\Inertia;
use Inertia\Response;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Events', [
            'events' => Events::with('user')->get(),
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
            'user_id' => 'required|exists:users,id',
            'notification_sent' => 'required|boolean',
            'notes' => 'nullable|string',
        ]);

        $validated['personnel'] = json_encode($validated['personnel']);

        Events::create($validated);

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
            'user_id' => 'required|exists:users,id',
            'notification_sent' => 'required|boolean',
            'notes' => 'nullable|string',
        ]);

        $validated['personnel'] = json_encode($validated['personnel']);
        $event->update($validated);
        return redirect()->route('events.index')->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $event = Events::findOrFail($id);
        $event->delete();
        return redirect()->route('events.index')->with('success', 'Event deleted successfully.');
    }
}
