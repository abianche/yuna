import { Test, TestingModule } from '@nestjs/testing';
import { Logger, NotFoundException } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Request } from 'express';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  const mockProjectsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    Logger.overrideLogger(false);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockProjectsService,
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all projects for the authenticated user', async () => {
      const userId = 'user-id';
      const projects = [
        { id: 'project-1', name: 'Project 1', ownerId: userId },
        { id: 'project-2', name: 'Project 2', ownerId: userId },
      ];

      mockProjectsService.findAll.mockResolvedValue(projects);

      const req = { user: { id: userId } } as Request & { user: { id: string } };
      const result = await controller.findAll(req);

      expect(service.findAll).toHaveBeenCalledWith(userId);
      expect(result).toEqual(projects);
    });
  });

  describe('findOne', () => {
    it('should return a project by id for the authenticated user', async () => {
      const userId = 'user-id';
      const projectId = 'project-1';
      const project = { id: projectId, name: 'Project 1', ownerId: userId };

      mockProjectsService.findOne.mockResolvedValue(project);

      const req = { user: { id: userId } } as Request & { user: { id: string } };
      const result = await controller.findOne(projectId, req);

      expect(service.findOne).toHaveBeenCalledWith(projectId, userId);
      expect(result).toEqual(project);
    });

    it('should throw NotFoundException when project not found', async () => {
      const userId = 'user-id';
      const projectId = 'non-existent';

      mockProjectsService.findOne.mockResolvedValue(null);

      const req = { user: { id: userId } } as Request & { user: { id: string } };

      await expect(controller.findOne(projectId, req)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(projectId, userId);
    });
  });

  describe('create', () => {
    it('should create a project for the authenticated user', async () => {
      const userId = 'user-id';
      const projectData = { name: 'New Project', description: 'Description' };
      const createdProject = { id: 'project-1', ...projectData, ownerId: userId };

      mockProjectsService.create.mockResolvedValue(createdProject);

      const req = { user: { id: userId } } as Request & { user: { id: string } };
      const result = await controller.create(projectData, req);

      expect(service.create).toHaveBeenCalledWith(projectData, userId);
      expect(result).toEqual(createdProject);
    });
  });

  describe('update', () => {
    it('should update a project for the authenticated user', async () => {
      const userId = 'user-id';
      const projectId = 'project-1';
      const updateData = { name: 'Updated Project' };
      const updatedProject = { id: projectId, name: 'Updated Project', ownerId: userId };

      mockProjectsService.update.mockResolvedValue(updatedProject);

      const req = { user: { id: userId } } as Request & { user: { id: string } };
      const result = await controller.update(projectId, updateData, req);

      expect(service.update).toHaveBeenCalledWith(projectId, updateData, userId);
      expect(result).toEqual(updatedProject);
    });

    it('should throw NotFoundException when project not found', async () => {
      const userId = 'user-id';
      const projectId = 'non-existent';
      const updateData = { name: 'Updated Project' };

      mockProjectsService.update.mockResolvedValue(null);

      const req = { user: { id: userId } } as Request & { user: { id: string } };

      await expect(controller.update(projectId, updateData, req)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.update).toHaveBeenCalledWith(projectId, updateData, userId);
    });
  });

  describe('remove', () => {
    it('should delete a project for the authenticated user', async () => {
      const userId = 'user-id';
      const projectId = 'project-1';
      const deletedProject = { id: projectId, name: 'Deleted Project', ownerId: userId };

      mockProjectsService.remove.mockResolvedValue(deletedProject);

      const req = { user: { id: userId } } as Request & { user: { id: string } };
      const result = await controller.remove(projectId, req);

      expect(service.remove).toHaveBeenCalledWith(projectId, userId);
      expect(result).toEqual(deletedProject);
    });

    it('should throw NotFoundException when project not found', async () => {
      const userId = 'user-id';
      const projectId = 'non-existent';

      mockProjectsService.remove.mockResolvedValue(null);

      const req = { user: { id: userId } } as Request & { user: { id: string } };

      await expect(controller.remove(projectId, req)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(projectId, userId);
    });
  });
});
