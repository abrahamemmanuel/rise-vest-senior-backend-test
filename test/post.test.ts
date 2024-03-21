import { User } from "../entities/user.entity";
import { getMockRepository } from "./mocks/mock-repository";
import { Post } from "../entities/post.entity";
import { PostService } from "../services/post.service";

const mockPostRepository = getMockRepository<Post>()
describe('Test for Post service', () => {
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService(mockPostRepository as any);
  });

  afterEach(() => {
    mockPostRepository.create?.mockClear();
  })

  describe('Create Post', () => {
    it('should create a post for a user', async () => {
      const newPost = { title: 'test post', content: 'I am a simple test content' };
      const postUser = new User();
      postUser.id = 1;

      const savedPost = new Post();
      savedPost.id = 1;
      savedPost.title = newPost.title;
      savedPost.content = newPost.content;
      mockPostRepository.create?.mockReturnValueOnce(mockPostRepository);
      mockPostRepository.save?.mockResolvedValueOnce(savedPost)
      const createdPost = await postService.createPost({ ...newPost, user: postUser });
  
      expect(createdPost).toEqual(savedPost);
      expect(mockPostRepository.save).toHaveBeenCalled();
    });
  })
  describe('Retrieve Post', () => {
    it('should reteive a post for a user', async () => {
      const newPost = { title: 'test post', content: 'I am a simple test content' };
      const postUser = new User();
      postUser.id = 1;

      const savedPost = new Post();
      savedPost.id = 1;
      savedPost.title = newPost.title;
      savedPost.content = newPost.content;
      mockPostRepository.find?.mockResolvedValue([savedPost])
      const posts = await postService.getUserPosts(postUser.id);
  
      expect(posts).toEqual(expect.arrayContaining([savedPost]));
      expect(mockPostRepository.find).toHaveBeenCalledWith({
        where: {
          user: {
            id: postUser.id
          }
        }
      });
    });
  })
})
