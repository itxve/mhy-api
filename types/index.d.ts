declare namespace MH {
  namespace D {
    type SignRequest = AwardsRecordRequest;

    type AwardsRecordRequest = {
      cookie: string;
      region: string;
      game_uid: string;
    };

    type AwardsList = {
      month: number; //月份
      awards?: Array<Award>;
    };
    type Award = {
      cnt: number; //数量
      icon: string; //图片
      name: string; //奖励名
    };
    type UserInfo = Partial<{
      game_biz: string; //游戏服
      region: string; //大区
      game_uid: string; //游戏UID
      nickname: string; //游戏名
      level: number; //等级
      is_chosen: boolean;
      region_name: string; //大区名
      is_official: boolean;
      cookie: string;
      record: SignRecord;
    }> &
      Error;

    type UserMap = { [key: string]: D.UserInfo };

    type setCurrentUser = (userKey: string | undefined) => void;

    type ClassNameCombine =
      | string
      | { [key: string]: boolean }
      | Array<string | { [key: string]: boolean }>;

    type Error = { msg?: string };

    type SignRecord = Partial<{
      first_bind: boolean; //是否第一次绑定
      is_sign: boolean; //是否签到
      is_sub: boolean; //是否订阅
      month_first: boolean; //当月第一次？？？
      sign_cnt_missed: number; //未签到天数
      today: string; //当前时间
      total_sign_day: number; //已签到天数
    }> &
      Error;
  }

  namespace Context {
    type UserContext = Partial<{
      refreshUser: () => void;
      users: D.UserMap;
      currentUser: D.UserInfo;
      setCurrentUser: D.setCurrentUser;
      userSignRecord: D.SignRecord;
    }>;
  }

  namespace C {
    type AwardsListC = D.AwardsList;
    type ButtonProps = {
      onClick?: () => Promise<T>;
    } & { children?: ReactNode | undefined };
    type Link = { name: string; url: string };
    type LinkProps = Link | Array<Link>;
  }
}
