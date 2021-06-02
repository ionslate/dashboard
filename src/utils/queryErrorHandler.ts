import { toast } from '../components/Toaster/ToastService';
import { DataError } from './fetcher';

export function queryErrorHandler(e: DataError) {
  if (e.code === 401 || e.code === 403) {
    toast.error('Not Authorized');
  } else {
    toast.error('Something went wrong. Please try again later');
  }
}
