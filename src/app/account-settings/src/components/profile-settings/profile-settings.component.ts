import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection, SelectionChange } from 'ngx-quill';
import Quill from 'quill'
@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsComponent {
    isQuillEditorEnabled = false;

    constructor(private changeDetector: ChangeDetectorRef) {
    }

    getAvatarUr(): string {
        return 'url("https://via.placeholder.com/150")';
    }

    onEditorCreated(event: Quill): void {
        this.isQuillEditorEnabled = true;
        this.changeDetector.markForCheck();
        console.log('onEditorCreated', event);
    }

    onSelectionChanged(event: SelectionChange): void {
        console.log('onSelectionChanged', event);
    }

    onEditorChanged(event: EditorChangeContent | EditorChangeSelection) {
        console.log('onEditorChanged', event);
    }

    onFocus($event: any): void {
        console.log('onFocus', $event);
    }

    onBlur($event: any): void {
        console.log('onBlur', $event);
    }
}
