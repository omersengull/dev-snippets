import { Snippet } from '../types/snippet';

export const TRENDING_SNIPPETS: Snippet[] = [
  {
    id: '1',
    user_id: 'user_1',
    title: 'Custom Hook for LocalStorage Syncing',
    language: 'TypeScript',
    description: 'A robust React hook to keep application state in sync with localStorage while handling window events and SSR.',
    profiles: {
      full_name: 'alex_dev',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    saved_count: 128,
    views: 2400,
    lines: 20,
    file_name: 'useLocalStorage.ts',
    created_at: '2024-01-01',
    visibility: 'Public',
    comments: [],
    code: `function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}`
  },
  {
    id: '2',
    user_id: 'user_2',
    title: 'Fibonacci Generator',
    language: 'Python',
    description: 'Efficient generator function for Fibonacci sequence.',
    profiles: {
      full_name: 'py_master',
      avatar_url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    saved_count: 84,
    views: 1100,
    lines: 6,
    file_name: 'fibonacci.py',
    created_at: '2024-01-02',
    visibility: 'Public',
    comments: [],
    code: `def fibonacci(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()
fibonacci(1000)`
  },
  {
    id: '3',
    user_id: 'user_3',
    title: 'Glassmorphism Card',
    language: 'HTML',
    description: 'Beautiful glass effect using Tailwind CSS utility classes.',
    profiles: {
      full_name: 'ui_guy',
      avatar_url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    saved_count: 245,
    views: 5800,
    lines: 7,
    file_name: 'glass-card.html',
    created_at: '2024-01-03',
    visibility: 'Public',
    comments: [],
    code: `<div class="flex flex-col gap-4 
  p-6 glass rounded-xl border border-white/10">
  <div class="size-12 bg-primary rounded-lg">
  </div>
  <p class="text-white">Hello World</p>
</div>`
  },
  {
    id: '4',
    user_id: 'user_4',
    title: 'Simple Counter',
    language: 'Javascript',
    description: 'Classic counter example with useState hook.',
    profiles: {
      full_name: 'react_ninja',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    saved_count: 312,
    views: 9200,
    lines: 8,
    file_name: 'Counter.tsx',
    created_at: '2024-01-04',
    visibility: 'Public',
    comments: [],
    code: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count is {count}
    </button>
  );
}`
  },
  {
    id: '5', user_id: 'user_5', title: 'Centering a Div', language: 'css',
    description: 'Modern way to center everything in a container.',
    profiles: { full_name: 'css_wizard', avatar_url: 'https://i.pravatar.cc/100?img=5' },
    saved_count: 450, views: 12000, lines: 5, file_name: 'center.css', created_at: '2024-01-05', visibility: 'Public', comments: [],
    code: `.container {\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n}`
  },
  {
    id: '6', user_id: 'user_6', title: 'Custom Scrollbar', language: 'css',
    description: 'Elegant minimalist scrollbar for webkit browsers.',
    profiles: { full_name: 'ui_designer', avatar_url: 'https://i.pravatar.cc/100?img=6' },
    saved_count: 89, views: 3400, lines: 10, file_name: 'scroll.css', created_at: '2024-01-06', visibility: 'Public', comments: [],
    code: `::-webkit-scrollbar {\n  width: 8px;\n}\n::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 10px;\n}`
  },

  // SQL (id: 9-12)
  {
    id: '7', user_id: 'user_7', title: 'Find Duplicate Emails', language: 'sql',
    description: 'Identify duplicate records in a users table.',
    profiles: { full_name: 'data_guru', avatar_url: 'https://i.pravatar.cc/100?img=9' },
    saved_count: 156, views: 4200, lines: 4, file_name: 'dupes.sql', created_at: '2024-01-09', visibility: 'Public', comments: [],
    code: `SELECT email, COUNT(email)\nFROM Users\nGROUP BY email\nHAVING COUNT(email) > 1;`
  },

  // Go (id: 13-16)
  {
    id: '109', user_id: 'user_109', title: 'Simple HTTP Server', language: 'go',
    description: 'Basic net/http server setup in Go.',
    profiles: { full_name: 'gopher_1', avatar_url: 'https://i.pravatar.cc/100?img=13' },
    saved_count: 210, views: 5000, lines: 12, file_name: 'main.go', created_at: '2024-01-13', visibility: 'Public', comments: [],
    code: `package main\nimport ("fmt"; "net/http")\nfunc main() {\n  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintf(w, "Hello Gopher!")\n  })\n  http.ListenAndServe(":8080", nil)\n}`
  },

  // Rust (id: 17-20)
  {
    id: '170', user_id: 'user_170', title: 'Read File to String', language: 'rust',
    description: 'Safe way to read a file content in Rust.',
    profiles: { full_name: 'ferris_fan', avatar_url: 'https://i.pravatar.cc/100?img=17' },
    saved_count: 134, views: 2800, lines: 5, file_name: 'read.rs', created_at: '2024-01-17', visibility: 'Public', comments: [],
    code: `use std::fs;\nfn main() {\n  let content = fs::read_to_string("test.txt").expect("Error reading file");\n  println!("{}", content);\n}`
  },

  // Java (id: 21-25)
  {
    id: '210', user_id: 'user_210', title: 'Singleton Pattern', language: 'java',
    description: 'Thread-safe singleton implementation.',
    profiles: { full_name: 'java_pro', avatar_url: 'https://i.pravatar.cc/100?img=21' },
    saved_count: 45, views: 1900, lines: 15, file_name: 'Singleton.java', created_at: '2024-01-21', visibility: 'Public', comments: [],
    code: `public class Singleton {\n  private static Singleton instance;\n  private Singleton() {}\n  public static synchronized Singleton getInstance() {\n    if (instance == null) instance = new Singleton();\n    return instance;\n  }\n}`
  },

  // PHP (id: 26-30)
  {
    id: '26', user_id: 'user_26', title: 'PDO Connection', language: 'php',
    description: 'Secure database connection using PDO.',
    profiles: { full_name: 'php_king', avatar_url: 'https://i.pravatar.cc/100?img=26' },
    saved_count: 78, views: 3100, lines: 8, file_name: 'db.php', created_at: '2024-01-26', visibility: 'Public', comments: [],
    code: `$pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass, [\n  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION\n]);`
  },

  // Ruby (id: 31-35)
  {
    id: '31', user_id: 'user_31', title: 'Array Mapping', language: 'ruby',
    description: 'One-liner to transform array elements.',
    profiles: { full_name: 'ruby_dev', avatar_url: 'https://i.pravatar.cc/100?img=31' },
    saved_count: 55, views: 1200, lines: 2, file_name: 'map.rb', created_at: '2024-01-31', visibility: 'Public', comments: [],
    code: `names = ["alice", "bob"].map(&:capitalize)\nputs names`
  },

  // Swift (id: 36-40)
  {
    id: '36', user_id: 'user_36', title: 'SwiftUI View', language: 'swift',
    description: 'Basic structure of a SwiftUI screen.',
    profiles: { full_name: 'ios_dev', avatar_url: 'https://i.pravatar.cc/100?img=36' },
    saved_count: 190, views: 4500, lines: 10, file_name: 'ContentView.swift', created_at: '2024-02-01', visibility: 'Public', comments: [],
    code: `import SwiftUI\nstruct ContentView: View {\n  var body: some View {\n    Text("Hello, SwiftUI!")\n      .padding()\n  }\n}`
  },

  // Dart (id: 41-45)
  {
    id: '41', user_id: 'user_41', title: 'Flutter Stateless Widget', language: 'dart',
    description: 'The foundation of Flutter UI components.',
    profiles: { full_name: 'flutter_fan', avatar_url: 'https://i.pravatar.cc/100?img=41' },
    saved_count: 230, views: 6000, lines: 12, file_name: 'main.dart', created_at: '2024-02-05', visibility: 'Public', comments: [],
    code: `import 'package:flutter/material.dart';\nclass MyWidget extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Container(child: Text('Hello World'));\n  }\n}`
  },

  // C# (id: 46-50)
  {
    id: '46', user_id: 'user_46', title: 'LINQ Filter', language: 'csharp',
    description: 'Filtering a list using LINQ queries.',
    profiles: { full_name: 'dotnet_dev', avatar_url: 'https://i.pravatar.cc/100?img=46' },
    saved_count: 112, views: 3400, lines: 4, file_name: 'Filter.cs', created_at: '2024-02-10', visibility: 'Public', comments: [],
    code: `var activeUsers = users.Where(u => u.IsActive).ToList();`
  },

  // JSON / YAML / Markdown (id: 51-60)
  {
    id: '51', user_id: 'user_51', title: 'Package.json Template', language: 'json',
    description: 'Base configuration for a Node project.',
    profiles: { full_name: 'npm_pro', avatar_url: 'https://i.pravatar.cc/100?img=51' },
    saved_count: 300, views: 8000, lines: 10, file_name: 'package.json', created_at: '2024-02-15', visibility: 'Public', comments: [],
    code: `{\n  "name": "project",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js"\n  }\n}`
  },

  // C / C++ (id: 61-70)
  {
    id: '61', user_id: 'user_61', title: 'Memory Allocation', language: 'c',
    description: 'Dynamic memory allocation example in C.',
    profiles: { full_name: 'low_level', avatar_url: 'https://i.pravatar.cc/100?img=61' },
    saved_count: 45, views: 2100, lines: 6, file_name: 'alloc.c', created_at: '2024-02-20', visibility: 'Public', comments: [],
    code: `int *arr = (int*)malloc(5 * sizeof(int));\nif (arr == NULL) return 1;\nfree(arr);`
  },

  // Kotlin (id: 71-75)
  {
    id: '71', user_id: 'user_71', title: 'Data Class', language: 'kotlin',
    description: 'Clean data structure in Kotlin.',
    profiles: { full_name: 'android_dev', avatar_url: 'https://i.pravatar.cc/100?img=71' },
    saved_count: 88, views: 2500, lines: 1, file_name: 'User.kt', created_at: '2024-02-25', visibility: 'Public', comments: [],
    code: `data class User(val id: Int, val name: String, val email: String)`
  },
  {
    id: '11',
    user_id: 'user_11',
    title: 'PostgreSQL Connection Pool',
    language: 'sql',
    description: 'Optimized connection pooling configuration for high-traffic PostgreSQL databases.',
    profiles: {
      full_name: 'db_admin',
      avatar_url: 'https://i.pravatar.cc/100?img=11'
    },
    saved_count: 88,
    views: 1500,
    lines: 5,
    file_name: 'init.sql',
    created_at: '2024-02-11',
    visibility: 'Public',
    comments: [],
    code: `ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '256MB';
-- Restart server to apply changes`
  },
  {
    id: '12',
    user_id: 'user_12',
    title: 'Go Channel worker pattern',
    language: 'go',
    description: 'Basic worker pool implementation using Goroutines and Channels.',
    profiles: {
      full_name: 'go_runner',
      avatar_url: 'https://i.pravatar.cc/100?img=12'
    },
    saved_count: 142,
    views: 3100,
    lines: 10,
    file_name: 'worker.go',
    created_at: '2024-02-12',
    visibility: 'Public',
    comments: [],
    code: `func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}`
  },
  {
    id: '13',
    user_id: 'user_13',
    title: 'Rust Pattern Matching',
    language: 'rust',
    description: 'Comprehensive example of using Match for Option and Result types.',
    profiles: {
      full_name: 'ferris_rust',
      avatar_url: 'https://i.pravatar.cc/100?img=13'
    },
    saved_count: 95,
    views: 2200,
    lines: 8,
    file_name: 'main.rs',
    created_at: '2024-02-13',
    visibility: 'Public',
    comments: [],
    code: `match some_option {
    Some(val) => println!("Value: {}", val),
    None => println!("Nothing found"),
}`
  },
  {
    id: '14',
    user_id: 'user_14',
    title: 'SwiftUI Gradient Button',
    language: 'swift',
    description: 'Modern button style with linear gradient and shadow.',
    profiles: {
      full_name: 'apple_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=14'
    },
    saved_count: 210,
    views: 4800,
    lines: 7,
    file_name: 'CustomButton.swift',
    created_at: '2024-02-14',
    visibility: 'Public',
    comments: [],
    code: `Button("Submit") { }
.padding()
.background(LinearGradient(colors: [.blue, .purple], startPoint: .leading, endPoint: .trailing))
.cornerRadius(10)`
  },
  {
    id: '15',
    user_id: 'user_15',
    title: 'Kotlin Coroutine Scope',
    language: 'kotlin',
    description: 'Launching a background task in Android using viewModelScope.',
    profiles: {
      full_name: 'android_pro',
      avatar_url: 'https://i.pravatar.cc/100?img=15'
    },
    saved_count: 120,
    views: 2900,
    lines: 5,
    file_name: 'MainViewModel.kt',
    created_at: '2024-02-15',
    visibility: 'Public',
    comments: [],
    code: `viewModelScope.launch {
    val data = repository.getData()
    _uiState.value = data
}`
  },
  {
    id: '16',
    user_id: 'user_16',
    title: 'Laravel Eloquent Query',
    language: 'php',
    description: 'Using WhereHas to filter relationship records in Laravel.',
    profiles: {
      full_name: 'laravel_artisan',
      avatar_url: 'https://i.pravatar.cc/100?img=16'
    },
    saved_count: 75,
    views: 1800,
    lines: 4,
    file_name: 'UserController.php',
    created_at: '2024-02-16',
    visibility: 'Public',
    comments: [],
    code: `$users = User::whereHas('posts', function($query) {
    $query->where('active', 1);
})->get();`
  },
  {
    id: '17',
    user_id: 'user_17',
    title: 'Ruby on Rails Validation',
    language: 'ruby',
    description: 'Custom regex validation for usernames in Rails models.',
    profiles: {
      full_name: 'rails_master',
      avatar_url: 'https://i.pravatar.cc/100?img=17'
    },
    saved_count: 64,
    views: 1200,
    lines: 3,
    file_name: 'user.rb',
    created_at: '2024-02-17',
    visibility: 'Public',
    comments: [],
    code: `validates :username, presence: true, 
format: { with: /\\A[a-zA-Z0-9]+\\z/ }`
  },
  {
    id: '18',
    user_id: 'user_18',
    title: 'C# LINQ GroupBy',
    language: 'csharp',
    description: 'Grouping a list of objects by a property and counting them.',
    profiles: {
      full_name: 'dotnet_guru',
      avatar_url: 'https://i.pravatar.cc/100?img=18'
    },
    saved_count: 130,
    views: 3500,
    lines: 5,
    file_name: 'Stats.cs',
    created_at: '2024-02-18',
    visibility: 'Public',
    comments: [],
    code: `var counts = list.GroupBy(x => x.Category)
                 .Select(g => new { Cat = g.Key, Count = g.Count() });`
  },
  {
    id: '19',
    user_id: 'user_19',
    title: 'Dart Flutter Provider',
    language: 'dart',
    description: 'State management setup using the Provider package.',
    profiles: {
      full_name: 'flutter_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=19'
    },
    saved_count: 245,
    views: 5600,
    lines: 8,
    file_name: 'counter_provider.dart',
    created_at: '2024-02-19',
    visibility: 'Public',
    comments: [],
    code: `class Counter with ChangeNotifier {
  int _count = 0;
  void increment() { _count++; notifyListeners(); }
}`
  },
  {
    id: '20',
    user_id: 'user_20',
    title: 'C++ Smart Pointers',
    language: 'cpp',
    description: 'Modern C++ memory management using std::unique_ptr.',
    profiles: {
      full_name: 'cpp_coder',
      avatar_url: 'https://i.pravatar.cc/100?img=20'
    },
    saved_count: 110,
    views: 2700,
    lines: 6,
    file_name: 'main.cpp',
    created_at: '2024-02-20',
    visibility: 'Public',
    comments: [],
    code: `#include <memory>
auto ptr = std::make_unique<MyClass>();
ptr->doSomething();
// Auto-deleted when out of scope`
  },
  {
    id: '23133',
    user_id: 'user_1',
    title: 'React useState Hook',
    language: 'tsx',
    description: 'Basic counter example using React useState hook.',
    profiles: {
      full_name: 'react_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=1'
    },
    saved_count: 24554,
    views: 5800,
    lines: 8,
    file_name: 'Counter.tsx',
    created_at: '2024-01-15',
    visibility: 'Public',
    comments: [],
    code: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`
  },
  {
    id: '23213',
    user_id: 'user_2',
    title: 'Custom useFetch Hook',
    language: 'tsx',
    description: 'Reusable data fetching hook with loading and error states.',
    profiles: {
      full_name: 'hooks_master',
      avatar_url: 'https://i.pravatar.cc/100?img=2'
    },
    saved_count: 412,
    views: 9300,
    lines: 14,
    file_name: 'useFetch.ts',
    created_at: '2024-01-22',
    visibility: 'Public',
    comments: [],
    code: `import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}`
  },
  {
    id: '37698',
    user_id: 'user_3',
    title: 'Context API Provider',
    language: 'tsx',
    description: 'Theme context provider with TypeScript generics.',
    profiles: {
      full_name: 'ts_wizard',
      avatar_url: 'https://i.pravatar.cc/100?img=3'
    },
    saved_count: 189,
    views: 4100,
    lines: 12,
    file_name: 'ThemeContext.tsx',
    created_at: '2024-02-01',
    visibility: 'Public',
    comments: [],
    code: `import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';
