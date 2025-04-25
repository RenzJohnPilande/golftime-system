<?php

namespace App\Http\Controllers;

use App\Helpers\LogHelper;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::query();
        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            });
        }

        $articles = $query->latest()->paginate(8)->withQueryString();
        return Inertia::render('CMS/Article', [
            'articles' => $articles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('images/articles', 'public');
        }

        $article = Article::create($validated);

        LogHelper::logAction('Article Created', "Article {$article->title} has been created");

        return redirect()->back()->with('success', 'Article created successfully!');
    }

    public function show($id)
    {
        return Article::findOrFail($id);
    }

    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'content' => 'required|string',
        ]);

        $article->update($data);
        LogHelper::logAction('Article Updated', "Article {$article->title} has been updated");
        return back()->with('success', 'Product details updated successfully!');
    }

    public function updateCover(Request $request, Article $article)
    {
        $request->validate([
            'image' => 'required',
        ]);

        $image = $request->input('image');
        $path = null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images/articles', 'public');
        } elseif (is_string($image) && str_starts_with($image, 'temp/articles/')) {

            $filename = basename($image);
            $finalPath = "images/articles/{$filename}";

            if (Storage::disk('public')->exists($image)) {
                Storage::disk('public')->move($image, $finalPath);
                $path = $finalPath;
            } else {
                return back()->withErrors(['image' => 'Temporary cover image not found.']);
            }
        } else {
            return back()->withErrors(['image' => 'Invalid cover image input.']);
        }

        if ($path) {
            if ($article->image && Storage::disk('public')->exists($article->image)) {
                Storage::disk('public')->delete($article->image);
            }

            $article->update(['image' => $path]);
            LogHelper::logAction('Article Updated', "Article image has been updated");
            return back()->with('success', 'Cover image updated successfully!');
        }

        return back()->withErrors(['image' => 'Cover image upload failed.']);
    }


    public function tempCoverUpload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $path = $request->file('image')->store('temp/articles', 'public');

        return response()->json(['path' => $path]);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        LogHelper::logAction('Article Deleted', "Article {$article->title} has been deleted");
        return redirect()->route('articles.index')->with('success', 'Article deleted successfully.');
    }
}
