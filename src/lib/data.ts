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
    saved: 128,
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
    saved: 84,
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
    saved: 245,
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
    saved: 312,
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
    saved: 450, views: 12000, lines: 5, file_name: 'center.css', created_at: '2024-01-05', visibility: 'Public', comments: [],
    code: `.container {\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n}`
  },
  {
    id: '6', user_id: 'user_6', title: 'Custom Scrollbar', language: 'css',
    description: 'Elegant minimalist scrollbar for webkit browsers.',
    profiles: { full_name: 'ui_designer', avatar_url: 'https://i.pravatar.cc/100?img=6' },
    saved: 89, views: 3400, lines: 10, file_name: 'scroll.css', created_at: '2024-01-06', visibility: 'Public', comments: [],
    code: `::-webkit-scrollbar {\n  width: 8px;\n}\n::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 10px;\n}`
  },

  // SQL (id: 9-12)
  {
    id: '7', user_id: 'user_7', title: 'Find Duplicate Emails', language: 'sql',
    description: 'Identify duplicate records in a users table.',
    profiles: { full_name: 'data_guru', avatar_url: 'https://i.pravatar.cc/100?img=9' },
    saved: 156, views: 4200, lines: 4, file_name: 'dupes.sql', created_at: '2024-01-09', visibility: 'Public', comments: [],
    code: `SELECT email, COUNT(email)\nFROM Users\nGROUP BY email\nHAVING COUNT(email) > 1;`
  },

  // Go (id: 13-16)
  {
    id: '109', user_id: 'user_109', title: 'Simple HTTP Server', language: 'go',
    description: 'Basic net/http server setup in Go.',
    profiles: { full_name: 'gopher_1', avatar_url: 'https://i.pravatar.cc/100?img=13' },
    saved: 210, views: 5000, lines: 12, file_name: 'main.go', created_at: '2024-01-13', visibility: 'Public', comments: [],
    code: `package main\nimport ("fmt"; "net/http")\nfunc main() {\n  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintf(w, "Hello Gopher!")\n  })\n  http.ListenAndServe(":8080", nil)\n}`
  },

  // Rust (id: 17-20)
  {
    id: '170', user_id: 'user_170', title: 'Read File to String', language: 'rust',
    description: 'Safe way to read a file content in Rust.',
    profiles: { full_name: 'ferris_fan', avatar_url: 'https://i.pravatar.cc/100?img=17' },
    saved: 134, views: 2800, lines: 5, file_name: 'read.rs', created_at: '2024-01-17', visibility: 'Public', comments: [],
    code: `use std::fs;\nfn main() {\n  let content = fs::read_to_string("test.txt").expect("Error reading file");\n  println!("{}", content);\n}`
  },

  // Java (id: 21-25)
  {
    id: '210', user_id: 'user_210', title: 'Singleton Pattern', language: 'java',
    description: 'Thread-safe singleton implementation.',
    profiles: { full_name: 'java_pro', avatar_url: 'https://i.pravatar.cc/100?img=21' },
    saved: 45, views: 1900, lines: 15, file_name: 'Singleton.java', created_at: '2024-01-21', visibility: 'Public', comments: [],
    code: `public class Singleton {\n  private static Singleton instance;\n  private Singleton() {}\n  public static synchronized Singleton getInstance() {\n    if (instance == null) instance = new Singleton();\n    return instance;\n  }\n}`
  },

  // PHP (id: 26-30)
  {
    id: '26', user_id: 'user_26', title: 'PDO Connection', language: 'php',
    description: 'Secure database connection using PDO.',
    profiles: { full_name: 'php_king', avatar_url: 'https://i.pravatar.cc/100?img=26' },
    saved: 78, views: 3100, lines: 8, file_name: 'db.php', created_at: '2024-01-26', visibility: 'Public', comments: [],
    code: `$pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass, [\n  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION\n]);`
  },

  // Ruby (id: 31-35)
  {
    id: '31', user_id: 'user_31', title: 'Array Mapping', language: 'ruby',
    description: 'One-liner to transform array elements.',
    profiles: { full_name: 'ruby_dev', avatar_url: 'https://i.pravatar.cc/100?img=31' },
    saved: 55, views: 1200, lines: 2, file_name: 'map.rb', created_at: '2024-01-31', visibility: 'Public', comments: [],
    code: `names = ["alice", "bob"].map(&:capitalize)\nputs names`
  },

  // Swift (id: 36-40)
  {
    id: '36', user_id: 'user_36', title: 'SwiftUI View', language: 'swift',
    description: 'Basic structure of a SwiftUI screen.',
    profiles: { full_name: 'ios_dev', avatar_url: 'https://i.pravatar.cc/100?img=36' },
    saved: 190, views: 4500, lines: 10, file_name: 'ContentView.swift', created_at: '2024-02-01', visibility: 'Public', comments: [],
    code: `import SwiftUI\nstruct ContentView: View {\n  var body: some View {\n    Text("Hello, SwiftUI!")\n      .padding()\n  }\n}`
  },

  // Dart (id: 41-45)
  {
    id: '41', user_id: 'user_41', title: 'Flutter Stateless Widget', language: 'dart',
    description: 'The foundation of Flutter UI components.',
    profiles: { full_name: 'flutter_fan', avatar_url: 'https://i.pravatar.cc/100?img=41' },
    saved: 230, views: 6000, lines: 12, file_name: 'main.dart', created_at: '2024-02-05', visibility: 'Public', comments: [],
    code: `import 'package:flutter/material.dart';\nclass MyWidget extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return Container(child: Text('Hello World'));\n  }\n}`
  },

  // C# (id: 46-50)
  {
    id: '46', user_id: 'user_46', title: 'LINQ Filter', language: 'csharp',
    description: 'Filtering a list using LINQ queries.',
    profiles: { full_name: 'dotnet_dev', avatar_url: 'https://i.pravatar.cc/100?img=46' },
    saved: 112, views: 3400, lines: 4, file_name: 'Filter.cs', created_at: '2024-02-10', visibility: 'Public', comments: [],
    code: `var activeUsers = users.Where(u => u.IsActive).ToList();`
  },

  // JSON / YAML / Markdown (id: 51-60)
  {
    id: '51', user_id: 'user_51', title: 'Package.json Template', language: 'json',
    description: 'Base configuration for a Node project.',
    profiles: { full_name: 'npm_pro', avatar_url: 'https://i.pravatar.cc/100?img=51' },
    saved: 300, views: 8000, lines: 10, file_name: 'package.json', created_at: '2024-02-15', visibility: 'Public', comments: [],
    code: `{\n  "name": "project",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js"\n  }\n}`
  },

  // C / C++ (id: 61-70)
  {
    id: '61', user_id: 'user_61', title: 'Memory Allocation', language: 'c',
    description: 'Dynamic memory allocation example in C.',
    profiles: { full_name: 'low_level', avatar_url: 'https://i.pravatar.cc/100?img=61' },
    saved: 45, views: 2100, lines: 6, file_name: 'alloc.c', created_at: '2024-02-20', visibility: 'Public', comments: [],
    code: `int *arr = (int*)malloc(5 * sizeof(int));\nif (arr == NULL) return 1;\nfree(arr);`
  },

  // Kotlin (id: 71-75)
  {
    id: '71', user_id: 'user_71', title: 'Data Class', language: 'kotlin',
    description: 'Clean data structure in Kotlin.',
    profiles: { full_name: 'android_dev', avatar_url: 'https://i.pravatar.cc/100?img=71' },
    saved: 88, views: 2500, lines: 1, file_name: 'User.kt', created_at: '2024-02-25', visibility: 'Public', comments: [],
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
    saved: 88,
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
    saved: 142,
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
    saved: 95,
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
    saved: 210,
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
    saved: 120,
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
    saved: 75,
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
    saved: 64,
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
    saved: 130,
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
    saved: 245,
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
    saved: 110,
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
  }
];