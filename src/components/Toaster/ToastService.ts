import { generateId } from '../../utils/generateId';
import Observable from '../../utils/Observable';

export type ToastType = 'info' | 'success' | 'warn' | 'error';

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

class ToastService {
  readonly activeToasts = new Observable<ToastData[]>([]);
  private readonly toastQueue = new Observable<ToastData[]>([]);

  private readonly toastLimit = 2;

  private addToast(message: string, type: ToastType = 'info') {
    const toast: ToastData = {
      id: `toast-${generateId()}`,
      message,
      type,
    };

    if (this.activeToasts.value.length < this.toastLimit) {
      this.activeToasts.setValue([...this.activeToasts.value, toast]);
    } else {
      this.toastQueue.setValue([...this.toastQueue.value, toast]);
    }
  }

  info(message: string) {
    this.addToast(message, 'info');
  }

  success(message: string) {
    this.addToast(message, 'success');
  }

  warn(message: string) {
    this.addToast(message, 'warn');
  }

  error(message: string) {
    this.addToast(message, 'error');
  }

  removeToast(id: string) {
    const newActiveToasts = this.activeToasts.value.filter(
      (toast) => toast.id !== id,
    );

    if (this.toastQueue.value.length) {
      const [nextToast, ...newToastQueue] = this.toastQueue.value;
      this.activeToasts.setValue([...newActiveToasts, nextToast]);
      this.toastQueue.setValue(newToastQueue);
    } else {
      this.activeToasts.setValue(newActiveToasts);
    }
  }
}

export const toast = new ToastService();
