import { conferenceActionTypes } from '../actions/conference.action';
import { ConferenceService } from '../../services/conference';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
                concatMap((action) => this.conferenceService.createConference(action.conference)),
            ),
        {dispatch: false}
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
