<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use App\Exceptions\JsonValidationException;

class StoreTestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            //
            "login.nullable" => "login must be nullable or string",
            "login.string" => "login must be nullable or string",

            "test.title.required" => "test.title must be a property from request",
            "test.title.string" => "test.items.type must be string",

            "test.category" => "test.category must be a property from request",
            "test.category" => "test.category must be string",

            "test.items.required" => "test.items must be a property from request",
            "test.items.array" => "test.items must be array",
            
            "test.items.*.title.required" => "test.items.title must be a property from request",
            "test.items.*.title.string" => "test.items.title must be string",

            "test.items.*.type.required" => "test.items.type must be a property from request",
            "test.items.*.type.string" => "test.items.type must string",

            "status.required" => "status must be a property from request",
            "status.string" => "status must be string"
        ];
    }

    public function rules()
    {
        return [
            //
            "login" => "nullable|string",
            "test.title" => "required|string",
            "test.category" => "required|string",
            "test.items" => "required|array",
            "test.items.*.title" => "required|string",
            "test.items.*.type" => "required|string",
            "status" => "required|string"
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new JsonValidationException($validator);
    }
}
