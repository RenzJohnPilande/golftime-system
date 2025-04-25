<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Http\Requests\StoreEventsRequest;
use App\Http\Requests\UpdateEventsRequest;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\LogHelper;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Events::with('user');

        if ($user->role === 'employee') {
            $query->where('assigned_to', $user->id);
        }


        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('notes', 'like', "%{$search}%");
            });
        }

        $events = $query->latest()->paginate(9)->withQueryString();

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
            'status' => 'required|string|in:pending,preparation,ongoing,completed,cancelled',
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
