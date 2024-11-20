// Mock file with type issues to test the type fixer

// Variables with 'any' type
let username: string = "john_doe";
let age: number = 25;
let isActive: boolean = true;
let scores: (number | string | boolean)[] = [85, 92, 78, "high", true];  // Mixed type array
let mixedArray: (number | string | boolean | RegExp | null | undefined)[] = [1, "two", true, null, undefined, /regex/];  // Complex mixed array
let userProfile: { id: number; email: string; preferences: { theme: string; notifications: boolean; settings: null } } = {
    id: 1,
    email: "john@example.com",
    preferences: {
        theme: "dark",
        notifications: true,
        settings: null
    }
};

// Function with missing return type
function calculateAverage(numbers: number[]): number {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

// Function with 'any' parameters
function updateUser(userId: number, userData: Record<string, unknown>, callback: (result: unknown) => void): Record<string, unknown> {
    const result = { id: userId, ...userData };
    callback(result);
    return result;
}

// Function that could have more specific types
function processUserData(user: { id: number; name: string }, options: { validate?: boolean; format?: boolean }): string | { id: number; name: string } {
    const { id, name } = user;
    const { validate = true, format = false } = options;
    
    if (validate) {
        if (typeof id !== 'number' || typeof name !== 'string') {
            throw new Error('Invalid user data');
        }
    }
    
    return format ? `User ${name} (ID: ${id})` : { id, name };
}

// Array with 'any' type
const userList: { id: number; name: string; active: boolean }[] = [
    { id: 1, name: "John", active: true },
    { id: 2, name: "Jane", active: false },
    { id: 3, name: "Bob", active: true }
];

// Object with 'any' type
const config: {
    apiUrl: string;
    timeout: number;
    retries: number;
    flags: { debug: boolean; cache: boolean };
    patterns: RegExp[];
} = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
    flags: {
        debug: true,
        cache: false
    },
    patterns: [/test/, /prod/]
};

// Date and RegExp tests
let createdDate: Date = new Date();
let emailPattern: RegExp = /^[^@]+@[^@]+\.[^@]+$/;

// Function with multiple return types
function processValue(value: string | number): string | number | null {
    if (typeof value === 'string') return value.toUpperCase();
    if (typeof value === 'number') return value * 2;
    return null;
}

// Complex type tests
interface Container<T> {
    value: T;
    metadata: {
        timestamp: Date;
        version: number;
        tags: string[];
    };
}

// Union and intersection types
type Status = 'pending' | 'active' | 'inactive';
type WithId = { id: number | string };
type WithTimestamp = { createdAt: Date; updatedAt: Date };
type Entity = WithId & WithTimestamp;

// Complex nested types with generics
interface ApiResponse<T, E = Error> {
    data?: T;
    error?: E;
    meta: {
        requestId: string;
        timestamp: Date;
        pagination?: {
            page: number;
            limit: number;
            total: number;
            hasMore: boolean;
        };
    };
}

// Function overloads and complex signatures
interface EventEmitter {
    on(event: string, listener: (...args: any[]) => void): void;
    off(event: string, listener: (...args: any[]) => void): void;
    emit(event: string, ...args: any[]): void;
}

// Complex async functions with generics
async function fetchData<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(url, options);
    return response.json();
}

// Mapped and conditional types
type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
};

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Complex class with generics and decorators
class DataStore<T extends Entity> {
    private items: Map<string | number, T> = new Map();

    async find(id: string | number): Promise<T | undefined> {
        return this.items.get(id);
    }

    async findAll(filter?: DeepPartial<T>): Promise<T[]> {
        return Array.from(this.items.values());
    }

    async create(item: Omit<T, keyof Entity>): Promise<T> {
        const id = Math.random().toString(36).substr(2, 9);
        const timestamp = new Date();
        const newItem = {
            ...item,
            id,
            createdAt: timestamp,
            updatedAt: timestamp
        } as T;
        this.items.set(id, newItem);
        return newItem;
    }

    async update(id: string | number, updates: DeepPartial<T>): Promise<T> {
        const existing = await this.find(id);
        if (!existing) throw new Error('Not found');
        
        const updated = {
            ...existing,
            ...updates,
            updatedAt: new Date()
        } as T;
        
        this.items.set(id, updated);
        return updated;
    }
}

