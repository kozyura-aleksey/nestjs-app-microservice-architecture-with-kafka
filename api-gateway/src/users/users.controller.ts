import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'users',
        brokers: ['kafka1:9092'],
      },
      consumer: {
        groupId: 'users-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('get.user');
    this.client.subscribeToResponseOf('get.users');
    this.client.subscribeToResponseOf('create.user');
    this.client.subscribeToResponseOf('update.user');
    this.client.subscribeToResponseOf('delete.user');

    await this.client.connect();
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: () => UserDto })
  @Post()
  async createUser(@Body() dto: UserDto) {
    return this.client.send('create.user', dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: () => UserDto })
  async getUsers() {
    return this.client.send('get.users', '');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: () => UserDto })
  async getUser(@Param('id') id: string) {
    return this.client.send('get.user', id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: () => UserDto })
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.client.send('update.user', { id, dto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: () => UserDto })
  async deleteUser(@Param('id') id: string) {
    return this.client.send('delete.user', id);
  }
}
