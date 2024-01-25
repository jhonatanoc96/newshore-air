import { createAction, props } from '@ngrx/store';

export const origin = createAction(
    'Set Origin',
    props<{ newOrigin: string }>()
);
export const destination = createAction(
    'Set Destination',
    props<{ newDestination: string }>()
);