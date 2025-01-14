import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Icons } from './ui/Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50"
                />
              </Dialog.Overlay>
              
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="relative w-[90vw] max-w-[500px] max-h-[85vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
                >
                  <Dialog.Title className="text-xl font-semibold mb-4">
                    {title}
                  </Dialog.Title>
                  
                  {children}
                  
                  <Dialog.Close asChild>
                    <Button
                      variant="icon"
                      className="absolute right-4 top-4"
                      aria-label="Close"
                    >
                      <Icons.close />
                    </Button>
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}; 