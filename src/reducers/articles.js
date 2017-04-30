//not connect yet

const ActionsType = {
    FETCH_ARTICLES : 'FETCH_ARTICLES',
    FETCH_NEXT_ARTICLES : 'FETCH_NEXT_ARTICLES',
    FETCH_ARTICLES_SUCCESS : 'FETCH_ARTICLES_SUCCESS',
    FETCH_ARTICLES_FAIL : 'FETCH_ARTICLES_FAIL',
}


export const Actions = {
    refreshData : () => {
        return{
            type : ActionsType.FETCH_ARTICLES
        }
    },
    fetchNextArticles: ()=>{
        return{
            type : ActionsType.FETCH_NEXT_ARTICLES
        }
    },
    fetchArticlesSuccess: (data) => {
        return{
            type : ActionsType.FETCH_ARTICLES_SUCCESS,
            data: data
        }
    },
    fetchArticlesFail: (error) => {
        return{
            type : ActionsType.FETCH_ARTICLES_FAIL,
            error:error
        }
    }

}

const numberArticle = 2;

const initState = {
    data : [],
    isFetching: false,
    isFinished : false,
    error: undefined,
    lastKey : undefined
}

export default function articles(state = initState, action = {}) {
    switch (action.type) {
        case ActionsType.FETCH_ARTICLES:
            return({
                ...state,
                isLoading: true,
                isFinished: false,
                data: [],
                lastKey : undefined,
                error: undefined
            });

        case ActionsType.FETCH_NEXT_ARTICLES:
            return({
                ...state,
                isLoading: true,
                error: undefined
            })

        case ActionsType.FETCH_ARTICLES_SUCCESS:

            let tempList = [...state.data];
            tempList = tempList.concat(...action.data);
            let lastKey = tempList[tempList.length -1].id;

            return({
                ...state,
                data: tempList,
                isLoading: false,
                lastKey: lastKey,
                isFinished: action.data < numberArticle,
                error : undefined
            })

        case ActionsType.FETCH_ARTICLES_FAIL:
            return({
                ...state,
                isLoading: false,
                error: action.error
            })

        default:
            return state;
    }
}
