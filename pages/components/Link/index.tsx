import LinkStyle from "./Link.module.css";

export default function Link({ links }: { links: MH.C.LinkProps }) {
  console.log("links");
  const lks: Array<MH.C.Link> = [];
  return (
    <div className={LinkStyle["link-main"]}>
      {lks
        .concat(links)
        .filter((e) => !!e)
        .map((e) => {
          return (
            <a key={e.url} href={e.url}>
              {e.name}
            </a>
          );
        })}
    </div>
  );
}
