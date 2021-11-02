import LinkStyle from "./Link.module.css";

export default function Link({ links }: { links: MH.C.LinkProps }) {
  const lks: Array<MH.C.Link> = [];
  return (
    <div className={LinkStyle["link-main"]}>
      {lks
        .concat(links)
        .filter((e) => !!e)
        .map((e) => {
          return (
            <a
              className={LinkStyle["link-item"]}
              key={e.url}
              href={e.url}
              target="_blank"
              rel="noreferrer"
            >
              {e.name}
            </a>
          );
        })}
    </div>
  );
}
