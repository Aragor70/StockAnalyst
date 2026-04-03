import { UserActionsEnum } from "../../enums/user";

export interface UserState {
  loading: boolean;
  errors: any;
  name: string | null;
}

export const initialState: UserState = {
  loading: false,
  errors: {},
  name: null,
};

const UserReducer = (
  state: UserState = initialState,
  action: { type: string; payload?: any }
): UserState => {
  const { type, payload } = action;

  switch (type) {
    case UserActionsEnum.User_Loading:
      return {
        ...state,
        loading: true,
      };

    case UserActionsEnum.User_Error:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case UserActionsEnum.User_Success:
      return {
        ...state,
        loading: false,
        ...payload,
      };

    case UserActionsEnum.User_Set_Name:
      return {
        ...state,
        name: payload,
      };

    default:
      return state;
  }
};

export default UserReducer;