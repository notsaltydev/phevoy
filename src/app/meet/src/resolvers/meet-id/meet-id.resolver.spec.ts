import { TestBed } from '@angular/core/testing';
import { MeetIdResolver } from './meet-id.resolver';


describe('MeetIdResolver', () => {
    let service: MeetIdResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MeetIdResolver);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