const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: 'light', toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);`
  },
  {
    id: '2354',
    user_id: 'user_4',
    title: 'useReducer Todo List',
    language: 'tsx',
    description: 'Todo app state management with useReducer pattern.',
    profiles: {
      full_name: 'state_guru',
      avatar_url: 'https://i.pravatar.cc/100?img=4'
    },
    saved_count: 330,
    views: 7200,
    lines: 16,
    file_name: 'TodoReducer.tsx',
    created_at: '2024-02-08',
    visibility: 'Public',
    comments: [],
    code: `type Action = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number };
type Todo = { id: number; text: string };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text }];
    case 'REMOVE':
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
}

// Usage:
// const [todos, dispatch] = useReducer(reducer, []);
// dispatch({ type: 'ADD', text: 'Buy milk' });`
  },
  {
    id: '5129',
    user_id: 'user_5',
    title: 'React Portal Modal',
    language: 'tsx',
    description: 'Accessible modal dialog using React portals.',
    profiles: {
      full_name: 'ui_builder',
      avatar_url: 'https://i.pravatar.cc/100?img=5'
    },
    saved_count: 278,
    views: 6100,
    lines: 13,
    file_name: 'Modal.tsx',
    created_at: '2024-02-14',
    visibility: 'Public',
    comments: [],
    code: `import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}`
  },
  {
    id: '60934',
    user_id: 'user_6',
    title: 'Debounce Search Hook',
    language: 'tsx',
    description: 'useDebounce hook for optimizing search inputs.',
    profiles: {
      full_name: 'perf_coder',
      avatar_url: 'https://i.pravatar.cc/100?img=6'
    },
    saved_count: 521,
    views: 11400,
    lines: 10,
    file_name: 'useDebounce.ts',
    created_at: '2024-02-18',
    visibility: 'Public',
    comments: [],
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
// Usage: const query = useDebounce(searchInput, 300);`
  },
  {
    id: '78763',
    user_id: 'user_7',
    title: 'React.memo Optimization',
    language: 'tsx',
    description: 'Preventing unnecessary re-renders with React.memo and useCallback.',
    profiles: {
      full_name: 'optimize_pro',
      avatar_url: 'https://i.pravatar.cc/100?img=7'
    },
    saved_count: 167,
    views: 3800,
    lines: 11,
    file_name: 'MemoExample.tsx',
    created_at: '2024-02-25',
    visibility: 'Public',
    comments: [],
    code: `import { memo, useCallback, useState } from 'react';

const ExpensiveChild = memo(({ onClick }: { onClick: () => void }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});

export function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // stable reference
  return <ExpensiveChild onClick={handleClick} />;
}`
  },
  {
    id: '8124',
    user_id: 'user_8',
    title: 'Compound Component Pattern',
    language: 'tsx',
    description: 'Flexible UI with compound components and implicit state sharing.',
    profiles: {
      full_name: 'pattern_ninja',
      avatar_url: 'https://i.pravatar.cc/100?img=8'
    },
    saved_count: 394,
    views: 8700,
    lines: 15,
    file_name: 'Tabs.tsx',
    created_at: '2024-03-02',
    visibility: 'Public',
    comments: [],
    code: `const TabsContext = createContext<{ active: string; setActive: (v: string) => void } | null>(null);

function Tabs({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState('');
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

function Tab({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button
      style={{ fontWeight: ctx.active === value ? 'bold' : 'normal' }}
      onClick={() => ctx.setActive(value)}
    >
      {children}
    </button>
  );
}

Tabs.Tab = Tab;
// Usage: <Tabs><Tabs.Tab value="a">Tab A</Tabs.Tab></Tabs>`
  },
  {
    id: '98456',
    user_id: 'user_9',
    title: 'Suspense + Lazy Loading',
    language: 'tsx',
    description: 'Code splitting with React.lazy and Suspense boundaries.',
    profiles: {
      full_name: 'bundle_slicer',
      avatar_url: 'https://i.pravatar.cc/100?img=9'
    },
    saved_count: 203,
    views: 4600,
    lines: 9,
    file_name: 'LazyPage.tsx',
    created_at: '2024-03-10',
    visibility: 'Public',
    comments: [],
    code: `import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

export function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart data={data} />
    </Suspense>
  );
}
// HeavyChart bundle loads only when Dashboard renders`
  },
  {
    id: '10666',
    user_id: 'user_10',
    title: 'Generic List Component',
    language: 'tsx',
    description: 'Type-safe reusable list with TypeScript generics.',
    profiles: {
      full_name: 'generics_fan',
      avatar_url: 'https://i.pravatar.cc/100?img=10'
    },
    saved_count: 456,
    views: 9900,
    lines: 12,
    file_name: 'GenericList.tsx',
    created_at: '2024-03-15',
    visibility: 'Public',
    comments: [],
    code: `interface ListProps<T> {
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export function List<T>({ items, keyExtractor, renderItem, emptyMessage = 'No items' }: ListProps<T>) {
  if (items.length === 0) return <p>{emptyMessage}</p>;
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}`
  },{
    id: '847293',
    user_id: 'user_847293',
    title: 'Python Decorators',
    language: 'Python',
    description: 'Function decorators for timing and logging.',
    profiles: {
      full_name: 'py_decorator',
      avatar_url: 'https://i.pravatar.cc/100?img=21'
    },
    saved_count: 312,
    views: 7400,
    lines: 10,
    file_name: 'decorators.py',
    created_at: '2024-01-10',
    visibility: 'Public',
    comments: [],
    code: `import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f'{func.__name__} took {time.time() - start:.4f}s')\n        return result\n    return wrapper\n\n@timer\ndef slow_function():\n    time.sleep(1)`
  },
  {
    id: '3920481',
    user_id: 'user_3920481',
    title: 'Dataclass with Validation',
    language: 'Python',
    description: 'Type-safe dataclass with post_init validation.',
    profiles: {
      full_name: 'dataclass_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=22'
    },
    saved_count: 198,
    views: 4300,
    lines: 12,
    file_name: 'models.py',
    created_at: '2024-01-18',
    visibility: 'Public',
    comments: [],
    code: `from dataclasses import dataclass, field\nfrom typing import List\n\n@dataclass\nclass User:\n    name: str\n    age: int\n    tags: List[str] = field(default_factory=list)\n\n    def __post_init__(self):\n        if self.age < 0:\n            raise ValueError('Age cannot be negative')\n        self.name = self.name.strip().title()`
  },
  {
    id: '56781234',
    user_id: 'user_56781234',
    title: 'Context Manager',
    language: 'Python',
    description: 'Custom context manager using __enter__ and __exit__.',
    profiles: {
      full_name: 'context_pro',
      avatar_url: 'https://i.pravatar.cc/100?img=23'
    },
    saved_count: 445,
    views: 9800,
    lines: 11,
    file_name: 'context.py',
    created_at: '2024-01-25',
    visibility: 'Public',
    comments: [],
    code: `class ManagedFile:\n    def __init__(self, path: str, mode: str = 'r'):\n        self.path = path\n        self.mode = mode\n\n    def __enter__(self):\n        self.file = open(self.path, self.mode)\n        return self.file\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.file.close()\n        return False`
  },
  {
    id: '72930',
    user_id: 'user_72930',
    title: 'Generator Pipeline',
    language: 'Python',
    description: 'Memory-efficient data processing with generator chaining.',
    profiles: {
      full_name: 'gen_wizard',
      avatar_url: 'https://i.pravatar.cc/100?img=24'
    },
    saved_count: 389,
    views: 8500,
    lines: 10,
    file_name: 'pipeline.py',
    created_at: '2024-02-03',
    visibility: 'Public',
    comments: [],
    code: `def read_lines(path):\n    with open(path) as f:\n        yield from f\n\ndef filter_empty(lines):\n    return (l for l in lines if l.strip())\n\ndef parse_csv(lines):\n    return (l.strip().split(',') for l in lines)\n\npipeline = parse_csv(filter_empty(read_lines('data.csv')))\nfor row in pipeline:\n    print(row)`
  },
  {
    id: '1048576',
    user_id: 'user_1048576',
    title: 'AsyncIO Concurrent Fetch',
    language: 'Python',
    description: 'Fetch multiple URLs concurrently with asyncio and aiohttp.',
    profiles: {
      full_name: 'async_ninja',
      avatar_url: 'https://i.pravatar.cc/100?img=25'
    },
    saved_count: 534,
    views: 12100,
    lines: 13,
    file_name: 'async_fetch.py',
    created_at: '2024-02-11',
    visibility: 'Public',
    comments: [],
    code: `import asyncio\nimport aiohttp\n\nasync def fetch(session, url):\n    async with session.get(url) as resp:\n        return await resp.text()\n\nasync def fetch_all(urls):\n    async with aiohttp.ClientSession() as session:\n        tasks = [fetch(session, url) for url in urls]\n        return await asyncio.gather(*tasks)\n\nurls = ['https://example.com', 'https://python.org']\nresults = asyncio.run(fetch_all(urls))`
  },
  {
    id: '9374651',
    user_id: 'user_9374651',
    title: 'LRU Cache with functools',
    language: 'Python',
    description: 'Memoization using functools.lru_cache for expensive computations.',
    profiles: {
      full_name: 'cache_master',
      avatar_url: 'https://i.pravatar.cc/100?img=26'
    },
    saved_count: 276,
    views: 6200,
    lines: 9,
    file_name: 'cache.py',
    created_at: '2024-02-19',
    visibility: 'Public',
    comments: [],
    code: `from functools import lru_cache\n\n@lru_cache(maxsize=128)\ndef fibonacci(n: int) -> int:\n    if n < 2:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(50))\nprint(fibonacci.cache_info())`
  },
  {
    id: '20480',
    user_id: 'user_20480',
    title: 'TypedDict & Protocol',
    language: 'Python',
    description: 'Structural typing with Protocol and TypedDict for duck typing.',
    profiles: {
      full_name: 'typing_purist',
      avatar_url: 'https://i.pravatar.cc/100?img=27'
    },
    saved_count: 143,
    views: 3100,
    lines: 14,
    file_name: 'typing_example.py',
    created_at: '2024-02-27',
    visibility: 'Public',
    comments: [],
    code: `from typing import Protocol, TypedDict\n\nclass UserDict(TypedDict):\n    name: str\n    age: int\n\nclass Drawable(Protocol):\n    def draw(self) -> None: ...\n\nclass Circle:\n    def draw(self) -> None:\n        print('Drawing circle')\n\ndef render(shape: Drawable) -> None:\n    shape.draw()\n\nrender(Circle())`
  },
  {
    id: '60059201',
    user_id: 'user_60059201',
    title: 'Pydantic Data Model',
    language: 'Python',
    description: 'Runtime validation and serialization with Pydantic v2.',
    profiles: {
      full_name: 'pydantic_fan',
      avatar_url: 'https://i.pravatar.cc/100?img=28'
    },
    saved_count: 601,
    views: 13800,
    lines: 14,
    file_name: 'schema.py',
    created_at: '2024-03-05',
    visibility: 'Public',
    comments: [],
    code: `from pydantic import BaseModel, EmailStr, field_validator\n\nclass User(BaseModel):\n    name: str\n    email: EmailStr\n    age: int\n\n    @field_validator('age')\n    @classmethod\n    def age_must_be_positive(cls, v):\n        if v <= 0:\n            raise ValueError('Age must be positive')\n        return v\n\nuser = User(name='Alice', email='alice@example.com', age=30)\nprint(user.model_dump_json())`
  },
  {
    id: '417832',
    user_id: 'user_417832',
    title: 'Pathlib File Operations',
    language: 'Python',
    description: 'Modern file system operations using pathlib.Path.',
    profiles: {
      full_name: 'fs_explorer',
      avatar_url: 'https://i.pravatar.cc/100?img=29'
    },
    saved_count: 229,
    views: 5300,
    lines: 10,
    file_name: 'files.py',
    created_at: '2024-03-12',
    visibility: 'Public',
    comments: [],
    code: `from pathlib import Path\n\nbase = Path('project')\n(base / 'src').mkdir(parents=True, exist_ok=True)\n\nconfig = base / 'config.json'\nconfig.write_text('{"debug": true}')\n\npy_files = list(base.rglob('*.py'))\nsizes = {f.name: f.stat().st_size for f in py_files}`
  },
  {
    id: '7654321',
    user_id: 'user_7654321',
    title: 'Abstract Base Class',
    language: 'Python',
    description: 'Enforcing interfaces with ABC and abstract methods.',
    profiles: {
      full_name: 'oop_architect',
      avatar_url: 'https://i.pravatar.cc/100?img=30'
    },
    saved_count: 318,
    views: 7000,
    lines: 15,
    file_name: 'abstract.py',
    created_at: '2024-03-18',
    visibility: 'Public',
    comments: [],
    code: `from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self) -> float: ...\n\n    @abstractmethod\n    def perimeter(self) -> float: ...\n\n    def describe(self):\n        print(f'Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}')\n\nclass Rectangle(Shape):\n    def __init__(self, w: float, h: float):\n        self.w, self.h = w, h\n    def area(self): return self.w * self.h\n    def perimeter(self): return 2 * (self.w + self.h)\n\nRectangle(4, 5).describe()`
  },{
    id: '3847291',
    user_id: 'user_3847291',
    title: 'Debounce Function',
    language: 'Javascript',
    description: 'Limit how often a function runs using debounce.',
    profiles: {
      full_name: 'js_perf',
      avatar_url: 'https://i.pravatar.cc/100?img=32'
    },
    saved_count: 487,
    views: 10200,
    lines: 8,
    file_name: 'debounce.js',
    created_at: '2024-01-12',
    visibility: 'Public',
    comments: [],
    code: `function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nconst onSearch = debounce((q) => console.log(q), 300);`
  },
  {
    id: '9012847',
    user_id: 'user_9012847',
    title: 'Deep Clone Object',
    language: 'Javascript',
    description: 'Deeply clone any serializable JS object.',
    profiles: {
      full_name: 'clone_master',
      avatar_url: 'https://i.pravatar.cc/100?img=33'
    },
    saved_count: 312,
    views: 7800,
    lines: 3,
    file_name: 'clone.js',
    created_at: '2024-01-20',
    visibility: 'Public',
    comments: [],
    code: `const deepClone = (obj) => JSON.parse(JSON.stringify(obj));\n\nconst original = { a: 1, b: { c: 2 } };\nconst copy = deepClone(original);`
  },
  {
    id: '56234',
    user_id: 'user_56234',
    title: 'Promise.all Fetching',
    language: 'Javascript',
    description: 'Fetch multiple endpoints in parallel with Promise.all.',
    profiles: {
      full_name: 'async_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=34'
    },
    saved_count: 543,
    views: 11900,
    lines: 9,
    file_name: 'parallel.js',
    created_at: '2024-01-28',
    visibility: 'Public',
    comments: [],
    code: `const fetchAll = async (urls) => {\n  const responses = await Promise.all(urls.map(url => fetch(url)));\n  return Promise.all(responses.map(res => res.json()));\n};\n\nconst [users, posts] = await fetchAll([\n  '/api/users',\n  '/api/posts'\n]);`
  },
  {
    id: '7731049',
    user_id: 'user_7731049',
    title: 'Event Emitter',
    language: 'Javascript',
    description: 'Lightweight pub/sub event system from scratch.',
    profiles: {
      full_name: 'event_pro',
      avatar_url: 'https://i.pravatar.cc/100?img=35'
    },
    saved_count: 228,
    views: 5400,
    lines: 12,
    file_name: 'emitter.js',
    created_at: '2024-02-06',
    visibility: 'Public',
    comments: [],
    code: `class EventEmitter {\n  constructor() { this.events = {}; }\n\n  on(event, listener) {\n    (this.events[event] ||= []).push(listener);\n    return this;\n  }\n\n  emit(event, ...args) {\n    (this.events[event] || []).forEach(fn => fn(...args));\n  }\n\n  off(event, listener) {\n    this.events[event] = (this.events[event] || []).filter(fn => fn !== listener);\n  }\n}`
  },
  {
    id: '40192837',
    user_id: 'user_40192837',
    title: 'Flatten Nested Array',
    language: 'Javascript',
    description: 'Recursively flatten deeply nested arrays.',
    profiles: {
      full_name: 'array_wizard',
      avatar_url: 'https://i.pravatar.cc/100?img=36'
    },
    saved_count: 175,
    views: 4100,
    lines: 5,
    file_name: 'flatten.js',
    created_at: '2024-02-13',
    visibility: 'Public',
    comments: [],
    code: `const flatten = (arr) =>\n  arr.reduce((acc, val) =>\n    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);\n\nflatten([1, [2, [3, [4]]]]); // [1, 2, 3, 4]`
  },
  {
    id: '88234',
    user_id: 'user_88234',
    title: 'Local Storage Hook',
    language: 'Javascript',
    description: 'Persist and sync state with localStorage.',
    profiles: {
      full_name: 'storage_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=37'
    },
    saved_count: 396,
    views: 8800,
    lines: 10,
    file_name: 'storage.js',
    created_at: '2024-02-21',
    visibility: 'Public',
    comments: [],
    code: `const getItem = (key, fallback = null) => {\n  try {\n    const item = localStorage.getItem(key);\n    return item ? JSON.parse(item) : fallback;\n  } catch { return fallback; }\n};\n\nconst setItem = (key, value) => {\n  try { localStorage.setItem(key, JSON.stringify(value)); }\n  catch (e) { console.error(e); }\n};`
  },
  {
    id: '6510293',
    user_id: 'user_6510293',
    title: 'Curry Function',
    language: 'Javascript',
    description: 'Generic curry utility for partial function application.',
    profiles: {
      full_name: 'fp_lover',
      avatar_url: 'https://i.pravatar.cc/100?img=38'
    },
    saved_count: 261,
    views: 6300,
    lines: 7,
    file_name: 'curry.js',
    created_at: '2024-03-01',
    visibility: 'Public',
    comments: [],
    code: `const curry = (fn) => {\n  const arity = fn.length;\n  return function curried(...args) {\n    if (args.length >= arity) return fn(...args);\n    return (...more) => curried(...args, ...more);\n  };\n};\n\nconst add = curry((a, b, c) => a + b + c);\nadd(1)(2)(3); // 6`
  },
  {
    id: '29847',
    user_id: 'user_29847',
    title: 'Intersection Observer',
    language: 'Javascript',
    description: 'Lazy-load elements when they enter the viewport.',
    profiles: {
      full_name: 'scroll_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=39'
    },
    saved_count: 334,
    views: 7600,
    lines: 11,
    file_name: 'observer.js',
    created_at: '2024-03-08',
    visibility: 'Public',
    comments: [],
    code: `const observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.classList.add('visible');\n      observer.unobserve(entry.target);\n    }\n  });\n}, { threshold: 0.1 });\n\ndocument.querySelectorAll('.lazy').forEach(el => observer.observe(el));`
  },
  {
    id: '1357924',
    user_id: 'user_1357924',
    title: 'Group By Utility',
    language: 'Javascript',
    description: 'Group an array of objects by a given key.',
    profiles: {
      full_name: 'data_shaper',
      avatar_url: 'https://i.pravatar.cc/100?img=40'
    },
    saved_count: 419,
    views: 9500,
    lines: 7,
    file_name: 'groupBy.js',
    created_at: '2024-03-14',
    visibility: 'Public',
    comments: [],
    code: `const groupBy = (arr, key) =>\n  arr.reduce((acc, item) => {\n    const group = item[key];\n    (acc[group] ||= []).push(item);\n    return acc;\n  }, {});\n\ngroupBy(users, 'role');\n// { admin: [...], editor: [...] }`
  },{
    id: '4829103',
    user_id: 'user_4829103',
    title: 'Recursive CTE',
    language: 'sql',
    description: 'Traverse a hierarchical tree structure using recursive CTE.',
    profiles: {
      full_name: 'sql_architect',
      avatar_url: 'https://i.pravatar.cc/100?img=42'
    },
    saved_count: 334,
    views: 7600,
    lines: 10,
    file_name: 'recursive_cte.sql',
    created_at: '2024-01-14',
    visibility: 'Public',
    comments: [],
    code: `WITH RECURSIVE org_tree AS (\n  SELECT id, name, manager_id, 0 AS depth\n  FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id, ot.depth + 1\n  FROM employees e\n  JOIN org_tree ot ON e.manager_id = ot.id\n)\nSELECT * FROM org_tree ORDER BY depth;`
  },
  {
    id: '71039284',
    user_id: 'user_71039284',
    title: 'Window Functions',
    language: 'sql',
    description: 'Rank rows within partitions using ROW_NUMBER and RANK.',
    profiles: {
      full_name: 'window_guru',
      avatar_url: 'https://i.pravatar.cc/100?img=43'
    },
    saved_count: 512,
    views: 11300,
    lines: 8,
    file_name: 'window.sql',
    created_at: '2024-01-22',
    visibility: 'Public',
    comments: [],
    code: `SELECT\n  name,\n  department,\n  salary,\n  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank\nFROM employees\nORDER BY department, rank;`
  },
  {
    id: '93847',
    user_id: 'user_93847',
    title: 'Upsert with ON CONFLICT',
    language: 'sql',
    description: 'Insert or update a record atomically in PostgreSQL.',
    profiles: {
      full_name: 'pg_expert',
      avatar_url: 'https://i.pravatar.cc/100?img=44'
    },
    saved_count: 289,
    views: 6500,
    lines: 7,
    file_name: 'upsert.sql',
    created_at: '2024-01-30',
    visibility: 'Public',
    comments: [],
    code: `INSERT INTO users (id, email, updated_at)\nVALUES (1, 'alice@example.com', NOW())\nON CONFLICT (id)\nDO UPDATE SET\n  email = EXCLUDED.email,\n  updated_at = EXCLUDED.updated_at;`
  },
  {
    id: '5510293',
    user_id: 'user_5510293',
    title: 'Running Total',
    language: 'sql',
    description: 'Calculate a cumulative sum over ordered rows.',
    profiles: {
      full_name: 'analytics_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=45'
    },
    saved_count: 198,
    views: 4700,
    lines: 7,
    file_name: 'running_total.sql',
    created_at: '2024-02-07',
    visibility: 'Public',
    comments: [],
    code: `SELECT\n  order_date,\n  amount,\n  SUM(amount) OVER (\n    ORDER BY order_date\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_total\nFROM orders;`
  },
  {
    id: '38271049',
    user_id: 'user_38271049',
    title: 'Pivot Table with CASE',
    language: 'sql',
    description: 'Manually pivot rows into columns using conditional aggregation.',
    profiles: {
      full_name: 'pivot_pro',
      avatar_url: 'https://i.pravatar.cc/100?img=46'
    },
    saved_count: 421,
    views: 9200,
    lines: 9,
    file_name: 'pivot.sql',
    created_at: '2024-02-15',
    visibility: 'Public',
    comments: [],
    code: `SELECT\n  user_id,\n  SUM(CASE WHEN month = 'Jan' THEN amount ELSE 0 END) AS jan,\n  SUM(CASE WHEN month = 'Feb' THEN amount ELSE 0 END) AS feb,\n  SUM(CASE WHEN month = 'Mar' THEN amount ELSE 0 END) AS mar\nFROM sales\nGROUP BY user_id;`
  },
  {
    id: '60183',
    user_id: 'user_60183',
    title: 'Delete Duplicates',
    language: 'sql',
    description: 'Remove duplicate rows while keeping the latest record.',
    profiles: {
      full_name: 'cleanup_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=47'
    },
    saved_count: 376,
    views: 8400,
    lines: 8,
    file_name: 'delete_dupes.sql',
    created_at: '2024-02-23',
    visibility: 'Public',
    comments: [],
    code: `DELETE FROM users\nWHERE id NOT IN (\n  SELECT MIN(id)\n  FROM users\n  GROUP BY email\n);`
  },
  {
    id: '2748391',
    user_id: 'user_2748391',
    title: 'JSON Column Query',
    language: 'sql',
    description: 'Extract and filter data from a JSONB column in PostgreSQL.',
    profiles: {
      full_name: 'json_db_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=48'
    },
    saved_count: 244,
    views: 5800,
    lines: 6,
    file_name: 'json_query.sql',
    created_at: '2024-03-04',
    visibility: 'Public',
    comments: [],
    code: `SELECT\n  id,\n  metadata->>'name' AS name,\n  metadata->>'role' AS role\nFROM users\nWHERE metadata->>'role' = 'admin';`
  },
  {
    id: '8830192',
    user_id: 'user_8830192',
    title: 'Materialized View Refresh',
    language: 'sql',
    description: 'Create and refresh a materialized view for query caching.',
    profiles: {
      full_name: 'view_master',
      avatar_url: 'https://i.pravatar.cc/100?img=49'
    },
    saved_count: 167,
    views: 3900,
    lines: 8,
    file_name: 'mat_view.sql',
    created_at: '2024-03-11',
    visibility: 'Public',
    comments: [],
    code: `CREATE MATERIALIZED VIEW monthly_sales AS\nSELECT\n  DATE_TRUNC('month', order_date) AS month,\n  SUM(amount) AS total\nFROM orders\nGROUP BY 1;\n\nREFRESH MATERIALIZED VIEW monthly_sales;`
  },{
    id: '3849201',
    user_id: 'user_3849201',
    title: 'Ownership & Borrowing',
    language: 'rust',
    description: 'Understanding Rust ownership rules and borrow checker.',
    profiles: {
      full_name: 'rustacean_1',
      avatar_url: 'https://i.pravatar.cc/100?img=50'
    },
    saved_count: 421,
    views: 9100,
    lines: 9,
    file_name: 'ownership.rs',
    created_at: '2024-01-11',
    visibility: 'Public',
    comments: [],
    code: `fn main() {\n  let s1 = String::from("hello");\n  let s2 = &s1; // borrow, not move\n  println!("{} {}", s1, s2); // both valid\n\n  let s3 = s1; // ownership moved\n  // println!("{}", s1); // ERROR: s1 moved\n  println!("{}", s3);\n}`
  },
  {
    id: '70293841',
    user_id: 'user_70293841',
    title: 'Struct with impl',
    language: 'rust',
    description: 'Define a struct and implement methods on it.',
    profiles: {
      full_name: 'struct_fan',
      avatar_url: 'https://i.pravatar.cc/100?img=51'
    },
    saved_count: 298,
    views: 6700,
    lines: 13,
    file_name: 'rect.rs',
    created_at: '2024-01-19',
    visibility: 'Public',
    comments: [],
    code: `struct Rectangle {\n  width: f64,\n  height: f64,\n}\n\nimpl Rectangle {\n  fn new(width: f64, height: f64) -> Self {\n    Self { width, height }\n  }\n  fn area(&self) -> f64 { self.width * self.height }\n  fn is_square(&self) -> bool { self.width == self.height }\n}\n\nlet r = Rectangle::new(4.0, 5.0);\nprintln!("{}", r.area());`
  },
  {
    id: '55019283',
    user_id: 'user_55019283',
    title: 'Enum & Match',
    language: 'rust',
    description: 'Rich enums with data and exhaustive pattern matching.',
    profiles: {
      full_name: 'match_master',
      avatar_url: 'https://i.pravatar.cc/100?img=52'
    },
    saved_count: 534,
    views: 11800,
    lines: 14,
    file_name: 'enums.rs',
    created_at: '2024-01-27',
    visibility: 'Public',
    comments: [],
    code: `enum Shape {\n  Circle(f64),\n  Rectangle(f64, f64),\n  Triangle(f64, f64, f64),\n}\n\nfn area(shape: Shape) -> f64 {\n  match shape {\n    Shape::Circle(r) => std::f64::consts::PI * r * r,\n    Shape::Rectangle(w, h) => w * h,\n    Shape::Triangle(a, b, c) => {\n      let s = (a + b + c) / 2.0;\n      (s*(s-a)*(s-b)*(s-c)).sqrt()\n    }\n  }\n}`
  },
  {
    id: '8812039',
    user_id: 'user_8812039',
    title: 'Error Handling with ?',
    language: 'rust',
    description: 'Propagate errors cleanly using the ? operator and custom error types.',
    profiles: {
      full_name: 'error_handler',
      avatar_url: 'https://i.pravatar.cc/100?img=53'
    },
    saved_count: 387,
    views: 8500,
    lines: 12,
    file_name: 'errors.rs',
    created_at: '2024-02-04',
    visibility: 'Public',
    comments: [],
    code: `use std::num::ParseIntError;\n\n#[derive(Debug)]\nenum AppError {\n  Parse(ParseIntError),\n  NegativeNumber,\n}\n\nfn parse_positive(s: &str) -> Result<u32, AppError> {\n  let n: i32 = s.parse().map_err(AppError::Parse)?;\n  if n < 0 { return Err(AppError::NegativeNumber); }\n  Ok(n as u32)\n}`
  },
  {
    id: '19384750',
    user_id: 'user_19384750',
    title: 'Trait Implementation',
    language: 'rust',
    description: 'Define and implement custom traits with default methods.',
    profiles: {
      full_name: 'trait_dev',
      avatar_url: 'https://i.pravatar.cc/100?img=54'
    },
    saved_count: 243,
    views: 5600,
    lines: 14,
    file_name: 'traits.rs',
    created_at: '2024-02-12',
    visibility: 'Public',
    comments: [],
    code: `trait Greet {\n  fn name(&self) -> &str;\n  fn greeting(&self) -> String {\n    format!("Hello, {}!", self.name())\n  }\n}\n\nstruct Person { name: String }\n\nimpl Greet for Person {\n  fn name(&self) -> &str { &self.name }\n}\n\nlet p = Person { name: "Alice".to_string() };\nprintln!("{}", p.greeting());`
  },
  {
    id: '6274839',
    user_id: 'user_6274839',
    title: 'Iterators & Closures',
    language: 'rust',
    description: 'Functional-style data transformation with iterator chaining.',
    profiles: {
      full_name: 'iter_wizard',
      avatar_url: 'https://i.pravatar.cc/100?img=55'
    },
    saved_count: 478,
    views: 10400,
    lines: 9,
    file_name: 'iterators.rs',
    created_at: '2024-02-20',
    visibility: 'Public',
    comments: [],
    code: `let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nlet result: Vec<i32> = numbers\n  .iter()\n  .filter(|&&x| x % 2 == 0)\n  .map(|&x| x * x)\n  .collect();\n\nprintln!("{:?}", result);\n// [4, 16, 36, 64, 100]`
  },
  {
    id: '30192847',
    user_id: 'user_30192847',
    title: 'Async with Tokio',
    language: 'rust',
    description: 'Spawn concurrent async tasks using the Tokio runtime.',
    profiles: {
      full_name: 'async_rustacean',
      avatar_url: 'https://i.pravatar.cc/100?img=56'
    },
    saved_count: 356,
    views: 7900,
    lines: 13,
    file_name: 'async_tokio.rs',
    created_at: '2024-02-28',
    visibility: 'Public',
    comments: [],
    code: `use tokio::time::{sleep, Duration};\n\n#[tokio::main]\nasync fn main() {\n  let t1 = tokio::spawn(async {\n    sleep(Duration::from_millis(100)).await;\n    println!("Task 1 done");\n  });\n  let t2 = tokio::spawn(async {\n    println!("Task 2 done");\n  });\n  let _ = tokio::join!(t1, t2);\n}`
  },
  {
    id: '7410293',
    user_id: 'user_7410293',
    title: 'Lifetime Annotations',
    language: 'rust',
    description: 'Explicit lifetime parameters to ensure reference validity.',
    profiles: {
      full_name: 'lifetime_pro',
      avatar_url: 'https://i.pravatar.cc/100?img=57'
    },
    saved_count: 189,
    views: 4300,
    lines: 10,
    file_name: 'lifetimes.rs',
    created_at: '2024-03-06',
    visibility: 'Public',
    comments: [],
    code: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n  if x.len() > y.len() { x } else { y }\n}\n\nstruct Important<'a> {\n  content: &'a str,\n}\n\nlet novel = String::from("Call me Ishmael. Some years ago...");\nlet first = novel.split('.').next().unwrap();\nlet i = Important { content: first };\nprintln!("{}", i.content);`
  },
];