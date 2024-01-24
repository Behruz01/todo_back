import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Todo")
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  @ApiOperation({ summary: "Create a new todo" })
  @ApiResponse({ status: 201, description: "Todo created successfully" })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all todos" })
  @ApiResponse({ status: 200, description: "Return all todos" })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Get a todo by ID" })
  @ApiResponse({ status: 200, description: "Return the todo by ID." })
  @ApiResponse({ status: 404, description: "Todo not found." })
  @ApiParam({ name: 'id', description: 'ID of the todo' })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse({ status: 200, description: 'Todo updated successfully.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  @ApiParam({ name: 'id', description: 'ID of the todo' })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({ status: 200, description: 'Todo deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  @ApiParam({ name: 'id', description: 'ID of the todo' })
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
