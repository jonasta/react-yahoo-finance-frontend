import { Subject } from 'rxjs';

const subject = new Subject();
export const tagsDataService = {
    setData: d => subject.next(d),
    clearData: () => subject.next(),
    getData: () => subject.asObservable()
};