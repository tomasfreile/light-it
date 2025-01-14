export type ToastState = {
  open: boolean;
  title: string;
  description: string;
  type: 'success' | 'error';
};

export type ToastMessage = Omit<ToastState, 'open'>;

export const createToastMessage = (
  type: ToastState['type'],
  title: string,
  description: string
): ToastMessage => ({
  type,
  title,
  description,
}); 