<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Retrieve the form data from the request
        $username = $request->input('username');
        $age = $request->input('age');
        $gender = $request->input('gender');
        $address = $request->input('address');
        $phoneNumber = $request->input('phoneNumber');

        // Insert the data into the patients table
        $patient = new Patient;
        $patient->pat_no = null;
        $patient->pat_name = $username;
        $patient->pat_age = $age;
        $patient->sex = $gender;
        $patient->address = $address;
        $patient->ph_no = $phoneNumber;
        $patient->save();

        // Return a response if needed
        return response()->json(['message' => 'Registration successful']);
    }
}
