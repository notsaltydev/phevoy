import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-phev-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();
    @Output() navigateHome: EventEmitter<void> = new EventEmitter<void>();
}
