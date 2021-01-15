import shortId from "shortid";

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
    {
      id: shortId.generate(),
      User: { id: shortId.generate(), nickname: "인아" },
      content: "#리액트 #쉬워요",
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        isPostAdding: true,
        isPostAdded: false,
        postAddError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        //dummyPost를 spread 앞에다가 추가해야 위에 올라간다!!
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        isPostAdded: true,
        isPostAdding: false,
        postAddError: null,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isPostAdded: false,
        isPostAdding: false,
        postAddError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        isPostRemoving: true,
        isPostRemoved: false,
        postRemoveError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        isPostRemoved: true,
        isPostRemoving: false,
        postRemoveError: null,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        isPostRemoved: false,
        isPostRemoving: false,
        postRemoveError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isCommentAdding: true,
        isCommentAdded: false,
        commentAddError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      //불변성을 지키며 comment 추가하기!!!!!!!!
      //(기존 객체들의 "참조는 유지"하되, 새로 추가되는 애만 생성하는 것)
      //1. comment의 부모 post의 id를 알아낸다
      const postIndex = state.mainPosts.findIndex(
        (p) => p.id === action.data.postId
      );
      //2. 알아낸 id로 해당 post 데려온다.
      const post = state.mainPosts[postIndex];
      //3. dummyComment와 해당 post의 댓글들을 얕은 복사하여 합쳐서 저장한다.
      const Comments = [dummyComment(action.data.content), ...post.Comments];
      //4. mainPost 얕은 복사
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };

      return {
        ...state,
        mainPosts,
        isCommentAdded: true,
        isCommentAdding: false,
        commentAddError: null,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isCommentAdded: false,
        isCommentAdding: false,
        commentAddError: action.error,
      };

    default:
      return state;
  }
};
export default reducer;
