import { createReducer, on } from '@ngrx/store';
import { origin, destination } from '../actions/actions-store';
import { AppState } from '../../flights/shared/interfaces/app-state.interface';

const initialState: AppState = {
  origin: '',
  destination: ''
};

export const placesReducer = createReducer(initialState,
  on(origin, (state, { newOrigin }) => ({ ...state, origin: newOrigin })),
  on(destination, (state, { newDestination }) => ({ ...state, destination: newDestination })),
);