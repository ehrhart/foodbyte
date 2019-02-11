import {Observable} from 'rxjs/Observable';

export function handleError(error: Response){
  console.log(error);
  return Observable.throw(error || 'Server error');
}
