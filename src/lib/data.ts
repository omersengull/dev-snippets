import { Snippet } from '../types/snippet';

export const TRENDING_SNIPPETS: Snippet[] = [
  {
    id: '1',
    title: 'Custom Hook for LocalStorage Syncing',
    language: 'TypeScript',
    description: 'A robust React hook to keep application state in sync with localStorage while handling window events and SSR.',
    author: {
      name: 'alex_dev',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      timeAgo: '2 hours ago'
    },
    stats: { likes: 128, views: 2400, forks: 342, comments: 28 },
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
    title: 'Fibonacci Generator',
    language: 'Python',
    description: 'Efficient generator function for Fibonacci sequence.',
    author: {
      name: 'py_master',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      timeAgo: '5 hours ago'
    },
    stats: { likes: 84, views: 1100 },
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
    title: 'Glassmorphism Card',
    language: 'Tailwind',
    description: 'Beautiful glass effect using Tailwind CSS utility classes.',
    author: {
      name: 'ui_guy',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    stats: { likes: 245, views: 5800 },
    code: `<div class="flex flex-col gap-4 
  p-6 glass rounded-xl border border-white/10">
  <div class="size-12 bg-primary rounded-lg">
  </div>
  <p class="text-white">Hello World</p>
</div>`
  },
  {
    id: '4',
    title: 'Simple Counter',
    language: 'React',
    description: 'Classic counter example with useState hook.',
    author: {
      name: 'react_ninja',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    stats: { likes: 312, views: 9200 },
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
