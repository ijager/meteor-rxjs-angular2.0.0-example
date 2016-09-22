import { MongoObservable } from 'meteor-rxjs';

export interface Thing {
    _id?: string;
    name: string;
}

export const Things = new MongoObservable.Collection<Thing>('things');