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
  postAdded: false, //게시글 추가 완료 여부
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};
const dummyPost = {
  id: 1,
  User: { id: 1, nickname: "인아" },
  content: "",
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        //dummyPost를 spread 앞에다가 추가해야 위에 올라간다!!
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };

    default:
      return state;
  }
};
export default reducer;