// Complex recursive types
type JSONValue = 
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

interface TreeNode<T> {
    value: T;
    children: TreeNode<T>[];
    parent?: TreeNode<T>;
    metadata: {
        depth: number;
        path: string[];
        isLeaf: boolean;
    };
}

// Utility type helpers with complex conditions
type NonNullableRecursive<T> = T extends null | undefined
    ? never
    : T extends object
    ? { [P in keyof T]: NonNullableRecursive<T[P]> }
    : T;

// Complex type inference test
function processTree<T>(
    node: TreeNode<T>,
    visitor: (node: TreeNode<T>, path: string[]) => void,
    options: {
        skipRoot?: boolean;
        maxDepth?: number;
        filter?: (node: TreeNode<T>) => boolean;
    } = {}
): void {
    const { skipRoot = false, maxDepth = Infinity, filter } = options;
    
    function traverse(
        current: TreeNode<T>,
        path: string[],
        depth: number
    ): void {
        if (depth > maxDepth) return;
        if (filter && !filter(current)) return;
        if (!skipRoot || depth > 0) {
            visitor(current, path);
        }
        
        current.children.forEach((child, index) => {
            traverse(child, [...path, index.toString()], depth + 1);
        });
    }
    
    traverse(node, [], 0);
}

// Test instances with missing type annotations
let stringContainer: Container<string> = {
    value: "test",
    metadata: {
        timestamp: new Date(),
        version: 1,
        tags: ["test", "demo"]
    }
};

let numberContainer: Container<number> = {
    value: 42,
    metadata: {
        timestamp: new Date(),
        version: 2,
        tags: ["number", "answer"]
    }
};

let apiResponse: ApiResponse<{ id: number; name: string }> = {
    data: { id: 1, name: "Test" },
    meta: {
        requestId: "123",
        timestamp: new Date(),
        pagination: {
            page: 1,
            limit: 10,
            total: 100,
            hasMore: true
        }
    }
};

let eventEmitter: EventEmitter = {
    listeners: new Map<string, ((...args: any[]) => void)[]>(),
    on(event: string, listener: (...args: any[]) => void) {
        const eventListeners = this.listeners.get(event) || [];
        eventListeners.push(listener);
        this.listeners.set(event, eventListeners);
    },
    off(event: string, listener: (...args: any[]) => void) {
        const eventListeners = this.listeners.get(event) || [];
        const index = eventListeners.indexOf(listener);
        if (index > -1) {
            eventListeners.splice(index, 1);
        }
    },
    emit(event: string, ...args: any[]) {
        const eventListeners = this.listeners.get(event) || [];
        eventListeners.forEach(listener => listener(...args));
    }
};

let treeNode: TreeNode<string> = {
    value: "root",
    children: [
        {
            value: "child1",
            children: [],
            metadata: {
                depth: 1,
                path: ["0"],
                isLeaf: true
            }
        },
        {
            value: "child2",
            children: [
                {
                    value: "grandchild",
                    children: [],
                    metadata: {
                        depth: 2,
                        path: ["1", "0"],
                        isLeaf: true
                    }
                }
            ],
            metadata: {
                depth: 1,
                path: ["1"],
                isLeaf: false
            }
        }
    ],
    metadata: {
        depth: 0,
        path: [],
        isLeaf: false
    }
};

let dataStore = new DataStore<{ id: string | number; name: string; description: string; tags: string[]; status: Status; createdAt: Date; updatedAt: Date }>();
let item = {
    name: "Test Item",
    description: "A test item",
    tags: ["test", "item"],
    status: "active" as Status
};

// Complex function usage with type annotations
interface ProcessedItem extends Record<string, unknown> {
    processed: boolean;
    timestamp: Date;
}

interface ProcessOptions<T> {
    sort?: boolean;
    filter?: (item: T) => boolean;
    transform?: (item: T) => ProcessedItem;
}

