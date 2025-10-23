import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ProjectsService } from './projects.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(@Req() req: Request & { user: { id: string } }) {
    return this.projectsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request & { user: { id: string } }) {
    return this.projectsService.findOne(id, req.user.id);
  }

  @Post()
  create(
    @Body() data: { name: string; description?: string },
    @Req() req: Request & { user: { id: string } },
  ) {
    return this.projectsService.create(data, req.user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: { name?: string; description?: string },
    @Req() req: Request & { user: { id: string } },
  ) {
    return this.projectsService.update(id, data, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request & { user: { id: string } }) {
    return this.projectsService.remove(id, req.user.id);
  }
}
