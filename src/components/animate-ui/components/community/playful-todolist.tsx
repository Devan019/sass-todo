'use client';

import * as React from 'react';
import { motion, type Transition } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/animate-ui/primitives/radix/checkbox';
import { FETodos } from '@/app/(authethicate)/dashboard/page';

const getPathAnimate = (isChecked: boolean) => ({
  pathLength: isChecked ? 1 : 0,
  opacity: isChecked ? 1 : 0,
});

const getPathTransition = (isChecked: boolean): Transition => ({
  pathLength: { duration: 1, ease: 'easeInOut' },
  opacity: {
    duration: 0.01,
    delay: isChecked ? 0 : 1,
  },
});



function PlayfulTodolist({
  checkboxItems,
  onDelete,
  onUpdate,
  onAdd,
}: {
  checkboxItems: FETodos[];
  onDelete: (id: string) => void;
  onUpdate?: (id: string, checked: boolean) => Promise<void>;
  onAdd?: (label: string) => void;
}) {
  const [items, setItems] = React.useState(checkboxItems);
  const [checked, setChecked] = React.useState(
    checkboxItems.map((i) => !!i.defaultChecked),
  );

  React.useEffect(() => {
    setItems(checkboxItems);
    setChecked(checkboxItems.map((i) => !!i.defaultChecked));
    console.log("PlayfulTodolist items:", items);
  }, [checkboxItems]);


  const [inputVal, setInputVal] = React.useState('');


  const handleAdd = () => {
    if (!inputVal.trim()) return;
    setInputVal('');
    onAdd?.(inputVal);
  };

  const handleDelete = (id: string, idx: number) => {
    onDelete(id); // call parent

    const copy = [...items];
    copy.splice(idx, 1);
    setItems(copy);

    const checkCopy = [...checked];
    checkCopy.splice(idx, 1);
    setChecked(checkCopy);
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-6 space-y-6">

      {/* -------- ADD TODO INPUT -------- */}
      <div className="flex gap-3 items-center">
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Create a todo..."
          className="px-3 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 w-full"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
        >
          Add
        </button>
      </div>

      {items.length > 0 && items.map((item, idx) => (
        <div key={item.id} className="space-y-6">
          <div className="flex items-center space-x-3">

            <Checkbox
              checked={checked[idx]}
              onCheckedChange={(val) => {
                const updated = [...checked];
                updated[idx] = val === true;
                setChecked(updated);
                onUpdate?.(item.id, val === true);
              }}
              id={`checkbox-${item.id}`}
            />

            <div className="relative inline-block">
              <Label htmlFor={`checkbox-${item.id}`}>{item.label}</Label>

              <motion.svg
                width="340"
                height="32"
                viewBox="0 0 340 32"
                className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-20 w-full h-10"
              >
                <motion.path
                  d="M 10 16.91 s 79.8 -11.36 98.1 -11.34 c 22.2 0.02 -47.82 14.25 -33.39 22.02 c 12.61 6.77 124.18 -27.98 133.31 -17.28 c 7.52 8.38 -26.8 20.02 4.61 22.05 c 24.55 1.93 113.37 -20.36 113.37 -20.36"
                  vectorEffect="non-scaling-stroke"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeMiterlimit={10}
                  fill="none"
                  initial={false}
                  animate={getPathAnimate(!!checked[idx])}
                  transition={getPathTransition(!!checked[idx])}
                  className="stroke-neutral-900 dark:stroke-neutral-100"
                />
              </motion.svg>
            </div>

            {/* ---- DELETE BUTTON ---- */}
            <button
              onClick={() => handleDelete(item.id, idx)}
              className="text-red-500 hover:text-red-700 ml-3 text-sm"
            >
              Delete
            </button>
          </div>

          {idx !== items.length - 1 && (
            <div className="border-t border-neutral-300 dark:border-neutral-700" />
          )}
        </div>
      ))}
    </div>
  );
}

export { PlayfulTodolist };