function processItems<T extends { name: string; status: string }>(
    items: T[],
    options?: ProcessOptions<T>
): ProcessedItem[] {
    const defaultOptions: Required<ProcessOptions<T>> = {
        sort: true,
        filter: item => item.status === "active",
        transform: item => ({
            ...item,
            processed: true,
            timestamp: new Date()
        })
    };

    const finalOptions = { ...defaultOptions, ...options };
    let processedItems = items;

    if (finalOptions.filter) {
        processedItems = processedItems.filter(finalOptions.filter);
    }

    if (finalOptions.sort) {
        processedItems = processedItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    return processedItems.map(finalOptions.transform);
}

// Async function with type annotations
interface FetchOptions extends RequestInit {
    sort?: boolean;
    filter?: <T>(item: T) => boolean;
}

async function fetchAndProcessData<T extends { name: string; status: string }>(
    url: string,
    options?: FetchOptions
): Promise<ProcessedItem[]> {
    const response = await fetchData<T[]>(url, options);
    if (response.error) {
        throw response.error;
    }
    
    const items = response.data || [];
    return processItems(items, {
        sort: options?.sort ?? true,
        filter: options?.filter,
        transform: item => ({
            ...item,
            source: url,
            fetchedAt: response.meta.timestamp
        })
    });
}

// Event handling with type annotations
interface EventHandlers {
    start: () => void;
    stop: () => void;
    sendData: (data: unknown) => void;
    handleError: (error: Error) => void;
}

function setupEventHandlers(emitter: EventEmitter): EventHandlers {
    emitter.on("data", (data: unknown) => {
        console.log("Received data:", data);
    });

    emitter.on("error", (error: Error) => {
        console.error("Error occurred:", error);
    });

    return {
        start: () => emitter.emit("start"),
        stop: () => emitter.emit("stop"),
        sendData: (data: unknown) => emitter.emit("data", data),
        handleError: (error: Error) => emitter.emit("error", error)
    };
}

// Advanced TypeScript pattern tests

// Discriminated unions
type Shape =
    | { kind: 'circle'; radius: number }
    | { kind: 'rectangle'; width: number; height: number }
    | { kind: 'triangle'; base: number; height: number };

type Result<T> =
    | { kind: 'success'; value: T }
    | { kind: 'error'; error: Error }
    | { kind: 'loading' };

// Conditional types with infer
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type UnwrapArray<T> = T extends Array<infer U> ? U : T;
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// Template literal types
type CSSProperty = `${string}-${'top' | 'right' | 'bottom' | 'left'}`;
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = `/${string}`;
type APIRoute = `${HTTPMethod} ${Endpoint}`;

// Recursive types with constraints
type JSONPrimitive = string | number | boolean | null;
type JSONArray = JSONValue[];
type JSONObject = { [key: string]: JSONValue };
type JSONValue = JSONPrimitive | JSONArray | JSONObject;

// Utility types with multiple type parameters
type Either<L, R> = { left: L } | { right: R };
type Tuple<T, U> = [T, U];
type Dict<K extends string | number | symbol, V> = { [key in K]: V };

// Test instances for advanced patterns
const shapes: Shape[] = [
    { kind: 'circle', radius: 5 },
    { kind: 'rectangle', width: 10, height: 20 },
    { kind: 'triangle', base: 15, height: 25 }
];

function calculateArea(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'rectangle':
            return shape.width * shape.height;
        case 'triangle':
            return (shape.base * shape.height) / 2;
    }
}

// Type guard functions
function isSuccess<T>(result: Result<T>): result is { kind: 'success'; value: T } {
    return result.kind === 'success';
}

function isError<T>(result: Result<T>): result is { kind: 'error'; error: Error } {
    return result.kind === 'error';
}

// Async function with type guards
async function fetchWithResult<T>(url: string): Promise<Result<T>> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { kind: 'success', value: data as T };
    } catch (error) {
        return { kind: 'error', error: error instanceof Error ? error : new Error(String(error)) };
    }
}

// Generic class with multiple type parameters and constraints
class StateManager<
    State extends Record<string, unknown>,
    Action extends { type: string }
