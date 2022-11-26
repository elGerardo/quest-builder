<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use App\Exceptions\JsonValidationException;

class StoreAnswerRequest extends FormRequest
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

            "test_id.required" => "test_id must be a property from request",
            "test_id.string" => "test_id must be string",

            "username.nullable" => "username must be nullable or string",
            "username.string" => "username must be nullable or string",

            "answers.required" => "data must be a property from request",
            "answers.array" => "data must be array",

            "answers.*.value.required" => "value must be a property from request",
            "answers.*.value.string_or_array" => "value must be string or array",

            "answers.*.question.required" => "question must be a property from request",
            "answers.*.question.string" => "question must be array"
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    //TODO make a custom validarion (string or array) on answers.*.value
    public function rules()
    {
        return [
            //
            "test_id" => "required|string|max:36",
            "username" => "nullable|string",
            "answers" => "required|array",
            "answers.*.value" => "required|string_or_array",
            "answers.*.question" => "required|string",
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new JsonValidationException($validator);
    }
}
