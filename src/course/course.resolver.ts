import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Schema as MongooSchema } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gards';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  @UseGuards(JwtAuthGuard)
  createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput) {
    return this.courseService.create(createCourseInput);
  }

  @Query(() => [Course], { name: 'courses' })
  findAll() {
    return this.courseService.findAll();
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args('id', { type: () => String}) id: MongooSchema.Types.ObjectId) {
    return this.courseService.findOne(id);
  }

  @Mutation(() => Course)
  updateCourse(@Args('updateCourseInput') updateCourseInput: UpdateCourseInput) {
    return this.courseService.update(updateCourseInput._id, updateCourseInput);
  }

  @Mutation(() => Course)
  removeCourse(@Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId) {
    return this.courseService.remove(id);
  }
}
