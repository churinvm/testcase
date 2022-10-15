<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NumberController extends Controller
{
    private $apiServerUrl = "http://numbersapi.com/";
    public function urlSendNumber(Request $request)
    {
        //Проверка данных на строне сервера.
        $request->validate([
            'numberForSend' => 'required|numeric',
        ]);

        return $this->apiServerUrl . $request->numberForSend;
    }
}
