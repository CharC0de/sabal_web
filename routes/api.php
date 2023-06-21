<?php

use App\Http\Controllers\AdmissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CheckupController;
use App\Http\Controllers\DischargeController;
use App\Http\Controllers\OperationController;
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/checkup',[CheckupController::class, 'initcheckup']);
Route::post('/check_status',[CheckupController::class, 'getStatus']);
Route::post('/check_payment',[CheckupController::class, 'isPaid']);
Route::post('/get_details',[CheckupController::class, 'getDetails']);
Route::post('/set_dept',[AdmissionController::class, 'setDept']);
Route::post('/set_doctor',[OperationController::class, 'setDoc']);
Route::post('/resume_session',[LoginController::class, 'getSession']);
Route::post('/admission',[AdmissionController::class, 'admit']);
Route::post('/cancel',[AdmissionController::class, 'cancel']);
Route::post('/discharge_details',[DischargeController::class, 'getDetails']);
Route::post('/check_op',[OperationController::class, 'checkNull']);
