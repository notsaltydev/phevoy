import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ConferenceDto } from '../../models/conference.dto';


export const loadConferences = createAction(
    '[Conference List] Load Conferences via Service',
);

export const conferencesLoaded = createAction(
    '[Conference Effect] Conferences Loaded Successfully',
    props<{ conferences: ConferenceDto[] }>()
);

export const createConference = createAction(
    '[Create Conference Component] Create Conference',
    props<{ conference: ConferenceDto }>()
);

export const deleteConference = createAction(
    '[Conferences List Operations] Delete Conference',
    props<{ conferenceId: string }>()
);

export const updateConference = createAction(
    '[Conferences List Operations] Update Conference',
    props<{ update: Update<ConferenceDto> }>()
);

export const conferenceActionTypes = {
    loadConferences,
    conferencesLoaded,
    createConference,
    deleteConference,
    updateConference
};
