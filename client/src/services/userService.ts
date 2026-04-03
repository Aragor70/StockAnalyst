import { setUserName, userError, userLoading, userSuccess } from "../store/actions/user";
import BaseService from "./baseService";
import { Dispatch } from "redux";

class UserService extends BaseService {
  private static instance: UserService;

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async loadUser(dispatch: Dispatch) {
    try {
      dispatch(userLoading());

      const res = await this.get("/api/user/get-profile");

      dispatch(
        userSuccess({
          name: res?.name || null,
        })
      );
    } catch (err) {
      dispatch(userError(err));
    }
  }

  async updateName(dispatch: Dispatch, name: string) {
    try {
      await this.put("/api/user/update-name", { name });
      dispatch(setUserName(name));
    } catch (err) {
      dispatch(userError(err));
    }
  }
}

export default UserService;