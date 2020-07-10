import { conferenceActionTypes } from '../actions/conference.action';
import { ConferenceService } from '../../services/conference';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { ConferenceDto } from '../../models/conference.dto';

@Injectable()
export class ConferenceEffect {

    loadConferences$ = createEffect(() =>
        this.actions$.pipe(
            ofType(conferenceActionTypes.loadConferences),
            concatMap(() => this.conferenceService.getConferences()),
            map(conferences => conferenceActionTypes.conferencesLoaded({conferences}))
        )
    );

    createConference$ = createEffect(() =>
            this.actions$.pipe(
                ofType(conferenceActionTypes.createConference),
                switchMap((action) => this.conferenceService.createConference(action.conference).pipe(
                    map((conference: ConferenceDto) => ({conference, temporaryId: action.conference.id}))
                )),
                map((payload: {conference: ConferenceDto, temporaryId: string}) => {
                    const update: Update<ConferenceDto> = {
                        id: payload.temporaryId,
                        changes: {
                            ...payload.conference
                        }
                    };

                    return conferenceActionTypes.conferenceCreated({update});
                })
            )
    );

    deleteConference$ = createEffect(() =>
            this.actions$.pipe(
                ofType(conferenceActionTypes.deleteConference),
                concatMap((action) => this.conferenceService.deleteConference(action.conferenceId))
            ),
        {dispatch: false}
    );

    updateConference$ = createEffect(() =>
            this.actions$.pipe(
                ofType(conferenceActionTypes.updateConference),
                concatMap((action) => this.conferenceService.updateConference(action.update.id, action.update.changes))
            ),
        {dispatch: false}
    );

    constructor(private conferenceService: ConferenceService, private actions$: Actions, private router: Router) {
    }
}
