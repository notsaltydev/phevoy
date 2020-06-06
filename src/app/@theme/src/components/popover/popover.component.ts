import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent {
    @Output() clickedOutside: EventEmitter<void> = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event'])
    clickOutside(event): void {
        if (!this.elementRef.nativeElement.contains(event.target) && !this.elementRef.nativeElement.parentNode.contains(event.target)) {
            this.clickedOutside.emit();
        }
    }
}
