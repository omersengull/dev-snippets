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
  }
];