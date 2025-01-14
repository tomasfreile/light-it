import * as ToastPrimitive from '@radix-ui/react-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: 'success' | 'error';
}

export const Toast = ({
  open,
  onOpenChange,
  title,
  description,
  type = 'success',
}: ToastProps) => {
  return (
    <ToastPrimitive.Provider>
      <AnimatePresence>
        {open && (
          <ToastPrimitive.Root
            asChild
            open={open}
            onOpenChange={onOpenChange}
            duration={3000}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`
                fixed bottom-4 right-4 z-50 rounded-lg shadow-lg p-4 min-w-[300px]
                ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
                text-white
              `}
            >
              <ToastPrimitive.Title className="font-semibold mb-1">
                {title}
              </ToastPrimitive.Title>
              {description && (
                <ToastPrimitive.Description className="text-sm opacity-90">
                  {description}
                </ToastPrimitive.Description>
              )}
            </motion.div>
          </ToastPrimitive.Root>
        )}
      </AnimatePresence>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}; 