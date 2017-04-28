

const ActionsType = {
    USER_LOGIN : 'USER_LOGIN',
    USER_LOGIN_SUCCESS : 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL : 'USER_LOGIN_FAIL',
    USER_LOGOUT : 'USER_LOGOUT'
}


export const Actions = {
    login : () => {
        return({
            type : ActionsType.USER_LOGIN
        })
    },
    loginSuccess: (data)=>{
        return({
            type : ActionsType.USER_LOGIN_SUCCESS,
            data : data
        })
    },
    loginFail: (error)=>{
        return({
            type : ActionsType.USER_LOGIN_FAIL,
            error: error
        })
    },
    logout: ()=>{
        return({
            type : ActionsType.USER_LOGOUT
        })
    }
}

const initState = {
    token: undefined,
    isLogin: undefined,
    isLoading : false,
    user: {},
    error: undefined,
}

export default function Auth(state = initState, action = {}) {
    switch (action.type) {
        case ActionsType.USER_LOGIN:
            return({
                ...state,
                isLoading: true
            });

        case ActionsType.USER_LOGIN_SUCCESS:
            let {data} = action;
            return({
                ...state,
                isLoading: false,
                token: data.token,
                user: data.user,
                error: undefined,
                isLogin: true
            });

        case ActionsType.USER_LOGIN_FAIL:
            return({
                ...state,
                isLoading: false,
                token: undefined,
                error : action.error,
                isLogin: false
            });

        case ActionsType.USER_LOGOUT:
            return({
                ...initState,
                isLogin:false
            });


        default:
            return state;
    }
}
