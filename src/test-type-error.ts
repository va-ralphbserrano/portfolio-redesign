// This is a test file with a deliberate type error
function add(a: number, b: number): number {
    const result: string = a + b; // Type error: Type 'number' is not assignable to type 'string'
    return result;
}
