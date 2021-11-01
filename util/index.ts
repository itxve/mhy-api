import md5 from "md5";
class Util {
  //生成DS
  get DS() {
    var s = "h8w582wxwgqvahcdkpvdhbh2w9casgfl";
    var t = Math.floor(Date.now() / 1000);
    var r = Math.random().toString(36).slice(-6);
    var c = "salt=" + s + "&t=" + t + "&r=" + r;
    var ds = t + "," + r + "," + md5(c);
    return ds;
  }

  //构建请求头
  getHeader(cookie: string) {
    return {
      DS: this.DS,
      cookie,
      "x-rpc-app_version": "2.3.0",
      "x-rpc-client_type": "5",
      "x-rpc-device_id":
        "bd7f912e-908c-3692-a520-e70206" + Math.random().toString(36).slice(-6),
    };
  }

  getLocalUsers(): MH.D.UserMap {
    return JSON.parse(localStorage.getItem("account") || "{}");
  }

  setLocalUsers(users: {}) {
    localStorage.setItem("account", JSON.stringify(users));
  }

  expireUser(game_uid: string) {
    const alls = this.getLocalUsers();
    game_uid && (alls[game_uid].expire = true);
    this.setLocalUsers(alls);
  }
}

function typeOf(target: any, type: string) {
  return Object.prototype.toString.call(target) === `[object ${type}]`;
}

export function MultipleClass(className: MH.D.ClassNameCombine): string {
  // string
  if (typeOf(className, "String")) {
    const list: any = [];
    return list.concat(className).join(" ");
  }
  // {[key:string]:boolean}
  else if (typeOf(className, "Object")) {
    return (<any>className)[Object.keys(className)[0]]
      ? Object.keys(className)[0]
      : "";
    // Array<string> | Array<{[key:string]:boolean}>
  } else if (typeOf(className, "Array")) {
    let classlist: any = [];
    (<Array<any>>className).forEach((cls) => {
      if (typeOf(cls, "String")) {
        classlist.push(cls);
      } else if (typeOf(cls, "Object")) {
        cls[Object.keys(cls)[0]] && classlist.push(Object.keys(cls)[0]);
      }
    });
    return classlist.join(" ");
  }
  return "";
}

export default new Util();
