<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use App\Exceptions\JsonValidationException;

class FindTestRequest extends FormRequest
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

    public function messages()
    {
        return [
            "id.required" => "id is required",
            "id.string" => "id must be string"
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            "id" => "required|string|max:36" 
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new JsonValidationException($validator);
    }
}
