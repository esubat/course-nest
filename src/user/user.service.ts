import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model , Schema as MongooSchema } from 'mongoose';
import { CourseService } from '../course/course.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<any>,
    private courseService: CourseService
  ) {}

  create(createUserInput: CreateUserInput) {
   const newUser = new this.userModel(createUserInput);
   return newUser.save();
  }
  
  findAll() {
    const users = this.userModel.find();
    return users;
  }

  async findOneById(id: MongooSchema.Types.ObjectId) {
    const user = await this.userModel.findById(id).populate('courses');
    const courses = await this.courseService.findByCreatorId(id);
    user.courses = courses;
    return user;
  }
  
  findOneByEmail(email:string){
    const user = this.userModel.findOne({ email })
    return user;
  }

  update(id: MongooSchema.Types.ObjectId, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput);
  }

  remove(id: MongooSchema.Types.ObjectId) {
    return `This action removes a #${id} user`;
  }
}
