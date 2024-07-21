/**
 * ## Overview
 * 
 * All errors in @gnome will inherit from `SystemError`
 * 
 * The errors module extends the built-in Error class to provide
 * additional functionality such as:
 * 
 * - `toObject()` method to convert an error to JSON
 *    object.
 * - `set()` method to set multiple properties of the error.
 * - `stackTrace` property to get the stack trace as an array of strings.
 * - `code` property to get or set the error code.
 * - `target` property to get or set the target of the error
 *    such as the name of the method that threw the error.
 * 
 * The module also provides a number of error classes that extend
 * and utility functions to work with errors:
 * 
 * - `collect()` function to collect all the errors from an error object.
 * - `walk()` function to walk through an error and its inner errors.
 * - `printError()` function to print an error to the console.
 * 
 * ## Basic Usage
 * 
 * ```typescript
 * import { SystemError } from '@gnome/errors'
 * 
 * try {
 *    throw new SystemError("message");
 * } catch (e) {
 *    console.log(e.stackTrace)
 *    console.log(e.code)
 * }
 * 
 * ```
 * 
 * [MIT License](./LICENSE.md)
 * 
 */
export * from "./system_error.js";
export * from "./argument_error.js";
export * from "./collect_errors.js";
export * from "./print_error.js";
export * from "./walk_error.js";
export * from "./abort_error.js";
export * from "./argument_null_error.js";
export * from "./argument_range_error.js";
export * from "./argument_empty_error.js";
export * from "./argument_whitespace_error.js";
export * from "./assertion_error.js";
export * from "./errorf.js";
export * from "./invalid_operation_error.js";
export * from "./invalid_cast_error.js";
export * from "./not_implemented_error.js";
export * from "./not_supported_error.js";
export * from "./object_disposed_error.js";
export * from "./system_error.js";
export * from "./timeout_error.js";
