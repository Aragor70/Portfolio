import { Body, Controller, Get, Post } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ContactService } from './contact.service';
import { ContactEntity } from './models/contact.entity';
import { RealIP } from 'nestjs-real-ip';


@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService) {}

    @Get('')
    getAll(): Observable<ContactEntity> {
        return this.contactService.getAll().pipe(map((res: any) => res));
    }
    @Post('')
    create(@Body() contact: ContactEntity, @RealIP() ip: string): Observable<ContactEntity> {

        return this.contactService.createMessage(contact, ip).pipe(map((res: any) => res));
    }

}
