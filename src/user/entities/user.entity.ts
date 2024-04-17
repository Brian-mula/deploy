import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({ timestamps: true})
export class User {
   @Prop()
    username: string;
    
    @Prop()
    phone_number: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
