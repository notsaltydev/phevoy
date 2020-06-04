import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent {
    @Input() parent: HTMLElement;
    @Output() clickedOutside: EventEmitter<void> = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event'])
    clickOutside(event): void {
        if (!this.elementRef.nativeElement.contains(event.target) && !this.parent.contains(event.target)) {
            this.clickedOutside.emit();
        }
    }
}
