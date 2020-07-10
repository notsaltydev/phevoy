import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ConferenceDto } from '../../models/conference.dto';
import { conferenceActionTypes } from '../actions/conference.action';

export interface ConferenceState extends EntityState<ConferenceDto> {
    conferencesLoaded: boolean;
}

export const adapter: EntityAdapter<ConferenceDto> = createEntityAdapter<ConferenceDto>();

export const initialState = adapter.getInitialState({
    conferencesLoaded: false
});

export const conferenceReducer = createReducer(
    initialState,

    on(conferenceActionTypes.conferencesLoaded, (state, action) => {
        return adapter.addAll(
            action.conferences,
            {...state, conferencesLoaded: true}
        );
    }),

    on(conferenceActionTypes.createConference, (state, action) => {
        return adapter.addOne(action.conference, state);
    }),

    on(conferenceActionTypes.conferenceCreated, (state, action) => {
        return adapter.updateOne(action.update, state);
    }),

    on(conferenceActionTypes.deleteConference, (state, action) => {
        return adapter.removeOne(action.conferenceId, state);
    }),

    on(conferenceActionTypes.updateConference, (state, action) => {
        return adapter.updateOne(action.update, state);
    })
);

export const {selectAll, selectIds} = adapter.getSelectors();
