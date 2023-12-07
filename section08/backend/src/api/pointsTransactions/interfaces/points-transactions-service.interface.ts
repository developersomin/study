import {IAuthUser} from "../../../commons/interface/common.interface";

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser["user"];
}
