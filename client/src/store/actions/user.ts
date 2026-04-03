import { UserActionsEnum } from "../../enums/user";

export const userLoading = () => ({
  type: UserActionsEnum.User_Loading,
});

export const userError = (err: any) => ({
  type: UserActionsEnum.User_Error,
  payload: err,
});

export const userSuccess = (data: any) => ({
  type: UserActionsEnum.User_Success,
  payload: data,
});

export const setUserName = (name: string) => ({
  type: UserActionsEnum.User_Set_Name,
  payload: name,
});