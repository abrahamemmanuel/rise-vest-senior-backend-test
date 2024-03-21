import { User } from "../entities/user.entity";
import { getMockRepository } from "./mocks/mock-repository";
import { Post } from "../entities/post.entity";
import { CommentService } from "../services/comment.service";
import { Comment } from "../entities/comment.entity";

const mockCommentRepository = getMockRepository<Comment>()
describe('Test for Post service', () => {
  let commentService: CommentService;

  beforeEach(() => {
    commentService = new CommentService(mockCommentRepository as any);
  });

  afterEach(() => {
    mockCommentRepository.create?.mockClear();
  })

  describe('Create Comment', () => {
    it('should create a comment for a user on a post', async () => {
      const newPost = { title: 'test post', content: 'I am a simple test content' };
      const commentUser = new User();
      commentUser.id = 2;

      const savedPost = new Post();
      savedPost.id = 1;
      savedPost.title = newPost.title;
      savedPost.content = newPost.content;
      mockCommentRepository.create?.mockImplementation((data) => {
        expect(data.post).toEqual(savedPost)
        mockCommentRepository.save?.mockResolvedValueOnce({ ...data, id: 1})
        return mockCommentRepository;
      });
      const createdComment = await commentService.createComment({ post: savedPost, user: commentUser, content: 'I am a comment content'});
  
      expect(createdComment.post).toEqual(savedPost);
      expect(createdComment.user).toEqual(commentUser);
      expect(createdComment.content).toEqual('I am a comment content')
      expect(mockCommentRepository.save).toHaveBeenCalled();
    });
  })
})

