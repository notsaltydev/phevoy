import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection, SelectionChange } from 'ngx-quill';
import Quill from 'quill';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsComponent {
    files: File[] = [];
    isQuillEditorEnabled = false;

    constructor(private changeDetector: ChangeDetectorRef) {
    }

    onSelect(event) {
        console.log(event);
        this.files.push(...event.addedFiles);
    }

    onRemove(event) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
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

    onEditorChanged(event: EditorChangeContent | EditorChangeSelection) {
        console.log('onEditorChanged', event);
    }

    onFocus($event: any): void {
        console.log('onFocus', $event);
    }

    onBlur($event: any): void {
        console.log('onBlur', $event);
    }
}
