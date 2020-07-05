import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ConferenceState, selectAll, selectIds  } from '../reducers/conference.reducer';

export const conferenceFeatureSelector = createFeatureSelector<ConferenceState>('conferences');

export const getAllConferences = createSelector(
    conferenceFeatureSelector,
    selectAll
);

export const areConferencesLoaded = createSelector(
    conferenceFeatureSelector,
    state => state.conferencesLoaded
);
