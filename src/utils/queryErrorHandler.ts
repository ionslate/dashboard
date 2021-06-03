import { toast } from '../components/Toaster/ToastService';
import { DataError } from './fetcher';
import prettyMs from 'pretty-ms';

export function queryErrorHandler(e: DataError) {
  switch (e.code) {
    case 401:
    case 403:
      toast.error('Not Authorized');
      break;
    case 429:
      toast.error(
        `Too Many Requests. Please wait ${prettyMs((e.retryAfter || 0) * 1000, {
          compact: true,
        })} and try again`,
      );
      break;
    default:
      toast.error('Something went wrong. Please try again later');
  }
}
