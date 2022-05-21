import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './models/contact.entity';
import { from, Observable, of, pipe, map } from 'rxjs';

@Injectable()
export class ContactService {

    constructor(
        @InjectRepository(ContactEntity)
        private readonly contactrRepository: Repository<ContactEntity>,
    ) {}
    
    
    getAll(): Observable<ContactEntity[]> {
        return from(this.contactrRepository.find())
            .pipe(
            map((message: ContactEntity[]) => {
                return message;
            }),
        );
    }
    
    createMessage(contact: ContactEntity): Observable<ContactEntity> {
        return from(
            this.contactrRepository.save({
                from: contact.from,
                message: contact.message
            }),
            ).pipe(
            map((message: ContactEntity) => {
                return message;
            }),
        );
    }

}
