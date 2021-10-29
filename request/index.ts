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
    if ("/event/bbs_sign_reward/sign" === r.url) {
      const re = r.clone();
      re.text().then((ee) => {
        console.log(ee, "re.text");
      });
    }
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
        alert && alert(JSON.stringify(rt));
      });

      return Promise.reject();
    }
  }

  getFetch(url: string, init?: RequestInit): Promise<any> {
    return fetch(this.Host + url, { ...this.defalutHeaders, ...init }).then(
      this.handel
    );
  }
}
