import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './models/contact.entity';
import { from, Observable, of, pipe, map } from 'rxjs';

@Injectable()
export class ContactService {

    constructor(
        @InjectRepository(ContactEntity)
        private readonly contactRepository: Repository<ContactEntity>,
    ) {}
    
    
    getAll(): Observable<ContactEntity[]> {
        return from(this.contactRepository.find())
            .pipe(
            map((message: ContactEntity[]) => {
                return message;
            }),
        );
    }
    
    createMessage(contact: ContactEntity, ip: string): Observable<ContactEntity> {
        return from(
            this.contactRepository.save({
                from: contact.from,
                message: contact.message,
                ip
            }),
            ).pipe(
            map((message: ContactEntity) => {
                return message;
            }),
        );
    }

}
