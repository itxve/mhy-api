import config from "@/config";
export default class NetFetch {
  private Host: String;
  constructor(host: String) {
    this.Host = host;
  }

  defalutHeaders = {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };

  postFetch(url: string, init?: RequestInit): Promise<any> {
    return fetch(this.Host + url, {
      ...this.defalutHeaders,
      ...init,
      method: "post",
    }).then(this.handel);
  }

  handel(r: Response) {
    const contentTypes = (<Headers>r.headers).get("content-type");
    if (r.status === 200) {
      if (~contentTypes?.indexOf("application/json")!) {
        return r.json();
      } else {
        return r;
      }
    } else {
      const re = r.clone();
      re.json().then((rt) => {
        console.log(rt);
        if (config.alert) {
          alert && alert(JSON.stringify(rt));
        }
      });
      return Promise.reject(r);
    }
  }

  getFetch(url: string, init?: RequestInit): Promise<any> {
    return fetch(this.Host + url, { ...this.defalutHeaders, ...init })
      .then(this.handel)
      .then((e) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(e);
          }, 10);
        });
      });
  }
}
