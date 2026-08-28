<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('kamar', 'rooms/index')->name('rooms.index');

Route::get('kamar/{slug}/pesan', fn (string $slug) => Inertia::render('booking/create', [
    'slug' => $slug,
]))->where('slug', '[A-Za-z0-9-]+')->name('rooms.booking');

Route::get('kamar/{slug}', fn (string $slug) => Inertia::render('rooms/show', [
    'slug' => $slug,
]))->where('slug', '[A-Za-z0-9-]+')->name('rooms.show');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
