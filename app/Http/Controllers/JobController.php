<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Helpers\LogHelper;
use App\Models\Job;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::query();
        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('job_title', 'like', "%{$search}%");
            });
        }

        $jobs = $query->latest()->paginate(9)->withQueryString();
        return Inertia::render('Management/Job', [
            'jobs' => $jobs,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'job_title' => 'required|unique:jobs',
            'job_description' => 'nullable',
        ]);

        $job = Job::create($request->all());

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        LogHelper::logAction(
            'New job title has been created',
            "A new job titled \"{$job->job_title}\" was created by {$username}."
        );

        return redirect()->route('jobs.index')->with('success', 'job created successfully.');
    }

    public function show($id)
    {
        $job = Job::findOrFail($id);
        return response()->json($job);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'job_title' => 'required|unique:jobs,job_title,' . $id,
            'job_description' => 'nullable',
        ]);

        $job = Job::findOrFail($id);
        $oldTitle = $job->job_title;
        $oldDescription = $job->job_description;

        $job->update($request->all());

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        $changes = [];

        if ($oldTitle !== $job->job_title) {
            $changes[] = "Job title changed was changed from \"{$oldTitle}\" to \"{$job->job_title}\"";
        }

        if ($oldDescription !== $job->job_description) {
            $changes[] = "Job description was changed from \"{$oldDescription}\" to \"{$job->job_description}\"";
        }

        $changeDetails = implode(" and ", $changes);

        LogHelper::logAction(
            'A Job has been updated',
            "The job \"{$oldTitle}\" was updated by {$username}. {$changeDetails}."
        );


        return redirect()->route('jobs.index')->with('success', 'job updated successfully!');
    }

    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $jobTitle = $job->job_title;
        $job->delete();

        $user = Auth::user();
        $username = $user ? $user->firstname . " " . $user->lastname : "System";

        LogHelper::logAction(
            'A job title has been deleted',
            "The job \"{$jobTitle}\" was deleted by {$username}."
        );


        return redirect()->route('jobs.index')->with('success', 'job deleted successfully!');
    }
}
