import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from 'type-graphql'
import { UserModel } from '../dtos/models/user-model'
import { db } from '../db'
import { posts, users } from '../db/schema'
import { CreateUserInput } from '../dtos/inputs/create-user-input'
import * as DataLoader from 'dataloader'
import { inArray } from 'drizzle-orm'
import { PostModel } from '../dtos/models/post-model'

const postLoader = new DataLoader(async (userIds) => {
  const userPosts = await db.select().from(posts).where(inArray(posts.ownerId, userIds as string[]))
  return userIds.map(id => userPosts.filter(p => p.ownerId === id));
});

@Resolver(() => UserModel)
export class UsersResolver {
  @Query( () => [UserModel] )
  async users() {
    return db.select().from(users)
  }

  @Mutation(() => UserModel)
  async createUser(@Arg('data', () => CreateUserInput) data: CreateUserInput) {    
    const [user] = await db.insert(users).values({
      email: data.email,
      name: data.name,
      createdAt: new Date()
    }).returning();

    return user
  }

  @FieldResolver(() => [PostModel])
  posts(@Root() user: UserModel) {
    return postLoader.load(user.id)
  }
}