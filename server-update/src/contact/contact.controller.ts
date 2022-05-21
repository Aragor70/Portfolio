import { Body, Controller, Get, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ContactService } from './contact.service';
import { ContactEntity } from './models/contact.entity';

@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService) {}

    @Get('')
    getAll(): Observable<ContactEntity> {
        return this.contactService.getAll().pipe(map((res: any) => res));
    }
    @Post('')
    create(@Body() contact: ContactEntity): Observable<ContactEntity> {
        return this.contactService.createMessage(contact).pipe(map((res: any) => res));
    }

}
