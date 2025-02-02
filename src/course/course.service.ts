import { Injectable } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Model, Schema as MongooSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<any>,
  ) {}


  create(createCourseInput: CreateCourseInput) {
    const newCourse = new this.courseModel(createCourseInput);
    return newCourse.save();
  }

  async findAll() {
    const courses = await this.courseModel
    .find()
    .populate('creator');

    return courses;
  }

  async findOne(id: MongooSchema.Types.ObjectId) {
    const course = await this.courseModel
    .findById(id)
    .populate('creator', '-password');
    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }
    return course;
  }

  async update(id: MongooSchema.Types.ObjectId, updateCourseInput: UpdateCourseInput) {
    const updatedCourse = await this.courseModel
    .findByIdAndUpdate(id, updateCourseInput, { new: true });
    return updatedCourse;
  }

  remove(id: MongooSchema.Types.ObjectId) {
    return `This action removes a #${id} course`;
  }
}
