import { Injectable } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Schema as MongooSchema } from 'mongoose';

@Injectable()
export class CourseService {
  create(createCourseInput: CreateCourseInput) {
    return 'This action adds a new course';
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: MongooSchema.Types.ObjectId) {
    return `This action returns a #${id} course`;
  }

  update(id: MongooSchema.Types.ObjectId, updateCourseInput: UpdateCourseInput) {
    return `This action updates a #${id} course`;
  }

  remove(id: MongooSchema.Types.ObjectId) {
    return `This action removes a #${id} course`;
  }
}
