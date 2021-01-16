import shortId from "shortid";
import produce from "immer";
import faker, { fake } from "faker";

export const initialState = {
  mainPosts: [
    //   대문자 : DB sequalizer에서 관계있는 정보들 합쳐서 오는 것들은 대문자로 넘어옴
    {
      id: shortId.generate(),
      User: { id: 1, nickname: "인아" },
      content: "히히",
      Images: [
        { id: shortId.generate(), src: "https://dummyimage.com/300" },
        { id: shortId.generate(), src: "https://dummyimage.com/300" },
        { id: shortId.generate(), src: "https://dummyimage.com/300" },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "nero",
          },
          content: "#리액트 #쉬워요",
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "hero",
          },
          content: "호호호",
        },
      ],
    },
  ],
  imagePaths: [], //이미지 업로드 경로
  isPostAdding: false, //게시글 추가 로딩
  isPostAdded: false, //게시글 추가 완료 여부
  postAddError: null,
  isCommentAdding: false, //게시글 추가  로딩
  isCommentAdded: false, //게시글 추가 완료 여부
  commentAddError: null,
  isPostRemoving: false,
  isPostRemoved: false,
  postRemoveError: null,
};

//더미데이터 추가하기
initialState.mainPosts = initialState.mainPosts.concat(
  Array(20)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }))
);

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

//동적 액션 creator
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data, //text
});
export const removePost = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: { id: 1, nickname: "인아" },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: { id: 1, nickname: "인아" },
});

//REDUCER? 이전 상태를 action을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.isPostAdding = true;
        draft.isPostAdded = false;
        draft.postAddError = null;
        break;

      case ADD_POST_SUCCESS:
        draft.isPostAdded = true;
        draft.isPostAdding = false;
        draft.postAddError = null;
        draft.mainPosts.unshift(dummyPost(action.data)); //w/o immer => [dummyPost(action.data), ...state.mainPosts]
        break;

      case ADD_POST_FAILURE:
        draft.isPostAdded = false;
        draft.isPostAdding = false;
        draft.postAddError = action.error;
        break;

      case REMOVE_POST_REQUEST:
        draft.isPostRemoving = true;
        draft.isPostRemoved = false;
        draft.postRemoveError = null;
        break;

      case REMOVE_POST_SUCCESS:
        draft.mainPosts = state.mainPosts.filter((v) => v.id !== action.data);
        draft.isPostRemoved = true;
        draft.isPostRemoving = false;
        draft.postRemoveError = null;
        break;

      case REMOVE_POST_FAILURE:
        draft.isPostRemoved = false;
        draft.isPostRemoving = false;
        draft.postRemoveError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.isCommentAdding = true;
        draft.isCommentAdded = false;
        draft.commentAddError = null;

      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));

        draft.isCommentAdded = true;
        draft.isCommentAdding = false;
        draft.commentAddError = null;

        break;
      }

      case ADD_COMMENT_FAILURE:
        draft.isCommentAdded = false;
        draft.isCommentAdding = false;
        draft.commentAddError = action.error;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