> {
    private state: State;
    private listeners: Set<(state: State) => void>;
    private reducers: Map<Action['type'], (state: State, action: Action) => State>;

    constructor(initialState: State) {
        this.state = initialState;
        this.listeners = new Set();
        this.reducers = new Map();
    }

    addReducer(
        type: Action['type'],
        reducer: (state: State, action: Action) => State
    ): void {
        this.reducers.set(type, reducer);
    }

    dispatch(action: Action): void {
        const reducer = this.reducers.get(action.type);
        if (reducer) {
            this.state = reducer(this.state, action);
            this.notifyListeners();
        }
    }

    subscribe(listener: (state: State) => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener(this.state));
    }

    getState(): Readonly<State> {
        return Object.freeze({ ...this.state });
    }
}

// Example usage of StateManager with complex types
interface TodoState {
    todos: Array<{
        id: string;
        text: string;
        completed: boolean;
        tags: string[];
        created: Date;
    }>;
    filter: 'all' | 'active' | 'completed';
    loading: boolean;
}

type TodoAction =
    | { type: 'ADD_TODO'; payload: { text: string; tags?: string[] } }
    | { type: 'TOGGLE_TODO'; payload: { id: string } }
    | { type: 'DELETE_TODO'; payload: { id: string } }
    | { type: 'SET_FILTER'; payload: TodoState['filter'] };

const todoManager = new StateManager<TodoState, TodoAction>({
    todos: [],
    filter: 'all',
    loading: false
});

// Higher-order function with generic constraints
function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
    return (arg: T) => fns.reduce((result, fn) => fn(result), arg);
}

// Type-safe event emitter with discriminated union events
type EventMap = {
    'user:login': { userId: string; timestamp: Date };
    'user:logout': { userId: string; timestamp: Date };
    'error:auth': { error: Error; timestamp: Date };
};

class TypedEventEmitter<Events extends Record<string, unknown>> {
    private handlers = new Map<
        keyof Events,
        Set<(event: Events[keyof Events]) => void>
    >();

    on<E extends keyof Events>(
        event: E,
        handler: (event: Events[E]) => void
    ): void {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }
        this.handlers.get(event)!.add(handler as any);
    }

    off<E extends keyof Events>(
        event: E,
        handler: (event: Events[E]) => void
    ): void {
        this.handlers.get(event)?.delete(handler as any);
    }

    emit<E extends keyof Events>(event: E, data: Events[E]): void {
        this.handlers.get(event)?.forEach(handler => handler(data));
    }
}

const eventEmitter = new TypedEventEmitter<EventMap>();

// Branded types for type-safe identifiers
type Brand<K, T> = K & { __brand: T };
type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

function createUserId(id: string): UserId {
    return id as UserId;
}

function createOrderId(id: string): OrderId {
    return id as OrderId;
}

// Function overloads with generics
function transform<T extends number>(value: T): number;
function transform<T extends string>(value: T): string;
function transform<T extends boolean>(value: T): boolean;
function transform<T extends number | string | boolean>(value: T): T {
    if (typeof value === 'number') {
        return (value * 2) as T;
    } else if (typeof value === 'string') {
        return value.toUpperCase() as T;
    } else {
        return (!value) as T;
    }
}

// Variadic tuple types
type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never;
type Head<T extends any[]> = T extends [infer U, ...any[]] ? U : never;

function tail<T extends any[]>(arr: readonly [...T]): Tail<T> {
    const [, ...rest] = arr;
    return rest as Tail<T>;
}

function head<T extends any[]>(arr: readonly [...T]): Head<T> {
    const [first] = arr;
    return first as Head<T>;
}

// Recursive type with type parameter
type NestedArray<T> = Array<T | NestedArray<T>>;

function flattenArray<T>(arr: NestedArray<T>): T[] {
    return arr.reduce<T[]>((flat, item) => {
        return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
    }, []);
}

// Mapped type with template literals
type CSSProperties<T> = {
    [K in keyof T as `--${string & K}`]: T[K] extends number ? `${T[K]}px` : T[K];
};

// Conditional type inference in generic constraints
type HasId = { id: string | number };
type HasName = { name: string };

function merge<
    T extends HasId,
    U extends HasName,
    R = T extends { id: infer ID }
        ? U extends { name: infer Name }
        ? { id: ID; name: Name }
        : never
        : never
>(obj1: T, obj2: U): R {
    return {
        id: obj1.id,
        name: obj2.name
    } as R;
}
