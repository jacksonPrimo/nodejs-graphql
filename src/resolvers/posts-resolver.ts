import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { db } from '../db'
import { posts } from '../db/schema'
import { PostModel } from '../dtos/models/post-model'
import { CreatePostInput } from '../dtos/inputs/create-post-input'

@Resolver(() => PostModel)
export class PostResolver {
  @Query( () => [PostModel] )
  async posts() {
    return db.select().from(posts)
  }

  @Mutation(() => PostModel)
  async createPost(@Arg('data', () => CreatePostInput) data: CreatePostInput) {    
    const [post] = await db.insert(posts).values({
      content: data.content,
      title: data.title,
      ownerId: data.ownerId,
      createdAt: new Date()
    }).returning();

    return post
  }
}