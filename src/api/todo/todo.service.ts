import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/infra/entities/todo.entity';
import { TodoRepo } from 'src/infra/repositories/todo.repo';
import { Not } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private readonly repo: TodoRepo
  ) { }
  async create(createTodoDto: CreateTodoDto) {
    try {
      const { title, description } = createTodoDto
      const findTodo = await this.repo.findOne({ where: { title, description } })
      if (findTodo)
        throw new HttpException("This todo already exists!", HttpStatus.CONFLICT)

      const data = this.repo.create({ title, description })
      await this.repo.save(data)
      return { message: "Created todo successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {
      const data = await this.repo.find()
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: string) {
    try {
      const findData = await this.repo.findOne({ where: { id } })
      if (!findData)
        throw new HttpException("Data not found!", HttpStatus.NOT_FOUND)

      const data = await this.repo.findOne({ where: { id } })
      return data
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const findTodo = await this.repo.findOne({ where: { id } })
      if (!findTodo)
        throw new HttpException("Data not found!", HttpStatus.NOT_FOUND)

      const { title, description } = updateTodoDto
      const findData = await this.repo.findOne({ where: { id: Not(id), title, description } })
      if (findData)
        throw new HttpException("This todo already exists!", HttpStatus.CONFLICT)

      await this.repo.update({ id }, { title, description })
      return { message: "Todo updated successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: string) {
    try {
      const findTodo = await this.repo.findOne({ where: { id } })
      if (!findTodo)
        throw new HttpException("Data not found!", HttpStatus.NOT_FOUND)

      await this.repo.delete({ id })
      return { message: "Todo deleted successfully" }
    } catch (error) {
      throw new HttpException(error.message, error.status
        || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
