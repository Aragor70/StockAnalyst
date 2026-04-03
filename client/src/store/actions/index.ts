import * as MarketActions from "./market";
import * as initActions from "./init";
import * as walletActions from "./wallet";
import * as searchActions from "./search";
import * as chartActions from "./chart";
import * as summaryActions from "./summary";

export default {
  ...MarketActions,
  ...initActions,
  ...walletActions,
  ...searchActions,
  ...chartActions,
  ...summaryActions
};