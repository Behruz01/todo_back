import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: "todo" })
export class TodoEntity extends BaseEntity {
    @Column()
    title: string

    @Column()
    description: string

    @Column({
        default: "pending"
    })
    status: string
}