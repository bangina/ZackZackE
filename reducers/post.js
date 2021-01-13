export const initialState = {
  mainPosts: [
    //   대문자 : DB sequalizer에서 관계있는 정보들 합쳐서 오는 것들은 대문자로 넘어옴
    {
      id: 1,
      User: { id: 1, nickname: "인아" },
      content: "히히",
      Images: [
        { src: "https://dummyimage.com/300" },
        { src: "https://dummyimage.com/300" },
        { src: "https://dummyimage.com/300" },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "#리액트 #쉬워요",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "호호호",
        },
      ],
    },
    {
      id: 2,
      User: { id: 1, nickname: "인아" },
      content: "#리액트 #쉬워요",
      Images: [
        { src: "https://dummyimage.com/300" },
        { src: "https://dummyimage.com/300" },
        { src: "https://dummyimage.com/300" },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "#리액트 #쉬워요",
        },
        {
          User: {
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
  isCommentAdding: false, //게시글 추가 로딩
  isCommentAdded: false, //게시글 추가 완료 여부
  commnetAddError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

//동적 액션 creator
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  User: { id: 1, nickname: "인아" },
  content: "",
  Images: [],
  Comments: [],
};
const dummyComment = {
  id: 2,
  User: { id: 1, nickname: "인아" },
  content: "",
  Images: [],
  Comments: [],
};

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
        mainPosts: [dummyPost, ...state.mainPosts],
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
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isCommentAdding: true,
        isCommentAdded: false,
        commnetAddError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        //dummyPost를 spread 앞에다가 추가해야 위에 올라간다!!
        // mainPosts: [dummyComment, ...state.mainPosts],
        isCommentAdded: true,
        commnetAddErroring: false,
        postAddError: null,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isCommentAdded: false,
        commnetAddErroring: false,
        postAddError: action.error,
      };

    default:
      return state;
  }
};
export default reducer;
